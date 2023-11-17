import { Element } from "../../Element.js"

export default class ExternalNav extends Element
{
    constructor(app, chat, template)
    {
        super('ul')
        this.app = app
        this.chat = chat
        this.template = template
        this.render()
    }

    async render()
    {

        const ul = this.root

        // home
        let li = new Element('li').add(ul)
        let a = new Element('a', {href: '/', click: this.template.navigate.bind(this.template, '/')}).add(li)
        new Element('span', 'Home').add(a)

        // services
        li = new Element('li').add(ul)
        a = new Element('a', {href: '/services', click: this.send.bind(this, 'What services does ZAF offer?')}).add(li)
        new Element('span', 'Services').add(a)

        // pricing
        li = new Element('li').add(ul)
        a = new Element('a', {click: this.pricing.bind(this)}).add(li)
        new Element('span', 'Pricing').add(a)

        // about
        li = new Element('li').add(ul)
        a = new Element('a', {href: '/about', click: this.send.bind(this, 'What is ZAF all about?')}).add(li)
        new Element('span', 'About').add(a)

        this.badge = new Element('img', {src: '/assets/images/sandbox-authorized-entities-badge-2023-inverted.png',  width: 150}).add(ul)
        this.regulatory = new Element('p', 'This service is provided by an entity that is not a traditional legal provider. This entity is owned/managed (fully or partially) by nonlawyers who are not subject to the same rules as lawyers.', {class: 'regulatory-text'}).add(ul)
        // 
        
    }

    async pricing()
    {
        setTimeout(function(){
            this.app.template.closeMenu()   
        }.bind(this), 150)
        
        this.chat.onNewMessage('client', 'How much does ZAF cost?')
        this.chat.controls.setStatusMessage()
        setTimeout(function(){
            this.chat.onNewMessage('assistant', 'ZAF stands for Zero Attorney Fees because it truly is free to everyone. You can even consult with a ZAF lawyer for free. If you end up needing full representation from a live lawyer to get a fair result, ZAF will connect you with an experienced local lawyer who will undertake representation at a reduced fee (about 10% less than the going rates in the industry). This gets paid out of the settlement at the end of the case rather than out of your pocket.')
            this.chat.controls.clearStatusMessage()
        }.bind(this), 2500)
        
    }

    async send(message, e)
    {
        setTimeout(function(){
            this.app.template.closeMenu()   
        }.bind(this), 150)
        e.preventDefault()
        e.stopPropagation()
        if(this.chat) this.chat.controls.send(message)
    }

}