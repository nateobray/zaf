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
        chat.messages.forEach( message => {
            
            let chatBubble = null
            if(message.role == 'system') return
            if(message.role == 'function') {
                console.log("function call", message.name)
                switch(message.name){
                    case 'presentSignupForm':
                        chatBubble = this.onNewMessage('assistant', '')
                        new SignupForm(this.app).add(chatBubble.content)
                        break;
                    case 'presentLoginForm':
                        chatBubble = this.onNewMessage('assistant', '')
                        new LoginForm(this.app).add(chatBubble.content)
                        break;
                    case 'presentUploadForm':
                        chatBubble = this.onNewMessage('assistant', '')
                        new UploadForm(this.app).add(chatBubble.content)
                        break;
                }
                return
            }
            let type = 'assistant'
            if(message.role == 'user') type = 'client'
            this.onInitMessage(type, message.content)
        })
        this.controls.clearStatusMessage();

        if(search.has('code')){
            const response = await this.model.activate(search.get('code'))
            //console.log(response)
            if(response === 'success') {
                new ChatBubble(this.app, "Congratulations, we have successfully verified your email address and activated your account.", {type: 'assistant'}).add(this.conversation)
                const loginChatBubble = new ChatBubble(this.app, "", {type: "assistant"}).add(this.conversation)
                new LoginForm(this.app).add(loginChatBubble)
                this.conversationWindow.getRoot().scrollTop = this.conversationWindow.getRoot().scrollHeight;
            } else {
                //this.model.send('Sorry, we didn\t recognize your email verification code.  Either you have already signed up or or should try to do so again.', 'assistant')
                new ChatBubble(this.app, "Sorry, we didn\t recognize your email verification code.  Either you have already signed up and just need to login or you need to create an account.", {type: 'assistant'}).add(this.conversation)
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

        if(name && type == 'assistant') new Element('div', name, {class: 'character-'+type}).add(this.conversation)
        const chatBubble = new ChatBubble(this.app, message, {type: type, controls: this.controls}).add(this.conversation)
        this.conversationWindow.getRoot().scrollTop = this.conversationWindow.getRoot().scrollHeight;
        return chatBubble
    }

    onNewMessage(type, message)
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

        if(name && type == 'assistant') new Element('div', name, {class: 'character-'+type}).add(this.conversation)
        const chatBubble = new ChatBubble(this.app, message, {type: type, controls: this.controls}).add(this.conversation)
        chatBubble.conversationWindow = this.conversationWindow
        this.conversationWindow.getRoot().scrollTop = this.conversationWindow.getRoot().scrollHeight;
        return chatBubble
    }

}
