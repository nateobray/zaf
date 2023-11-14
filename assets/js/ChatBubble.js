import { Element } from "./Element.js";
import { BodyPartsForm } from "./components/BodyPartsForm.js";
import { List } from "./components/List.js";
import { LoginForm } from "./components/LoginForm.js";
import { SignupForm } from "./components/SignupForm.js";
import { TreatmentsForm } from "./components/TreatmentsForm.js";
import { UploadForm } from "./components/UploadForm.js";

export class ChatBubble extends Element
{
    list

    constructor(app, text, props)
    {
        super('div', {class: 'chat-bubble'}, props)

        this.type = 'client'
        this.app = app
        if(props && props.type === 'assistant'){
            this.addClass('assistant')
            new Element('div', {class: 'tri-right left-top'}).add(this.root)
            this.type = 'assistant'
        } 

        if(props && props.type === 'client'){
            
            this.addClass('client')
            new Element('div', {class: 'tri-right right-top'}).add(this.root)
        } 

        if(props.controls) this.controls = props.controls

        this.renderString(text)
    }
    
    renderString(text='')
    {
        this.content = new Element('div', {class: 'chat-content'}).add(this.root)

        //text = this.parseList(text)
        
        
        if(this.type == 'assistant'){
            this.content.setHTML(text)
        } else {
            this.content.getRoot().textContent = text
        }

        //if(!text) return

        //if(text.includes('{list}')) this.loadComponent('{list}', this.list, text, this.content)

        //if (text.includes('{signup}')) this.loadComponent('{signup}', new SignupForm(this.app), text, this.content)
        
        //if (text.includes('{login}')) this.loadComponent('{login}', new LoginForm(this.app), text, this.content)
        
        //if (text.includes('{upload}')) this.loadComponent('{upload}', new UploadForm(this.app, {controls: this.controls}), text, this.content)
        
        //if(text.includes('{select-treatments}')) this.loadComponent('{select-treatments}', new TreatmentsForm(this.app), text, this.content)

        //if(text.includes('{body-parts}')) this.loadComponent('{body-parts}', new BodyPartsForm(this.app, {controls: this.controls}), text, this.content)

        

    }

    parseList(text)
    {
        // Use regular expression to match list items
        //let regex = /(-\s(.+?)(?=\n-|\n\n|$)\n*)+/g;
        let regex = /(-\s(.+?)(?=\n- |\n\n|$))/g;
        //let regex = /(\d+\. |- )(.+?)(?=\n\d+\. |\n- |\n\n|$)\n*/g;
        let match;
        let listItems = [];
        let listStart, listEnd;

        // Extract all list items
        while ((match = regex.exec(text)) !== null) {
            listItems.push(match[2]); // We're interested in the second group that contains the actual text
            if (listStart === undefined) listStart = match.index;
            listEnd = regex.lastIndex;
        }
        
        // Replace the list with {list}
        let replacedText = text.slice(0, listStart) + '{list}' + text.slice(listEnd);

        if(listItems.length > 0){
            this.list = new List(this.app, {class: 'select-list', controls: this.controls})
            
            listItems.forEach(item => {
                this.list.addItem(item.trim())
            })
            text = replacedText
        }

        return text
    }

    async onClickListItem()
    {

    }

    replaceList()
    {

    }

    loadComponent(string, obj, text, content)
    {
        const targetString = string
        const targetIndex = text.indexOf(targetString);

        const beforeTarget = content.getRoot().innerHTML.slice(0, targetIndex);
        const afterTarget = content.getRoot().innerHTML.slice(targetIndex + targetString.length);

        content.getRoot().innerHTML = '';
        content.getRoot().insertAdjacentHTML('beforeend', beforeTarget);
        content.getRoot().appendChild(obj.getRoot());
        content.getRoot().insertAdjacentHTML('beforeend', afterTarget);
    }
}