import { v4 as uuidv4 } from 'uuid';
import { safetyGateStore } from '../../safetyGateStore';
import { formatToTwoDigits } from '../../util';
import { projectStore } from '../../projectStore';

export const safetyGateSwitchModel = {
  create: (parent, number) => {
    return {
      // this is where the variables for the network switch are defined going to the data model
        // below is the first variable example
        line: parent?.line, // EEC variable name: safetyGate_Line
        location:parent?.location, // EEC variable name: MountingLocation
        deviceTag: number > -1? `GS${formatToTwoDigits(number+1)}`:'', // EEC variable name: GateSwitch_DT\
        safetyGateSwitchType: "PROFINET", // EEC variable name: GateSwitch_Type
        safetyGateSwitchHandle: "Right", // EEC variable name: GateSwitch_HandleSide
        plcID: "", // EEC variable name: PLC_ID
        localIP: "192.168.1.x", // EEC variable name: Local_IP
        gateSwitchCascadingFrom: false, // EEC variable name: CascadingFrom

        powerSourceLine: "", // EEC variable name: PowerLine ***needs to be created in EEC
        powerSourceLocation: "", // EEC variable name: PowerStation
        powerSourceDT: "", // EEC variable name: PowerDT
        
        ethernetSourceLine: "", // EEC variable name: EthernetLine ***needs to be created in EEC
        ethernetSourceLocation: "", // EEC variable name: EthernetStation
        ethernetSourceDT: "", // EEC variable name: EthernetDT
        ethernetSourceDevicePort: "", // EEC variable name: EthernetIn_DevicePort

        safetyGateCascadingTo: false, // EEC variable name: CascadingTo
        safetyGateCascadingToSelection: "", // EEC variable name: frmUI_GateSwitchSelection

        safetyGateCascadingToOutside: false, // EEC variable name: CascadingTo_Outside
        powerTargetLine: "", // EEC variable name: CascadingTo_PowerLine ***needs to be created in EEC
        powerTargetLocation: "", // EEC variable name: CascadingTo_PowerStation
        powerTargetDT: "", // EEC variable name: CascadingTo_PowerDT
        ethernetTargetLine: "", // EEC variable name: CascadingTo_EthernetLine ***needs to be created in EEC
        ethernetTargetLocation: "", // EEC variable name: CascadingTo_EthernetStation
        ethernetTargetDT: "", // EEC variable name: CascadingTo_EthernetDT
        ethernetTargetDevicePort: "", // EEC variable name: CascadingTo_EthernetDT_DevicePort
      UI:{
        expanded:false,
        icon:"/safetyGateSwitch.png"
      },
      data:{
        parent:parent,
        type:'safetyGateSwitch',
        id:uuidv4(),
        powerTarget:'',
        ethernetTarget:'',
      },
      getDescription: function(){
        return 'Safety Gate';
      },
      getFLA:function(){
        return 0;
      },
      getIndexObject: function(){
        const safetyGateIndex = this.data.parent.getIndex();
        const safetyGateSwitchIndex = this.getIndex();
        return {safetyGateIndex:safetyGateIndex,safetyGateSwitchIndex:safetyGateSwitchIndex}
      },
      setValue: function(indexObject, key, value, isUI, isData){
        safetyGateStore.getState().setSafetyGateSwitchValue(indexObject, key, value, isUI, isData);
      },
      setDataValue: function(key, value){
        const indexObject = this.getIndexObject();
        this.setValue(indexObject, key, value,false, true);
      },
      getNodeData: function(){
        return [
          this.deviceTypeSelection,
        ]
      },
      setLine:function(line, newLine){
        if(line === this.line){
          const indexObject = this.getIndexObject();
          this.setValue(indexObject, "line", newLine);
        }
      },
      getStations: function(){
        return [this.location, this.powerSourceLocation, this.ethernetSourceLocation, this.powerTargetLocation, this.ethernetTargetLocation];
      },
      getDevices: function(station){
        var devices = []
        if(this.location === station){
          devices = [...devices, this.deviceTag];
        }
        if(this.powerSourceLocation === station){
          devices = [...devices, this.powerSourceDT];
        }
        if(this.ethernetSourceLocation === station){
          devices = [...devices, this.ethernetSourceDT];
        }
        if(this.powerTargetLocation === station){
          devices = [...devices, this.powerTargetDT];
        }
        if(this.ethernetTargetLocation === station){
          devices = [...devices, this.ethernetTargetDT];
        }
        return devices;
      },
      getDeviceByName:function(name, location, line){
        if(this.line != line) return;
        if(this.location != location) return;
        if(this.deviceTag != name) return;
        return this;
      },
      getIndex: function(){
        const index = this.data.parent.safetyGateSwitches.findIndex(gate => gate.data.id === this.data.id)
        return index;
      },
      getSourceLine:function(){
        return this.line
        },
      getSourceLocation:function(){
        return this.location;
      },
      getSourceDeviceTag:function(){
        return this.location;
      },
      setPowerSource:function(line, location, name){
        const indexObject = this.getIndexObject();
        safetyGateStore.getState().setSafetyGateSwitchValue(indexObject, "powerSourceLine", line);
        safetyGateStore.getState().setSafetyGateSwitchValue(indexObject, "powerSourceLocation", location);
        safetyGateStore.getState().setSafetyGateSwitchValue(indexObject, "powerSourceDT", name);
      },
      setNetworkSource:function(line, location, name){
        const indexObject = this.getIndexObject();
        safetyGateStore.getState().setSafetyGateSwitchValue(indexObject, "ethernetSourceLine", line);
        safetyGateStore.getState().setSafetyGateSwitchValue(indexObject, "ethernetSourceLocation", location);
        safetyGateStore.getState().setSafetyGateSwitchValue(indexObject, "ethernetSourceDT", name);
      },
      setPowerTarget:function(line, location, name){
        const indexObject = this.getIndexObject();
        safetyGateStore.getState().setSafetyGateSwitchValue(indexObject, "powerTargetLine", line);
        safetyGateStore.getState().setSafetyGateSwitchValue(indexObject, "powerTargetLocation", location);
        safetyGateStore.getState().setSafetyGateSwitchValue(indexObject, "powerTargetDT", name);
      },
      setNetworkTarget:function(line, location, name){
        const indexObject = this.getIndexObject();
        safetyGateStore.getState().setSafetyGateSwitchValue(indexObject, "ethernetTargetLine", line);
        safetyGateStore.getState().setSafetyGateSwitchValue(indexObject, "ethernetTargetLocation", location);
        safetyGateStore.getState().setSafetyGateSwitchValue(indexObject, "ethernetTargetDT", name);
      },
    }
  },

    
}