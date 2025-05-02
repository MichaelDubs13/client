import { v4 as uuidv4 } from 'uuid';
import { pdpStore } from "../../pdpStore";
import { projectStore } from '../../projectStore';


export const pdpBranchCircuitModel = {
    /**
   * creates a new branch circuit with default values
   * @returns 
   */
  create: (parent, amperage) => {
    const branchCircuit= {
      PwrDrop_Spare: false,
      DropType: "A-external",
      description: "",
      line:parent.line,
      targetLocation: "",
      targetDT: "",
      targetFLA: 0,
      targetFLA_Total: 0,
      targetCableLength:0,
      UI:{
        expanded:false,
        CB_DT:"",
        icon:"/powerdrop.png",
      },

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
        pdpStore.getState().setBranchCircuitValue(indexObject, key, value, false, false);
      },
      setDataValue: function(key, value){
        const indexObject = this.getIndexObject();
        pdpStore.getState().setBranchCircuitValue(indexObject, key, value, false, true);
      },
      getNodeData: function(){
        return [
          this.data.amperage,
          `${this.TargetDevice_FLA}A`,
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
        return this.data.parent.location;
      },
      setLine:function(line, newLine){
        if(line === this.line){
          const indexObject = this.getIndexObject();
          this.setValue(indexObject, "line", newLine);
        }
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

    return branchCircuit;
  },
}