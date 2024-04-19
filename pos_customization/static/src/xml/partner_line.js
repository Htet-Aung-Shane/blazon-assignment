/** @odoo-module */

import { Component } from "@odoo/owl";

export class PartnerLine extends Component {
    static template = "point_of_sale.PartnerLine";

    get highlight() {
        return this._isPartnerSelected ? "highlight active" : "";
    }
    get _isPartnerSelected() {
        return this.props.partner === this.props.selectedPartner;
    }
    get dobClass() {
        console.log('reach>>')
        dob = this.props.partner.dob
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
        // return dob === currentDate ? 'dob-red' : 'dob-blue';
        return 'custom-partner'
    }
}
