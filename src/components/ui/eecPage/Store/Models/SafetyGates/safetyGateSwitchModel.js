import { v4 as uuidv4 } from 'uuid';
import { safetyGateStore } from '../../safetyGateStore';
import { formatToTwoDigits } from '../../util';

export const safetyGateSwitchModel = {
  create: (parent, number) => {
    return {
      // this is where the variables for the network switch are defined going to the data model
        // below is the first variable example
        line: parent?.line, // EEC variable name: safetyGate_Line
        location:parent?.location, // EEC variable name: MountingLocation
        deviceTag: number? `GS${formatToTwoDigits(number)}`:'', // EEC variable name: GateSwitch_DT\
        safetyGateSwitchType: "PROFINET", // EEC variable name: GateSwitch_Type
        safetyGateSwitchHandle: "Right", // EEC variable name: GateSwitch_HandleSide
        plcID: "", // EEC variable name: PLC_ID
        localIP: "", // EEC variable name: Local_IP
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
      getIndexObject: function(){
        const safetyGateIndex = this.data.parent.getIndex();
        const safetyGateSwitchIndex = this.getIndex();
        return {safetyGateIndex:safetyGateIndex,safetyGateSwitchIndex:safetyGateSwitchIndex}
      },
      setValue: function(indexObject, key, value){
        safetyGateStore.getState().setSafetyGateSwitchValue(indexObject, key, value);
      },
      setDataValue: function(key, value){
        const indexObject = this.getIndexObject();
        safetyGateStore.getState().setSafetyGateSwitchValue(indexObject, key, value,false, true);
      },
      getNodeData: function(){
        return [
          this.deviceTypeSelection,
        ]
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
      getIndex: function(){
        const index = this.data.parent.safetyGateSwitches.findIndex(gate => gate.data.id === this.data.id)
        return index;
      },
      getSourceLocation:function(){
        return this.location;
      },
      getSourceDeviceTag:function(){
        return this.deviceTag;
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
    }
  },

    
}