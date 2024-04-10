from odoo import fields, models, api, _


class InheritPartner(models.Model):
    _inherit = 'res.partner'
    dob = fields.Date("DOB")