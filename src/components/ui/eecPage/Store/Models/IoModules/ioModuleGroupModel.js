import { projectStore } from '../../projectStore';
import { v4 as uuidv4 } from 'uuid';
import { formatToTwoDigits, getItemById, recreateArrayElement, recreateObject } from '../../util';
import { lineConfiguration } from '../../lineStore';
import { ioModuleStore, ioModuleGroupConfiguration } from '../../ioModuleStore';
import { ioModuleModel } from './ioModuleModel';
import { ioModulePortModel } from './ioModulePortModel';


export const ioModuleGroupModel = {
  create: () => { 
    var ioModuleGroup = {
       // this is where the variables for the IO Modules Collection Instances are defined going to the data model
      // below is the first variable example
      line: projectStore.getState().line, // EEC variable name: s_frmUI_IOModLine ***needs to be created in EEC
      location:"", // EEC variable name: s_frmUI_IOModLocation
      plcID:"", // EEC variable name: PLC_ID
      powerSourceLine:"", // EEC variable name: s_frmUI_IOModPSUSourceLine ***needs to be created in EEC
      powerSourceLocation:"", // EEC variable name: s_frmUI_IOModPSUSourceLocation
      powerSourceDT:"", // EEC variable name: s_frmUI_IOModPSUSourceDT
      ethernetSourceLine:"", // EEC variable name: s_frmUI_IOModNetworkSourceLine ***needs to be created in EEC
      ethernetSourceLocation:"", // EEC variable name: s_frmUI_IOModNetworkSourceLocation
      ethernetSourceDT:"", // EEC variable name: s_frmUI_IOModNetworkSourceDT
      ethernetSourceDevicePort:"", // EEC variable name: s_frmUI_IOModNetworkSourcePort
      powerTargetLine: "", // EEC variable name: CascadingTo_PowerLine ***needs to be created in EEC
      powerTargetLocation: "", // EEC variable name: CascadingTo_PowerStation
      powerTargetDT: "", // EEC variable name: CascadingTo_PowerDT
      ethernetTargetLine: "", // EEC variable name: HMI_ETHOut_Line
      ethernetTargetLocation: "", // EEC variable name: HMI_ETHOut_Station
      ethernetTargetDT: "", // EEC variable name: HMI_ETHOut_DT
      ioModules:[],
      UI:{
        expanded:false,
        icon:"/deviceGroup.png"
      },
      data:{
        type:'ioModuleGroup',
        id:uuidv4(),
      },
      getIndexObject: function(){
        const ioModuleGroupIndex = this.getIndex();
        return {ioModuleGroupIndex:ioModuleGroupIndex};
      },
      setValue: function(indexObject, key, value, isUI, isData){
        ioModuleStore.getState().setIOModuleGroupValue(indexObject, key, value, isUI, isData);
      },
      setDataValue: function(key, value){
        const indexObject = this.getIndexObject();
        this.setValue(indexObject, key, value,false, true);
      },
      getFullName: function() {
        return lineConfiguration.getDeviceFullName(this.location);
      },
      getIndex: function(){
        const ioModuleGroups = ioModuleStore.getState().ioModuleGroups;
        return ioModuleGroups.findIndex(ioModuleGroup => ioModuleGroup.data.id === this.data.id)
      },
      getItemById: function(id){
        return getItemById(this.ioModules, id);
      },
      getDeviceByName:function(name, location, line){
        for(let i=0;i<this.ioModules.length;i++){
            var foundItem = this.ioModules[i].getDeviceByName(name, location, line);
            if(foundItem) return foundItem;
        }
        return;
      },
      getNodeData: function(){
        return [
          this.ioModuleDT,
        ]
      },
      getSourceLine:function(){
        return this.line
        },
      getSourceLocation:function(){
        return this.location;
      },
      getSourceDeviceTag:function(){
        if(this.ioModules.length > 0){
          return this.ioModules[0].deviceTag;
        }
        return "";
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
      setLine:function(line, newLine){
        if(line === this.line){
          const indexObject = this.getIndexObject();
          this.setValue(indexObject, "line", newLine);
        }
        this.ioModules.forEach(ioModule => {
          ioModule.setLine(line, newLine)
        })
      },
      getStations: function(){
        var stations = []
        stations = lineConfiguration.getStations(this.ioModules, stations);
        return [...stations, this.powerSourceLocation, this.location]
      },
      getDevices: function(station){
        var devices = []
        devices = lineConfiguration.getDevices(this.ioModules, devices);
        if(this.powerSourceLocation === station){
          devices = [...devices, this.powerSourceDT]
        }
        if(this.ethernetSourceLocation === station){
          devices = [...devices, this.ethernetSourceDT]
        }
        return devices;
      }
    }
   
    return ioModuleGroup;
  },
  merge: (state, currentState) => { 
      const ioModuleGroups = ioModuleGroupModel.recreate(state.ioModuleGroups)
      state.ioModuleGroups = ioModuleGroups;
      Object.assign(currentState, state)
      return currentState
  },
  recreate:(ioModuleGroups) =>{
    const newIoModuleGroups = ioModuleGroups.map(ioModuleGroup => {
        var newIoModuleGroup = recreateObject(ioModuleGroup, ioModuleGroupModel.create)
        var newIoModules = recreateArrayElement(newIoModuleGroup, ioModuleGroup.ioModules, ioModuleModel.create)
        newIoModules=newIoModules.map(newIoModule => {
          var ports = recreateArrayElement(newIoModule, newIoModule.ports, ioModulePortModel.create)
          newIoModule.ports = ports;
          return newIoModule;
        });
        newIoModuleGroup.ioModules = newIoModules;
        return newIoModuleGroup;
    })
    return newIoModuleGroups;
  }
       
}