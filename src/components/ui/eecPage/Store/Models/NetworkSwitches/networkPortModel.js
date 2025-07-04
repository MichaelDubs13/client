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
          setExpanded: function(value){
            var indexObject = this.getIndexObject();
            this.setValue(indexObject, "expanded", value, true, false);
          },
          getFullName: function() {
            return this.deviceTypeSelection === "SPARE" ?  `P${this.getIndex()+1}:Spare` :`P${this.getIndex()+1}:++${this.line}+${this.targetLocation}-${this.targetDT}`;
          },
          getIndexObject: function(){
            const networkSwitchIndex = this.data.parent.getIndex();
            const portIndex = this.getIndex()
            return {
              networkSwitchIndex:networkSwitchIndex,
              portIndex:portIndex,
            }
          },
          setValue: function(indexObject, key, value, isUI, isData){
            networkSwitchStore.getState().setPortValue(indexObject, key, value, isUI, isData);
          },
          setDataValue: function(key, value){
            const indexObject = this.getIndexObject();
            this.setValue(indexObject, key, value,false, true);
          },
          setNetworkTarget:function(line, location, name){
            const indexObject = this.getIndexObject();
            networkSwitchStore.getState().setPortValue(indexObject, "line", line);
            networkSwitchStore.getState().setPortValue(indexObject, "targetLocation", location);
            networkSwitchStore.getState().setPortValue(indexObject, "targetDT", name);
          },
          getNodeData: function(){
            return [
              this.deviceTypeSelection,
            ]
          },
          getStations: function(line){
            if(this.line != line) return [];
            return [this.targetLocation]
          },
          getDevices: function(line, station){
            var devices = []
            if(this.targetLocation === station && this.line === line){
              devices = [...devices, this.targetDT]
            }
            return devices;
          },
          getIndex: function(){
            const index = this.data.parent.ports.findIndex(port => port.data.id === this.data.id)
            return index;
          },
          getDeviceByName:function(name, location, line){
            // if(this.line != line) return;
            // if(this.targetLocation != location) return;
            // if(this.targetDT != name) return;
            // return this;
          },
          setLine:function(line, newLine){
            if(line === this.line){
              const indexObject = this.getIndexObject();
              this.setValue(indexObject, "line", newLine);
            }
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
          getSourceNetworkPort:function(){
            return networkSwitchConfiguration.getEthernetNetworkPortOption(this.data.parent.networkType, this.data.parent.switchType, this.getIndex()+1)
          },
        }
      },
}