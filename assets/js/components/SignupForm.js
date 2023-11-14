import DataChat from "../DataChat.js";
import { Element } from "../Element.js";
import { Check } from "./forms/Check.js";
import { Form } from "./forms/Form.js";
import { Input } from "./forms/Input.js";

export class SignupForm extends Element
{
    constructor(props)
    {
        super('div', {class: 'signup'})
        this.props = props
        this.model = new DataChat()
        this.storage = window.localStorage;
        this.isAccountCreated = this.storage.getItem('isAccountCreated')

        this.render()
    }

    async render()
    {
        if(this.isAccountCreated) {
            this.success()
            return
        }

        this.form = new Form(this.model, {action: '/account/', method: 'post', onSuccess: this.success.bind(this)}).add(this.root)
        const fieldset = new Element('fieldset').add(this.form)
        new Element('legend').setHTML('Create ZAF Account').add(fieldset)

        new Input(this.model, {label: {text: 'First Name'}, input: {name: 'first_name'}}).add(fieldset);
        new Input(this.model, {label: {text: 'Last Name'}, input: {name: 'last_name'}}).add(fieldset);
        new Input(this.model, {label: {text: 'Email'}, input: {name: 'email'}}).add(fieldset);
        new Input(this.model, {label: {text: 'Phone'}, input: {name: 'phone'}}).add(fieldset);
        new Input(this.model, {label: {text: 'Password'}, input: {name: 'password', type: 'password'}}).add(fieldset);
        new Input(this.model, {label: {text: 'Confirm Password'}, input: {name: 'password_confirm', type: 'password'}}).add(fieldset);
        new Check(this.model, {label: {text: 'I don\'t have a real case, I just want to check things out'}, input: {name: 'account_type'}}).add(fieldset);

        const btnContainer = new Element('div', {class: 'btn-container'}).add(fieldset)
        new Element('button', 'Create Account', {class: 'btn-primary', click: this.form.submit.bind(this.form)}).add(btnContainer)
    }

    async success()
    {
        this.storage.setItem('isAccountCreated', true)
        console.log("Hello world\n")
        this.setHTML('')
        new Element('div', '<div class="align-center"><br/><i class="fa-solid fa-circle-check fa-xl"></i><br/><br/> <strong>Email Verfication Sent</strong></div> <p>We\'ve sent you an email with a link you need to click to verify your email and access your account.</p>', {class: 'form-complete'}).add(this.root)
    }
}