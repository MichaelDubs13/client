import { v4 as uuidv4 } from 'uuid';
import { lineConfiguration } from '../../lineStore';
import { lpdStore } from '../../lpdStore';
import { projectStore } from '../../projectStore';

export const powerDropModel = {
  create:(parent)=>{
    return {
      line: parent?.line,
      targetLocation: "",
      targetDT: "",
      targetPort: "",
      description: "",
      outputPort:"",
      psuSelection: "",
      fla: "",
      UI:{
        expanded:false,
        icon:"/powerdrop.png",
      },
      data:{
        type:'powerDrop',
        id:uuidv4(),
        parent:parent,
        powerTarget:'',
      },
      getIndexObject: function(){
        const lpdIndex = this.data.parent.data.parent.getIndex();
        const psuIndex = this.data.parent.getIndex();
        const dropIndex = this.getIndex();
        return {
          lpdIndex:lpdIndex,
          psuIndex:psuIndex,
          dropIndex:dropIndex,
        }
      },
      setValue: function(indexObject, key, value, isUI, isData){
        lpdStore.getState().setDropValue(indexObject, key, value, isUI, isData);
      },
      setDataValue: function(key, value){
        const indexObject = this.getIndexObject();
        this.setValue(indexObject, key, value,false, true);
      },
      setPowerTarget:function(line, location, name){
        const indexObject = this.getIndexObject();
        lpdStore.getState().setDropValue(indexObject, "line", line);
        lpdStore.getState().setDropValue(indexObject, "targetLocation", location);
        lpdStore.getState().setDropValue(indexObject, "targetPort", name);
      },
      getIndex: function(){
        return this.data.parent.drops.findIndex(drop => drop.data.id === this.data.id)
      },
      getFullName: function() {
        return lineConfiguration.getDeviceFullName(this.location, this.description);
      },
      getNodeData: function(){
        return [
          `${this.fla}A`,
        ]
      },
      getSourceLine:function(){
        const psu = this.data.parent
       return psu.line;
      },
      getSourceLocation:function(){
        const psu = this.data.parent
        return psu.location;
      },
      getSourceDeviceTag:function(){
        const psu = this.data.parent
        return psu.deviceTag;
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
      },
    }
  },
}