import { Element } from "../Element.js";
import { View } from "./View.js";
import ExternalNav from "./navs/ExternalNav.js";

export default class Services extends View
{
    constructor(app, props)
    {
        super(app, props)
        new Element('h3', 'Services').add(this.root)
    }

    nav(template)
    {
        new ExternalNav(this.app, template).add(template.nav)
    }
}