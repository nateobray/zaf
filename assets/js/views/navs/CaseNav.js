import { Element } from "../../Element.js"
import { Accident } from "../components/Accident.js"
import { Injuries } from "../components/Injuries.js"
import { PersonalInfo } from "../components/PersonalInfo.js"
import { PropertyDamage } from "../components/PropertyDamage.js"
import { Treatments } from "../components/Treatments.js"
import DataAccident from "../data/DataAccident.js"
import DataInjuries from "../data/DataInjuries.js"
import DataPersonalInfo from "../data/DataPersonalInfo.js"
import DataPropertyDamage from "../data/DataPropertyDamage.js"

export default class CaseNav extends Element
{
    constructor(app, template)
    {
        super('div', {class: 'my-case-nav'})
        this.app = app
        this.template = template
        this.personalData = new DataPersonalInfo(this.app)
        this.accidentData = new DataAccident(this.app)
        this.propertyDamageData = new DataPropertyDamage(this.app)
        this.injuryData = new DataInjuries(this.app)
        this.render()
        
    }

    async render()
    {
        this.caseProgress = new Element('div', {class: 'case-progress'}).add(this.root)
        new Element('h4', 'My Team').add(this.caseProgress)

        this.genericAssistant = new Element('div', '&nbsp; Albert', {class: 'progress-item active', click: function(){}}).add(this.caseProgress)
        this.injuryAssistant = new Element('div', '&nbsp; Injury Emily', {class: 'progress-item', click: function(){}}).add(this.caseProgress)
        this.treatmentAssistant = new Element('div', '&nbsp; Treatment Traci ', {class: 'progress-item', click: function(){}}).add(this.caseProgress)
        this.damagesAssistant = new Element('div', '&nbsp; Loss Tracker Logan ', {class: 'progress-item', click: function(){}}).add(this.caseProgress)
        this.accidentAssistant = new Element('div', '&nbsp; Accident Info Ava', {class: 'progress-item', click: function(){}}).add(this.caseProgress)
        this.settlementAssistant = new Element('div', '&nbsp; Tally ', {class: 'progress-item', click: function(){}}).add(this.caseProgress)

        this.badge = new Element('img', {src: '/assets/images/sandbox-authorized-entities-badge-2023-inverted.png',  width: 150}).add(this.root)
        this.regulatory = new Element('p', 'This service is provided by an entity that is not a traditional legal provider. This entity is owned/managed (fully or partially) by nonlawyers who are not subject to the same rules as lawyers.', {class: 'regulatory-text'}).add(this.root)
        
    }

    async activateAssistant(chat_type_id)
    {
        this.genericAssistant.removeClass('active')
        this.accidentAssistant.removeClass('active')
        this.injuryAssistant.removeClass('active')
        this.treatmentAssistant.removeClass('active')
        switch(chat_type_id){
            case 3:
                this.genericAssistant.addClass('active');
                break;
            case 4:
                this.accidentAssistant.addClass('active')
                break;
            case 5:
                this.injuryAssistant.addClass('active')
                break;
            case 6:
                this.treatmentAssistant.addClass('active')
                break;
            case 7:
                this.damagesAssistant.addClass('active')
                break;
            case 10:
                this.settlementAssistant.addClass('active')
                break;
        }
    }

    async getPersonalInfo()
    {
        this.user = await this.personalData.get()
        console.log(this.user)
        this.personalInfo.setHTML('<i class="fa-regular fa-circle"></i> &nbsp;Personal Info')

        if(this.user.user_first_name && this.user.user_last_name && this.user.user_email){
            this.personalInfo.setHTML('<i class="fa-solid fa-circle-check"></i> &nbsp;Personal Info')
        }
        
    }

    async getAccidentInfo()
    {
        this.accident = await this.accidentData.get()
        this.accidentInfo.setHTML('<i class="fa-regular fa-circle"></i> &nbsp;Accident Info')
        if(
            this.accident.accident_type_id &&
            this.accident.accident_datetime &&
            this.accident.accident_desc &&
            this.accident.accident_location &&
            this.accident.accident_at_fault_party
        ){
            this.accidentInfo.setHTML('<i class="fa-solid fa-circle-check success"></i> &nbsp;Accident Info')
        }
    }

    async getPropertyDamage()
    {
        this.propertyDamage = await this.propertyDamageData.get(this.accident.accident_id)
        this.propertyDamageInfo.setHTML('<i class="fa-regular fa-circle"></i> &nbsp;Damages')
        if(
            this.propertyDamage.length > 0
        ){
            this.propertyDamageInfo.setHTML('<i class="fa-solid fa-circle-check success"></i> &nbsp;Damages')
        }
    }

    async getInjuriesAndTreatments()
    {
        this.injuries = await this.injuryData.get(this.accident.accident_id)
        //this.treatments = await this.treatmentsData.get(this.accident.accident_id)
        this.treatments.setHTML('<i class="fa-regular fa-circle"></i> &nbsp; Treatments')
        if(
            this.injuries.length > 0
        ){
            this.treatments.setHTML('<i class="fa-solid fa-circle-check success"></i> &nbsp; Treatments')
        }
    }

    async openPersonalInfo()
    {
        new PersonalInfo(this.app, {user: this.user})
    }

    async openAccident()
    {
        new Accident(this.app, {accident: this.accident})
    }

    async openPropertyDamage()
    {
        new PropertyDamage(this.app, {propertyDamage: this.propertyDamage})
    }

    async openInjuries()
    {
        new Injuries(this.app, {injuries: this.injuries})
    }

    async openTreatments()
    {
        new Treatments(this.app)
    }

}