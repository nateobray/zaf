import DataChat from "../DataChat.js";
import { Element } from "../Element.js";
import { File } from "./forms/File.js";
import { Hidden } from "./forms/Hidden.js";
import { Form } from "./forms/Form.js";
import { Input } from "./forms/Input.js";
import { Select } from "./forms/Select.js";

export class UploadForm extends Element
{
    constructor(app, controls, props)
    {
        super('div', {class: 'upload-form'})
        this.app = app
        this.props = props
        console.log(this.props)
        this.controls = props.controls
        this.render()
    }

    async render()
    {
        
        if(!this.props.type){
            new Element('div', '<div class="align-center"><br/><i class="fa-solid fa-triangle-exclamation fa-2xl"></i><br/><br/> <strong>Upload Form Expired</strong></div> <p>This form has expired.  If you need to upload a file request a new form.</p>', {class: 'form-complete'}).add(this.root)
            return;
        }
        this.form = new Form(this.app, {action: '/chat/upload/', method: 'post', onSuccess: this.success.bind(this), onError: this.onError.bind(this)}).add(this.root)
        const fieldset = new Element('fieldset').add(this.form)
        new Element('legend').setHTML('Upload Images/Documents').add(fieldset)
        //"injury photo", "disfigurement photo", "accident photo", "incident report", "police report"
        const documentTypeOptions = [
            {label: 'Injury Photo', value: 'injury photo'},
            {label: 'Disfigurement Photo', value: 'disfigurement photo'},
            {label: 'Accident Photo', value: 'accident photo'},
            {label: 'Incident Report', value: 'incident report'},
            {label: 'Police Report', value: 'police report'},
            {label: 'Drivers Info Exchange', value: 'drivers info exchange'},
        ]
        new Select(this.app,  {values: documentTypeOptions, label: {text: 'Select Type of File'}, input: {name: 'document_type', value: this.props.type}})

        new File(this.app, {label: {text: 'File'}, input: {name: 'file', label: 'File', accept: 'image/*,application/pdf'}}).add(fieldset)
        new Hidden(this.app, {name: 'document_type', value: this.props.type}).add(fieldset)

        const btnContainer = new Element('div', {class: 'btn-container'}).add(fieldset)
        this.button = new Element('button', 'Upload', {class: 'btn-primary', click: this.onSubmit.bind(this)}).add(btnContainer)

    }

    onSubmit(){
        this.form.submit.bind(this.form)

        this.overlay = new Element('div', {class: 'form-overlay'}).add(this.form)
        new Element('div', '<i class="fa fa-spin fa-gear"></i> Uploading...').add(this.overlay)
    }

    success(e, response)
    {
        this.controls.send("I upload a document and here is the response:" + JSON.stringify(response.data), 'system')
        this.setHTML('')
        this.form.remove()
        new Element('div', '<div class="align-center"><br/><i class="fa-solid fa-circle-check fa-xl"></i><br/><br/> <strong>Upload Complete</strong></div> <p>File has been uploaded and saved to your case.</p>', {class: 'form-complete'}).add(this.root)
        this.overlay.remove()
    }

    onError()
    {
        this.overlay.remove()
    }

}