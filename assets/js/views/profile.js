import { Element } from "../Element.js";
import { AccountForm } from "../components/AccountForm.js";
import { View } from "./View.js";
import CaseNav from "./navs/CaseNav.js";

export default class Profile extends View
{
    constructor(app, props)
    {
        super(app, props)
        new Element('h3', 'Account').add(this.root)

        new AccountForm(this.app).add(this.root)
    }

    nav(template)
    {
        new CaseNav(this.app, template).add(template.nav)
    }
}