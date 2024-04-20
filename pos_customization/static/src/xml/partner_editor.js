/** @odoo-module */
import { PartnerDetailsEdit } from "@point_of_sale/app/screens/partner_list/partner_editor/partner_editor";
import { patch } from "@web/core/utils/patch";

patch(PartnerDetailsEdit.prototype, {
    // Override the setup method to initialize the DOB field
    setup() {
        // Call the original setup method and store the result
        const res = super.setup(...arguments);
        
        // Set the DOB field value from props
        this.changes.dob = this.props.partner.dob;

        // Return the original result
        return res;
    },
});
