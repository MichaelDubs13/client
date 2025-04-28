import { v4 as uuidv4 } from 'uuid';
import { networkSwitchStore, networkSwitchConfiguration } from '../../networkSwitchStore';

export const networkPortModel = {
    create: (parent) => {
        return {
          // change this to the values for the network switch ports
          deviceTypeSelection: "SPARE", // EEC variable name: Device_Type_Selection
          line:parent?.line,
          targetLocation: "", // EEC variable name: Target_Location
          targetDT: "", // EEC variable name: NotPLC_Connection_DT
          targetCableLength: "TBD", // EEC variable name: Cable_Length_Selection
          communicationFlow: "Out", // EEC variable name: Interruption_InOrOut
          cascadingSwitch: false, // EEC variable name: Switch_Cascading
          connectedDevice: "", // EEC variable name: Connected_Device
          selectedSwitch: "", // EEC variable name: frmUI_NetworkSwitchSelection
          targetPort: "", // EEC varaible name: frmUI_DevicePortSelection
          UI:{
            expanded:false,
            icon:"/networkPort.png"
          },
          data:{
            type:'networkPort',
            parent:parent,
            ethernetTarget:'',
            id:uuidv4(),
          },
          getIndexObject: function(){
            const networkSwitchIndex = this.data.parent.getIndex();
            const portIndex = this.getIndex()
            return {
              networkSwitchIndex:networkSwitchIndex,
              portIndex:portIndex,
            }
          },
          setValue: function(indexObject, key, value){
            networkSwitchStore.getState().setPortValue(this, key, value);
          },
          setDataValue: function(key, value){
            networkSwitchStore.getState().setPortValue(this, key, value,false, true);
          },
          getNodeData: function(){
            return [
              this.deviceTypeSelection,
            ]
          },
          getStations: function(){
            return [this.targetLocation]
          },
          getDevices: function(station){
            var devices = []
            if(this.targetLocation === station){
              devices = [...devices, this.targetDT]
            }
            return devices;
          },
          getIndex: function(){
            const index = this.data.parent.ports.findIndex(port => port.data.id === this.data.id)
            return index;
          },
          getSourceLine:function(){
            return this.data.parent.line;
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