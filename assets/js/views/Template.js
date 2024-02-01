import { Element } from "../Element.js";
import { Permission } from "../models/Permission.js";
import { Session } from "../models/Session.js";

export class Template
{
    session = new Session('Template')
    menuIsOpen = false

    constructor(app, body, props)
    {
        this.app = app

        this.header = new Element('div', {class: 'header'}).add(body)
        this.nav = new Element('div', {class: 'nav'}).add(body)
        this.body = body

        this.renderHeader()
        this.enableMenu()
    }

    renderHeader()
    {
        const menu = new Element('div', {class: 'menu'}).add(this.header)
        new Element('img', {src: 'assets/images/zaf-logo.png', alt: 'ZAF Logo', class: 'logo'}).add(this.header)
        new Element('div', 'BETA', {class: 'beta'}).add(this.header)

        

        this.setAccount()

        // menu btn
        this.menuBtn = new Element('button', '<i class="fa-solid fa-bars"></i>', {class: 'menu-btn', tabindex: 1000}).add(menu)
        new Element('a', '<i class="fa-solid fa-phone fa-lg"></i> &nbsp; <span class="phone-action">801-346-0080</span>', {href: 'tel:801-346-0080'}).add(menu)
    }

    async logout()
    {
        window.location = '/account/logout/'
    }

    enableMenu()
    {
        document.addEventListener('click', (event) => {
            if (!this.nav.getRoot().contains(event.target) && !this.menuBtn.getRoot().contains(event.target)) {
                this.closeMenu()
            } else {
                this.openMenu()
            }
        });
    }

    openMenu()
    {
        this.open = true
        this.nav.addClass('open')
    }

    closeMenu()
    {
        this.open = false
        this.nav.removeClass('open')
    }

    navigate(path, e)
    {
        e.preventDefault()
        this.app.route(path)

        setTimeout(() => {
            if(this.closeMenu) this.closeMenu()
        }, 100);
    }

    setAccount(forceSet)
    {
        if(this.account) this.account.remove()
        console.log('session', this.session.get('user'))
        if(this.session.get('user') || forceSet){
            this.account = new Element('div', 'Logout &nbsp; <i class="fa-solid fa-circle-user fa-xl"></i>', {class: 'account', click: this.logout.bind(this)}).add(this.header)
        } else {
            this.account = new Element('div', 'Login &nbsp; <i class="fa-solid fa-circle-user fa-xl"></i>', {class: 'account', click: this.navigate.bind(this, '/login')}).add(this.header)
        }
    }

    clear()
    {
        
    }
}