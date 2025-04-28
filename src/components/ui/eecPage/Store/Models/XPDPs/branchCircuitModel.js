import { v4 as uuidv4 } from 'uuid';
import { pdpStore } from "../../pdpStore";


export const branchCircuitModel = {
    /**
      * creates a new branch circuit with default values
      * @returns 
      */
     create: (parent, amperage) => {
       return {
         PwrDrop_Spare: false,
         DropType: "A-external",
         PwrDrop_DescTxt: "",
         line:parent?.line,
         targetLocation: "",
         targetDT: "",
         targetFLA: 0,
         targetFLA_Total: 0,
         targetCableLength:0,
         UI:{
           CB_DT:"",
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
           xpdpStore.getState().setBranchCircuitValue(this, key, value, false);
         },
         setDataValue: function(key, value){
           xpdpStore.getState().setBranchCircuitValue(this, key, value, false, true);
         },
         getNodeData: function(){
           return [
             this.data.amperage,
             `${this.TargetDevice_FLA}A`,
             `${this.targetCableLength}m`,
           ]
         },
         getStations: function(){
           return [this.targetLocation,]
         },
         getDevices: function(station){
           if(this.targetLocation  === station){
             return [this.targetDT,]
           }
           return []
         }
       }
     },
}