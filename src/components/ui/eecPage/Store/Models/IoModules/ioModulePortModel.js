import { v4 as uuidv4 } from 'uuid';
import { ioModuleStore } from '../../ioModuleStore';
import { projectStore } from '../../projectStore';


export const ioModulePortModel = {
    create:(parent, index)=>{
        return {
          portCounter: index,
          isIOLink: false,
          pinType: "IO-Link", // EEC variable name: s_pin_type_selected
          pinDescription: "", // EEC variable name: s_pin_description
          pinAddress: "%I0.0", // EEC variable name: s_pin_PLCaddress
          pinTargetPartNumber: "", // EEC variable name: s_TargetDevicePartNumber
          pinTargetLocation: "", // EEC variable name: s_TargetDeviceLocation
          pinTargetDT: "", // EEC variable name: s_TargetDeviceDT
          UI:{
            expanded:false,
            icon:"/ioPort.png"
          },
          data:{
            parent:parent,
            type:'ioPort',
            id:uuidv4(),
          },
          getIndexObject: function(){
            const ioModuleGroupIndex = this.data.parent.data.parent.getIndex();
            const ioModuleIndex = this.data.parent.getIndex();
            const ioPortIndex = this.getIndex();
            return {ioModuleGroupIndex:ioModuleGroupIndex, ioModuleIndex:ioModuleIndex, ioPortIndex:ioPortIndex};
          },
          setValue: function(indexObject, key, value, isUI, isData){
            ioModuleStore.getState().setPortValue(indexObject, key, value, isUI, isData);
          },
          setDataValue: function(key, value){
            const indexObject = this.getIndexObject();
            this.setValue(indexObject, key, value,false, true);
          },
          getNodeData: function(){
            return [
              this.pinType,
            ]
          },
          getIndex: function(){
            const index = this.data.parent.ports.findIndex(port => port.data.id === this.data.id)
            return index;
          },
          setLine:function(line, newLine){
  
          },
          getSourceLine:function(){
            return this.data.parent.line
          },
          getSourceLocation:function(){
            return this.data.parent.location;
          },
          getSourceDeviceTag:function(){
            return this.data.parent.deviceTag;
          },
        }
      },
    
}