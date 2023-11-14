import { Element } from "../../Element.js";
import { Input } from "./Input.js";

export class Text extends Input
{
    isFocusedOrHasContent = false

    constructor(app, props)
    {
        let inputProps = {type: 'text'}
        if(props !== undefined && props.input !== undefined ){
            inputProps = {...props.input, ...inputProps}
        }
        super(app, {...props, ...{input: inputProps}})
    }
}