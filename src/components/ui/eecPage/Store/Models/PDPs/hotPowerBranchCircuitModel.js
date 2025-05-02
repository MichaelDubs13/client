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
      HotPwrDrp_Target_Location: "",
      HotPwrDrp_Target_DT: "",
      HotPwrDrp_Target_Desc: "",
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
      getNodeData: function(){
        return [
          
        ]
      },
      setLine:function(line){

      },
      getStations: function(){
        return [this.HotPwrDrp_Target_Location,]
      },
      getDevices: function(){
        return [this.HotPwrDrp_Target_DT,]
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