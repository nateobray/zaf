import { Element } from "../../Element.js";

export class Input extends Element
{
    isFocusedOrHasContent = false
    forceFocused = false

    constructor(app, props)
    {
        if(props === undefined) props = {}
        if(props.label === undefined ) {
            if(props.input && props.input.type && props.input.type == 'text'){
                super('textarea', props)
            } else if (props.input && props.input.type && props.input.type == 'check'){
                super('div', props)
            } else {
                if(props && props.input){
                    super('input', props.input)
                } else {
                    super('input', props.input)
                }
                
            }
            
        } else {
            super('div', {...{
                class: 'input-group'
            }, ...props})
            this.props = props

            this.addEvent('click', this.onLabelClick.bind(this));

            // create label
            this.label = new Element('label', (props.label.text===undefined)?'':props.label.text, {...{
                'click': this.onLabelClick.bind(this)
            }, ...props.label})
            this.label.add(this.root)

            // create input
            if(props.input === undefined) props.input = {}
            if(props.input !== undefined && props.input.type !== undefined && props.input.type == 'text'){
                this.input = new Element('textarea', {...{
                    'focus': this.onFocus.bind(this),
                    'blur': this.onBlur.bind(this)
                }, ...props.input})
                if(props.input.value !== undefined){
                    this.input.setHTML(props.input.value)
                }
            } else {
                if(props.input.value == undefined || props.input.value == null){
                    props.input.value = ''
                }
                this.input = new Element('input', {...{
                    'focus': this.onFocus.bind(this),
                    'blur': this.onBlur.bind(this)
                }, ...props.input})
            }
            
            this.input.add(this.root)
            if(props.input.value){
                this.isFocusedOrHasContent = true;
                this.toggle()
            }
        }
    }

    disable()
    {
        this.input.getRoot().disabled = true
    }

    enable()
    {
        this.input.getRoot().disabled = false
    }

    getValue()
    {
        return this.input.root.value
    }

    setValue(val)
    {
        this.input.root.value = val
        this.isFocusedOrHasContent = true
        this.toggle()
        
    }

    onLabelClick()
    {
        this.focus()
    }

    focus()
    {
        this.input.getRoot().focus()
    }

    onFocus(e)
    {
        if(this.props && this.props.input && this.props.input.focus) this.props.input.focus(e)
        this.isFocusedOrHasContent = true
        this.toggle()
    }

    onBlur()
    {
        if(this.props && this.props.input && this.props.input.blur) this.props.input.blur(e)
        this.isFocusedOrHasContent = false
        if(this.input.getRoot().value) this.isFocusedOrHasContent = true
        this.toggle()
    }

    forceFocus()
    {
        this.forceFocused = true;
    }

    toggle()
    {
        if(this.label){
            this.label.removeClass('input-focused')
            if(this.isFocusedOrHasContent || this.forceFocused){
                this.label.addClass('input-focused')
            }
        }
    }
}