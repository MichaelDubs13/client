import { v4 as uuidv4 } from 'uuid';
import { ioModuleStore } from '../../ioModuleStore';
import { ioLinkSlaveModulePortModel } from './ioLinkSlaveModulePortModel';


export const ioModulePortModel = {
    create:(parent, index)=>{
        const ioModulePort = {
          portCounter: index,
          isIOLink: false,
          pinType: "IO-Link", // EEC variable name: s_pin_type_selected
          pinDescription: "", // EEC variable name: s_pin_description
          pinAddress: "%I0.0", // EEC variable name: s_pin_PLCaddress
          pinTargetPartNumber: "", // EEC variable name: s_TargetDevicePartNumber
          pinTargetLine: parent?.line, // EEC variable name: s_TargetDeviceLocation
          pinTargetLocation: parent?.location, // EEC variable name: s_TargetDeviceLocation
          pinTargetDT: "", // EEC variable name: s_TargetDeviceDT
          ports:[], //IOLink Slave
          UI:{
            expanded:false,
            icon:"/ioPort.png"
          },
          data:{
            parent:parent,
            type:'ioPort',
            id:uuidv4(),
          },
          setExpanded: function(value){
            var indexObject = this.getIndexObject();
            this.setValue(indexObject, "expanded", value, true, false);
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
          initializePorts: (numberOfPorts, parent) => {
            var ports = [];
            for (let i = 0; i < numberOfPorts; i++) {
              var port = ioLinkSlaveModulePortModel.create(parent, i);
              ports.push(port)
            }
        
            return ports;
          },
        }

        ioModulePort.ports = ioModulePort.initializePorts(8, ioModulePort);
        return ioModulePort;
      },
    
    initializePorts: (numberOfPorts, parent) => {
        var ports = [];
        for (let i = 0; i < numberOfPorts; i++) {
          var port = ioLinkSlaveModulePortModel.create(parent, i);
          ports.push(port)
        }
    
        return ports;
      },
    
}