import {create} from "zustand";
import { projectStore } from "./projectStore";
import { pdpConfiguration } from "./pdpStore";
import { v4 as uuidv4 } from 'uuid';
import {formatToTwoDigits} from './util'

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
        if(drop.UI.CB_DT = cb_dt) return drop;
      })
    });

    return null;
  },
  
  /**
   * creates a new branch circuit with default values
   * @returns 
   */
  createBranchCircuit: (parent, amperage) => {
    return {
      PwrDrop_Spare: false,
      DropType: "A-external",
      PwrDrop_DescTxt: "",
      dbl_Cable_Length: 0,
      line:parent.line,
      StrBox_DT: "",
      TargetDevice_DT: "",
      TargetDevice_FLA: 0,
      StrBox_DT_FLA: 0,
      UI:{
        CB_DT:"",
        expanded:false,
        icon:"/powerdrop.png",
      },
      //Data can be set without going through zustand
      data:{
        type:'cb',
        parent:parent,
        amperage:amperage,
        targetDevice:'',
        id:uuidv4(),
      },
      setValue: function(indexObject, key, value){
        xpdpStore.getState().setBranchCircuitValue(indexObject, key, value, false);
      },
      setDataValue: function(key, value){
        const pdps = xpdpStore.getState().pdps;
        const pdpIndex = this.data.parent.getIndex();
        const amperage = this.data.amperage;
        const branchCircuitIndex = Array.from(pdps[pdpIndex].branchCircuit[amperage]).indexOf(this);
        const indexObject = {
          pdpIndex:pdpIndex,
          branchCircuitIndex:branchCircuitIndex,
          amperage:amperage,
        }
        xpdpStore.getState().setBranchCircuitValue(indexObject, key, value, false, true);
      },
      getNodeData: function(){
        return [
          this.data.amperage,
          `${this.TargetDevice_FLA}A`,
          `${this.dbl_Cable_Length}m`,
        ]
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
  create: (location) => { 
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
      location:location,
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
        icon:"/panel.png",
      },
      data:{
        type:'xpdp',
        id:uuidv4(),
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
      }
    }  
  },
  createBranchCircuits:(numberOfDrps, parent, amperage) => {
    var newPwrDrops = []
    for(let i=0; i<numberOfDrps; i++){
        var newPwrDrop = xpdpConfiguration.createBranchCircuit(parent, amperage);
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
              const location = `XPDP${formatToTwoDigits(i+1)}`
              var xpdp = xpdpConfiguration.create(location);
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
      set((state) => {
        const newPdps = [...state.xpdps];
        var branchCircuit  = xpdpConfiguration.createBranchCircuits(value, newPdps[index], amperage);
        newPdps[index].branchCircuit[amperage] = branchCircuit;
        branchCircuit = pdpConfiguration.updateBranchCircuitCB_DT(newPdps[index].branchCircuit);
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
      const pdpIndex = indexObject.pdpIndex;
      const branchCircuitIndex = indexObject.branchCircuitIndex;
      const amperage = indexObject.amperage;
      set((state) => {
        const newPdps = [...state.xpdps];
        const branches = newPdps[pdpIndex].branchCircuit[amperage];
        var branch = newPdps[pdpIndex].branchCircuit[amperage][branchCircuitIndex];
        if(isUI){
          branch.UI[key] = value
        } else if(isData){
          branch.data[key] = value
        } else {
          branch[key] = value;
        }
        
        branches[branchCircuitIndex] = branch;

        newPdps[pdpIndex] = {...newPdps[pdpIndex], 
          branchCircuit:{
            ...newPdps[pdpIndex].branchCircuit, 
            [amperage]:branches,
          }
        };
        return { xpdps: newPdps };
      });
    },
   
}));

export {
  xpdpStore,
  xpdpConfiguration,
  xpdpOptions,
}