
import { Element } from "../Element.js";

export class List extends Element
{
    items = []
    selections = []
    selectionText = []
    constructor(app, props)
    {
        super('div', props)
        this.props = props
        this.controls = props.controls
        this.app = app

        this.addClass('align-center')

        this.list = new Element('ul', {class: 'align-left'}).add(this.root)

        new Element('button', 'Save Selections', {class: 'btn-primary', click: this.saveSelections.bind(this)}).add(this.root)
    }

    async addItem(text)
    {
        this.items[this.items.length] = new Element('li', '<i class="fa-regular fa-circle"></i> &nbsp;' + text, {click: this.onClickListItem.bind(this, text, this.items.length)}).add(this.list)
    }

    async onClickListItem(text, index)
    {
        if(this.selections.includes(index)){
            this.selections.splice(this.selections.indexOf(index), 1)
            this.selectionText.splice(this.selections.indexOf(index), 1)
            this.items[index].setHTML('<i class="fa-regular fa-circle"></i> &nbsp;' + text)
            
        } else {
            this.selections.splice(this.selections.indexOf(index), 1)
            this.items[index].setHTML('<i class="fa-solid fa-circle-check"></i> &nbsp;' + text)
            this.selections.push(index)
            this.selectionText.push(text)
        }
    }

    async saveSelections()
    {
        this.controls.send(this.selectionText.join(', '))
    }

}