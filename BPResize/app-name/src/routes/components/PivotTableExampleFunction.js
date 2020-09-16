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

export class PivotTableExampleFunction extends Component {

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

                        <div style={{height: 500}}>
                        <PivotTable
                            projectId={projectId}
                            measures={totalSales}
                            rows={attributes}
                            // columns={columns}
                            // totals={totals}
                            pageSize={5}
                            // filters={filters}
                            // onColumnResized={this.onColumnResized} 

                            config={{
                                columnSizing: {
                                    
                                    columnWidths: [
                                        attributeWidth(400),
                                        measureWidth(10)
                                    ],
                                    defaultWidth: "viewport",
                                    growToFit: true,
                                },
                                menu: {
                                    aggregations: true,
                                }
                            }}

                            
                        />
                        </div>
                    </div>
            //     )}
            // </ExampleWithExport>
        );
    }
}

export default PivotTableExampleFunction;
