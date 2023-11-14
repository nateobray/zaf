import DataChat from "../DataChat.js";
import { Element } from "../Element.js";
import { File } from "./forms/File.js";
import { Form } from "./forms/Form.js";
import { Input } from "./forms/Input.js";

export class UploadForm extends Element
{
    constructor(app, props)
    {
        super('div', {class: 'upload-form'})
        this.app = app
        this.props = props
        this.controls = props.controls
        this.render()
    }

    async render()
    {
        
        this.form = new Form(this.app, {action: '/chat/upload/', method: 'post', onSuccess: this.success.bind(this)}).add(this.root)
        const fieldset = new Element('fieldset').add(this.form)
        new Element('legend').setHTML('Upload Bill/Expense Document').add(fieldset)

        new File(this.app, {label: {text: 'File'}, input: {name: 'file', label: 'File', accept: 'image/*,application/pdf'}}).add(fieldset)

        const btnContainer = new Element('div', {class: 'btn-container'}).add(fieldset)
        new Element('button', 'Upload', {class: 'btn-primary', click: this.form.submit.bind(this.form)}).add(btnContainer)
    }

    success(e, response)
    {
        this.controls.send("I upload a document and here is the response:" + JSON.stringify(response.data))
    }

}