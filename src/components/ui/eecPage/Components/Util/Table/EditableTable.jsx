import { useEffect } from "react";
import { DataTable } from "./DataTable/DataTable";
import { useDataTable } from "./DataTable/useDataTable";
import { columns } from "./columns";
import { strains } from "./strains";

const EditableTable = ()=>{
  const { table, paste, undo, redo } = useDataTable({
    columns:columns,
    data: strains,
    history: true,
  });
  
  return (
    <div
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        paddingTop: "40px",
        paddingBottom: "40px",
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
export default EditableTable