import { FormInputDropdown } from '@tesla/design-system-react';
import { useState } from 'react';
import DataGrid  from 'react-data-grid'
import { textEditor, SelectColumn } from 'react-data-grid';
import 'react-data-grid/lib/styles.css'; // Import default styles

const createRow = (index) => {
    return { id: index, title: `Task ${index}`, complete: 20,};
};
const createRows = (numberOfRows)=> {
    const rows = [];
    for (let i = 0; i < numberOfRows; i++) {
        rows[i] = createRow(i);
    }

    return rows;
}

const Grid = ()=>{
    const [selectedRows, setSelectedRows] = useState();
    const [rows, setRows]=useState(()=>createRows(10))
    
    const columns = [
        SelectColumn,
        { key: "id", name: "ID" },
        { key: "title", name: "Title",     
            editor: textEditor, 
            editable: true 
        },
        { key: "complete", name: "Complete", 
            editable: true,
            editor: textEditor,  
        }
    ];
      
    function rowKeyGetter(row) {
        return row.id;
    }
    
    function isRowSelectionDisabled(row) {
        // console.log(row);
        // return !row.isActive;
        return false;
    }

    function onCellClick(args, event) {
        args.selectCell(true);
          console.log(args);
    }

    const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        console.log("test")
        this.setState(state => {
          const rows = state.rows.slice();
          for (let i = fromRow; i <= toRow; i++) {
            rows[i] = { ...rows[i], ...updated };
          }
          return { rows };
        });
      };

    return (
        <>
               <DataGrid
                rowKeyGetter={rowKeyGetter}
                onRowsChange={setRows}
                columns={columns}
                rows={rows}
                onSelectedRowsChange={setSelectedRows}
                className="fill-grid"
                // selectedRows={selectedRows}
                // onSelectedRowsChange={handleChange}
                // // isRowSelectionDisabled={isRowSelectionDisabled}
                // // onSelectedRowsChange={setSelectedRows}
                onCellClick={onCellClick}
                onGridRowsUpdated={onGridRowsUpdated}
                />
        </>
    );      
}

export default Grid;