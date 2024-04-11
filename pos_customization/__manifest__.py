{
    "name": "POS Customization",
    "description": "POS Customization Module Developed By Htet Aung Shane",
    "depends": [
        "base",
        "contacts",
        "point_of_sale",
        "mail",
    ],
    "category": "Customizations",
    "author": "Htet Aung Shane",
    "license": "OPL-1",
    "installable": True,
    "auto_install": False,
    "application": True,
    "data": [
        'security/ir.model.access.csv',
        "views/res_partner_ext.xml",
        "views/res_config_ext.xml",
    ],
    'assets': {
   'point_of_sale._assets_pos': [
       'pos_customization/static/src/xml/**/*',
   ],
},
}
