import { Element } from "../../Element.js";
import { Modal } from "../../components/Modal.js";
import { Button } from "../../components/forms/Button.js";
import { Input } from "../../components/forms/Input.js";
import { Text } from "../../components/forms/Text.js";
import DataAccident from "../data/DataAccident.js";

export class PersonalInfo extends Element
{
    constructor(app, props)
    {
        super('div', {class: 'Accident'})
        this.props = props
        this.app = app
        this.user = props.user
        
        this.render()
    }

    async render()
    {
        this.modal = new Modal(this.app, {title: 'Accident Info'}).add(this.root)
        this.modal.open()

        new Input(this.app, {label: {text: 'First Name'}, input: {name: 'first_name', value: this.user.user_first_name}}).add(this.modal.body)
        new Input(this.app, {label: {text: 'Last Name'}, input: {name: 'last_name', value: this.user.user_last_name}}).add(this.modal.body)
        new Input(this.app, {label: {text: 'Email'}, input: {name: 'email', value: this.user.user_email}}).add(this.modal.body)


        
        this.modal.footer.addClass('align-center')
        new Button(this.app, {text: 'Save Personal Info', class: 'btn-primary'}).add(this.modal.footer)
    }

}