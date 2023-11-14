import DataChat from "../DataChat.js";
import { Element } from "../Element.js";
import { Form } from "./forms/Form.js";
import { Input } from "./forms/Input.js";

export class AccountForm extends Element
{
    constructor(app, props)
    {
        super('div', {class: 'account-form grid-align-center max-width-300'})
        this.props = props
        this.app = app
        this.model = new DataChat()
        
        this.render()
    }

    async render()
    {
        
        this.form = new Form(this.model, {action: '/account/put/', method: 'post', onSuccess: this.success.bind(this)}).add(this.root)
        const fieldset = new Element('fieldset').add(this.form)
        new Element('legend').setHTML('ZAF Account').add(fieldset)

        new Input(this.model, {label: {text: 'First Name'}, input: {name: 'first_name'}}).add(fieldset);
        new Input(this.model, {label: {text: 'Last Name'}, input: {name: 'last_name'}}).add(fieldset);
        new Input(this.model, {label: {text: 'Email'}, input: {name: 'email'}}).add(fieldset);
        new Input(this.model, {label: {text: 'Password'}, input: {name: 'password', type: 'password'}}).add(fieldset);
        
        const btnContainer = new Element('div', {class: 'btn-container'}).add(fieldset)
        new Element('button', 'Update ZAF Account', {class: 'btn-primary', click: this.form.submit.bind(this.form)}).add(btnContainer)
    }

    async success()
    {
        this.setHTML('')
        this.render()
    }
}