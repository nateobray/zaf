import { Element } from "../Element.js"

export class View extends Element
{
    useTemplate = true

    constructor(app, props)
    {
        super('div', props)
        this.app = app
    }

    render(params)
    {
        
    }

    getClassName()
    {
        return this.constructor.name;
    }

    clear()
    {
        this.root.innerHTML = ''
    }
}