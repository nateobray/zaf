import DataChat from "../DataChat.js";
import { Element } from "../Element.js";
import { Check } from "./forms/Check.js";
import { Form } from "./forms/Form.js";
import { Input } from "./forms/Input.js";

export class SignupForm extends Element
{
    constructor(app, controls, props)
    {
        super('div', {class: 'signup'})
        this.app = app
        this.controls = controls
        this.props = props
        this.model = new DataChat()
        this.storage = window.localStorage;
        this.isAccountCreated = this.storage.getItem('isAccountCreated')

        this.render()
    }

    async render()
    {
        if(this.isAccountCreated) {
            this.success(false)
            return
        }

        this.form = new Form(this.model, {action: '/account/', method: 'post', onSuccess: this.success.bind(this, true)}).add(this.root)
        const fieldset = new Element('fieldset').add(this.form)
        new Element('legend').setHTML('Create ZAF Account').add(fieldset)

        new Input(this.model, {label: {text: 'First Name'}, input: {name: 'first_name'}}).add(fieldset);
        new Input(this.model, {label: {text: 'Last Name'}, input: {name: 'last_name'}}).add(fieldset);
        new Input(this.model, {label: {text: 'Email'}, input: {name: 'email'}}).add(fieldset);
        //new Check(this.model, {label: {text: 'You may contact me via text message or phone call'}, input: {name: 'can_call'}}).add(fieldset);
        new Input(this.model, {label: {text: 'Phone'}, input: {name: 'phone'}}).add(fieldset);
        new Input(this.model, {label: {text: 'Password'}, input: {name: 'password', type: 'password'}}).add(fieldset);
        new Input(this.model, {label: {text: 'Confirm Password'}, input: {name: 'password_confirm', type: 'password'}}).add(fieldset);
        // new Check(this.model, {label: {text: 'I don\'t have a real case, I just want to check things out'}, input: {name: 'is_demo'}}).add(fieldset);

        const btnContainer = new Element('div', {class: 'btn-container'}).add(fieldset)
        new Element('button', 'Create Account', {class: 'btn-primary', click: this.form.submit.bind(this.form)}).add(btnContainer)
    }

    async success(sendMessage)
    {
        this.storage.setItem('isAccountCreated', true)
        /**
        gtag("event", "sign_up", {
            method: "Google"
        });
         */
        this.setHTML('')
        new Element('div', '<div class="align-center"><br/><i class="fa-solid fa-circle-check fa-xl"></i><br/><br/> <strong>Email Verfication Sent</strong></div> <p>We\'ve sent you an email with a link you need to click to verify your email and access your account.</p>', {class: 'form-complete'}).add(this.root)
        if(sendMessage){
            
            this.controls.send('Client has successfully signed up. Please let them know that they need to check their email and click on the link to verify their email address so they can login and continue their case.', 'system')
        }
    }
}