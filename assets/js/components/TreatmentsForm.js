import DataChat from "../DataChat.js";
import { Element } from "../Element.js";
import DataTreatments from "./data/DataTreatments.js";
import { File } from "./forms/File.js";
import { Form } from "./forms/Form.js";
import { Input } from "./forms/Input.js";

export class TreatmentsForm extends Element
{
    selectedInjuryTreatmentTypes = []

    constructor(app, props)
    {
        super('div', {class: 'treatments-form'})
        this.app = app
        this.props = props
        //this.controls = props.controls
        this.model = new DataTreatments(this.app)
        this.render()
    }

    async render()
    {
        
        this.form = new Form(this.app, {action: '/chat/treatments/', method: 'post', onSuccess: this.success.bind(this)}).add(this.root)
        const fieldset = new Element('fieldset').add(this.form)
        new Element('legend').setHTML('Select Treatments').add(fieldset)

        const treatmentTypes = await this.model.get()

        const list = new Element('ul', {class: 'select-list'}).add(fieldset)
        treatmentTypes.forEach(TreatmentType => {
            console.log(TreatmentType)
            new Element('li', '<i class="fa-regular fa-circle"></i> ' + TreatmentType.injury_treatment_type, {click: this.clickTreatmentType.bind(this, TreatmentType.injury_treatment_type_id, TreatmentType.injury_treatment_type)}).add(list)
        })
        
        const btnContainer = new Element('div', {class: 'btn-container'}).add(fieldset)
        new Element('button', 'Save Selections', {class: 'btn-primary', click: this.form.submit.bind(this.form)}).add(btnContainer)
    }

    async clickTreatmentType(injury_treatment_type_id, injury_treatment_type, e)
    {
        console.log(e)
        if(this.selectedInjuryTreatmentTypes.includes(injury_treatment_type_id)){
            this.selectedInjuryTreatmentTypes.splice(this.selectedInjuryTreatmentTypes.indexOf(injury_treatment_type_id), 1) 
            e.target.innerHTML = '<i class="fa-regular fa-circle"></i> ' + injury_treatment_type
        } else {
            this.selectedInjuryTreatmentTypes.push(injury_treatment_type_id)
            e.target.innerHTML = '<i class="fa-solid fa-circle-check"></i> ' + injury_treatment_type
        }
    }

    success(e, response)
    {
        this.controls.send("I upload a document and here is the response:" + JSON.stringify(response.data))
    }

}