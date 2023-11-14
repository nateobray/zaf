import { Element } from "../../Element.js";
import { Modal } from "../../components/Modal.js";
import { Button } from "../../components/forms/Button.js";
import { Input } from "../../components/forms/Input.js";
import { Text } from "../../components/forms/Text.js";
import DataInjuries from "../data/DataInjuries.js";
import DataTreatments from "../data/DataTreatments.js";


export class Treatments extends Element
{
    constructor(app, props)
    {
        super('div', {class: 'treatments'})
        this.props = props
        this.app = app
        this.model = new DataTreatments(this.app)
        
        this.render()
    }

    async render()
    {
        this.modal = new Modal(this.app, {title: 'Treatments'}).add(this.root)
        this.modal.addClass('width600px')
        this.modal.open()

        const response = await this.model.get()
        response.forEach(treatment => {
            
            this.component = new Element('div', {class: 'property-damage'}).add(this.modal.body)
            new Element('h4', '<i class="fa-solid fa-user-doctor"></i> ' + treatment.treatment_type[0].treatment_type ).add(this.component)
            
            const defList = new Element('dl').add(this.component)
            
            new Element('dt', 'Status').add(defList)
            new Element('dd', '<strong>' + treatment.treatment_status[0].treatment_status + '</strong>').add(defList)

            new Element('dt', 'Description').add(defList)
            new Element('dd', treatment.treatment_desc).add(defList)

            //new Element('dt', 'Body Part').add(defList)
            //new Element('dd', bodyParts).add(defList)

            //new Element('dt', 'Symptoms').add(defList)
            //new Element('dd', symptoms).add(defList)

            //new Element('dt', 'Diagnosis').add(defList)
            //new Element('dd', diagnosis).add(defList)

        })
        
    }

}