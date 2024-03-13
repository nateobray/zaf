import { Element } from "../Element.js";
import { Permission } from "../models/Permission.js";
import { Session } from "../models/Session.js";

export class Template
{
    session = new Session('Template')
    menuIsOpen = false

    constructor(app, body, props)
    {
        this.app = app

        this.header = new Element('div', {class: 'header'}).add(body)
        this.nav = new Element('div', {class: 'nav'}).add(body)
        this.body = body

        this.renderHeader()
        this.enableMenu()
    }

    async renderHeader()
    {
        const menu = new Element('div', {class: 'menu'}).add(this.header)
        new Element('img', {src: 'assets/images/zaf-logo.png', alt: 'ZAF Logo', class: 'logo'}).add(this.header)
        new Element('div', 'BETA', {class: 'beta'}).add(this.header)

        this.setAccount()

        // menu btn
        this.menuBtn = new Element('button', '<i class="fa-solid fa-bars"></i>', {class: 'menu-btn', tabindex: 1000}).add(menu)
        new Element('a', '<i class="fa-solid fa-phone fa-lg"></i> &nbsp; <span class="phone-action">801-346-0080</span>', {href: 'tel:801-346-0080'}).add(menu)

        const response = await this.app.fetch('/account/getProgress/')

        const completedSteps = []
        response.data.forEach( step => {
            completedSteps.push(step.customer_case_progress_type_id)
        })

        let percent = ((response.data.length/6) * 100).toFixed(0)
        if(percent > 100) percent = 100

        this.progress = new Element('div', 'Progress', {class: 'progress'}).add(this.header)
        this.progressBar = new Element('div', {class: 'bar'}).add(this.progress)
        this.progressBarStatus = new Element('div', {class: 'status', style: "width: " + percent + "%"}).add(this.progressBar)
        this.pullDownBtn = new Element('div', '<i class="fa-solid fa-grip-lines"></i>', {class: 'progress-pull-down-btn', mousedown: this.clickProgressBtn.bind(this)}).add(this.progress)

        this.progressList = new Element('div', {class: 'progress-list'}).add(this.progress)

        if(!completedSteps.includes(6)){
            new Element('h3', "Steps to Build Your Case", {class: 'grid-span-2'}).add(this.progressList)
            new Element('div', (completedSteps.includes(1))?'<i class="fa-solid fa-circle-check success"></i>':'<i class="fa-regular fa-circle"></i>', {class: 'progress-list-icon'}).add(this.progressList)
            new Element('div', 'Injury Information', {class: 'progress-list-content'}).add(this.progressList)

            new Element('div', (completedSteps.includes(2))?'<i class="fa-solid fa-circle-check success"></i>':'<i class="fa-regular fa-circle"></i>', {class: 'progress-list-icon'}).add(this.progressList)
            new Element('div', 'Treatment Information', {class: 'progress-list-content'}).add(this.progressList)

            new Element('div', (completedSteps.includes(3))?'<i class="fa-solid fa-circle-check success"></i>':'<i class="fa-regular fa-circle"></i>', {class: 'progress-list-icon'}).add(this.progressList)
            new Element('div', 'Losses & Damages Information', {class: 'progress-list-content'}).add(this.progressList)

            new Element('div', (completedSteps.includes(4))?'<i class="fa-solid fa-circle-check success"></i>':'<i class="fa-regular fa-circle"></i>', {class: 'progress-list-icon'}).add(this.progressList)
            new Element('div', 'Accident Information', {class: 'progress-list-content'}).add(this.progressList)

            new Element('div', (completedSteps.includes(5))?'<i class="fa-solid fa-circle-check success"></i>':'<i class="fa-regular fa-circle"></i>', {class: 'progress-list-icon'}).add(this.progressList)
            new Element('div', 'Case Review', {class: 'progress-list-content'}).add(this.progressList)

            new Element('div', (completedSteps.includes(6))?'<i class="fa-solid fa-circle-check success"></i>':'<i class="fa-regular fa-circle"></i>', {class: 'progress-list-icon'}).add(this.progressList)
            new Element('div', 'Case Summary Letter', {class: 'progress-list-content'}).add(this.progressList)
        } else if(!completedSteps.includes(7)) {
            
            const caseSummary = new Element('div', {class: 'progress-case-summary grid-span-2'}).add(this.progressList)
            new Element('h3', "Case Summary Letter").add(caseSummary)
            new Element('p', 'We currently generating and reviewing your case summary letter.  When it\'s complete we\'ll notify you so you can download and submit your claim.').add(caseSummary)
            new Element('i', {class: 'fa-solid fa-file-lines fa-beat-fade fa-3x'}).add(caseSummary)
        } else {
            const caseSummary = new Element('div', {class: 'progress-case-summary grid-span-2'}).add(this.progressList)
            new Element('h3', "Case Summary Letter").add(caseSummary)
            new Element('p', 'Click "Download Case Summary" to download a copy of your case summary that has been reviewed by one of our lawyers.').add(caseSummary)
            //new Element('i', {class: 'fa-solid fa-file-lines fa-3x'}).add(caseSummary)
            new Element('br').add(caseSummary)
            new Element('button', '<i class="fa-solid fa-file-lines"></i> Download Case Summary', {class: 'btn btn-primary'}).add(caseSummary)
        }
    }

    async clickProgressBtn(e)
    {
        e.preventDefault()
        e.stopPropagation()
        this.progress.toggleClass('open')
    }

    async logout()
    {
        window.location = '/account/logout/'
    }

    enableMenu()
    {
        document.addEventListener('click', (event) => {
            if (!this.nav.getRoot().contains(event.target) && !this.menuBtn.getRoot().contains(event.target)) {
                this.closeMenu()
            } else {
                this.openMenu()
            }
        });
    }

    openMenu()
    {
        this.open = true
        this.nav.addClass('open')
    }

    closeMenu()
    {
        this.open = false
        this.nav.removeClass('open')
    }

    navigate(path, e)
    {
        e.preventDefault()
        this.app.route(path)

        setTimeout(() => {
            if(this.closeMenu) this.closeMenu()
        }, 100);
    }

    setAccount(forceSet)
    {
        if(this.account) this.account.remove()
        console.log('session', this.session.get('user'))
        if(this.session.get('user') || forceSet){
            this.account = new Element('div', 'Logout &nbsp; <i class="fa-solid fa-circle-user fa-xl"></i>', {class: 'account', click: this.logout.bind(this)}).add(this.header)
        } else {
            this.account = new Element('div', 'Login &nbsp; <i class="fa-solid fa-circle-user fa-xl"></i>', {class: 'account', click: this.navigate.bind(this, '/login')}).add(this.header)
        }
    }

    clear()
    {
        
    }
}