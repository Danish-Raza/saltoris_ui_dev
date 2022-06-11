const data = {
    "_order": { "business_analytics": 1, "company_profile": 2},
    "business_analytics": {
        "display": "Business Profile",
        "_order":{ "dashboard": 1, "order": 2, "invoice": 3, "opportunities": 4, "trade_relation": 5 , "quality": 6 },
        "dashboard": {
            "display":"Dashboard",
            "icon": "vector",
            "widgets": {

                "_order": {"overview": 1, "chart_1": 2, "chart_2": 3, "user_feedback": 4, "opportunities_table": 5, "invoice_table": 6},
                "overview":{
                    "type":"overview",
                    "api": "",
                    "display":"Overview",
                    "_order":{
                        "title": 1,
                        "gain_difference": 2,
                        "compared_against": 3
                    },
                    "title": {
                        "display": "{title}",
                    },
                    "gain_difference": {
                        "multiple": {
                            "_order":{
                                "gain": 1,
                                "difference": 2
                            },
                            "gain": {
                                "is_currency": "$",
                                "display": "{gain}"
                            },
                            "difference": {
                                "is_percent": true,
                                "display": "{difference}",
                                "template": "arrow-up-down"
                            }
                        }
                    },
                    "compared_against": {
                        "display": "Compared to ({previous_score}) last year",
                    }

                },
                "chart_1":{
                    "type": "chart",
                    "chart_type": "line",
                    "width": "33%",
                    "id": "chart_1",
                    "api":"",
                    "title":"Chart 1",
                    "xy_value": "analysis",
                    "data_template": "convertToList",
                    "x_axis_settings":{
                        "x_axis": "date",
                        "format": "MMMM"
                    },
                    "y_axis_settings":{
                        "y_axis": "score",
                        "is_currency":"$",
                    },
                    "dropdown":{
                        "key": "compared_against",
                        "api": "",
                        "id": "chart_1_dropdown",
                        "_order": {},
                        "default": {
                            "_order": { "key_1": 1},
                        }
                    }
                },
                "chart_2":{
                    "type": "chart",
                    "chart_type": "line",
                    "width": "33%",
                    "id": "chart_1",
                    "api":"",
                    "title":"Chart 2",
                    "xy_value": "analysis",
                    "data_template": "convertToList",
                    "x_axis_settings":{
                        "x_axis": "date",
                        "format": "MMMM"
                    },
                    "y_axis_settings":{
                        "y_axis": "score",
                        "is_currency":"$",
                    },
                    "dropdown":{
                        "key": "compared_against",
                        "api": "",
                        "id": "chart_1_dropdown",
                        "_order": {},
                        "default": {
                            "_order": { "key_1": 1},
                        }
                    }
                },
                "user_feedback": {
                    "type": "card",
                    "api": "",
                    "width": "30%",
                    "display": "Activity Feed",
                    "_order": {
                        "image": 1,
                        "name": 2,
                        "short_text": 3,
                        "long_text": 4
                    },
                    "image": {
                        "type": "image",
                        "position":"left",
                        "display": ""
                    },
                    "name":{
                        "display": "{name}"
                    },
                    "short_text":{
                        "display": "{short_text}"
                    },
                    "long_text":{
                        "display": "{long_text}"
                    }
                },
                "opportunities_table":{
                    "id": "opportunities_table",
                    "type": "table",
                    "width": "48.2%",
                    "display": "Opportunities",
                    "api":  "",
                    "columns":{
                        "_order":{
                            "name": 1,
                            "requirement": 2,
                            "due_date": 3,
                            "value": 4
                        },
                        "name": {
                            "display": "Name",
                            "type":"string",
                            "width": "",
                            "align": "left"
                        },
                        "requirement": {
                            "display": "Requirement",
                            "type":"string",
                            "width": "",
                            "align": "center"
                        },
                        "due_date": {
                            "display": "Due Date",
                            "type":"date",
                            "format": 'MMM Do YYYY, h:mm a',
                            "width": "",
                            "color":"#FC5A5A",
                            "align": "left"
                        },
                        "value": {
                            "display": "Value",
                            "type":"string",
                            "width": "",
                            "align": "center"
                        }
                    }
                },
                "invoice_table":{
                    "id": "opportunities_table",
                    "type": "table",
                    "width": "48.2%",
                    "display": "Invoice Details",
                    "api":  "",
                    "columns":{
                        "_order":{
                            "name": 1,
                            "invoice_no": 2,
                            "due_date": 3,
                            "value": 4,
                            "status": 5
                        },
                        "name": {
                            "display": "Buyer",
                            "type":"string",
                            "width": "",
                            "align": "left"
                        },
                        "invoice_no": {
                            "display": "Invoice No.",
                            "type":"string",
                            "width": "",
                            "align": "center"
                        },
                        "due_date": {
                            "display": "Due Date",
                            "type":"date",
                            "format": 'MMM Do YYYY, h:mm a',
                            "width": "",
                            "color":"#FC5A5A",
                            "align": "left"
                        },
                        "value": {
                            "display": "Order Amount",
                            "type":"string",
                            "width": "",
                            "align": "center",
                            "is_currency": "$"
                        },
                        "status": {
                            "display": "Order Amount",
                            "type": "tag",
                            "width": "",
                            "align": "left",
                            "color_mapping":{
                                "Send":"green",
                                "Rejected":"red",
                                "Approved": "blue",
                                "Payments":"#40a9ff"
                            }
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