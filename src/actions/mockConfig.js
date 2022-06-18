const data = {
    "_order": { "business_analytics": 1, "company_profile": 2},
    "business_analytics": {
        "display": "Business",
        "_order":{ "dashboard": 1, "order": 2, "invoice": 3, "opportunities": 4, "trade_relation": 5 , "quality": 6 },
        "dashboard": {
            "display":"Dashboard",
            "icon": "vector",
            "widgets": {
                "_order": {"overview": 1, "chart_1": 2, "user_feedback": 4, "opportunities_table": 5, "invoice_table": 6},
                "overview":{
                    "type":"overview",
                    "api": "/asd/asda?",
                    "display":"Overview",
                    "id": "overview",
                    "dropdown":{
                        "key": "customer",
                        "api": "",
                        "id": "chart_1_dropdown",
                        "_order": {"Customer 1":1 , "Customer 2": 2, "Customer 3": 3},
                        "Customer 1":{
                            "display":"Customer 1"
                        },
                        "Customer 2":{
                            "display":"Customer 2"
                        },
                        "Customer 3":{
                            "display":"Customer 3"
                        },
                        "search": true,
                        // "default": {
                        //     "_order": { "key_1": 1},
                        // },
                        "placeholder": "Select Customer",
                        "mode":"selec"
                    },
                    "date_range":{
                        "key": "date_range",
                        "api": "",
                        "id": "overview_date_range",
                        "_order": {"7 Days":1 , "30 Days": 2, "90 Days": 3},
                        "7 Days": {
                            "display":"7 Days"
                        },
                        "30 Days": {
                            "display":"30 Days"
                        },
                        "90 Days": {
                            "display":"90 Days"
                        },
                        "search": true,
                        "default": {
                            "_order": { "90 Days": 1},
                        },
                        "placeholder": "Select date range",
                        "mode":"selec"
                    },
                    "_order":{
                        "Invoice": 1,
                        "Opportunities": 2,
                        "Bid": 3,
                        "Payments": 4
                    },
                    "Invoice": {
                        "_order":{
                            "title": 1,
                            "gain_difference": 2,
                            "compared_against": 3
                        },
                        "title": {
                            "display": "{_key}",
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
                        },
                        "mapping_key":"Invoices"
                    },
                    "Opportunities": {
                        "_order":{
                            "title": 1,
                            "gain_difference": 2,
                            "compared_against": 3
                        },
                        "title": {
                            "display": "{_key}",
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
                        },
                        "mapping_key":"Opportunities"
                    },
                    "Bid": {
                        "_order":{
                            "title": 1,
                            "gain_difference": 2,
                            "compared_against": 3
                        },
                        "title": {
                            "display": "{_key}",
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
                        },
                        "mapping_key":"Bid"
                    },
                    "Payments": {
                        "_order":{
                            "title": 1,
                            "gain_difference": 2,
                            "compared_against": 3
                        },
                        "title": {
                            "display": "{_key}",
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
                        },
                        "mapping_key":"Payments"
                    },
                },
                "chart_1":{
                    "type": "chart",
                    "replicate": true,
                    "chart_type": "line",
                    "width": "31%",
                    "id": "chart_1",
                    "api":"",
                    "header_config":{
                        "template":"dropdown-title"
                    },
                    //"title":"Chart 1",
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
                        "_order": {"Payments":2 , "Bid": 1, "Opportunities": 3, "invoive": 4},
                        "Payments":{
                            "display":"Payments"
                        },
                        "Bid":{
                            "display":"Bid"
                        },
                        "Opportunities":{
                            "display":"Opportunities"
                        },
                        "invoive":{
                            "display":"invoive"
                        },
                        "default": {
                            "_order": { "Bid": 1, "Payments": 2},
                        }
                    }
                },
                "chart_2":{
                    "type": "chart",
                    "chart_type": "line",
                    "width": "33%",
                    "id": "chart_2",
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
                        "_order": {"New Invoice":2 , "Old Invoice": 1, "New Parameter": 3},
                        "New Invoice":{
                            "display":"New Invoice"
                        },
                        "Old Invoice":{
                            "display":"Old Invoice"
                        },
                        "New Parameter":{
                            "display":"New Parameter"
                        },
                        "default": {
                            "_order": { "key_1": 1},
                        }
                    }
                },
                "chart_3":{
                    "type": "chart",
                    "chart_type": "line",
                    "width": "33%",
                    "id": "chart_2",
                    "api":"",
                    "title":"Chart 3",
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
                        "_order": {"New Invoice":2 , "Old Invoice": 1, "New Parameter": 3},
                        "New Invoice":{
                            "display":"New Invoice"
                        },
                        "Old Invoice":{
                            "display":"Old Invoice"
                        },
                        "New Parameter":{
                            "display":"New Parameter"
                        },
                        "default": {
                            "_order": { "key_1": 1},
                        }
                    }
                },
                "user_feedback": {
                    "type": "card",
                    "api": "",
                    "width": "30%",
                    "id":"user_feedback",
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
                    "id": "invoice_table",
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
            "icon": "vector",
            "widgets": {
                "_order": {"form_group": 1},
                "form_group":{
                    "type":"form-group",
                    "width":"100%",
                    "_order": {"form_1": 1, "form_2": 2, "form_3": 3},
                    "api": "/asd/asda?",
                    "form_1":{
                        "initial_disabled": true,
                        "title":"Company Profile",
                        "_order": {"company_name": 1, "other_name": 2,"elit_network_id": 3,"corporate_website": 4,"elit_public_profile": 5, "description": 6},
                        "company_name":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "company_name",
                            "label": "Company (legal) name",
                            "flex": true,
                            "required": true
                        },
                        "other_name":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "other_name",
                            "label": "Other (legal) name",
                            "flex": true,
                            "required": true
                        },
                        "elit_network_id":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "elit_network_id",
                            "label": "ELIT Network ID",
                            "flex": true,
                            "required": true
                        },
                        "corporate_website":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "corporate_website",
                            "label": "Corporate Website",
                            "flex": true,
                            "required": true
                        },
                        "elit_public_profile":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "elit_public_profile",
                            "label": "Elit Public Profile",
                            "flex": true,
                            "required": true
                        },
                        "description":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"100%",
                            "key": "description",
                            "label": "Description",
                            "flex": true,
                            "required": true
                        }
                    },
                    "form_2":{
                        "title":"Address",
                        "initial_disabled": true,
                        "_order": {"address_1": 1, "address_2": 2,"country": 3,"state": 4,"district": 5, "city": 6, "zipcode": 7},
                        "address_1":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "address_1",
                            "label": "Address Line 1",
                            "flex": true,
                            "required": true
                        },
                        "address_2":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "address_2",
                            "label": "Address Line 2",
                            "flex": true,
                            "required": true
                        },
                        "country":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "country",
                            "label": "Country",
                            "flex": true,
                            "required": true
                        },
                        "state":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "state",
                            "label": "State",
                            "flex": true,
                            "required": true
                        },
                        "district":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "district",
                            "label": "District",
                            "flex": true,
                            "required": true
                        },
                        "city":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "city",
                            "label": "City",
                            "flex": true,
                            "required": true
                        },
                        "zipcode":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "zipcode",
                            "label": "Zip Code",
                            "flex": true,
                            "required": true
                        }
                    },
                    "form_3": {
                        "title":"Specialization",
                        "initial_disabled": true,
                        "_order": {"product_category": 1, "service_category": 2,"industry_type": 3,"industry_vertical": 4,"Keyword": 5},
                        "product_category":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "product_category",
                            "label": "Product Category",
                            "flex": true,
                            "required": true
                        },
                        "service_category":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "service_category",
                            "label": "Service Category",
                            "flex": true,
                            "required": true
                        },
                        "industry_type":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "industry_type",
                            "label": "Industry Type",
                            "flex": true,
                            "required": true
                        },
                        "industry_vertical":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "industry_vertical",
                            "label": "Industry Vertical",
                            "flex": true,
                            "required": true
                        },
                        "Keyword":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Keyword",
                            "label": "Keyword",
                            "flex": true,
                            "required": true
                        },
                    },
                    "submit": {
                        "api": "",
                        "display": "Save"
                    }
                }
            }
        },
        "company": {
            "display":"Company",
            "icon": "company",
            "widgets": {
                "_order": {"form_group": 1},
                "form_group":{
                    "type":"form-group",
                    "width":"100%",
                    "_order": {"form_3": 3, "form_2":2,"form_1": 1},
                    "api": "/asd/asda?",
                    "form_1":{
                        "initial_disabled": false,
                        "title":"Business Insight",
                        "_order": {"Company Year (Est.)": 1, "Business Type": 2,"Number of Employees": 3,"Revenue": 4,"Exchange": 5, "Stock Symbol": 6, "HQ Location": 7, "Regional HQ Address":8, "Manufacturing Plant Location":9},
                        "Company Year (Est.)":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Company Year (Est.)",
                            "label": "Company Year (Est.)",
                            "flex": true,
                            "required": true
                        },
                        "Business Type":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Business Type",
                            "label": "Business Type",
                            "flex": true,
                            "required": true
                        },
                        "Number of Employees":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Number of Employees",
                            "label": "Number of Employees",
                            "flex": true,
                            "required": true
                        },
                        "Revenue":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Revenue",
                            "label": "Revenue",
                            "flex": true,
                            "required": true
                        },
                        "Exchange":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Exchange",
                            "label": "Exchange",
                            "flex": true,
                            "required": true
                        },
                        "HQ Location":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"100%",
                            "key": "HQ Location",
                            "label": "HQ Location",
                            "flex": true,
                            "required": true
                        },
                        "Regional HQ Address":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"100%",
                            "key": "Regional HQ Address",
                            "label": "Regional HQ Address",
                            "flex": true,
                            "required": true
                        },
                        "Manufacturing Plant Location":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"100%",
                            "key": "Manufacturing Plant Location",
                            "label": "Manufacturing Plant Location",
                            "flex": true,
                            "required": true
                        },
                        "Stock Symbol":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Stock Symbol",
                            "label": "Stock Symbol",
                            "flex": true,
                            "required": true
                        }
                    },
                    "form_2":{
                        "title":"Financial",
                        "initial_disabled": false,
                        "_order": {"Supplier Legal Form": 1, "Supplier Identifier ID": 2,"Supplier Credentials": 3,"D-U-N-S® Number": 4,"Global Location Number (GLN Code)": 5},
                        "Supplier Legal Form":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Supplier Legal Form",
                            "label": "Supplier Legal Form",
                            "flex": true,
                            "required": true
                        },
                        "Supplier Identifier ID":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Supplier Identifier ID",
                            "label": "Supplier Identifier ID",
                            "flex": true,
                            "required": true
                        },
                        "Supplier Credentials":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Supplier Credentials",
                            "label": "Supplier Credentials",
                            "flex": true,
                            "required": true
                        },
                        "D-U-N-S® Number":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "D-U-N-S® Number",
                            "label": "D-U-N-S® Number",
                            "flex": true,
                            "required": true
                        },
                        "Global Location Number (GLN Code)":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"100%",
                            "key": "Global Location Number (GLN Code)",
                            "label": "Global Location Number (GLN Code)",
                            "flex": true,
                            "required": true
                        }
                    },
                    "form_3": {
                        "title":"Tax Information",
                        "initial_disabled": false,
                        "_order": { "tax_category":1,"tax_classification":2, "tax_type": 3,  "tax_clear_id": 4,"pan_no": 5,"tin_no": 6, "tax_state_id": 7, "tax_reg_id": 8, "vat_no": 9},
                        "tax_category": {
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "tax_category",
                            "label": "Tax Category",
                            "flex": true,
                            "required": true
                        },
                        "tax_classification": {
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "tax_classification",
                            "label": "Tax Classification",
                            "flex": true,
                            "required": true
                        },
                        "tax_type":{
                            "type": "text",
                            "placeholder": "Type here",
                            // "checkbox_label":"Taxation Certificate",
                            "width":"100%",
                            "key": "tax_type",
                            "label": "Tax Type",
                            "flex": true,
                            "required": true
                        },
                        "tax_clear_id":{
                            "type": "file",
                            "placeholder": "Upload Documents",
                            "checkbox_label":"Taxation Certificate",
                            "width":"100%",
                            "key": "tax_clear_id",
                            "label": "Tax Clearance ID",
                            "flex": true,
                            "required": true
                        },
                        
                        "pan_no":{
                            "type": "file",
                            "placeholder": "Upload Documents",
                            "checkbox_label":"PAN Registered",
                            "width":"100%",
                            "key": "pan_no",
                            "label": "PAN No.",
                            "flex": true,
                            "required": true
                        },
                        "tin_no":{
                            "type": "file",
                            "placeholder": "Upload Documents",
                            "checkbox_label":"TIN Registered",
                            "width":"100%",
                            "key": "tin_no",
                            "label": "TIN No.",
                            "flex": true,
                            "required": true
                        },
                        "tax_state_id": {
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "tax_state_id",
                            "label": "Taxation State ID",
                            "flex": true,
                            "required": true
                        },
                        "tax_reg_id": {
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "tax_reg_id",
                            "label": "Tax Regional ID",
                            "flex": true,
                            "required": true
                        },
                        "vat_no":{
                            "type": "file",
                            "placeholder": "Upload Documents",
                            "checkbox_label":"VAT Registered",
                            "width":"100%",
                            "key": "vat_no",
                            "label": "VAT No.",
                            "flex": true,
                            "required": true
                        }
                    },
                    "submit": {
                        "api": "",
                        "display": "Save"
                    }
                }
            }
        },
        "contact": {
            "display":"Contact",
            "icon": "contact",
            "widgets": {
                "_order": {"form_group": 1},
                "form_group":{
                    "type":"form-group",
                    "width":"100%",
                    "_order": {"form_3": 2,"form_2":1},
                    "api": "/asd/asda?",
                    "form_2":{
                        "title":"Social Networking",
                        "initial_disabled": true,
                        "_order": {"Linkedin": 1, "Twitter": 2,"Facebook": 3,"External Link": 4},
                        "Linkedin":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Linkedin",
                            "label": "Linkedin",
                            "flex": true,
                            "label_icon":"linkedin",
                            "required": false
                        },
                        "Twitter":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Twitter",
                            "label_icon":"twitter",
                            "label": "Twitter",
                            "flex": true,
                            "required": true
                        },
                        "Facebook":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Facebook",
                            "label_icon":"facebook",
                            "label": "Facebook",
                            "flex": true,
                            "required": true
                        },
                        "External Link":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "External Link",
                            "label": "External Link",
                            "label_icon":"link",
                            "flex": true,
                            "required": true
                        },
                        "Global Location Number (GLN Code)":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"100%",
                            "key": "Global Location Number (GLN Code)",
                            "label": "Global Location Number (GLN Code)",
                            "flex": true,
                            "required": true
                        }
                    },
                    "form_3": {
                        "title":"Showcase",
                        "initial_disabled": true,
                        "_order": {"company_logo": 1, "company_description": 2, "self": 3, "wall_of_frame": 9},
                        "company_logo": {
                            "type": "file",
                            "placeholder": "Upload New Logo",
                            "file_format": "image",
                            "file_type":"image",
                            "file_size": "500",
                            "file_aspect_ratio":  "1.1",
                            "no_view_document": false,
                           // "checkbox_label":"PAN Registered",
                            "width":"100%",
                            "key": "company_logo",
                            "label": "Company Logo",
                            "flex": true,
                            "required": true
                        },
                        "self":{
                            "type": "file",
                            "placeholder": "Upload Documents",
                            // "checkbox_label":"Self",
                            "width":"100%",
                            "key": "tin_no",
                            "label": "Self",
                            "flex": true,
                            "required": true,
                            "add_more":true
                        },
                        "company_description": {
                            "type": "text-area",
                            "placeholder": "Type here",
                            "width":"100%",
                            "key": "company_description",
                            "label": "Company Description",
                            "flex": true,
                            "required": false
                        },
                        "wall_of_frame":{
                            "type": "file",
                            "placeholder": "Upload Documents",
                            // "checkbox_label":"Self",
                            "width":"100%",
                            "key": "wall_of_frame",
                            "label": "Wall of Frame",
                            "flex": true,
                            "required": true,
                            "add_more":true
                        },
                        "vat_no":{
                            "type": "file",
                            "placeholder": "Upload Documents",
                            "checkbox_label":"VAT Registered",
                            "width":"100%",
                            "key": "vat_no",
                            "label": "VAT No.",
                            "flex": true,
                            "required": true
                        }
                    },
                    "submit": {
                        "api": "",
                        "display": "Save"
                    }
                }
            }
        },
        "certificate": {
            "display":"Certificate",
            "icon": "certificate",
            "widgets": {
                "_order": {"form_group": 1, "uploaded_certificate": 2},
                "form_group":{
                    "type":"form-group",
                    "width":"100%",
                    "_order": {"form_2":1},
                    "api": "/asd/asda?",
                    "form_2":{
                        "title":"Certificate",
                        "initial_disabled": false,
                        "_order": {"Cerificate Title": 1, "Certifying Body": 2,"Cerificate Type": 3,"Category": 4, "Valid From": 5, "Valid To": 6, "submit": 7},
                        "Cerificate Title":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Cerificate Title",
                            "label": "Cerificate Title",
                            "flex": true,
                            "required": false
                        },
                        "Certifying Body":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Certifying Body",
                            "label": "Certifying Body",
                            "flex": true,
                            "required": true
                        },
                        "Cerificate Type":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Cerificate Type",
                            "label": "Cerificate Type",
                            "flex": true,
                            "required": true
                        },
                        "Category":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Category",
                            "label": "Category",
                            "flex": true,
                            "required": true
                        },
                        "Valid From":{
                            "type": "date",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Valid From",
                            "label": "Valid From",
                            "flex": true,
                            "required": true
                        },
                        "Valid To":{
                            "type": "date",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Valid To",
                            "label": "Valid To",
                            "flex": true,
                            "required": true
                        },
                        "submit": {
                            "type":"button",
                            "button_type":"primary",
                            "display":"Validate",
                            "api":""
                        }
                    },
                    "submit": {
                        "api": "",
                        "display": "Save"
                    }
                },
                "uploaded_certificate":{
                    "id": "opportunities_table",
                    "type": "table",
                    "width": "100%",
                    "display": "All Certificate",
                    "api":  "",
                    "columns":{
                        "_order":{
                            "title": 1,
                            "requirement": 3,
                            "certifying_body": 2,
                            "category": 4,
                            "valid_from": 5,
                            "due_date": 6
                        },
                        "title": {
                            "display": "Title",
                            "type":"string",
                            "width": "",
                            "align": "left"
                        },
                        "requirement": {
                            "display": "Type",
                            "type":"string",
                            "width": "",
                            "align": "center"
                        },
                        "certifying_body": {
                            "display": "Certifying Body",
                            "type":"string",
                            "width": "",
                            "align": "center"
                        },
                        "category": {
                            "display": "Category",
                            "type":"string",
                            "width": "",
                            "align": "center"
                        },
                        "valid_from": {
                            "display": "Valid from (date)",
                            "type":"date",
                            "format": 'MMM Do YYYY, h:mm a',
                            "width": "",
                            "align": "left"
                        },
                        "due_date": {
                            "display": "Due Date",
                            "type":"date",
                            "format": 'MMM Do YYYY, h:mm a',
                            "width": "",
                            "color":"#FC5A5A",
                            "align": "left"
                        },
                        
                    }
                },
            }
        },
        "document": {
            "display":"Documents",
            "icon": "document",
            "widgets": {
                "_order": {"form_group": 1, "uploaded_document": 2},
                "form_group":{
                    "type":"form-group",
                    "width":"100%",
                    "_order": {"form_2":1},
                    "api": "/asd/asda?",
                    "form_2":{
                        "title":"Documents",
                        "initial_disabled": false,
                        "_order": {"Title": 1, "Type": 2,"Category": 3,"Edition": 4,"Version": 5, "Date of issue": 5, "Publish Date": 6, "ISBN": 7,"In-house Publication": 8, "Impact Factor": 9,"Author": 10, "submit": 11},
                        "Title":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Title",
                            "label": "Title",
                            "flex": true,
                            "required": false
                        },
                        "Type":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Type",
                            "label": "Type",
                            "flex": true,
                            "required": true
                        },
                        "Edition":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Edition",
                            "label": "Edition",
                            "flex": true,
                            "required": true
                        },
                        "Version":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Version",
                            "label": "Version",
                            "flex": true,
                            "required": true
                        },
                        "Category":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Category",
                            "label": "Category",
                            "flex": true,
                            "required": true
                        },
                        "Date of issue":{
                            "type": "date",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Date of issue",
                            "label": "Date of issue",
                            "flex": true,
                            "required": true
                        },
                        "Publish Date":{
                            "type": "date",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Publish Date",
                            "label": "Publish Date",
                            "flex": true,
                            "required": true
                        },
                        "submit": {
                            "type":"button",
                            "button_type":"primary",
                            "display":"Upload",
                            "api":""
                        },
                        "ISBN":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "ISBN",
                            "label": "ISBN",
                            "flex": true,
                            "required": true
                        },
                        "In-house Publication": {
                            "type": "radio",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "In-house Publication",
                            "label": "In-house Publication",
                            "flex": true,
                            "required": true,
                            "option": {
                                "_order":{
                                    "yes":1,
                                    "no": 2
                                },
                                "yes":{
                                    "display":"Yes"
                                },
                                "no":{
                                    "display":"No"
                                }
                            }
                        },
                        "Impact Factor":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Impact Factor",
                            "label": "Impact Factor",
                            "flex": true,
                            "required": true
                        },
                        "Author":{
                            "type": "text",
                            "placeholder": "Type here",
                            "width":"49%",
                            "key": "Author",
                            "label": "Author",
                            "flex": true,
                            "required": true
                        },
                    },
                    "submit": {
                        "api": "",
                        "display": "Save"
                    }
                },
                "uploaded_document":{
                    "id": "opportunities_table",
                    "type": "table",
                    "width": "100%",
                    "display": "All Documents",
                    "api":  "",
                    "columns":{
                        "_order":{
                            "title": 1,
                            "requirement": 2,
                            "category": 3,
                            "editor": 4,
                            "version": 5,
                            "dol": 6,
                            "dop": 7,
                            "isbn":8,
                            "in_house_publication": 9,
                            "name": 10,
                        },
                        "title": {
                            "display": "Title",
                            "type":"string",
                            "width": "",
                            "align": "left"
                        },
                        "name": {
                            "display": "Author",
                            "type":"string",
                            "width": "",
                            "align": "left"
                        },
                        "requirement": {
                            "display": "Type",
                            "type":"string",
                            "width": "",
                            "align": "center"
                        },
                        "certifying_body": {
                            "display": "Certifying Body",
                            "type":"string",
                            "width": "",
                            "align": "center"
                        },
                        "category": {
                            "display": "Category",
                            "type":"string",
                            "width": "",
                            "align": "center"
                        },
                        "editor": {
                            "display": "Editor",
                            "type":"string",
                            "width": "",
                            "align": "center"
                        },
                        "version": {
                            "display": "Version",
                            "type":"string",
                            "width": "",
                            "align": "center"
                        },
                        "dol": {
                            "display": "DOL",
                            "type":"string",
                            "width": "",
                            "align": "center"
                        },
                        "dop": {
                            "display": "DOP",
                            "type":"string",
                            "width": "",
                            "align": "center"
                        },
                        "isbn": {
                            "display": "ISBN",
                            "type":"string",
                            "width": "",
                            "align": "center"
                        },
                        "in_house_publication": {
                            "display": "In-house Publication",
                            "type":"string",
                            "width": "",
                            "align": "center"
                        }
                    }
                },
            }
        },
        "miscellaneous": {
            "display":"Miscellaneous",
            "icon": "miscellaneous"
        }
    }
}
export default data;