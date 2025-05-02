import { v4 as uuidv4 } from 'uuid';
import { formatToTwoDigits, getItemById } from '../../util';
import { ioModuleStore, ioModuleGroupConfiguration } from '../../ioModuleStore';
import { ioModulePortModel } from './ioModulePortModel';
import { projectStore } from '../../projectStore';


export const ioModuleModel = {
    create: (parent, index) => {
        const ioModule = {
          // this is where the variables for the IO Module Configuration are defined going to the data model
          // below is the first variable example
          line: parent?.line, // EEC variable name: ***needs to be created in EEC
          location:parent?.location, // EEC variable name: s_frmUI_IOModLocation
          // need to change the default value to toggle between SIO and MIO
          deviceTag: index > -1? `MIO${formatToTwoDigits(index+1)}`:'', // EEC variable name: s_IOModuleDT
          safetyRated: false, // EEC variable name: b_frmUI_SafetyIO
    
          sioManufacturerName: "Murr", // EEC variable name: s_frmUI_SIOModManuName
          sioParts_AB: "", // EEC variable name: s_frmUI_SIOModuleParts_A_B
          sioParts_Beckhoff: "", // EEC variable name: s_frmUI_SIOModuleParts_Beckhoff
          sioParts_Murr: "55557", // EEC variable name: s_frmUI_SIOModuleParts_Murr
          sioParts_Siemens: "", // EEC variable name: s_frmUI_SIOModuleParts_Siemens
    
          mioManufacturerName: "Balluff", // EEC variable name: s_frmUI_MIOModManuName
          mioParts_Balluff: "BNI005H", // EEC variable name: s_frmUI_MIOModuleParts_Balluff
          mioParts_Beckhoff: "", // EEC variable name: s_frmUI_MIOModuleParts_Beckhoff
          mioParts_PF: "", // EEC variable name: s_frmUI_MIOModuleParts_P_F
          mioParts_Siemens: "", // EEC variable name: s_frmUI_MIOModuleParts_Siemens
          mioParts_Turck: "", // EEC variable name: s_frmUI_MIOModuleParts_Turck
    
          localIP: "192.168.1.x", // EEC variable name: s_frmUI_IOModIPv_IP_Address
          opMode: "01", // EEC variable name: s_frmUI_OpMode
    
          portTypeDefaultSelection: "IO-Link", // EEC variable name: s_frmUI_DefaultPortTypeSelection
          ports:[],
          UI:{
            expanded:false,
            icon:"/ioModule.png"
          },
          data:{
            parent:parent,
            type:'ioModule',

            id:uuidv4(),
          },
          getDescription: function(){
            if(this.safetyRated){
              return 'Safety IO Module';
            }
            return 'IO Module';
          },
          getFLA:function(){
            return 0;
          },
          getIndexObject: function(){
            const ioModuleGroupIndex = this.data.parent.getIndex();
            const ioModuleIndex = this.getIndex();
            return {ioModuleGroupIndex:ioModuleGroupIndex, ioModuleIndex:ioModuleIndex};
          },
          setValue: function(indexObject, key, value, isUI, isData){
            ioModuleStore.getState().setIOModuleValue(indexObject, key, value, isUI, isData);
          },
          setDataValue: function(key, value){
            const indexObject = this.getIndexObject();
            this.setValue(indexObject, key, value,false, true);
          },
          setPortType: function(indexObject, value){  
            ioModuleStore.getState().setIOModulePortType(indexObject, value)
          },
          getNodeData: function(){
            return [
              this.deviceTypeSelection,
            ]
          },
          getIndex: function(){
            return this.data.parent.ioModules.findIndex(module => module.data.id === this.data.id)
          },
          getItemById:function(id){
            return getItemById(this.ports, id);
          },
          getDeviceByName:function(name, location, line){
            if(this.line != line) return;
            if(this.location != location) return;
            if(this.deviceTag != name) return;
            return this;
          },
          getSourceLine:function(){
            return this.line
            },
          getSourceLocation:function(){
            return this.location;
          },
          getSourceDeviceTag:function(){
            return this.deviceTag;
          },
          setLine:function(line, newLine){
            if(line === this.line){
              const indexObject = this.getIndexObject();
              this.setValue(indexObject, "line", newLine);
            }
            this.ports.forEach(port => {
              port.setLine(line, newLine)
            })
          },
          getStations: function(){
            return [this.location,]
          },
          getDevices: function(station){
            if(this.location  === station){
              return [this.deviceTag,]
            }
            return []
          },
          setPowerSource:function(line, location, name){
            const indexObject = this.getIndexObject();
            ioModuleStore.getState().setIOModuleGroupValue(indexObject, "powerSourceLine", line);
            ioModuleStore.getState().setIOModuleGroupValue(indexObject, "powerSourceLocation", location);
            ioModuleStore.getState().setIOModuleGroupValue(indexObject, "powerSourceDT", name);
          },
          setNetworkSource:function(line, location, name){
            const indexObject = this.getIndexObject();
            ioModuleStore.getState().setIOModuleGroupValue(indexObject, "ethernetSourceLine", line);
            ioModuleStore.getState().setIOModuleGroupValue(indexObject, "ethernetSourceLocation", location);
            ioModuleStore.getState().setIOModuleGroupValue(indexObject, "ethernetSourceDT", name);
          },
          setPowerTarget:function(line, location, name){
            const indexObject = this.getIndexObject();
            ioModuleStore.getState().setIOModuleGroupValue(indexObject, "powerTargetLine", line);
            ioModuleStore.getState().setIOModuleGroupValue(indexObject, "powerTargetLocation", location);
            ioModuleStore.getState().setIOModuleGroupValue(indexObject, "powerTargetDT", name);
          },
          setNetworkTarget:function(line, location, name){
            const indexObject = this.getIndexObject();
            ioModuleStore.getState().setIOModuleGroupValue(indexObject, "ethernetTargetLine", line);
            ioModuleStore.getState().setIOModuleGroupValue(indexObject, "ethernetTargetLocation", location);
            ioModuleStore.getState().setIOModuleGroupValue(indexObject, "ethernetTargetDT", name);
          },
        }
    
        ioModule.ports = ioModuleModel.initializePorts(8, ioModule);
        return ioModule;
      },
      initializePorts: (numberOfPorts, parent) => {
        var ports = [];
        for (let i = 0; i < numberOfPorts; i++) {
          var port = ioModulePortModel.create(parent, i);
          ports.push(port)
        }
    
        return ports;
      },
}