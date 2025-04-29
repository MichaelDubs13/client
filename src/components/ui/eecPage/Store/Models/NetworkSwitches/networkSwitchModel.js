import { projectStore } from '../../projectStore';
import { v4 as uuidv4 } from 'uuid';
import { formatToTwoDigits, getItemById, recreateArrayElement, recreateObject } from '../../util';
import { lineConfiguration } from '../../lineStore';
import { networkSwitchStore, networkSwitchConfiguration } from '../../networkSwitchStore';
import { networkPortModel } from './networkPortModel';

export const networkSwitchModel = {
  create: (index) => { 
    var networkSwitch = {
       // this is where the variables for the network switch are defined going to the data model
      // below is the first variable example
      line: projectStore.getState().line, // EEC variable name: Switch_Line
      location:"", // EEC variable name: Switch_Location
      deviceTag: index > -1 ? `LETH${formatToTwoDigits(index+1)}` : '', // EEC variable name: Switch_DT
      plcID: "", // EEC variable name: PLC_ID
      networkType: "Local", // EEC variable name: Network_Type_Selection
      localIP: "", // EEC variable name: Local_IP
      plantIP: "", // EEC variable name: Plant_IP
      switchType: "Managed", // EEC variable name: Switch_Type_Selection
      switchSpeed: "Gigabit", // EEC variable name: Switch_Speed_Selection
      power1InLocation: "", // EEC variable name: PWR1_IN_Location
      power1InDT: "", // EEC variable name: PWR1_IN_DT
      power2InLocation: "", // EEC variable name: PWR2_IN_Location
      power2InDT: "", // EEC variable name: PWR2_IN_DT
      powerSourceLine: "", // EEC variable name: PWR_IN_Location
      powerSourceLocation: "", // EEC variable name: PWR_IN_Location
      powerSourceDT: "", // EEC variable name: PWR_IN_DT
      alarmEnable: false, // EEC variable name: Alarm_Output_Selection
      consoleEnable: false, // EEC variable name: Console_Output_Selection
      alarmName: "", // EEC variable name: Alarm_DT
      consuleName: "", // EEC variable name: Console_DT
      ports_8: 0, // EEC variable name: 8_ports
      ports_8or16: 16, // EEC variable name: 8or16_ports
      ports_8or16or24: 0, // EEC variable name: 8or16or24_ports
      ports:[],
      UI:{
        expanded:false,
        icon:"/networkSwitch.png"
      },
      data:{
        type:'networkSwitch',
        id:uuidv4(),
      },
      getIndexObject: function(){
        const networkSwitchIndex = this.getIndex();
        return {
          networkSwitchIndex:networkSwitchIndex,
        }
      },
      setValue: function(indexObject, key, value){
        networkSwitchStore.getState().setNetworkSwitchValue(indexObject, key, value);
      },
      getFullName: function() {
        return lineConfiguration.getDeviceFullName(this.location, this.deviceTag);
      },
      getPortOptions: function() {
        return networkSwitchConfiguration.getEthernetNetworkPortOptions(this.ports.length, this.networkType, this.switchType);
      },
      getIndex: function(){
        const networkSwitches = networkSwitchStore.getState().networkSwitches;
        return networkSwitches.findIndex(networkSwitch => networkSwitch.data.id === this.data.id)
      },
      getItemById: function(id){
        return getItemById(this.ports, id);
      },
      getNodeData: function(){
        return [
          this.deviceTag,
        ]
      },
      getStations: function(){
        var stations = []
        stations = lineConfiguration.getStations(this.ports, stations);
        stations = [...stations, this.location, this.powerSourceLocation]
        return stations;
      },
      getDevices: function(station){
        var devices = []
        devices = lineConfiguration.getDevices(this.ports, devices, station);
        if(this.location === station){
          devices = [...devices, this.deviceTag]
        }
        if(this.powerSourceLocation === station){
          devices = [...devices, this.powerSourceDT]
        }
        return devices;
      },
      setPowerSource:function(line, location, deviceTag){
        const indexObject = this.getIndexObject();
        this.setValue(indexObject, "powerSourceLine", line)
        this.setValue(indexObject, "powerSourceLocation", location)
        this.setValue(indexObject, "powerSourceDT", deviceTag)
      }
    }
    networkSwitch.ports = networkSwitchModel.initializePorts(16, networkSwitch);
    return networkSwitch;
  },
  initializePorts: (numberOfPorts, parent) => {
    var ports = [];
    for (let i = 0; i < numberOfPorts; i++) {
      var port = networkPortModel.create(parent);
      ports.push(port)
    }
    return ports;
  },
   merge: (state, currentState) => { 
      const networkSwitches = state.networkSwitches.map(networkSwitch => {
          var newNetworkSwitch = recreateObject(networkSwitch, networkSwitchModel.create)
          var ports = recreateArrayElement(newNetworkSwitch, networkSwitch.ports, networkPortModel.create)
          newNetworkSwitch.ports = ports;
          return newNetworkSwitch;
      })
      state.networkSwitches = networkSwitches;
      Object.assign(currentState, state)
      return currentState
  } 
}