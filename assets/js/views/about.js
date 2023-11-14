import { Element } from "../Element.js";
import { View } from "./View.js";
import ExternalNav from "./navs/ExternalNav.js";

export default class About extends View
{
    constructor(app, props)
    {
        super(app, props)
        new Element('h3', 'About').add(this.root)
    }

    nav(template)
    {
        new ExternalNav(this.app, template).add(template.nav)
    }
}