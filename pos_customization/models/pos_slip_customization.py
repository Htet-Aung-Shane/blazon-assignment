from odoo import fields, models, api, _

class InheritPOSConfiguration(models.TransientModel):
    _inherit = 'res.config.settings'
    slip_logo = fields.Binary()

    def set_values(self):
        super(InheritPOSConfiguration, self).set_values()
        # Update the slip logo image in the settings
        logo_record = self.env['blazon.pos.image'].search([], limit=1)
        if not logo_record:
            logo_record = self.env['blazon.pos.image'].create({'slip_logo': self.slip_logo})
        else:
            logo_record.write({'slip_logo': self.slip_logo})

    @api.model
    def get_values(self):
        res = super(InheritPOSConfiguration, self).get_values()
        # Retrieve the slip logo image from the settings
        logo_record = self.env['blazon.pos.image'].search([], limit=1)
        res.update(slip_logo=logo_record.slip_logo if logo_record else False)
        return res

class POSImage(models.Model):
    _name = "blazon.pos.image"

    slip_logo = fields.Binary()