import { Chat } from "../Chat.js";
import { Element } from "../Element.js";
import { View } from "./View.js";
import ExternalNav from "./navs/ExternalNav.js";

export default class Home extends View
{
    constructor(app, props)
    {
        super(app, props)
        this.chat = new Chat(app).add(this.root)
    }

    nav(template)
    {
        new ExternalNav(this.app, this.chat, template).add(template.nav)
    }
}