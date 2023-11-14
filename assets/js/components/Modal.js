import { Element } from "../Element.js"

export class Modal extends Element
{
    constructor(app, props)
    {
        super('div', {...{class: 'modal'}, ...props})

        this.app = app
        this.props = props

        let footerProps = {}
        if(props && props.footer) footerProps = props.footer

        this.header = new Element('div', {class: 'modal-header'}).add(this.root)
        this.body = new Element('div', {class: 'modal-body'}).add(this.root)
        this.footer = new Element('div', {...{class: 'modal-footer'}, ...footerProps}).add(this.root)

        if(props && props.title !== undefined) this.title = new Element('h4', props?props.title:'').add(this.header);

        this.closeBtn = new Element('i', {class: 'fa-solid fa-x modal-close-btn', click: this.close.bind(this)}).add(this.header)
        
        this.background = new Element('div', {class: 'modal-background'})
    }

    open()
    {
        this.add(document.body)
        this.background.add(document.body)
    }

    close()
    {
        this.remove()
        this.background.remove()
        if(this.props && this.props.onClose) this.props.onClose()
    }

}