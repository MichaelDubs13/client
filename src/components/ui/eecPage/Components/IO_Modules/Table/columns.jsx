import { FormLabel } from "@tesla/design-system-react";
import EditableCell from "../../Util/Table/DataTable/EditableCell";
import './styles.css'
import InputTextItem from "../../Util/Table/Components/InputTextItem";
import { ioModuleStore } from "../../../Store/ioModuleStore";
import DropdownItem from "../../Util/Table/Components/DropdownItem";
import CreateableSelectItem from "../../Util/Table/Components/CreateableSelectItem";
import { ioModuleGroupOptions } from "../../../Store/ioModuleStore";
import CheckboxItem from "../../Util/Table/Components/CheckboxItem";
import { useEffect } from "react";
import { formatToTwoDigits } from "../../../Store/util";
const renderInputs = (cell, header, ioModuleGroupIndex, ioModuleIndex, ports) => {
  const ioModuleGroups = ioModuleStore((state) => state.ioModuleGroups);  
  const index = {ioModuleGroupIndex:ioModuleGroupIndex, ioModuleIndex:ioModuleIndex, ioPortIndex:cell.row.id}
  var type = header.type;
  var options = header.options
  var width = '150px';
  if(header.header === "Target part number"){
    const port = ports[cell.row.id];
    if(port){
      if(port.isIOLink){
        type = 'dropdown';
        options = ["Balluff: BNI00CN", "Balluff: BNI00CR"]
        width = '200px';
        const ioLinkSlaveModuleCount = port.data.parent.getIoLinkSlaveModules().length;
        const ioLinkModuleName = `${port.data.parent.deviceTag}-MIO${formatToTwoDigits(ioLinkSlaveModuleCount + 1)}`;
        if(!port.pinTargetDT && port.pinTargetDT != ioLinkModuleName){
          port.setValue(index, "pinTargetDT", ioLinkModuleName);
        }
      }
    }
  } 
  switch(type){
    case 'input':
      return <EditableCell
              {...cell}
                renderInput={(props) => (
                <InputTextItem inputRef={props.inpRef} className="qz__data-table__editable-cell--input" 
                    item={ioModuleGroups[ioModuleGroupIndex].ioModules[ioModuleIndex].ports[cell.row.id]} property={header.property} 
                          index={index}  onFocus={props.onFocus} onChange={props.onChange}/>
              )}
            />
    case 'dropdown':
      return <EditableCell
              {...cell}
                renderInput={(props) => (
                <DropdownItem inputRef={props.inpRef} className="qz__data-table__editable-cell--input" 
                    options={options}  item={ioModuleGroups[ioModuleGroupIndex].ioModules[ioModuleIndex].ports[cell.row.id]} property={header.property}  
                    index={index} onFocus={props.onFocus} onChange={props.onChange} width={width}/>
              )}
            />

    case 'checkbox':
      return <EditableCell
              {...cell}
                renderInput={(props) => (
                <CheckboxItem inputRef={props.inpRef} className="qz__data-table__editable-cell--input" 
                    item={ioModuleGroups[ioModuleGroupIndex].ioModules[ioModuleIndex].ports[cell.row.id]} property={header.property}  
                    index={index} onFocus={props.onFocus} onChange={props.onChange}/>
              )}
            />
    case 'creatableSelect':
      return <EditableCell
              {...cell}
                renderInput={(props) => (
                <CreateableSelectItem inputRef={props.inpRef} className="qz__data-table__editable-cell--input" 
                    options={header.options}  item={ioModuleGroups[ioModuleGroupIndex].ioModules[ioModuleIndex].ports[cell.row.id]} property={header.property}  
                    index={index} onFocus={props.onFocus} onChange={props.onChange}/>
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
const getHeaders = ()=>{
  const headers = [
    {header: "Port", type:'label', property:'portCounter'}, 
    {header: "Type", type:'dropdown', options:ioModuleGroupOptions.portTypeDefaultSelectionOptions, property:'pinType'}, 
    {header: "Is an IO-Link Module", type:'checkbox', property:'isIOLink'}, 
    {header: "Inputs/Outputs Description", type:'input', property:'pinDescription'}, 
    {header: "PLC address", type:'input', property:'pinAddress'}, 
    {header: "Target part number", type:'input', property:'pinTargetPartNumber'}, 
    {header: "Target LOCATION", type:'input',options:[], property:'pinTargetLocation'}, 
    {header: "Target Device Tag", type:'input', options:[],property:'pinTargetDT'}, 
  ]
  return headers
}

export const useColumns = (ioModuleGroupIndex, ioModuleIndex, ports) => {

  const headers = getHeaders(); 
  const columns = headers.map(header => {
    return {
      accessorKey: header.header,
      header: header.header,
      cell: (cell) => (
          <div>
            {
              renderInputs(cell, header, ioModuleGroupIndex, ioModuleIndex, ports)
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
