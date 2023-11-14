import { Element } from "../../Element.js";
import { Modal } from "../../components/Modal.js";
import { Button } from "../../components/forms/Button.js";
import { Input } from "../../components/forms/Input.js";
import { Text } from "../../components/forms/Text.js";
import { Formatter } from "../../components/models/Formatter.js";
import DataAccident from "../data/DataAccident.js";

export class PropertyDamage extends Element
{
    formatter = new Formatter()
    constructor(app, props)
    {
        super('div', {class: 'Accident'})
        this.props = props
        this.app = app
        this.propertyDamage = props.propertyDamage
        
        this.render()
    }

    async render()
    {
        this.modal = new Modal(this.app, {title: 'Property Damage'}).add(this.root)
        this.modal.open()

        let totalValue = 0
        this.propertyDamage.forEach((damage) => {

            this.component = new Element('div', {class: 'property-damage'}).add(this.modal.body)
            new Element('h4', '<i class="fa-solid fa-car-burst"></i> ' + damage.damage_type[0].property_damage_type).add(this.component)
            
            const defList = new Element('dl').add(this.component)
            new Element('dt', 'Description').add(defList)
            new Element('dd', damage.property_damage_desc).add(defList)

            new Element('dt', 'Est. Value').add(defList)
            new Element('dd', (damage.property_damage_amount_estimated)?this.formatter.dollar(damage.property_damage_amount_estimated):'N/A').add(defList)

            new Element('dt', 'Actual Value').add(defList)
            new Element('dd', (damage.property_damage_amount_actual)?this.formatter.dollar(damage.property_damage_amount_actual):'N/A').add(defList)

            if(damage.property_damage_amount_actual){
                totalValue += Number(damage.property_damage_amount_actual)
            } else if(damage.property_damage_amount_estimated){
                totalValue += Number(damage.property_damage_amount_estimated)
            } else {
                totalValue += 0
            }
            console.log('totalValue', totalValue)
        })


        
        this.modal.footer.addClass('align-center')
        this.modal.footer.addClass('total-modal-footer')
        new Element('div', 'Total Property Damage: <strong>' + this.formatter.dollar(totalValue) + '</strong>', {class: 'align-right'}).add(this.modal.footer)
        
    }

}