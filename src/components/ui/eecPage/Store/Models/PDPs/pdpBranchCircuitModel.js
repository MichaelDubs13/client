import { v4 as uuidv4 } from 'uuid';
import { pdpStore } from "../../pdpStore";
import { formatToTwoDigits } from '../../util';


export const pdpBranchCircuitModel = {
    /**
   * creates a new branch circuit with default values
   * @returns 
   */
  create: (parent, amperage, index) => {
    const branchCircuit= {
      PwrDrop_Spare: true,
      DropType: "A-external",
      description: "",
      line:parent.line,
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

      data:{
        type:'cb',
        parent:parent,
        amperage:amperage,
        powertarget:'',
        id:uuidv4(),
      },
      getFullName: function() {
        return `${this.deviceDT}-${amperage}`;
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
        pdpStore.getState().setBranchCircuitValue(indexObject, key, value, false, false);
      },
      setDataValue: function(key, value){
        const indexObject = this.getIndexObject();
        pdpStore.getState().setBranchCircuitValue(indexObject, key, value, false, true);
      },
      setPowerTarget:function(line, location, name){
        const indexObject = this.getIndexObject();
        pdpStore.getState().setBranchCircuitValue(indexObject, "line", line);
        pdpStore.getState().setBranchCircuitValue(indexObject, "targetLocation", location);
        pdpStore.getState().setBranchCircuitValue(indexObject, "targetDT", name);
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
      getDeviceByName:function(name, location, line){
        if(this.data.parent.line != line) return;
        if(this.data.parent.location != location) return;
        if(this.deviceDT != name) return;
        return this;
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

    return branchCircuit;
  },
}