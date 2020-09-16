import React, { Component } from "react";
import { PivotTable, Model } from "@gooddata/react-components";
// import ExampleWithExport from "./utils/ExampleWithExport";
import "@gooddata/react-components/styles/css/main.css";

import {
    projectId,
    quarterDateIdentifier,
    monthDateIdentifier,
    locationStateDisplayFormIdentifier,
    locationNameDisplayFormIdentifier,
    franchiseFeesIdentifier,
    franchiseFeesAdRoyaltyIdentifier,
    franchiseFeesInitialFranchiseFeeIdentifier,
    franchiseFeesIdentifierOngoingRoyalty,
    menuCategoryAttributeDFIdentifier,
    quarterDateIdentifierQ1,
    quarterDateIdentifierQ2,
    monthDateIdentifierJanuary,
    monthDateIdentifierFeb,
    monthDateIdentifierApril,
    franchisedSalesIdentifier,
    totalSalesIdentifier,
    yearDateDataSetAttributeIdentifier
} from "../utils/fixtures";
// import { attributeColumnWidthItem, measureColumnWidthItem } from "@gooddata/react-components/dist/helpers/model";

const attributeWidth = width => Model.attributeColumnWidthItem("state", width);

const measureWidth = width =>
    Model.measureColumnWidthItem("franchiseFeesIdentifier", width)
    .attributeLocators(
        // {
        //     attributeIdentifier: "quarterDate",
        //     element: quarterDateIdentifierQ1 
        // },
        // {
        //     attributeIdentifier: "monthDate",
        //     element: monthDateIdentifierJanuary 
        // }
    );

export class PivotTableExportExample extends Component {
    state = {
        columnWidths: [attributeWidth(200), measureWidth(200)],
    };
    onButtonClick = columnWidthItem => {
        const filteredColumnWidths = [...this.state.columnWidths].filter(item =>
            this.shouldFilterColumnWidthItem(item, columnWidthItem),
        );
        this.setState({
            columnWidths: [...filteredColumnWidths, columnWidthItem]
        });
    };

    onColumnResized = columnWidths => {
        this.setState({ columnWidths });
        console.log(columnWidths);
    };

    shouldFilterColumnWidthItem = (item, newItem) => Object.keys(item)[0] !== Object.keys(newItem)[0];

    render() {
        const totalSales = [Model.measure(franchisedSalesIdentifier).localIdentifier('franchiseFeesIdentifier').title("Franchised Sales"), 
                // Model.measure(totalSalesIdentifier).localIdentifier('franchiseFeesAdRoyaltyIdentifier').title("Total Sales"),
                // Model.arithmeticMeasure(['franchiseFeesIdentifier','franchiseFeesAdRoyaltyIdentifier'],'sum').title("Sum Of Franchised Sales and Total Sales").localIdentifier('sumSaleandTotal'),
                // Model.popMeasure('franchiseFeesAdRoyaltyIdentifier', yearDateDataSetAttributeIdentifier).localIdentifier('popMeasure')
                // .alias('$ Total Sales - SP year ago')
              ]
        const measures = [
            Model.measure(franchiseFeesIdentifier)
                .format("#,##0")
                .localIdentifier("franchiseFeesIdentifier"),
            Model.measure(franchiseFeesAdRoyaltyIdentifier)
                .format("#,##0")
                .localIdentifier("franchiseFeesAdRoyaltyIdentifier"),
            Model.measure(franchiseFeesInitialFranchiseFeeIdentifier)
                .format("#,##0")
                .localIdentifier("franchiseFeesInitialFranchiseFeeIdentifier"),
            Model.measure(franchiseFeesIdentifierOngoingRoyalty)
                .format("#,##0")
                .localIdentifier("franchiseFeesIdentifierOngoingRoyalty"),
        ];
        
        const attributes = [
            Model.attribute(locationStateDisplayFormIdentifier).localIdentifier("state"),
            Model.attribute(locationNameDisplayFormIdentifier).localIdentifier("name"),
            Model.attribute(menuCategoryAttributeDFIdentifier).localIdentifier("category"),
        ];

        // const columns = [
        //     Model.attribute(quarterDateIdentifier).localIdentifier('quarterDate'), 
        //     Model.attribute(monthDateIdentifier).localIdentifier('monthDate')
        // ];
        const filters = [
                {
                    positiveAttributeFilter: {
                        displayForm: {
                            identifier: quarterDateIdentifier
                        },
                        in: ['Q1'],
                        textFilter: true
                    }
                },
                {
                    positiveAttributeFilter: {
                        displayForm: {
                            identifier: monthDateIdentifier
                        },
                        in: ['Jan', 'Feb'],
                        textFilter: true
                    }
                }
            ]

        const totals = [
            {
                measureIdentifier: "franchiseFeesIdentifier",
                type: "sum",
                attributeIdentifier: "state",
            },
            {
                measureIdentifier: "franchiseFeesIdentifier",
                type: "avg",
                attributeIdentifier: "state",
            },
            {
                measureIdentifier: "franchiseFeesAdRoyaltyIdentifier",
                type: "sum",
                attributeIdentifier: "state",
            },
            {
                measureIdentifier: "franchiseFeesIdentifier",
                type: "max",
                attributeIdentifier: "state",
            },
        ];

        return (
            // <ExampleWithExport>
            //     {onExportReady => (
                    
                    <div style={{ height: 600}} className="s-pivot-table-totals">
                        <div style={{margin:10}}>
                            <button
                                className="gd-button gd-button-secondary gd-button gd-button-secondary s-change-width-button-attribute"
                                onClick={() => this.onButtonClick(attributeWidth(400))}
                            >
                                Change Location State column width to 400
                            </button>
                            <button
                                className="gd-button gd-button-secondary gd-button gd-button-secondary s-change-width-button-attribute"
                                onClick={() => this.onButtonClick(attributeWidth(200))}
                            >
                                Change Location State to default
                            </button>
                            <button
                                className="gd-button gd-button-secondary gd-button gd-button-secondary s-change-width-button-measure"
                                onClick={() => this.onButtonClick(measureWidth(60))}
                            >
                                Change Q1 column width to 60
                            </button>
                            <button
                                className="gd-button gd-button-secondary gd-button gd-button-secondary s-change-width-button-measure"
                                onClick={() => this.onButtonClick(measureWidth(200))}
                            >
                                Change Q1 column width to default
                            </button>
                        </div>
                        <div style={{height: 500}}>
                        <PivotTable
                            projectId={projectId}
                            measures={totalSales}
                            rows={attributes}
                            // columns={columns}
                            // onExportReady={onExportReady}
                            // totals={totals}
                            pageSize={5}
                            filters={filters}
                            onColumnResized={this.onColumnResized} 
                            config={{
                                columnSizing: {
                                    columnWidths: this.state.columnWidths,
                                    defaultWidth: "unset",
                                    growToFit: true,
                                },
                                menu: {
                                    aggregations: true,
                                }
                            }}

                            // config={{
                            //     columnSizing: {
                            //         columnWidths: [
                            //             attributeWidth(10),
                            //             measureWidth(10)
                            //         ],
                            //     },
                            // }}

                            // config={{
                            //     columnSizing: {
                            //         // defaultWidth: "viewport",
                            //         columnWidths: [
                            //             {
                            //                 attributeColumnWidthItem: 
                            //                     {
                            //                         width: '100',
                            //                         attributeIdentifier: 'state'
                            //                     }
                            //             },
                            //             {
                            //                 attributeColumnWidthItem: 
                            //                     {
                            //                         width: 300,
                            //                         attributeIdentifier: 'name'
                            //                     }
                            //             },
                            //             {
                            //                 attributeColumnWidthItem: 
                            //                     {
                            //                         width: 10,
                            //                         attributeIdentifier: 'category'
                            //                     }
                            //             },
                            //             {
                            //                 measureColumnWidthItem: {
                            //                     width: 10,
                            //                     locators: [
                            //                         {
                            //                             attributeLocatorItem: {
                            //                                 attributeIdentifier: 'quarterDate',
                            //                                 element: quarterDateIdentifierQ1
                            //                             }
                            //                         },
                            //                         {
                            //                             attributeLocatorItem: {
                            //                                 attributeIdentifier: 'monthDate',
                            //                                 element: monthDateIdentifierJanuary
                            //                             }
                            //                         },
                            //                         {
                            //                             measureLocatorItem: {
                            //                                 measureIdentifier: 'franchiseFeesIdentifier'
                            //                             }
                            //                         }
                            //                     ]
                            //                 }
                            //             },
                            //             {
                            //                 measureColumnWidthItem: {
                            //                     width: '100',
                            //                     locators: [
                            //                         {
                            //                             attributeLocatorItem: {
                            //                                 attributeIdentifier: 'quarterDate',
                            //                                 element: quarterDateIdentifierQ1
                            //                             }
                            //                         },
                            //                         {
                            //                             attributeLocatorItem: {
                            //                                 attributeIdentifier: 'monthDate',
                            //                                 element: monthDateIdentifierJanuary
                            //                             }
                            //                         },
                            //                         {
                            //                             measureLocatorItem: {
                            //                                 measureIdentifier: 'franchiseFeesAdRoyaltyIdentifier'
                            //                             }
                            //                         }
                            //                     ]
                            //                 }
                            //             },
                            //             {
                            //                 measureColumnWidthItem: {
                            //                     width: 10,
                            //                     locators: [
                            //                         {
                            //                             attributeLocatorItem: {
                            //                                 attributeIdentifier: 'quarterDate',
                            //                                 element: quarterDateIdentifierQ1
                            //                             }
                            //                         },
                            //                         {
                            //                             attributeLocatorItem: {
                            //                                 attributeIdentifier: 'monthDate',
                            //                                 element: monthDateIdentifierFeb
                            //                             }
                            //                         },
                            //                         {
                            //                             measureLocatorItem: {
                            //                                 measureIdentifier: 'franchiseFeesAdRoyaltyIdentifier'
                            //                             }
                            //                         }
                            //                     ]
                            //                 }
                            //             },
                            //             {
                            //                 measureColumnWidthItem: {
                            //                     width: 10,
                            //                     locators: [
                            //                         {
                            //                             attributeLocatorItem: {
                            //                                 attributeIdentifier: 'quarterDate',
                            //                                 element: quarterDateIdentifierQ2
                            //                             }
                            //                         },
                            //                         {
                            //                             attributeLocatorItem: {
                            //                                 attributeIdentifier: 'monthDate',
                            //                                 element: monthDateIdentifierApril
                            //                             }
                            //                         },
                            //                         {
                            //                             measureLocatorItem: {
                            //                                 measureIdentifier: 'franchiseFeesIdentifier'
                            //                             }
                            //                         }
                            //                     ]
                            //                 }
                            //             }
                            //         ]
                            //     }
                            // }}
                        />
                        </div>
                    </div>
            //     )}
            // </ExampleWithExport>
        );
    }
}

export default PivotTableExportExample;
