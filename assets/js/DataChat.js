export default class DataChat
{
    type = 'Signup'

    constructor(type='Signup')
    {
        this.type = type
        console.log(this.type)
    }

    async send(message, fn, type = 'client')
    {
        
        const es = new EventSource('/chat/converse/message/?message=' + encodeURIComponent(message) + '&type=' + type + '&AIType=' + this.type);
        es.addEventListener("message", function(e){
            fn(e, es)
        });
        

        return ''
    }

    /****
    async send(message, type = 'client')
    {

        

        console.log(message)
        const response = await this.fetch('/chat/converse/', 'POST', new URLSearchParams({message: message, type: type, AIType: this.type}))
        return response.data
    }
    */

    async activate(code)
    {
        const response = await this.fetch('/account/activate/?code=' + code)
        return response.data
    }

    async init()
    {
        const response = await this.fetch('/chat/converse/', 'GET', new URLSearchParams({AIType: this.type}))
        console.log(response)
        return response.data
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
            urlObj.host = 'zaflegal.com'

        // allow url parameter as a string
        } else {
            urlObj = new URL(url, 'https://' + 'zaflegal.com')
        }

        // get our URL as a string
        url = urlObj.toString()

        // if we're passing session by URL, append to every request
        if(localStorage.getItem('sessionId')!=null){
            urlObj.searchParams.add('PHPSESSID', localStorage.getItem('sessionId'));
        }

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

        console.log(url)
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
}