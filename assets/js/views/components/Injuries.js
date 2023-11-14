import { Element } from "../../Element.js";
import { Modal } from "../../components/Modal.js";
import { Button } from "../../components/forms/Button.js";
import { Input } from "../../components/forms/Input.js";
import { Text } from "../../components/forms/Text.js";
import DataInjuries from "../data/DataInjuries.js";


export class Injuries extends Element
{
    constructor(app, props)
    {
        super('div', {class: 'injuries'})
        
        this.props = props
        this.app = app
        this.injuries = props.injuries
        
        console.log('injuries', this.injuries)
        this.render()
    }

    async render()
    {
        this.modal = new Modal(this.app, {title: 'Injurty Info'}).add(this.root)
        this.modal.addClass('width800px')
        this.modal.open()

        this.table = new Element('table').add(this.modal.body)
        const tHead = new Element('thead').add(this.table)
        const row = new Element('tr').add(tHead)

        this.injuries.forEach((injury) => {

            console.log('injury', injury)

            let diagnosis = ''
            if (injury.injury_diagnosis.length > 0) {
                injury.injury_diagnosis.forEach((diag) => {
                    diagnosis += diag.diagnosis[0].diagnosis + '<br>'
                })
            }

            let symptoms = ''
            if (injury.injury_symptom.length > 0) {
                injury.injury_symptom.forEach((symptom) => {
                    symptoms += symptom.symptom[0].symptom + '<br>'
                })
            }

            let bodyParts = ''
            if(injury.injury_body_part.length > 0){
                injury.injury_body_part.forEach((bodyPart) => {
                    bodyParts += bodyPart.body_party[0].body_part + '<br>'
                })
            }

            this.component = new Element('div', {class: 'property-damage'}).add(this.modal.body)
            new Element('h4', '<i class="fa-solid fa-user-injured"></i> Injury' ).add(this.component)
            
            const defList = new Element('dl').add(this.component)
            new Element('dt', 'Description').add(defList)
            new Element('dd', injury.injury_desc).add(defList)

            new Element('dt', 'Body Part').add(defList)
            new Element('dd', bodyParts).add(defList)

            new Element('dt', 'Symptoms').add(defList)
            new Element('dd', symptoms).add(defList)

            new Element('dt', 'Diagnosis').add(defList)
            new Element('dd', diagnosis).add(defList)

        })
        
        
    }

}