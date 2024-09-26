import React from "react";
import ComplexTable from "../tables/components/ComplexTable";
import { columnsDataComplex } from "../tables/variables/columnsData";
import tableDataComplex from "../tables/variables/tableDataComplex.json";
const Order = () => {
  return (
    <div className="w-full h-full">
      <ComplexTable
        columnsData={columnsDataComplex}
        tableData={tableDataComplex}
      />
    </div>
  );
};

export default Order;
