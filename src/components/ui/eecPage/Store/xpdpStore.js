import {create} from "zustand";
import { projectStore } from "./projectStore";
import PdpConfiguration from "../Components/PDPs/PdpConfiguration";
import { pdpConfiguration } from "./pdpStore";
const xpdpOptions = {
  xfmrSizeOptions: [
    { value: "30kVA Transformer", label: "30kVA Transformer" },
    { value: "NULL", label: "NULL" }
  ],
}
const xpdpConfiguration = {
  initializeBranchCircuits: () => {
    const branchCircuit = {
      "8A 1ph": [],
      "15A 1ph": [],
      "20A 1ph": [],
      "20A 3ph": [],
     }

     return branchCircuit;
  },
  create: () => { 
    const line = projectStore.getState().line;
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
      location:"",
      notes:"",
      name:"",
      spare8A:"",
      spare15A:"",
      spare20A1p:"",
      spare20A3p:"",
      xf_size:"",
      xfmrLocation:"",
      branchCircuit:xpdpConfiguration.initializeBranchCircuits(),

      UI:{
        expanded:false,
      }
    }  
  },
  createBranchCircuits:(numberOfDrps) => {
    var newPwrDrops = []
    for(let i=0; i<numberOfDrps; i++){
        var newPwrDrop = pdpConfiguration.createBranchCircuit();
        newPwrDrops.push(newPwrDrop);
    }
    return newPwrDrops;
  },
  generateData: (xpdps) => {
   return xpdps;
  }
}

const xpdpStore = create((set) => ({
    
    xpdps:[],    
    setXpdps: (xpdps) => {
      set({xpdps:xpdps});
    },
    addXpdp: (numberOfXpdp) => {
      set((state) => {
            const diff = numberOfXpdp - [...state.xpdps].length
            if(diff > 0){
              const xpdps = []
              for (let i = 0; i < diff; i++) {
                var xpdp = xpdpConfiguration.create();
                xpdps.push(xpdp)
              }
              return {xpdps:[...state.xpdps, ...xpdps]}  
            } else if(diff < 0) {
                let newXpdps = [...state.xpdp];
                newXpdps = newXpdps.slice(0, newXpdps.length + diff);
                return {xpdps:newXpdps}
            } else {
              return {xpdps:[...state.xpdps]}
            }
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
    
    setXPdpValue:(indexObject, key, value)=>{
      const index = indexObject.pdpIndex
      set((state) => {
        const newPdps = [...state.xpdps];
        newPdps[index] = {...newPdps[index], [key]: value};
        
        return { xpdps: newPdps };
      });
    },
    setNumberOfPowerDrps:(index, amperage, value)=>{
      var branchCircuit  = xpdpConfiguration.createBranchCircuits(value);
      branchCircuit = pdpConfiguration.updateBranchCircuitCB_DT(branchCircuit);
      set((state) => {
        const newPdps = [...state.xpdps];
        newPdps[index] = {...newPdps[index], 
          branchCircuit: {...newPdps[index].branchCircuit, [amperage]:branchCircuit},
        };
        console.log(newPdps);
        return { xpdps: newPdps };
      });
    },
    setBranchCircuitValue:(indexObject, key, value)=>{
      const pdpIndex = indexObject.pdpIndex;
      const branchCircuitIndex = indexObject.branchCircuitIndex;
      const amperage = indexObject.amperage;

      set((state) => {
        const newPdps = [...state.xpdps];
        const branches = [...newPdps[pdpIndex].branchCircuit[amperage]]
        const branch = {...newPdps[pdpIndex].branchCircuit[amperage][branchCircuitIndex], [key]:value}
        branches[branchCircuitIndex] = branch;

        newPdps[pdpIndex] = {...newPdps[pdpIndex], 
          branchCircuit:{
            ...newPdps[pdpIndex].branchCircuit, 
            [amperage]:branches,
          }
        };
        return {xpdps: newPdps };
      });
    },
   
}));

export {
  xpdpStore,
  xpdpConfiguration,
  xpdpOptions,
}