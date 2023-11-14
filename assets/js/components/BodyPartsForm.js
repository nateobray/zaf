import DataChat from "../DataChat.js";
import { Element } from "../Element.js";
import DataBodyParts from "./data/DataBodyParts.js";
import DataTreatments from "./data/DataTreatments.js";
import { File } from "./forms/File.js";
import { Form } from "./forms/Form.js";
import { Input } from "./forms/Input.js";
import { Hidden } from "./forms/Hidden.js";

export class BodyPartsForm extends Element
{
    selectedBodyParts = []

    constructor(app, props)
    {
        super('div', {class: 'body-parts-form'})
        this.app = app
        this.props = props
        this.controls = props.controls
        this.model = new DataBodyParts(this.app)
        this.render()
    }

    async render()
    {
        
        this.form = new Form(this.app, {action: '/bodyParts/', method: 'post', onSuccess: this.success.bind(this)}).add(this.root)
        const fieldset = new Element('fieldset').add(this.form)
        new Element('legend').setHTML('Select Injured Areas').add(fieldset)

        const bodyParts = await this.model.get()

        const list = new Element('ul', {class: 'select-list'}).add(fieldset)
        this.bodyPartInputs = []
        bodyParts.forEach(BodyPart => {
            if(BodyPart.body_part_accident.length>0) this.selectedBodyParts.push(BodyPart.body_part_id)
            
            this.bodyPartInputs[BodyPart.body_part_id] = new Hidden(this.app, {name: 'body_part_id[]', value: BodyPart.body_part_accident.length>0?BodyPart.body_part_id:''}).add(fieldset)
            new Element('li', (BodyPart.body_part_accident.length>0?'<i class="fa-solid fa-circle-check"></i> ':'<i class="fa-regular fa-circle"></i> ') + BodyPart.body_part, {click: this.clickBodyPart.bind(this, BodyPart.body_part_id, BodyPart.body_part)}).add(list)
        })
        
        const btnContainer = new Element('div', {class: 'btn-container'}).add(fieldset)
        new Element('button', 'Save Selections', {class: 'btn-primary', click: this.form.submit.bind(this.form)}).add(btnContainer)
    }

    async clickBodyPart(body_part_id, body_part, e)
    {
        if(this.selectedBodyParts.includes(body_part_id)){
            this.selectedBodyParts.splice(this.selectedBodyParts.indexOf(body_part_id), 1) 
            e.target.innerHTML = '<i class="fa-regular fa-circle"></i> ' + body_part
            this.bodyPartInputs[body_part_id].setValue(null)
        } else {
            this.selectedBodyParts.push(body_part_id)
            e.target.innerHTML = '<i class="fa-solid fa-circle-check"></i> ' + body_part
            this.bodyPartInputs[body_part_id].setValue(body_part_id)
        }
    }

    success(e, response)
    {
        this.controls.send("Here are the body parts that were effected by the accident:" + JSON.stringify(response.data))
    }

}