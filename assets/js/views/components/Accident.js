import { Element } from "../../Element.js";
import { Modal } from "../../components/Modal.js";
import { Button } from "../../components/forms/Button.js";
import { Input } from "../../components/forms/Input.js";
import { Text } from "../../components/forms/Text.js";

export class Accident extends Element
{
    constructor(app, props)
    {
        super('div', {class: 'Accident'})
        this.props = props
        this.app = app
        this.accident = props.accident
        
        this.render()
    }

    async render()
    {
        this.modal = new Modal(this.app, {title: '<i class="fa-solid fa-person-falling-burst fa-lg"></i> &nbsp; Accident Info'}).add(this.root)
        this.modal.addClass('width600px')
        this.modal.open()

        new Input(this.app, {label: {text: 'Accident Date'}, input: {name: 'accident_date', value: this.accident.accident_datetime}}).add(this.modal.body)

        new Text(this.app, {label: {text: 'Description'}, input: {name: 'accident_desc', value: this.accident.accident_desc}}).add(this.modal.body)
        new Input(this.app, {label: {text: 'Location'}, input: {name: 'address_location', value: this.accident.accident_location}}).add(this.modal.body)
        new Input(this.app, {label: {text: 'At Fault'}, input: {name: 'accident_at_fault_party', value: this.accident.accident_at_fault_party}}).add(this.modal.body)
        
        this.modal.footer.addClass('align-center')
        new Button(this.app, {text: 'Save Accident Info', class: 'btn-primary'}).add(this.modal.footer)
        
    }

}