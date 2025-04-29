import { v4 as uuidv4 } from 'uuid';
import { lineConfiguration } from '../../lineStore';
import { lpdStore } from '../../lpdStore';

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
      setValue: function(indexObject, key, value){
        lpdStore.getState().setDropValue(indexObject, key, value);
      },
      setDataValue: function(key, value){
        const indexObject = this.getIndexObject();
        lpdStore.getState().setDropValue(indexObject, key, value,false, true);
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