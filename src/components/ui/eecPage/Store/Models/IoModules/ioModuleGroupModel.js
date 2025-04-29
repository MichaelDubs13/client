import { projectStore } from '../../projectStore';
import { v4 as uuidv4 } from 'uuid';
import { formatToTwoDigits, getItemById } from '../../util';
import { lineConfiguration } from '../../lineStore';
import { ioModuleStore, ioModuleGroupConfiguration } from '../../ioModuleStore';


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
      setValue: function(indexObject, key, value){
        ioModuleStore.getState().setIOModuleGroupValue(indexObject, key, value);
      },
      setDataValue: function(key, value){
        ioModuleStore.getState().setIOModuleGroupValue(this, key, value,false, true);
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
      getNodeData: function(){
        return [
          this.ioModuleDT,
        ]
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
       
}