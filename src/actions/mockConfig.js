const data = {
    "_order": { "business_analytics": 1, "company_profile": 2},
    "business_analytics": {
        "display": "Business Profile",
        "_order":{ "dashboard": 1, "order": 2, "invoice": 3, "opportunities": 4, "trade_relation": 5 , "quality": 6 },
        "dashboard": {
            "display":"Dashboard",
            "icon": "vector",
            "widgets": {
                "_order": { "chart_1": 1},
                "chart_1":{
                    "type": "chart",
                    "chart_type": "line",
                    "width": "30%",
                    "id": "chart_1",
                    "api":"",
                    "title":"Chart 1",
                    "dropdown":{
                        "key": "compared_against",
                        "api": "",
                        "id": "chart_1_dropdown",
                        "_order": {},
                        "default": {
                            "_order": { "key_1": 1},
                        }
                    }
                }
            }
        },
        "order": {
            "display": "Order",
            "icon": "orders"
        },
        "invoice": {
            "display": "Invoice",
            "icon": "invoice"
        },
        "opportunities": {
            "display": "Opportunities",
            "icon": "opportunities"
        },
        "trade_relation": {
            "display": "Trade Relationships",
            "icon": "relation"
        },
        "quality": {
            "display": "Quality",
            "icon": "quality"
        }
    },
    "company_profile": {
        "display": "Company Profile",
        "_order": {"overview": 1, "company": 2, "contact": 3, "certificate": 4, "document": 5, "miscellaneous": 6},
        "overview": {
            "display":"Overview",
            "icon": "vector"
        },
        "company": {
            "display":"Company",
            "icon": "company"
        },
        "contact": {
            "display":"Contact",
            "icon": "contact"
        },
        "certificate": {
            "display":"Certificate",
            "icon": "certificate"
        },
        "document": {
            "display":"Documents",
            "icon": "document"
        },
        "miscellaneous": {
            "display":"Miscellaneous",
            "icon": "miscellaneous"
        }
    }
}
export default data;