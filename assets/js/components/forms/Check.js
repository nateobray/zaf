import { Element } from "../../Element.js";

export class Check extends Element
{
    isActive = false

    constructor(app, props)
    {
        let inputProps = {type: 'check', class: 'input-group'}
        if(props && props.input){
            inputProps = {...props.input, ...inputProps}
        }
        super('div', props)

        this.props = props
        this.input = new Element('input', {type: 'hidden', name: inputProps.name?inputProps.name:''}).add(this.root)

        this.forceFocused = true
        this.addClass('input-check')
        this.render()
        if(props && props.label && props.label.text) this.label = new Element('label', ' ' + props.label.text??'').add(this.root)

        if(props && props.input && props.input.value){
            this.input.getRoot().value = props.input.value
            if(props.input.value && props.input.value != 'false'){
                this.toggleActive()
            }
        }
    }

    setValue(value)
    {
        
        return this.input.getRoot().value = value?true:false

    }

    getValue()
    {
        return this.input.getRoot().value
    }

    async render()
    {
        this.icon = new Element('i', {class: 'fa-solid fa-lg fa-square', click: this.toggleActive.bind(this)}).add(this.root)
    }

    toggleActive(e)
    {
        if(e){
            e.preventDefault()
            e.stopPropagation()
        }

        if(this.isActive){
            this.icon.removeClass('fa-square-check')
            this.icon.addClass('fa-square')
            this.isActive = false
        } else {
            this.icon.removeClass('fa-square')
            this.icon.addClass('fa-square-check')
            this.isActive = true
        }

        this.input.getRoot().value = this.isActive
        if(e && this.props && this.props.click){
            e.isActive = this.isActive
            e.check = this
            this.props.click(this.isActive, e)
        }
    }

}