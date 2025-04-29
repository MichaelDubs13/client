import { v4 as uuidv4 } from 'uuid';
import { ioModuleStore } from '../../ioModuleStore';


export const ioModulePortModel = {
    create:(parent, index)=>{
        return {
          portCounter: index,
          isIOLink: 'no',
          pinType: "", // EEC variable name: s_pin_type_selected
          pinDescription: "", // EEC variable name: s_pin_description
          pinAddress: "192.168.1.X", // EEC variable name: s_pin_PLCaddress
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
          setValue: function(indexObject, key, value){
            ioModuleStore.getState().setPortValue(indexObject, key, value);
          },
          setDataValue: function(key, value){
            const indexObject = this.getIndexObject();
            ioModuleStore.getState().setPortValue(indexObject, key, value,false, true);
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
        }
      },
    
}