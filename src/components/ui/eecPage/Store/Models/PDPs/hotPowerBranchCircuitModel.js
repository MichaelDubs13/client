import { v4 as uuidv4 } from 'uuid';
import { pdpStore } from "../../pdpStore";
import { projectStore } from '../../projectStore';

export const hotPowerBranchCircuitModel = {
    /**
   * creates a new hotPower Branch circuit with default values
   * @returns 
   */
  create: (parent) => {
    return {
      HotPwrDropType: "Spare",
      line:parent?.line,
      targetLocation: "",
      targetDT: "",
      description: "",
      data:{
        type:'hotPower',
        id:uuidv4(),
        parent:parent,
      },
      getIndexObject: function(){
        const pdpIndex = this.data.parent.getIndex();
        const hotPowerIndex = this.getIndex();
        return {
          pdpIndex:pdpIndex,
          hotPowerIndex:hotPowerIndex,
        }
      },
      getIndex: function(){
        return this.data.parent.hotPowerDrops.findIndex(drop => drop.data.id === this.data.id)
      },
      setValue: function(indexObject, key, value){
        pdpStore.getState().setHotPowerValue(indexObject, key, value);
      },
      setDataValue: function(key, value){
        const indexObject = this.getIndexObject();
        this.setValue(indexObject, key, value,false, true);
      },
      setPowerTarget:function(line, location, name){
        const indexObject = this.getIndexObject();
        this.setValue(indexObject, "line", line);
        this.setValue(indexObject, "targetLocation", location);
        this.setValue(indexObject, "targetDT", name);
      },
      getNodeData: function(){
        return [
          
        ]
      },
      setLine:function(line){

      },
      getStations: function(line){
        if(this.line != line) return [];
        return [this.targetLocation,]
      },
      getDevices: function(line, station){
        if(this.line != line) return []
        if(this.targetLocation != station) return []
        return [this.targetDT,]
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
      
    }
  },
}