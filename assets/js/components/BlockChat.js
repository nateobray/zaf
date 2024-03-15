import DataChat from "../DataChat.js";
import { Element } from "../Element.js";
import { File } from "./forms/File.js";
import { Hidden } from "./forms/Hidden.js";
import { Form } from "./forms/Form.js";
import { Input } from "./forms/Input.js";
import { Select } from "./forms/Select.js";

export class BlockChat extends Element
{
    constructor(app, controls, props)
    {
        super('div', {class: 'upload-form'})
        this.app = app
        this.props = props
        this.render()
    }

    async render()
    {
        new Element('div', '<div class="align-center"><br/><i class="fa-solid fa-triangle-exclamation fa-2xl"></i><br/><br/> <strong>Chat Blocked</strong></div> <p>Unfortunately this chat has been blocked.  If you think this has been done by mistake please give us a call 801-346-0080.</p>', {class: 'form-complete'}).add(this.root)
        return;
    }

}