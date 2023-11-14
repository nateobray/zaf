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
        a = new Element('a', {href: '/pricing', click: this.send.bind(this, 'How much does ZAF cost?')}).add(li)
        new Element('span', 'Pricing').add(a)

        // about
        li = new Element('li').add(ul)
        a = new Element('a', {href: '/about', click: this.send.bind(this, 'What is ZAF all about?')}).add(li)
        new Element('span', 'About').add(a)

        this.badge = new Element('img', {src: '/assets/images/sandbox-authorized-entities-badge-2023-inverted.png',  width: 150}).add(ul)
        this.regulatory = new Element('p', 'This service is provided by an entity that is not a traditional legal provider. This entity is owned/managed (fully or partially) by nonlawyers who are not subject to the same rules as lawyers.', {class: 'regulatory-text'}).add(ul)
        // 
        
    }

    async send(message, e)
    {
        e.preventDefault()
        e.stopPropagation()
        if(this.chat) this.chat.controls.send(message)
    }

}