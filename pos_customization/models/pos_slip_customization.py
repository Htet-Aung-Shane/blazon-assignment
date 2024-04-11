from odoo import fields, models, api, _

class InheritPOSConfiguration(models.TransientModel):
    _inherit = 'res.config.settings'
    slip_logo = fields.Binary()

    def set_values(self):
        super(InheritPOSConfiguration, self).set_values()
        # Update the slip logo image in the settings
        self.env['ir.config_parameter'].set_param('pos_customization.slip_logo', self.slip_logo)

    @api.model
    def get_values(self):
        res = super(InheritPOSConfiguration, self).get_values()
        # Retrieve the slip logo image from the settings
        slip_logo = self.env['ir.config_parameter'].sudo().get_param('pos_customization.slip_logo')
        res.update(slip_logo=slip_logo)
        return res

class POSImage(models.Model):
    _name = "blazon.pos.image"

    slip_logo = fields.Binary()