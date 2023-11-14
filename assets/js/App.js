import { Element } from "./Element.js"
import { View } from "./views/View.js"
import { Template } from "./views/Template.js"
import { Session } from "./models/Session.js"
import { Unauthorized } from "./errors/Unauthorized.js"
import { Forbidden } from "./errors/Forbidden.js"

export class App
{

    pathPrefix = '/assets/js/views/'
    host = ''
    isTemplateLoaded = false;
    session = new Session()
    currentView;
    
    constructor(body)
    {
        this.app = this
        this.body = body
        this.popFunction = this.change.bind(this)
        window.addEventListener('popstate', this.popFunction);
        this.host = window.location.hostname
        this.authCheck()
    }

    change(e)
    {
        this.load(this.getRoutablePath())
    }

    route(url, event , title='', data={})
    {
        history.pushState(data, title, url)
        this.load(this.getRoutablePath())
    }

    validateExternalPath(path)
    {
        
        const validExternalPaths = [
            'login',
            'services',
            'pricing',
            'about'
        ];

        return validExternalPaths.includes(path.replace(/^\/|\/$/g, '')); 
    }

    async authCheck()
    {
        this.template = new Template(this, this.body);
        try {
            const path = this.getRoutablePath()
            if(!this.validateExternalPath(path)){
                const response = await this.fetch('/auth/checker/', 'GET')
                this.session.set('user', response.data)
            }
            this.template.setAccount()
            this.load(this.getRoutablePath())
        } catch (error) {
            this.template.setAccount()
            this.session.clear()
            console.log(error)
            console.warn("Not Authorized: redirect to login")
            this.route('/')
        }
    }

    async load(url=null)
    {
        
        //document.body.style.cursor = 'wait';
        const params = new URLSearchParams(window.location.search)
        
        let parts = url.split('/');
        parts.shift() // remove empty string
        if(parts[parts.length-1] == '') parts.pop() // remove trailing empty string if exists

        let viewStr = parts.join('/') + '.js'
        if(viewStr === '.js') viewStr = 'home.js'
        let obj = await import(this.pathPrefix + viewStr);
        
        if(!obj.default.prototype instanceof View){
            console.error("Invalid Object")
        }

        // remove existing current view
        if(this.currentView){
            this.currentView.remove()
        }

        // create a new view by dynamically importing the view
        this.currentView = new obj.default(this, {class: obj.default.name.toLowerCase() + '-view view'})
        
        // render a view inside the template
        if(this.currentView.useTemplate){
            if(!this.isTemplateLoaded){
                this.clear()
                this.isTemplateLoaded = true
            }
            this.template.clear()
            this.template.setAccount()
            this.currentView.render(params)
            this.currentView.add(this.template.body)
            this.template.nav.setHTML('')
            if(this.currentView.nav) this.currentView.nav(this.template)

        // render view to the app directly
        } else {
            this.clear()
            this.currentView.render(params)
            this.currentView.add(this.root)
            this.isTemplateLoaded = false
        }
    }

    async fetch(url=null, method='GET', data=null)
    {
        // make sure our URL is not null
        if(null) throw 'url cannot be null'
        let urlObj = null

        // allow url parameters as URL object
        if(url instanceof URL){
            urlObj = url
            urlObj.protocol = 'https'
            urlObj.host = this.endpoint.replace('https://').replace('http://')

        // allow url parameter as a string
        } else {
            urlObj = new URL(url, 'https://' + this.host)
        }

        // get our URL as a string
        url = urlObj.toString()

        // setup fetch params
        let fetchParams = {
            method: method.toUpperCase(),
            credentials: 'include',
        }

        // execute fetch request
        if(data instanceof FormData && method.toUpperCase() === 'GET'){
            const search = new URLSearchParams(data)
            url += '?' + search.toString()
            data = null
        }
        if(data instanceof URLSearchParams && method.toUpperCase() === 'GET'){
            url += '?' + data.toString()
            data = null
        }
        if(data !== null) fetchParams.body = data

        return fetch(url, fetchParams)
            .then(response => {
                if (response.ok) return response.json();
                return response.json().then(response => {
                    if(response.errors !== undefined){
                        let Err = new Errors("Multiple errors have occured, please see errors.")
                        Err.set(response.errors)
                        throw Err
                    }
                    if(response.code === 401){ 
                        throw new Unauthorized(response.error)
                    }
                    if(response.code === 403) throw new Forbidden(response.error)
                    
                    throw new Error(response.error)
                })
            })
            .then(response => {     
                return response;
            })
            
    }

    loadSession()
    {
        
    }

    clear()
    {
        //this.app.setHTML('')
    }

    getRoutablePath()
    {
        return window.location.pathname
    }

}

window.app = new App(document.body)