import {create} from "zustand";
import pdpParser from "../Excel/pdpParser";

const pdpOptions = {
  amperageOptions: [
    { value: "200A", label: "200A" },
    { value: "400A", label: "400A" },
    { value: "600A", label: "600A" }
  ],

  enclosureSizeOptions:[
    { value: "800x1400x500(WHD)", label: "800(W) x 1400(H) x 500(D)" },
    { value: "1000x1800x500(WHD)", label: "1000(W) x 1800(H) x 500(D)" }
  ],

  hotPwrDropTypeOptions: [
    { value: "Spare", label: "Spare" },
    { value: "Device", label: "Device" }
  ],

  dropTypeOptions: [
    { value: "A-external", label: "A - External" },
    { value: "B-internal", label: "B - Internal" },
    { value: "C-spare", label: "C - Spare" }
  ],
}


const pdpConfiguration = {
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
          "10A":[],
          "20A":[],
          "30A":[],
          "40A":[],
          "60A":[],
          "70A":[],
          "100A":[],
          "250A":[],
        }

        return branchCircuit;
  },
  createBranchCircuits: (numberOfDrps) => {
    var newPwrDrops = []
    for(let i=0; i<numberOfDrps; i++){
        var newPwrDrop = pdpConfiguration.createBranchCircuit();
        newPwrDrops.push(newPwrDrop);
    }
    return newPwrDrops;
  },

  createHotPowerBranchCircuit: () => {
    return {
      HotPwrDropType: "Spare",
      HotPwrDrp_Target_Location: "",
      HotPwrDrp_Target_DT: "",
      HotPwrDrp_Target_Desc: "",
    }
  },

  create: () => { 
    const pdp = {name:"", 
      amp:0, 
      FLA:0, 
      location:"", 
      enclosureSize:"",
      numberOfBusBar:0,
      branchCircuit:pdpConfiguration.initializeBranchCircuits(),
      spare10A:0,
      spare20A:0,
      spare30A:0,
      spare40A:0,
      spare60A:0,
      spare70A:0,
      spare100A:0,
      spare250A:0,
      Opt_SurgeProtectionDevice:false,
      PwrMonitorEnable:false,
      Opt_HotPwrEnable:false,
      hotPowerDrops:[],
    }

    return pdp;
  },

  generateData: (pdps) => {
      pdps.forEach(pdp => {
        const numberOfBusBar = pdpParser.getNumberOfBusBar(pdp.enclosureSize);
        pdp.numberOfBusBar = numberOfBusBar;
      });
      return pdps;
  }
}
const pdpStore = create((set) => ({
    pdps:[],
    setPdps: (pdps) => {
      set({pdps:pdps});
    },    
    addPdps: (numberOfPdp) => {
      set((state) => {
        const diff = numberOfPdp - [...state.pdps].length
        if(diff > 0){
          const pdps = []
          for (let i = 0; i < diff; i++) {
            var pdp = pdpConfiguration.create();
            pdps.push(pdp);
          }  
          return {pdps:[...state.pdps, ...pdps]}
        } else if(diff < 0) {
            let newPdps = [...state.pdps];
            newPdps = newPdps.slice(0, newPdps.length + diff);
            return {pdps:newPdps}
        } else {
          
          return {pdps:[...state.pdps]}
        }
      })
    },

    deletePdp:(index) => {  
      set((state) => {
        return {pdps: [...state.pdps.slice(0, index), ...state.pdps.slice(index + 1)]};
      })
    },
    duplicatePdp:(index) => {  
      set((state) => {
        const newPdp = {...state.pdps[index]}
        return {pdps: [...state.pdps, newPdp]};
      })
    },

    setPdpValue:(indexObject, key, value)=>{
      const index = indexObject.pdpIndex
      set((state) => {
        const newPdps = [...state.pdps];
        newPdps[index] = {...newPdps[index], [key]: value};
        return { pdps: newPdps };
      });
    },

    setBranchCircuitValue:(indexObject, key, value)=>{
      const pdpIndex = indexObject.pdpIndex;
      const branchCircuitIndex = indexObject.branchCircuitIndex;
      const amperage = indexObject.amperage;

      set((state) => {
        const newPdps = [...state.pdps];
        const branches = [...newPdps[pdpIndex].branchCircuit[amperage]]
        const branch = {...newPdps[pdpIndex].branchCircuit[amperage][branchCircuitIndex], [key]:value}
        branches[branchCircuitIndex] = branch;

        newPdps[pdpIndex] = {...newPdps[pdpIndex], 
          branchCircuit:{
            ...newPdps[pdpIndex].branchCircuit, 
            [amperage]:branches,
          }
        };
        return { pdps: newPdps };
      });
    },

    setNumberOfPowerDrps:(index, amperage, value)=>{
      const branchCircuit  = pdpConfiguration.createBranchCircuits(value);

      set((state) => {
        const newPdps = [...state.pdps];
        newPdps[index] = {...newPdps[index], 
          branchCircuit: {...newPdps[index].branchCircuit, [amperage]:branchCircuit},
        };
        return { pdps: newPdps };
      });
    },

    setHotPowerBranchCircuit:(index) => {
      var newPwrDrops = []
      for(let i=0; i<3; i++){
          var newPwrDrop = pdpConfiguration.createHotPowerBranchCircuit();
          newPwrDrops.push(newPwrDrop);
      }

      set((state) => {
        const newPdps = [...state.pdps];
        newPdps[index] = {...newPdps[index], hotPowerDrops: newPwrDrops};
        return { pdps: newPdps };
      });
    },

    setHotPowerValue:(indexObject, key, value)=>{
      const pdpIndex = indexObject.pdpIndex;
      const hotPowerIndex = indexObject.hotPowerIndex;

      set((state) => {
        const newPdps = [...state.pdps];
        const hotPowerDrops = [...newPdps[pdpIndex].hotPowerDrops]
        hotPowerDrops[hotPowerIndex] = {...hotPowerDrops[hotPowerIndex], [key]:value}

        newPdps[pdpIndex] = {...newPdps[pdpIndex], 
          hotPowerDrops:hotPowerDrops
        };
        return { pdps: newPdps };
      });
    },

}));

export {
  pdpStore,
  pdpConfiguration,
  pdpOptions
}