import { Element } from "../../Element.js";
import { Input } from "./Input.js";

export class File extends Input
{
    isFocusedOrHasContent = false

    constructor(app, props)
    {
        let inputProps = {type: 'file'}
        if(props.input !== undefined ){
            inputProps = {...props.input, ...inputProps}
        }
        super(app, {...props, ...{input: inputProps}})

        this.forceFocus()
        this.toggle()
        
    }
}