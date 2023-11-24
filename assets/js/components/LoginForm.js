import DataChat from "../DataChat.js";
import { Element } from "../Element.js";
import { Form } from "./forms/Form.js";
import { Input } from "./forms/Input.js";

export class LoginForm extends Element
{
    constructor(app, controls, props)
    {
        super('div', {class: 'login'})
        this.props = props
        this.app = app
        this.model = new DataChat()
        
        this.render()
    }

    async render()
    {
        
        this.form = new Form(this.model, {action: '/account/auth/', method: 'post', onSuccess: this.success.bind(this)}).add(this.root)
        const fieldset = new Element('fieldset').add(this.form)
        new Element('legend').setHTML('Login to ZAF').add(fieldset)

        new Input(this.model, {label: {text: 'Email'}, input: {name: 'email'}}).add(fieldset);
        new Input(this.model, {label: {text: 'Password'}, input: {name: 'password', type: 'password'}}).add(fieldset);
        
        const btnContainer = new Element('div', {class: 'btn-container'}).add(fieldset)
        new Element('button', 'Login to ZAF', {class: 'btn-primary', click: this.form.submit.bind(this.form)}).add(btnContainer)
    }

    async success(e,response)
    {
        this.setHTML('')
        gtag("event", "login", {
            method: "login-form"
        });
        this.app.route('/case')
        this.app.session.set('user', response.data.user)    
    }
}