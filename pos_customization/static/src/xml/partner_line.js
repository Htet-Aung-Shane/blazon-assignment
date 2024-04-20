/** @odoo-module */

import { usePos } from "@point_of_sale/app/store/pos_hook";
import { PartnerLine } from "@point_of_sale/app/screens/partner_list/partner_line/partner_line";
import { patch } from "@web/core/utils/patch";

patch(PartnerLine.prototype, {
    setup() {
        super.setup(...arguments);
        this.pos = usePos();
    },
 
    get dobClass() {
        console.log('reach>>')
        var dob = this.props.partner.dob
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
        return dob === currentDate ? 'dob-red' : 'dob-blue';
    }
});