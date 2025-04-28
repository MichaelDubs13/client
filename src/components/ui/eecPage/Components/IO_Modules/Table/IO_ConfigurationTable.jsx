import { DataTable } from "../../Util/Table/DataTable/DataTable";
import { useDataTable } from "../../Util/Table/DataTable/useDataTable";
import { getColumns } from "./columns";
import React, { useEffect } from "react";

const IO_ConfigurationTable = ({ports, ioModuleGroupIndex,ioModuleIndex })=>{
    const columns = getColumns(ioModuleGroupIndex, ioModuleIndex);
    
    const createData = (port) => {
      return {
          Port: port.portCounter,
          Type: port.pinType,
          "Is an IO-Link Module": port.isIOLink,
          "Inputs/Outputs Description": port.pinDescription,
          "PLC address": port.pinAddress,
          "Target part number": port.pinTargetPartNumber,
          "Target LOCATION": port.pinTargetLocation,
          "Target Device Tag":port.pinTargetDT
        }
    }

    const getData = () => {
      const data = [];
      for(let i=0;i<ports.length;i++){
        const port = createData(ports[i])
        data.push(port);
      }
      return data;
    }
    const data = getData();
    const { table, paste, undo, redo } = useDataTable({
        columns:columns,
        data: data,
        history: true,
    });
  
  return (
    <div
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        paddingTop: "40px",
        paddingBottom: "40px",
        overflow:'visible'
      }}
    >
      <DataTable
        table={table}
        allowCellSelection={true}
        allowRangeSelection={true}
        allowHistory={true}
        allowPaste={true}
        paste={paste}
        undo={undo}
        redo={redo}
      />
    </div>
  );
}
export default React.memo(IO_ConfigurationTable);