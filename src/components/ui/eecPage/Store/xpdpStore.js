import {create} from "zustand";
const xpdpOptions = {
  xfmrSizeOptions: [
    { value: "30kVA Transformer", label: "30kVA Transformer" },
    { value: "NULL", label: "NULL" }
  ],
}
const xpdpConfiguration = {
  createBranchCircuit: () => {
    return {
      PwrDrop_Spare: false,
      DropType: "A-external",
      PwrDrop_DescTxt: "",
      dbl_Cable_Length: 0,
      StrBox_DT: "",
      TargetDevice_DT: "",
      TargetDevice_FLA: 0,
      StrBox_DT_FLA: 0,
    }
  },
  initializeBranchCircuits: () => {
    const branchCircuit = {
      "8A 1ph": [],
      "15A 1ph": [],
      "20A 1ph": [],
      "20A 3ph": []
     }

     return branchCircuit;
  },
  create: () => { 
    return {
      numberOfPwrDrop8A:"",
      numberOfPwrDrop15A:"",
      numberOfPwrDrop20A1p:"",
      numberOfPwrDrop20A3p:"",
      amp:"",
      xf_cable_length:"",
      fla_demand:"",
      fed_from:"",
      location:"",
      notes:"",
      name:"",
      spare8A:"",
      spare15A:"",
      spare20A1p:"",
      spare20A3p:"",
      xf_size:"",
      branchCircuit:xpdpConfiguration.initializeBranchCircuits(),
    }  
  },
  createBranchCircuits:(numberOfDrps) => {
    var newPwrDrops = []
    for(let i=0; i<numberOfDrps; i++){
        var newPwrDrop = xpdpConfiguration.createBranchCircuit();
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
      const branchCircuit  = xpdpConfiguration.createBranchCircuits(value);
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