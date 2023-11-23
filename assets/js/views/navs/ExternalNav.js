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
        a = new Element('a', {click: this.services.bind(this)}).add(li)
        new Element('span', 'Services').add(a)

        // pricing
        li = new Element('li').add(ul)
        a = new Element('a', {click: this.pricing.bind(this)}).add(li)
        new Element('span', 'Pricing').add(a)

        // about
        li = new Element('li').add(ul)
        a = new Element('a', {click: this.about.bind(this, )}).add(li)
        new Element('span', 'About').add(a)

        this.badge = new Element('img', {src: '/assets/images/sandbox-authorized-entities-badge-2023-inverted.png',  width: 150}).add(ul)
        this.regulatory = new Element('p', 'This service is provided by an entity that is not a traditional legal provider. This entity is owned/managed (fully or partially) by nonlawyers who are not subject to the same rules as lawyers.\n\n Now please tell me more about your accident?', {class: 'regulatory-text'}).add(ul)
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
            this.chat.onNewMessage('assistant', "ZAF stands for Zero Attorney Fees because it truly is free to everyone.\n\n You can even consult with a ZAF lawyer for free. If you end up needing full representation from a live lawyer to get a fair result, ZAF will connect you with an experienced local lawyer who will undertake representation at a reduced fee (about 10% less than the going rates in the industry). This gets paid out of the settlement at the end of the case rather than out of your pocket.\n\n" + "Now, can you tell me more about your accident?")
            this.chat.controls.clearStatusMessage()
        }.bind(this), 2500)
        
    }

    async about()
    {
        setTimeout(function(){
            this.app.template.closeMenu()   
        }.bind(this), 150)
        
        this.chat.onNewMessage('client', 'What is ZAF all about?')
        this.chat.controls.setStatusMessage()
        setTimeout(function(){
            this.chat.onNewMessage('assistant', 
                    "ZAF Legal is a licensed legal tech company that provides a platform to help individuals who have been injured in an accident. ZAF means Zero Attorney Fees.  We aim to provide convenient, accessible, and affordable legal solutions to the public.\n\n"
                    + "Please note that while I can provide general insight into the insurance claims process and help you organize your case, I am not a lawyer and I do not represent you. If you want legal advice, you can call a ZAF lawyer at 801-255-2102.\n\n"
                    + "Now, can you tell me more about your accident?"
            )
            this.chat.controls.clearStatusMessage()
        }.bind(this), 2500)
        
    }

    async services()
    {
        setTimeout(function(){
            this.app.template.closeMenu()   
        }.bind(this), 150)
        
        this.chat.onNewMessage('client', 'What services does ZAF offer?')
        this.chat.controls.setStatusMessage()
        setTimeout(function(){
            this.chat.onNewMessage('assistant', 
                  "ZAF Legal offers a variety of services to help you with your personal injury case. Here are some of the things we can assist you with:\n\n"
                + "1. Organizing your case: We help you gather and organize all the necessary information about your accident, injuries, treatments, and insurance.\n\n"
                + "2. Assessing your case: We help you determine if you might have a feasible personal injury case based on the information you provide.\n\n"
                + "3. Connecting with a lawyer: We can connect you with a ZAF lawyer who can provide legal advice and representation at discounted rates.\n\n"
                + "4. Managing your case: If you decide to create an account with ZAF, you can use our platform to manage your case, keep track of your treatments, and communicate with your lawyer.\n\n"
                + "Please note that while I can provide general insight into the insurance claims process and help you organize your case, I am not a lawyer and I do not represent you. If you want legal advice, you should call a ZAF lawyer at 801-255-2102.\n\n"
                + "Now, can you tell me more about your accident?"
            )
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