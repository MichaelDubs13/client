import React from "react";
import { FormLabel } from "@tesla/design-system-react";
import EditableCell from "../../Util/Table/DataTable/EditableCell";
import './styles.css'
import InputTextItem from "../../Util/Table/Components/InputTextItem";
import { ioModuleStore } from "../../../Store/ioModuleStore";
import DropdownItem from "../../Util/Table/Components/DropdownItem";
import CreateableSelectItem from "../../Util/Table/Components/CreateableSelectItem";
import { ioModuleGroupOptions } from "../../../Store/ioModuleStore";
import { lineStore } from "../../../Store/lineStore";

const getHeaders = (stations)=>{
  const headers = [
    {header: "Port", type:'label', property:'portCounter'}, 
    {header: "Type", type:'dropdown', options:ioModuleGroupOptions.portTypeDefaultSelectionOptions, property:'pinType'}, 
    {header: "Is an IO-Link Module", type:'dropdown', options:["yes",'no'], property:'isIOLink'}, 
    {header: "Inputs/Outputs Description", type:'input', property:'pinDescription'}, 
    {header: "PLC address", type:'input', property:'pinAddress'}, 
    {header: "Target part number", type:'input', property:'pinTargetPartNumber'}, 
    {header: "Target LOCATION", type:'creatableSelect',options:[], property:'pinTargetLocation'}, 
    {header: "Target Device Tag", type:'input', property:'pinTargetDT'}, 
  ]
  return headers
}
const renderInputs = (cell, header, ioModuleGroupIndex, ioModuleIndex) => {
  const ioModuleGroups = ioModuleStore((state) => state.ioModuleGroups);  
  const index = {ioModuleGroupIndex:ioModuleGroupIndex, ioModuleIndex:ioModuleIndex, ioPortIndex:cell.row.id}
  switch(header.type){
    case 'input':
      return <EditableCell
              {...cell}
                renderInput={(props) => (
                <InputTextItem inputRef={props.inpRef} className="qz__data-table__editable-cell--input" 
                    item={ioModuleGroups[ioModuleGroupIndex].ioModules[ioModuleIndex].ports[cell.row.id]} property={header.property} 
                          index={index} {...props} onFocus={props.onFocus}/>
              )}
            />
    case 'dropdown':
      return <EditableCell
              {...cell}
                renderInput={(props) => (
                <DropdownItem inputRef={props.inpRef} className="qz__data-table__editable-cell--input" 
                    options={header.options}  item={ioModuleGroups[ioModuleGroupIndex].ioModules[ioModuleIndex].ports[cell.row.id]} property={header.property}  
                    index={index} {...props} onFocus={props.onFocus}/>
              )}
            />
    case 'creatableSelect':
      return <EditableCell
              {...cell}
                renderInput={(props) => (
                <CreateableSelectItem inputRef={props.inpRef} className="qz__data-table__editable-cell--input" 
                    options={header.options}  item={ioModuleGroups[ioModuleGroupIndex].ioModules[ioModuleIndex].ports[cell.row.id]} property={header.property}  
                    index={index} {...props} onFocus={props.onFocus}/>
              )}
            />
    case 'label':
      return <EditableCell
              {...cell}
                renderInput={(props) => (
                  <FormLabel>{ioModuleGroups[ioModuleGroupIndex].ioModules[ioModuleIndex].ports[cell.row.id][header.property]}</FormLabel>
              )}
            />
  }
}
export const getColumns = (ioModuleGroupIndex, ioModuleIndex) => {
  //const stations = lineStore((state) => state.stations)  
  const headers = getHeaders(); 
  const columns = headers.map(header => {
    return {
      accessorKey: header.header,
      header: header.header,
      cell: (cell) => (
          <div>
            {
              renderInputs(cell, header, ioModuleGroupIndex, ioModuleIndex)
            }
          </div>
        ),
        meta: {
          editable: true,
      },
    }
  });



  return columns
}
