import {create} from "zustand";
import {addItems, setModelValue} from './util'
import {  pdpModel } from "./Models/PDPs/pdpModel";
import { hotPowerBranchCircuitModel } from "./Models/PDPs/hotPowerBranchCircuitModel";
import { branchCircuitModel } from "./Models/PDPs/branchCircuitModel";
import { persist, createJSONStorage  } from 'zustand/middleware';


const pdpOptions = {
  amperageOptions: [
    { value: "200A", label: "200A" },
    { value: "400A", label: "400A" },
    { value: "600A", label: "600A" }
  ],

  enclosureSizeOptions:[
    { value: "800x1400x500(WHD)", label: "800x1400x500(WHD)" },
    { value: "1000x1800x500(WHD)", label: "1000x1800x500(WHD)" }
  ],

  hotPwrDropTypeOptions: [
    { value: "Spare", label: "Spare" },
    { value: "Device", label: "Device" }
  ],

  dropTypeOptions: [
    { value: "A-external", label: "A-external" },
    { value: "B-internal", label: "B-internal" },
    { value: "C-spare", label: "C-spare" }
  ],
}


const pdpConfiguration = {
  calculateAllBranchFLA:(pdp)=>{
    Object.keys(pdp).forEach(key => {
        pdpConfiguration.calculateBranchFLA(pdp.branchCircuit[key])
    })
  },
  calculateBranchFLA:(branchCircuits)=>{
    var fla = 0;
    branchCircuits.forEach(branchCircuit => {
        fla = fla + branchCircuit.TargetDevice_FLA;
    })

    branchCircuits.forEach(branchCircuit => {
        branchCircuit.targetFLA_Total = fla;
    })
},
  getItemById:(pdp, id) =>{
    const branchCircuit = pdp.branchCircuit;
    const keys = Object.keys(branchCircuit).reverse();
    for(let i=0;i<keys.length;i++){
      const key = keys[i];
      for(let j=0;j<branchCircuit[key].length;j++){
        const drop = branchCircuit[key][j];
        if(drop.data.id === id)return drop;
      }
    }

    return null;
  },
  
  getCB:(branchCircuit, cb_dt) =>{
    const keys = Object.keys(branchCircuit).reverse();
    for(let i=0;i<keys.length;i++){
      const key = keys[i];
      for(let j=0;j<branchCircuit[key].length;j++){
        const drop = branchCircuit[key][j];
        if(drop.UI.CB_DT === cb_dt) return drop;
      }
    }

    return null;
  },

  /**
   * Update CB_DT value in the UI object, this should be called after CB creation, this is to generate a list a CB identifier for the PDP
   * @param {*} branchCircuit all branchCircuits in a PDP
   * @returns 
   */
  updateBranchCircuitCB_DT:(branchCircuit) => {
    var i = 1;
    Object.keys(branchCircuit).reverse().forEach(key => {
      branchCircuit[key].forEach(drop => {
        drop.UI.CB_DT = `CB${i}`;
        i = i +1;
      })
    });
    return branchCircuit;  
  },
  createBranchCircuits: (numberOfDrps, parent, amperage) => {
    var newPwrDrops = []
    for(let i=0; i<numberOfDrps; i++){
        var newPwrDrop = branchCircuitModel.create(parent, amperage);
        newPwrDrops.push(newPwrDrop);
    }
    return newPwrDrops;
  },
}
const pdpStore = create()(
  persist(
    (set) => ({
    pdps:[],
    /**
     * Replace current pdps objects with input pdp objects, this is used to set pdp data from excel sheet/save files
     * @param {Array} pdps 
     */
    setPdps: (pdps) => {
      set({pdps:pdps});
    },
    /**
     * Add additional pdps objects, example:if numberOfPdp specified in the input is 5 and current number of Pdps is 3,
     * an addition of 2 pdps with default values will be added
     * @param {Number} numberOfPdp 
     */    
    addPdps: (numberOfPdp) => {
      set((state) => {
        let newPdps = [...state.pdps];
        newPdps = addItems(newPdps, numberOfPdp, pdpModel.create);
        return {pdps:newPdps}
      })
    },
    /**
     * delete target pdp, this function use index to find the target pdp.
     * @param {Number} index 
     */
    deletePdp:(index) => {  
      set((state) => {
        return {pdps: [...state.pdps.slice(0, index), ...state.pdps.slice(index + 1)]};
      })
    },
    /**
     * add an copy of target pdp, this function use index to find the target pdp.
     * @param {Number} index 
     */
    duplicatePdp:(index) => {  
      set((state) => {
        const newPdp = {...state.pdps[index]}
        return {pdps: [...state.pdps, newPdp]};
      })
    },

    /**
     * update a parameter of the target pdp with a new value, this function use index to find the target pdp.
     * @param {Object} indexObject json object containing index of target pdp
     * @param {String} key name of the parameter
     * @param {String} value value of the parameter
     */
    setPdpValue:(item, key, value, isUI, isData)=>{
      const indexObject = item.getIndexObject();
      const index = indexObject.pdpIndex
      set((state) => {
        const newPdps = [...state.pdps];
        setModelValue(newPdps[index], key, value, isUI, isData);
        return { pdps: newPdps };
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
    setBranchCircuitValue:(item, key, value, isUI, isData)=>{
      const indexObject = item.getIndexObject();
      const pdpIndex = indexObject.pdpIndex;
      const branchCircuitIndex = indexObject.branchCircuitIndex;
      const amperage = indexObject.amperage;
      set((state) => {
        const newPdps = [...state.pdps];
        const branches = newPdps[pdpIndex].branchCircuit[amperage];
        var branch = branches[branchCircuitIndex];
        setModelValue(branch, key, value, isUI, isData);
        return { pdps: newPdps };
      });
    },

    /**
     * Creates X number of the powerDrops in a target branchCircuit 
     * @param {Object} index index of the target pdp
     * @param {String} amperage key of the branchCircuits to be updated, 
     * @param {String} value numberOfBranchCircuit to be created
     */
    setNumberOfPowerDrps:(index, amperage, value)=>{
      set((state) => {
        var newPdps = [...state.pdps];
        var branchCircuit  = pdpConfiguration.createBranchCircuits(value, newPdps[index], amperage);
        newPdps[index].branchCircuit[amperage] = branchCircuit;
        branchCircuit = pdpConfiguration.updateBranchCircuitCB_DT(newPdps[index].branchCircuit);
        return { pdps: newPdps };
      });
    },
 
    /**
     * Creates 3 instances of the hotpoweritems for target pdp, this function uses index to find the target pdp
     * @param {Number} index index of the target pdp
     */
    setHotPowerBranchCircuit:(item) => {
      const indexObject = item.getIndexObject();
      const pdpIndex = indexObject.pdpIndex;

      var newPwrDrops = []
      for(let i=0; i<3; i++){
          var newPwrDrop = hotPowerBranchCircuitModel.create(item);
          newPwrDrops.push(newPwrDrop);
      }

      set((state) => {
        const newPdps = [...state.pdps];
        newPdps[pdpIndex].hotPowerDrops = newPwrDrops;
        return { pdps: newPdps };
      });
    },

     /**
     * update a parameter of the target HotPower with a new value, this function use index to find the target pdp and 
     * another index to find target hotPower
     * @param {Object} indexObject json object containing index of target pdp and index of target HotPower
     * @param {String} key name of the parameter
     * @param {String} value value of the parameter
     */
    setHotPowerValue:(item, key, value,isUI, isData)=>{
      const indexObject = item.getIndexObject();
      const pdpIndex = indexObject.pdpIndex;
      const hotPowerIndex = indexObject.hotPowerIndex;

      set((state) => {
        const newPdps = [...state.pdps];
        const hotPowerDrops = newPdps[pdpIndex].hotPowerDrops;
        setModelValue(hotPowerDrops[hotPowerIndex] , key, value, isUI, isData);
        return { pdps: newPdps };
      });
    },
  }),
  {
    name: 'eec-state',
    storage: createJSONStorage(() => localStorage),
  }
));

export {
  pdpStore,
  pdpConfiguration,
  pdpOptions
}