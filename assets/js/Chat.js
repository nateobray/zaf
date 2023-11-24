import { ChatBubble } from "./ChatBubble.js"
import { ChatControls } from "./ChatControls.js"
import DataChat from "./DataChat.js"
import { Element } from "./Element.js"
import { LoginForm } from "./components/LoginForm.js"
import { SignupForm } from "./components/SignupForm.js"
import { UploadForm } from "./components/UploadForm.js"

export class Chat extends Element
{
    
    constructor(app, props)
    {
        super('div', {class: 'conversation'})
        
        this.props = props
        this.app = app
        this.model = new DataChat((this.props&&this.props.type)?this.props.type:1)

        this.conversationWindow = new Element('div', {class: 'conversation-window'}).add(this.root)

        this.conversation = new Element('div', {class: 'inner-conversation'}).add(this.conversationWindow)

        this.regulatory = new Element('div', {class: 'regulatory-container'}).add(this.conversation)

        this.badge = new Element('img', {src: '/assets/images/sandbox-authorized-entities-badge-2023-inverted.png', width: 270}).add(this.regulatory)
        new Element('br').add(this.regulatory)
        new Element('a', 'utahinnovationoffice.org', {href: 'https://utahinnovationoffice.org', target: '_blank'}).add(this.regulatory)
        this.controls = new ChatControls(this.app, {model: this.model, onNewMessage: this.onNewMessage.bind(this)}).add(this.root)
        const search = new URLSearchParams(window.location.search)

        
        addEventListener("resize", (event) => {
            this.resize()
        });
        this.resize()
        this.initConversation(search)
    }

    resize()
    {
        this.conversation.getRoot().style.minHeight = window.innerHeight - 172;
        //window.innerHeight;
    }

    async initConversation(search)
    {
        this.controls.setStatusMessage('Your AI assistant is typing...')
        const chat = await this.model.init()
        this.model.type = chat.chat_type_id
        console.log('model', this.model)
        let lastChatBubble = null
        chat.messages.forEach( message => {
            
            let chatBubble = null
            if(message.role == 'system') return
            if(message.role == 'function') {
                console.log("function call", message.name)
                switch(message.name){
                    case 'presentSignupForm':
                        chatBubble = this.onNewMessage('assistant', '')
                        new SignupForm(this.app, this.controls).add(chatBubble.content)
                        break;
                    case 'presentLoginForm':
                        chatBubble = this.onNewMessage('assistant', '')
                        new LoginForm(this.app, this.controls).add(chatBubble.content)
                        break;
                    case 'presentUploadForm':
                        chatBubble = this.onNewMessage('assistant', '')
                        new UploadForm(this.app, this.controls, {controls: this.controls}).add(chatBubble.content)
                        break;
                }
                return
            }
            let type = 'assistant'
            if(message.role == 'user') type = 'client'
            lastChatBubble = this.onInitMessage(type, message.content)
        })
        this.controls.clearStatusMessage();

        if(search.has('code')){
            if(this.lastCharacterMessage) this.lastCharacterMessage.remove()
            if(lastChatBubble) lastChatBubble.remove()
            try {
                const response = await this.model.activate(search.get('code'))
                //console.log(response)
                if(response === 'success') {
                    gtag("event", "login", {
                        method: "account-activated"
                    });
                    this.controls.send("Client has successfully verfied their email address.  Please let them know and help them get logged in by presenting the login form.", "system")
                    //this.conversationWindow.getRoot().scrollTop = this.conversationWindow.getRoot().scrollHeight;
                } else {
                    gtag("event", "login", {
                        method: "account-already-activated"
                    });
                    this.controls.send("Client attempted to verify their email address again.  Please inform them that their account is already activated and help them get logged in.", "system")
                    //this.model.send('Sorry, we didn\t recognize your email verification code.  Either you have already signed up or or should try to do so again.', 'assistant')
                    //new ChatBubble(this.app, "Sorry, we didn\t recognize your email verification code.  Either you have already signed up and just need to login or you need to create an account.", {type: 'assistant'}).add(this.conversation)
                }
            } catch (err){
                this.controls.send("Client attempted to verify their email address again.  Please inform them that their account is already activated and help them get logged in.", "system")
            }
        }

        this.conversation.getRoot().scrollTop = this.conversation.getRoot().scrollHeight;
    }

    onInitMessage(type, message)
    {

        let name = ''
        switch(this.model.type){
            case 1: name = 'Albert'; break;
            case 3: name = 'Albert'; break;
            case 4: name = 'Ava'; break;
            case 5: name = 'Emily'; break;
            case 6: name = 'Traci'; break;
            case 7: name = 'Logan'; break;
            case 10: name = 'Tally'; break;
        }

        if(name && type == 'assistant') this.lastCharacterMessage = new Element('div', name, {class: 'character-'+type}).add(this.conversation)
        const chatBubble = new ChatBubble(this.app, message, {type: type, controls: this.controls}).add(this.conversation)
        this.conversationWindow.getRoot().scrollTop = this.conversationWindow.getRoot().scrollHeight;
        return chatBubble
    }

    onNewMessage(type, message)
    {

        if(type == 'system') return;

        let name = ''
        switch(this.model.type){
            case 1: name = 'Albert'; break;
            case 3: name = 'Albert'; break;
            case 4: name = 'Ava'; break;
            case 5: name = 'Emily'; break;
            case 6: name = 'Traci'; break;
            case 7: name = 'Logan'; break;
            case 10: name = 'Tally'; break;
        }

        if(name && type == 'assistant') this.lastCharacterMessage = new Element('div', name, {class: 'character-'+type}).add(this.conversation)
        const chatBubble = new ChatBubble(this.app, message, {type: type, controls: this.controls}).add(this.conversation)
        chatBubble.conversationWindow = this.conversationWindow
        this.conversationWindow.getRoot().scrollTop = this.conversationWindow.getRoot().scrollHeight;
        return chatBubble
    }

}
