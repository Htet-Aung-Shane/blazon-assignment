from odoo import fields, models, api, _
from datetime import datetime

class InheritPartner(models.Model):
    _inherit = 'res.partner'
    dob = fields.Date("DOB")
    current_date = fields.Date("Current Date",compute="_compute_current_date",store=True,precompute=True)

    @api.depends('dob')
    def _compute_current_date(self):
        for partner in self:
            partner.current_date = fields.Date.today()
