/**
 * Element
 * 
 * Creates a new HTML element
 * 
 * @param {string} tag - The tag name of the element
 * @param {string|number|object} - The content of the element, attributes, or events
 */

export class Element
{
    root
    args

    // creates a new HTML element
    constructor(...args)
    {
        this.args = args
        // set the root element from the first argument or no argument
        if(this.args.length === 0 ){
            this.createElement('div')
        } else if (this.args.length > 0 && typeof this.args[0] === 'string') {
            this.createElement(this.args[0])
        } else if (this.args.length > 0 && typeof this.args[0] === 'number') {
            this.createElement('div')
            this.renderNumber(this.args[0])
        } else if (this.args.length > 0 && typeof this.args[0] === 'object') {
            this.createElement('div')
            this.renderObject(this.args[0])
        }
        
        // set the innerHTML or attributes/events of the root element from the second argument
        
        if(this.args.length > 1 && typeof this.args[1] === 'string'){
            this.renderString(this.args[1])
        } else if (this.args.length > 1 && typeof this.args[1] === 'number'){
            this.renderNumber(this.args[1])
        } else if (this.args.length > 1 && typeof this.args[1] === 'object'){
            this.renderObject(this.args[1])
        }

        // set the attributes/events of the root element from the third argument
        if(this.args.length > 2 && typeof this.args[2] === 'object'){
            this.renderObject(this.args[2])
        }
        return this
    }

    // creates a new HTML element
    createElement(tag)
    {
        this.root = document.createElement(tag)
    }

    // renders a string to root innerHTML
    renderString(string)
    {
        this.root.innerHTML = string
    }

    // renders numeric values to root innerHTML
    renderNumber(number)
    {
        this.root.innerHTML = number
    }

    // renders an object to root attributes or attaches events
    renderObject(object)
    {
        for (const key in object) {
            if(typeof object[key] == 'function'){
                this.addEvent(key, object[key])
            } else {
                this.root.setAttribute(key, object[key]);
            }
        }
    }

    // adds an event to the root element
    addEvent(key, fn)
    {
        if(this.root.attachEvent){
            this.root.attachEvent(key, fn);
        } else {
            this.root.addEventListener(key, fn);
        }
        return this
    }

    // remove an event from the root element
    removeEvent(key, fn)
    {
        if(this.root.attachEvent){
            this.root.detachEvent(key, fn);
        } else {
            this.root.removeEventListener(key, fn);
        }
        return this
    }

    // sets the innerHTML of the root element
    setHTML(html)
    {
        this.root.innerHTML = html
        return this
    }

    // returns the root element
    getRoot()
    {
        return this.root
    }

    // adds root to the bottom of element
    add(element)
    {
        if(!element) return this
        if(element.getRoot){
            element.getRoot().appendChild(this.root)
        } else {
            element.appendChild(this.root)
        }
        return this
    }

    remove()
    {
        this.root.remove()
        return this
    }

    // adds root to the top of element
    top(element)
    {
        if(!element) return this
        if(element.getRoot !== undefined){
            element.getRoot().prepend(this.root)
        } else {
            element.prepend(this.root)
        }
        return this
    }

    // adds root before the element
    before(element, reference)
    {
        if(!element) return this
        if(element.getRoot !== undefined){
            element.getRoot().insertBefore(this.root, reference.getRoot())
        } else {
            element.insertBefore(this.root, reference.getRoot())
        }
        return this
    }

    // adds root after the element
    after(element)
    {
        if(!element) return this
        if(element.getRoot !== undefined){
            element.getRoot().after(this.root)
        } else {
            element.insertAfter(this.root)
        }
        return this
    }

    // remove a class name from the root element
    addClass(className)
    {
        let classList = this.root.className.split(' ')
        classList.push(className)
        this.root.className = classList.join(' ')
        return this
    }

    // remove a class name from the root element
    removeClass(className)
    {
        let classList = this.root.className.split(' ').filter((item) => {
            return item !== className
        })
        this.root.className = classList.join(' ')
        return this
    }
}