import { Element } from "../../Element.js";

export class Button extends Element
{
    isFocusedOrHasContent = false
    
    constructor(app, props)
    {
        if(props === undefined) props = {}
        super('button', props.text===undefined?'Submit':props.text, props)
        this.root.start = this.start.bind(this)
        this.root.stop = this.stop.bind(this)
    }

    start()
    {
        this.root.setAttribute('disabled', true)
        this.addClass('loading')
    }

    stop()
    {
        this.root.removeAttribute('disabled')
        this.removeClass('loading')
    }

    disable()
    {
        this.root.setAttribute('disabled', true)
    }

    enable()
    {
        this.root.removeAttribute('disabled')
    }

}