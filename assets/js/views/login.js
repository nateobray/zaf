import { Element } from "../Element.js";
import { View } from "./View.js";
import { LoginForm} from "../components/LoginForm.js"
import ExternalNav from "./navs/ExternalNav.js";

export default class Login extends View
{
    constructor(app, props)
    {
        super(app, props)

        new LoginForm(app).add(this.root)

    }

    nav(template)
    {
        new ExternalNav(this.app, null, template).add(template.nav)
    }
}