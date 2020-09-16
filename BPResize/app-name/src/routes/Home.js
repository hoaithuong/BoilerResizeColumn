import React from "react";

import Page from "../components/Page";
import { useProjectId } from "../contexts/ProjectId";
import PivotTableExportExample from "./components/PivotTableExportExample";
import PivotTableExampleBasic from "./components/PivotTableExampleBasic";
import PivotTableExampleFunction from "./components/PivotTableExampleFunction";
import PivotTableSizingComplexExample from "./components/PivotTableSizingComplexExample";

const Home = () => {
    const { projectId } = useProjectId();
    return (
        <Page>
            <Page>
            <h2>Pivot Table</h2>
            <div>
                <h3>Example of Pivot Table with Button</h3>
                <PivotTableExportExample />
                <br />
                <h3>Example of Pivot Table with Basic</h3>
                <PivotTableExampleBasic />
                <br />
                <h3>Example of Pivot Table with Function</h3>
                <PivotTableExampleFunction />
                <br />
                <h3>Example of Pivot Table Complex</h3>
                <PivotTableSizingComplexExample />
                <br />
            </div>
        </Page>
        </Page>
    );
};

export default Home;
