{
    'name': 'POS Customization',
    'description': 'POS Customization Module Developed By Htet Aung Shane',
    "depends": [
        "base",
        "contacts",
        "mail",
    ],
    'category': 'Customizations',
    'author': 'Htet Aung Shane',
    "license": "OPL-1",
    'installable': True,
    'auto_install': False,
    'application': True,
    "data": [
        'views/res_partner_ext.xml',
    ],
    'assets':{
        'web.assets_backend': [
            "/pos_customization/static/src/scss/custom.scss",
        ]
    }
}
