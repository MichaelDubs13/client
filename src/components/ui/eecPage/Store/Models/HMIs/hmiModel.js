import { projectStore } from '../../projectStore';
import { v4 as uuidv4 } from 'uuid';
import { formatToTwoDigits, recreateArrayElement, recreateObject } from '../../util';
import { lineConfiguration } from '../../lineStore';
import { hmiStore, hmiConfiguration } from '../../hmiStore';
import { extensionUnitPositionModel } from './extensionUnitPositionModel';


export const hmiModel = {
     create: (index) => { 
         var hmi = {
           // this is where the variables for the network switch are defined going to the data model
           // below is the first variable examplen
           line: projectStore.getState().line, // EEC variable name: HMI_Line
           location:"", // EEC variable name: HMI_Location
           deviceTag: index != null ? `HMI${formatToTwoDigits(index+1)}` : '', // EEC variable name: HMI_DT
           plcID: "", // EEC variable name: PLC_ID
           localIP: "192.168.1.x", // EEC variable name: Local_IP
           plantIP: "", // EEC variable name: Plant_IP
           powerSourceLine: "", // EEC variable name: HMI_PwrIn_Line
           powerSourceLocation: "", // EEC variable name: HMI_PwrIn_Station
           powerSourceDT: "", // EEC variable name: HMI_PwrIn_DT
           ethernetCascadingFrom: false, // EEC variable name: HMI_CascadingFrom
           ethernetSourceLine: "", // EEC variable name: HMI_NetworkIn_Line
           ethernetSourceLocation: "", // EEC variable name: HMI_ETHIn_Station
           ethernetSourceDT: "", // EEC variable name: HMI_ETHIn_DT
           ethernetSourceDevicePort: "", // EEC variable name: HMI_ETHIn_DevicePort
           ethernetCascadingTo: false, // EEC variable name: HMI_CascadingTo
           ethernetCascadingToOutside: false, // EEC variable name: HMI_CascadingTo_Outside
           hmiScreenSize: "22in", // EEC variable name: HMI_ScreenSize
           mountingType: "Flange at Bottom", // EEC variable name: Mounting_Selection
           hmiVersion: "V17", // EEC variable name: Version_Selection
           rfidPosition: "Right", // EEC variable name: RFID_Side
           powerTargetLine: "", // EEC variable name: CascadingTo_PowerLine ***needs to be created in EEC
            powerTargetLocation: "", // EEC variable name: CascadingTo_PowerStation
            powerTargetDT: "", // EEC variable name: CascadingTo_PowerDT
           hmiCascadingToSelection: "", // EEC variable name: frmUI_HMI_Selection
           ethernetTargetLine: "", // EEC variable name: HMI_ETHOut_Line
           ethernetTargetLocation: "", // EEC variable name: HMI_ETHOut_Station
           ethernetTargetDT: "", // EEC variable name: HMI_ETHOut_DT
           ethernetTargetDevicePort: "", // EEC variable name: HMI_ETHOut_DevicePort
   
           // this is the number of extension unit positions for the HMI
           numberOfExtensionUnitPositions: 8, // EEC variable name: ???
           // change this for the subcomponent of the Extension unit positions
           extensionUnitPositions:[],
           /* setValue: function(indexObject, key, value){
             hmiStore.getState().setHmiValue(indexObject, key, value); */
           UI:{
             expanded:false,
             icon: "/panel.png"
           },
           data:{
             type:'hmi',
             id:uuidv4(),
             powerTarget:'',
             ethernetTarget:'',
           },
           getDescription: function(){
            return 'HMI';
          },
          getFLA:function(){
            return 0;
          },
           getIndexObject: function(){
             const index = this.getIndex();
             return {hmiIndex:index}
           },
           setValue: function(indexObject, key, value, isUI, isData){
             hmiStore.getState().setHmiValue(indexObject, key, value, isUI, isData);
           },
           setDataValue: function(key, value){
            const indexObject = this.getIndexObject();  
             this.setValue(indexObject, key, value,false, true);
           },
           getFullName: function() {
             return lineConfiguration.getDeviceFullName(this.location, this.deviceTag);
           },
           getIndex: function(){
             const hmis = hmiStore.getState().hmis;
             return hmis.findIndex(hmi => hmi.data.id === this.data.id)
           },
           getItemById: function(id){
             if(this.data.id === id) return this;
             return null;
           },
           getDeviceByName:function(name, location, line){
            if(this.line != line) return;
            if(this.location != location) return;
            if(this.deviceTag != name) return;
            return this;
          },
           getNodeData: function(){
             return [
               this.deviceTag,
             ]
           },
           setPowerSource:function(line, location, name){
            const indexObject = this.getIndexObject();
            this.setValue(indexObject, "powerSourceLine", line);
            this.setValue(indexObject, "powerSourceLocation", location);
            this.setValue(indexObject, "powerSourceDT", name);
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
          setLine:function(line, newLine){
            if(line === this.line){
              const indexObject = this.getIndexObject();
              this.setValue(indexObject, "line", newLine);
            }
          },
           getStations: function(){
             return [this.location, this.powerSourceLocation, this.ethernetSourceLocation, this.ethernetTargetLocation]
           },
           getDevices: function(station){
             var devices = []
             if(this.location === station){
               devices = [...devices, this.deviceTag]
             }
             if(this.powerSourceLocation === station){
               devices = [...devices, this.powerSourceDT]
             }
             if(this.ethernetSourceLocation === station){
               devices = [...devices, this.ethernetSourceDT]
             }
             if(this.ethernetTargetLocation === station){
               devices = [...devices, this.ethernetTargetDT]
             }
             return devices;
           },
           getSourceLine:function(){
            return this.line
            },
            getSourceLocation:function(){
              return this.location
            },
            getSourceDeviceTag:function(){
              return this.deviceTag
            },
           setRfidExtensionPosition: function(orientation){
            if(orientation == "Right"){
                hmiStore.getState().setExtensionUnitPositionValue(this.extensionUnitPositions[this.extensionUnitPositions.length-1], "buttonSelection", "RFID Reader");
                hmiStore.getState().setExtensionUnitPositionValue(this.extensionUnitPositions[this.extensionUnitPositions.length-2], "buttonSelection", "RFID Reader");
                hmiStore.getState().setExtensionUnitPositionValue(this.extensionUnitPositions[0], "buttonSelection", "SPARE");
                hmiStore.getState().setExtensionUnitPositionValue(this.extensionUnitPositions[1], "buttonSelection", "SPARE");
            } else if(orientation == "Left"){
                hmiStore.getState().setExtensionUnitPositionValue(this.extensionUnitPositions[this.extensionUnitPositions.length-1], "buttonSelection", "SPARE");
                hmiStore.getState().setExtensionUnitPositionValue(this.extensionUnitPositions[this.extensionUnitPositions.length-2], "buttonSelection", "SPARE");
                hmiStore.getState().setExtensionUnitPositionValue(this.extensionUnitPositions[0], "buttonSelection", "RFID Reader");
                hmiStore.getState().setExtensionUnitPositionValue(this.extensionUnitPositions[1], "buttonSelection", "RFID Reader");
            }
           }
         }
         hmi.extensionUnitPositions = hmiModel.initializeExtensionUnitPositions(8);
         hmiConfiguration.getRfidPositions(hmi);
         return hmi;
       },
    initializeExtensionUnitPositions: (numberOfExtensionUnitPositions, parent) => {
        var extensionUnitPositions = [];
        for (let i = 0; i < numberOfExtensionUnitPositions; i++) {
        var extensionUnitPosition = extensionUnitPositionModel.create(parent);
        extensionUnitPositions.push(extensionUnitPosition)
        }
        return extensionUnitPositions;
    },
    merge: (state, currentState) => { 
    const hmis = hmiModel.recreate(state.hmis);
        state.hmis = hmis;
        Object.assign(currentState, state)
        return currentState
    },
    recreate:(hmis)=>{
        const newHmis = hmis.map(hmi => {
            var newHmi = recreateObject(hmi, hmiModel.create)
            var newExtensionUnitPositions = recreateArrayElement(newHmi, hmi.extensionUnitPositions, extensionUnitPositionModel.create)
            newHmi.extensionUnitPositions = newExtensionUnitPositions;
            return newHmi;
        })
        return newHmis;
    } 
     
}