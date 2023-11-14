import { Element } from "../../Element.js";

export class Hidden extends Element
{
    constructor(app, props)
    {
       super('input', {...props, ...{type: 'hidden'}})
    }

    setValue(value)
    {
        this.getRoot().value = value
    }
}