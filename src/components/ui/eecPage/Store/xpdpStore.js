import {create} from "zustand";
import { pdpConfiguration } from "./pdpStore";
import {addBranchCircuit, addItems, circularReplacer, setModelValue} from './util'
import { xpdpModel } from "./Models/XPDPs/xpdpModel";
import { createJSONStorage, persist } from 'zustand/middleware';
import { branchCircuitModel } from "./Models/XPDPs/branchCircuitModel";

const xpdpOptions = {
  xfmrSizeOptions: [
    { value: "30kVA Transformer", label: "30kVA Transformer" },
    { value: "NULL", label: "NULL" }
  ],
}
const xpdpConfiguration = {
  getCB:(branchCircuit, cb_dt) =>{
    Object.keys(branchCircuit).reverse().forEach(key => {
      branchCircuit[key].forEach(drop => {
        if(drop.deviceDT === cb_dt) return drop;
      })
    });

    return null;
  },
  

  createBranchCircuits:(numberOfDrps, parent, amperage) => {
    var newPwrDrops = []
    for(let i=0; i<numberOfDrps; i++){
        var newPwrDrop = branchCircuitModel.create(parent, amperage);
        newPwrDrops.push(newPwrDrop);
    }
    return newPwrDrops;
  },
}

const xpdpStore = create(
    persist(
      (set) => ({
    
    xpdps:[],    
    setXpdps: (xpdps) => {
      set({xpdps:xpdps});
    },
    addXpdp: (numberOfXpdp) => {
      set((state) => {
        let newXpdps = [...state.xpdps];
        newXpdps = addItems(newXpdps, numberOfXpdp, xpdpModel.create);
        return {xpdps:newXpdps}
        })
    },
    duplicateXpdp:(index) => {  
      set((state) => {
        const newXpdp = {...state.xpdps[index]}
        return {xpdps: [...state.xpdps, newXpdp]};
      })
    },
    deleteXpdp:(index) => {  
      set((state) => {
        return {xpdps: [...state.xpdps.slice(0, index), ...state.xpdps.slice(index + 1)]};
      })
    },
    
    setXPdpValue:(indexObject, key, value, isUI, isData)=>{
      //const indexObject = item.getIndexObject();
      const index = indexObject.pdpIndex
      set((state) => {
        const newPdps = [...state.xpdps];
        setModelValue(newPdps[index], key, value, isUI, isData);
        return { xpdps: newPdps };
      });
    },
    setNumberOfPowerDrps:(index, amperage, numberOfPowerDrops)=>{
      set((state) => {
        const newPdps = [...state.xpdps];
        var branchCircuit = addBranchCircuit(newPdps[index].branchCircuit[amperage], newPdps[index], numberOfPowerDrops, branchCircuitModel.create, amperage)
        newPdps[index].branchCircuit[amperage] = branchCircuit;
        //branchCircuit = pdpConfiguration.updateBranchCircuitDT(newPdps[index].branchCircuit);
        return { xpdps: newPdps };
      });
    },
    /**
     * update a parameter of the target branchCircuit with a new value, this function use index to find the target pdp and 
     * another index to find target branchCircuit
     * @param {Object} indexObject json object containing index of target pdp and index of target branchCircuit
     * @param {String} key name of the parameter
     * @param {String} value value of the parameter
     * @param {Boolean} isUI set value for UI object in the main object
     */
    setBranchCircuitValue:(indexObject, key, value, isUI, isData)=>{
      //const indexObject = item.getIndexObject();
      const pdpIndex = indexObject.pdpIndex;
      const branchCircuitIndex = indexObject.branchCircuitIndex;
      const amperage = indexObject.amperage;
      set((state) => {
        const newPdps = [...state.xpdps];
         const branches = newPdps[pdpIndex].branchCircuit[amperage];
        var branch = branches[branchCircuitIndex];
        setModelValue(branch, key, value, isUI, isData);
        return { xpdps: newPdps };
      });
    },
    }),
    {
       name: 'xpdp-state',
       storage: createJSONStorage(() => localStorage),
       serialize: (state) => {
         return JSON.stringify(state, circularReplacer())
       },
       merge: (state, currentState) => { 
         return xpdpModel.merge(state, currentState);
       } 
     }
));

export {
  xpdpStore,
  xpdpConfiguration,
  xpdpOptions,
}