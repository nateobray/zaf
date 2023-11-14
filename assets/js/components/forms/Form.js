import { Element } from "../../Element.js";

export class Form extends Element
{
    constructor(app, props)
    {
        super('form', props)
        this.app = app
        this.props = props
        this.buttons = []

        if(props !== undefined && props.onSubmit !== undefined){
            this.addEvent('submit', props.onSubmit)
        } else {
            this.addEvent('submit', this.submit.bind(this))
        }
        
        this.formMessages = new Element('div')
        this.formMessages.add(this.root)
    }

    async submit(e)
    {
        // preven default form submit behavior
        e.preventDefault()
        // prevent event from bubbling up to other objects
        e.stopPropagation()
        // clear any previous form messages
        this.clearMessages()
        if(this.props && this.props.onSubmit){
            this.props.onSubmit(e)
            return
        }
        // handl submit event on our form
        const elements = this.getRoot().elements;
        for (let element of elements) {
            if(element.nodeName === 'BUTTON' && element.start !== undefined){
                this.addButton(element)
            }
        };
        this.buttons.forEach(button => {
            button.start()
        })
        
        let method = 'GET'
        let url = '/'

        if(this.props.action !== undefined) url = this.props.action
        if(this.props.method !== undefined) method = this.props.method

        let successMessage = null, warningMessage = null, errorMessage = null;
        let data = new FormData(this.root)
        
        try {
            let response = await this.app.fetch(url, method, data)
            if(response.message !== undefined){
                successMessage = response.message
            }
            if(this.props.onSuccess !== undefined) this.props.onSuccess(e, response)
        } catch (error) {
            errorMessage = '<i class="fa-solid fa-triangle-exclamation"></i> ' + error.message
        }

        if(successMessage !== null){
            const message = new Element('div', successMessage, {class: 'success-message'})
            message.add(this.formMessages)
        } else if ( warningMessage !== null) {
            const message = new Element('div', warningMessage, {class: 'warning-message'})
            message.add(this.formMessages)
        } else if ( errorMessage !== null) {
            const message = new Element('div', errorMessage, {class: 'error-message'})
            message.add(this.formMessages)
        }
        
        for(let button of this.buttons){
            button.stop()
        }

    }

    addButton(element)
    {
        this.buttons[this.buttons.length] = element
    }

    clearMessages()
    {
        this.formMessages.setHTML('')
    }
}