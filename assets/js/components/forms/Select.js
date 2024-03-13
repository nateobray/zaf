import { Element } from "../../Element.js";

export class Select extends Element
{
    isFocusedOrHasContent = false

    constructor(app, props)
    {
        if(props === undefined) props = {}
        if(props.label === undefined ) {
            super('Select', props)
            this.props = props
        } else {
            super('div', {...{
                class: 'input-group'
            }, ...props})
            this.props = props

            this.addEvent('click', this.onLabelClick.bind(this));

            // create label
            this.label = new Element('label', (props.label.text===undefined)?'':props.label.text, {...{
                'class': 'input-focused',
                'click': this.onLabelClick.bind(this)
            }, ...props.label})
            this.label.add(this.root)


            // create input
            if(props.input === undefined) props.input = {}
            this.input = new Element('select', {...{
                
            }, ...props.input})

            this.setOptions(props.values, props)

            this.input.add(this.root)
        }
    }

    setOptions(values)
    {
        this.input.setHTML('')
        let selectedOption = null
        if(values != undefined){
            values.forEach( (value, index) => {

                // create option
                let options = {value: value.value}

                // set default
                if(value.default){
                    // console.log(selectedOption)
                    if(!selectedOption){
                        // console.log(value)
                        options.selected = true
                    }
                } 
                
                // set selected
                if(this.props && this.props.input && (options.value == this.props.input.value || (this.props.input.value == null && options.value == "")) && index != 0){
                    if(selectedOption) selectedOption.getRoot().removeAttribute('selected')
                    options.selected = true
                } 

                // create option
                const el = new Element('option', value.label, options).add(this.input)
                if(options.selected){
                    selectedOption = el
                } 

            })
        }
    }

    onLabelClick()
    {
        this.focus()
    }

    focus()
    {
        this.input.getRoot().focus()
    }

    getValue()
    {
        
        return this.input.getRoot().value
    }

    setValue(value)
    {
        this.input.getRoot().value = value
        if(this.props.input.change) this.props.input.change(value)
    }

    clear()
    {
        this.input.getRoot().value = null
    }

    disable()
    {
        this.input.getRoot().disabled = true
    }

    enable()
    {
        this.input.getRoot().disabled = false
    }

    isDisabled()
    {
        return this.input.getRoot().disabled
    }
}