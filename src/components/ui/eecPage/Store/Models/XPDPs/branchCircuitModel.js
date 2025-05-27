import { v4 as uuidv4 } from 'uuid';
import { formatToTwoDigits } from '../../util';
import { xpdpStore } from '../../xpdpStore';



export const branchCircuitModel = {
    /**
      * creates a new branch circuit with default values
      * @returns 
      */
     create: (parent, amperage, index) => {
       return {
         PwrDrop_Spare: true,
         DropType: "A-external",
         description: "",
         line:parent?.line,
         targetLocation: "",
         targetDT: "",
         targetFLA: 0,
         targetFLA_Total: 0,
         targetCableLength:0,
         deviceDT: index > -1 ? `CB${formatToTwoDigits(1+index)}` : "",
         UI:{
           expanded:false,
           icon:"/powerdrop.png",
         },
         //Data can be set without going through zustand
         data:{
           type:'cb',
           parent:parent,
           amperage:amperage,
           powertarget:'',
           id:uuidv4(),
         },
          getFullName: function() {
            var targetDevice = this.PwrDrop_Spare ? "Spare" : `${this.targetLocation}-${this.targetDT}`;
            return `${this.deviceDT}-${amperage}:${targetDevice}`;
          },
         getIndexObject: function(){
           const pdpIndex = this.data.parent.getIndex();
           const branchCircuitIndex = this.getIndex();
           const amperage = this.data.amperage;
           return {
             pdpIndex:pdpIndex,
             branchCircuitIndex:branchCircuitIndex,
             amperage:amperage,
           }
         },
         getIndex: function(){
           return this.data.parent.branchCircuit[amperage].findIndex(drop => drop.data.id === this.data.id)
         },
         setValue: function(indexObject, key, value){
           xpdpStore.getState().setBranchCircuitValue(indexObject, key, value, false);
         },
         setDataValue: function(key, value){
          const indexObject = this.getIndexObject();
           xpdpStore.getState().setBranchCircuitValue(indexObject, key, value, false, true);
         },
         setPowerTarget:function(line, location, name){
          const indexObject = this.getIndexObject();
          xpdpStore.getState().setBranchCircuitValue(indexObject, "line", line);
          xpdpStore.getState().setBranchCircuitValue(indexObject, "targetLocation", location);
          xpdpStore.getState().setBranchCircuitValue(indexObject, "targetDT", name);
        },
        setPowerSource:function(line, location, name){
          //not available
        },
        setNetworkSource:function(line, location, name){
          //not available
        },
         getNodeData: function(){
           return [
             this.data.amperage,
             `${this.targetFLA}A`,
             `${this.targetCableLength}m`,
           ]
         },
         getDeviceByName:function(name, location, line){
          if(this.data.parent.line != line) return;
          if(this.data.parent.location != location) return;
          if(this.deviceDT != name) return;
          return this;
        },
        getSourceLine:function(){
        return this.data.parent.line
        },
        getSourceLocation:function(){
          return this.data.parent.location;
        },
        getSourceDeviceTag:function(){
          return this.deviceDT;
        },
        setLine:function(line, newLine){
          if(line === this.line){
            const indexObject = this.getIndexObject();
            this.setValue(indexObject, "line", newLine);
          }
        },
        getStations: function(line){
           if(this.line != line) return [];
           return [this.targetLocation,]
         },
        getDevices: function(line, station){
        const devices = [];
        if(this.data.parent.location === station && this.line === line){
          devices.push(this.deviceDT)
        }

        if(this.targetLocation  === station && this.line === line){
          devices.push(this.targetDT)
        }
        return devices;
      }
       }
     },
}