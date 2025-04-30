import { projectStore } from '../../projectStore';
import { v4 as uuidv4 } from 'uuid';
import { formatToTwoDigits, recreateArrayElement, recreateBranchCircuit, recreateObject } from '../../util';
import { lineConfiguration } from '../../lineStore';
import { pdpConfiguration } from "../../pdpStore";
import { xpdpStore } from '../../xpdpStore';
import { branchCircuitModel } from './branchCircuitModel';


export const xpdpModel = {
  create: (index, name) => { 
    const line = projectStore.getState().line;
    const location = name ? name : `XPDP${formatToTwoDigits(1+index)}` 
    return {
      numberOfPwrDrop8A:"",
      numberOfPwrDrop15A:"",
      numberOfPwrDrop20A1p:"",
      numberOfPwrDrop20A3p:"",
      amp:"",
      xf_cable_length:"",
      fla_demand:"",
      fed_from:"",
      line:line,
      location:location,
      notes:"",
      deviceTag:"",
      spare8A:"",
      spare15A:"",
      spare20A1p:"",
      spare20A3p:"",
      xf_size:"30kVA Transformer",
      xfmrLocation:"",
      branchCircuit:xpdpModel.initializeBranchCircuits(),
      UI:{
        expanded:false,
        icon:"/panel.png",
      },
      data:{
        type:'xpdp',
        id:uuidv4(),
      },
      getIndexObject: function(){
          const pdpIndex = this.getIndex();
          return {
            pdpIndex:pdpIndex,
          }
      },
      setValue: function(indexObject, key, value){
          xpdpStore.getState().setXPdpValue(indexObject, key, value);
      },
      getCB: function(location, cb_dt){
        if(this.location === location){
          return pdpConfiguration.getCB(this.branchCircuit, cb_dt);
        }
        return null;
      },
      getIndex: function(){
        const xpdps = xpdpStore.getState().xpdps;
        return xpdps.findIndex(pdp => pdp.data.id === this.data.id)
      },
      getItemById: function(id){
        return pdpConfiguration.getItemById(this, id);
      },
      getNodeData: function(){
        return [
          this.location,
          this.amp,
        ]
      },
      getStations: function(){
        var stations = []
        Object.keys(this.branchCircuit).forEach(key => {
          stations = lineConfiguration.getStations(this.branchCircuit[key], stations);
        })
        stations = [...stations, this.xfmrLocation]
        return stations;
      },
      getDevices: function(station){
        var devices = []
        Object.keys(this.branchCircuit).forEach(key => {
          devices = lineConfiguration.getDevices(this.branchCircuit[key], devices, station);
        })
        return devices;
      },
      getCBs:function(location){
        var cbs = []
        if(this.location === location){
          Object.keys(this.branchCircuit).forEach(key => {
            this.branchCircuit[key].forEach(drop => {
                  if(drop.UI.CB_DT){
                      cbs.push(drop.UI.CB_DT);
                  }
              })
          })
        }
        return cbs;
      }
    }  
  },
  initializeBranchCircuits: () => {
    const branchCircuit = {
      "8A 1ph": [],
      "15A 1ph": [],
      "20A 1ph": [],
      "20A 3ph": [],
     }

     return branchCircuit;
  },
    merge: (state, currentState) => { 
        const pdps = xpdpModel.recreate(state.xpdps);
        state.xpdps = pdps;
        Object.assign(currentState, state)
        return currentState
    },
    recreate: (xpdps)=>{
        const newPdps = xpdps.map(pdp => {
            var newPdp = recreateObject(pdp, xpdpModel.create)
            Object.keys(pdp.branchCircuit).forEach(key => { 
                var branchCircuit = recreateBranchCircuit(newPdp,key, pdp.branchCircuit[key], branchCircuitModel.create);
                newPdp.branchCircuit[key] = branchCircuit;
            });

            return newPdp;
        })
        return newPdps;
    }
}