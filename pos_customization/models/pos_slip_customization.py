from odoo import fields, models, api, _

class InheritPOSConfiguration(models.TransientModel):
    _inherit = 'res.config.settings'
    slip_logo = fields.Binary()