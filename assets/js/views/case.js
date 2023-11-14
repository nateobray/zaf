import { Chat } from "../Chat.js";
import { Element } from "../Element.js";
import { View } from "./View.js";
import CaseNav from "./navs/CaseNav.js";
import { CHAT_TYPE } from "../models/ChatType.js";

export default class Case extends View
{
    constructor(app, props)
    {
        super(app, props)
        this.chat = new Chat(app, {type: CHAT_TYPE.GENERIC}).add(this.root)  
    }

    nav(template)
    {
        this.app.caseNav = new CaseNav(this.app, template).add(template.nav)
    }
}