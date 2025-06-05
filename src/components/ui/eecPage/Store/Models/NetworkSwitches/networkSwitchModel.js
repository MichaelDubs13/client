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
      localIP: "192.168.1.x", // EEC variable name: Local_IP
      plantIP: "", // EEC variable name: Plant_IP
      switchType: "Managed", // EEC variable name: Switch_Type_Selection
      switchSpeed: "Gigabit", // EEC variable name: Switch_Speed_Selection
      power1InLine: "", // EEC variable name: PWR1_IN_Line
      power1InLocation: "", // EEC variable name: PWR1_IN_Location
      power1InDT: "", // EEC variable name: PWR1_IN_DT
      power2InLine: "", // EEC variable name: PWR2_IN_Line
      power2InLocation: "", // EEC variable name: PWR2_IN_Location
      power2InDT: "", // EEC variable name: PWR2_IN_DT
      powerSourceLine: "", // EEC variable name: PWR_IN_Location
      powerSourceLocation: "", // EEC variable name: PWR_IN_Location
      powerSourceDT: "", // EEC variable name: PWR_IN_DT
      ethernetSourceLine: "", // EEC variable name: Ethernet_Line
      ethernetSourceLocation: "", // EEC variable name: Ethernet_Location
      ethernetSourceDT: "", // EEC variable name: Ethernet_DT
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
        description:'Ethernet Switch',
        fla:'',
        id:uuidv4(),
      },
      setExpanded: function(value){
        var indexObject = this.getIndexObject();
        this.setValue(indexObject, "expanded", value, true, false);
      },
      getDescription: function(){
        return 'Local Network Switch';
      },
      getFLA:function(){
        return 0;
      },
      getIndexObject: function(){
        const networkSwitchIndex = this.getIndex();
        return {
          networkSwitchIndex:networkSwitchIndex,
        }
      },
      setValue: function(indexObject, key, value, isUI, isData){
        networkSwitchStore.getState().setNetworkSwitchValue(indexObject, key, value, isUI, isData);
      },
      setDataValue: function(key, value){
        const indexObject = this.getIndexObject();  
         this.setValue(indexObject, key, value,false, true);
       },
      getFullName: function() {
        return lineConfiguration.getDeviceFullName(this.line, this.location, this.deviceTag);
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
      getDeviceByName:function(name, location, line){
        if(this.line === line && this.location === location && this.deviceTag === name)return this;
        // for(let i=0;i<this.ports.length;i++){
        //     var foundItem = this.ports[i].getDeviceByName(name, location, line);
        //     if(foundItem) return foundItem;
        // }
        return;
      },
      getNodeData: function(){
        return [
          this.deviceTag,
        ]
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
      getStations: function(line){
        var stations = []
        stations = lineConfiguration.getStations(this.ports,line, stations);

        if(this.line === line) stations = [...stations, this.location];  
        if(this.powerSourceLine === line)stations = [...stations,this.powerSourceLocation]
        return stations;
      },
      getDevices: function(line, station){
        var devices = []
        devices = lineConfiguration.getDevices(this.ports, devices, line, station);
        if(this.location === station && this.line === line){
          devices = [...devices, this.deviceTag]
        }
        if(this.powerSourceLocation === station && this.powerSourceLine === line){
          devices = [...devices, this.powerSourceDT]
        }
        return devices;
      },
      setPowerSource:function(line, location, deviceTag){
        const indexObject = this.getIndexObject();
        this.setValue(indexObject, "powerSourceLine", line)
        this.setValue(indexObject, "powerSourceLocation", location)
        this.setValue(indexObject, "powerSourceDT", deviceTag)
      },
      setNetworkSource:function(line, location, name){
        const indexObject = this.getIndexObject();
        this.setValue(indexObject, "ethernetSourceLine", line);
        this.setValue(indexObject, "ethernetSourceLocation", location);
        this.setValue(indexObject, "ethernetSourceDT", name);
      },
      setPowerTarget:function(line, location, name){
        const indexObject = this.getIndexObject();
        this.setValue(indexObject, "powerTargetLine", line);
        this.setValue(indexObject, "powerTargetLocation", location);
        this.setValue(indexObject, "powerTargetDT", name);
      },
      setNetworkTarget:function(line, location, name){
        const indexObject = this.getIndexObject();
        this.setValue(indexObject, "ethernetTargetLine", line);
        this.setValue(indexObject, "ethernetTargetLocation", location);
        this.setValue(indexObject, "ethernetTargetDT", name);
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
      getLines:function(){
        var lines = [this.line,this.power1InLine, this.power2InLine, this.powerSourceLine]
        this.ports.forEach(port => {
          if(!lines.includes(port.line)){
              lines.push(port.line);
          }
        })

        return lines;
      },
    }
    networkSwitch.ports = networkSwitchModel.initializePorts(16, networkSwitch);
    return networkSwitch;
  },
  generateData: (networkSwitches) => {
    networkSwitches.forEach(networkSwitch => {
        if(networkSwitch.switchType === "Managed"){
            networkSwitch.power1InLine = networkSwitch.powerSourceLine;
            networkSwitch.power1InLocation = networkSwitch.powerSourceLocation;
            networkSwitch.power1InDT = networkSwitch.powerSourceDT;
            networkSwitch.powerSourceLine="";
            networkSwitch.powerSourceLocation="";
            networkSwitch.powerSourceDT="";
        }
        if(networkSwitch.networkType === "Local" && networkSwitch.switchType === "Managed" && networkSwitch.ports.length === 8){
            networkSwitch.is6GK5208_0HA00_2AS6 = true;
        } else
            networkSwitch.is6GK5208_0HA00_2AS6 = false;
            
        if(networkSwitch.networkType === "Local" && networkSwitch.switchType === "Managed" && networkSwitch.ports.length === 16){
            networkSwitch.is6GK5216_0HA00_2AS6 = true;
        } else
            networkSwitch.is6GK5216_0HA00_2AS6 = false;
        
    });
    return networkSwitches;
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
      const networkSwitches = networkSwitchModel.recreate(state.networkSwitches);
      state.networkSwitches = networkSwitches;
      Object.assign(currentState, state)
      return currentState
  } ,
  recreate:(networkSwitches)=>{
    const newNetworkSwitches = networkSwitches.map(networkSwitch => {
        var newNetworkSwitch = recreateObject(networkSwitch, networkSwitchModel.create)
        var ports = recreateArrayElement(newNetworkSwitch, networkSwitch.ports, networkPortModel.create)
        newNetworkSwitch.ports = ports;
        return newNetworkSwitch;
    })
    return newNetworkSwitches;
  }
}