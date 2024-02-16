import { Element } from "../Element.js";
import { Session } from "../models/Session.js";
import { View } from "./View.js";
import ExternalNav from "./navs/ExternalNav.js";

export default class Clear extends View
{
    session = new Session()
    constructor(app, props)
    {
        super(app, props)
        document.cookie = "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.session.clear()
    }

    nav(template)
    {
        new ExternalNav(this.app, this.chat, template).add(template.nav)
    }
}