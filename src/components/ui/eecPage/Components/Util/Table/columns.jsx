import React from "react";
import EditableCell from "./DataTable/EditableCell";
import { FormInputText, FormInputDropdown } from "@tesla/design-system-react";
import CreatableSelect from 'react-select/creatable';
import './styles.css'
export const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (cell) => (
      <div>
        <EditableCell
          {...cell}
          renderInput={(props) => (
            <FormInputText inputRef={props.inpRef} className="qz__data-table__editable-cell--input" 
                  type="text" {...props} value={props.value} onFocus={props.onFocus} />
          )}
        />
      </div>
    ),
    meta: {
      editable: true,
    },
  },
  {
    accessorKey: "parent",
    header: "Parent",
    cell: (cell) => (
        <div>
          <EditableCell
            {...cell}
              renderInput={(props) => (
              <FormInputText inputRef={props.inpRef} className="qz__data-table__editable-cell--input" 
                        type="text" {...props} value={props.value} onFocus={props.onFocus} />
            )}
          />
        </div>
      ),
      meta: {
        editable: true,
    },
  },
  {
    accessorKey: "storage",
    header: "Storage",
    cell: (cell) => (
        <div>
          <EditableCell
            {...cell}
            renderInput={(props) => (
              // <CreatableSelect ref={props.inpRef} className="qz__data-table__editable-cell--input" 
              // selectOption
              // options={[{label:'test', value:'test'}]}
              // getOptionLabel={(option) => option.label}
              // getOptionValue={(option) => option.value}
              // value={props.value} 
              // selected={props.value} 
              // placeholder="test"
              // onFocus={props.onFocus}/>
              <FormInputDropdown inputRef={props.inpRef} className="qz__data-table__editable-cell--input" 
                  options={[{label:'test', value:'test'}]}
                  type="text" {...props} value={props.value} onFocus={props.onFocus} onOptionSelect={props.onOptionSelect}/>
            )}
          />
        </div>
      ),
      meta: {
        editable: true,
    },
  },
];
