import {create} from "zustand";
import { lineConfiguration } from "./lineStore";
import {addItems, setModelValue, setNumberOfItems} from './util'
import { safetyGateGroupModel } from "./Models/SafetyGates/safetyGateGroupModel";
import { safetyGateSwitchModel } from "./Models/SafetyGates/safetyGateSwitchModel";
import { createJSONStorage, persist } from 'zustand/middleware';

const safetyGateOptions = {
  // example of dropdown options for the safet gate switch parameters
  gateSwitchTypeOptions: [
    {label:"Hardwired", value:"Hardwired"},
    {label:"Ethernet", value:"Ethernet"},
    {label:"PROFINET", value:"PROFINET"},
  ],

  gateSwitchHandleOptions: [
    {label:"Left", value:"Left"},
    {label:"Right", value:"Right"},
  ],
}


const safetyGateConfiguration = {
  getSafetyGateOptions:(safetyGates)=>{
    const safetyGateOptions = safetyGates.map((safetyGate => {
        const value = lineConfiguration.getDeviceFullName(safetyGate.location, safetyGate.deviceTag);
        return {label:value, value:value}
    }))

    return safetyGateOptions;
  },

  generateData: (safetyGates) => {
    return safetyGates;
  },

}
  
const safetyGateStore = create(
    persist(
    (set,get) => ({
    wipSafetyGateSwitch:{},
    safetyGates:[],
    safetyGatesOptions:[],
    setWipSafetyGateSwitch: (gate) => {
      set({wipSafetyGateSwitch:gate});
    },
    addWipSafetyGateSwitch: () => {
      set((state) => {
        const newGate = {...state.wipSafetyGateSwitch}
        let newSafetyGates = [...state.safetyGates]
        const index = newSafetyGates.findIndex(group => group.location === newGate.location && group.line === newGate.line);
        if(index > -1){
          newGate.data.parent = newSafetyGates[index];
          newSafetyGates[index].safetyGateSwitches = [...newSafetyGates[index].safetyGateSwitches,newGate ]
        } else {
          const newSafetyGate = safetyGateGroupModel.create();
          newSafetyGate.line = newGate.line;
          newSafetyGate.location = newGate.location;
          newGate.data.parent = newSafetyGate;
          newSafetyGate.safetyGateSwitches.push(newGate);
          newSafetyGates = [...newSafetyGates, newSafetyGate]
        }
        
        return {safetyGates:newSafetyGates}
      })    
    },
    setSafetyGatesOptions:(safetyGates)=>{
      var safetyGatesOptions= safetyGateConfiguration.getSafetyGateOptions(safetyGates);
      set({safetyGatesOptions:safetyGatesOptions});
    },
    /**
     * Set safetyGates and update safetyGateOptions
     * @param {*} safetyGates 
     */
    setSafetyGates: (safetyGates) => {
      set({safetyGates:safetyGates});
      get().setSafetyGatesOptions(safetyGates);
    },
    /**
     * Update safetyGates and update safetyGateOptions
     * @param {*} numberOfSafetyGate 
     */    
    addSafetyGates: (numberOfSafetyGate) => {
      set((state) => {
        let newSafetyGates =[...state.safetyGates];
        newSafetyGates = addItems(newSafetyGates, numberOfSafetyGate, safetyGateGroupModel.create);
        return {safetyGates:newSafetyGates}
      })    
    },

  /**
   * Update safeyGate by index and update safetyGateOptions
   * @param {*} index 
   */
  deleteSafetyGate:(index) => {  
    set((state) => {
      let newSafetyGates = [...state.safetyGates.slice(0, index), ...state.safetyGates.slice(index + 1)];
      get().setSafetyGatesOptions(newSafetyGates); 
      return {safetyGates: newSafetyGates};
    })
  },
  duplicateSafetyGates:(index) => {  
    set((state) => {
      const newSafetyGate = {...state.safetyGates[index]}
      const newSafetyGates = [...state.safetyGates, newSafetyGate]
      get().setSafetyGatesOptions(newSafetyGates); 
      return {safetyGates: newSafetyGates};
    })
  },

  setSafetyGateValue:(item, key, value,isUI,isData)=>{
    const indexObject = item.getIndexObject();
    const index = indexObject.safetyGateIndex
    set((state) => {
      const newSafetyGates = [...state.safetyGates];
      setModelValue(newSafetyGates[index], key, value, isUI, isData);
      get().setSafetyGatesOptions(newSafetyGates);
      return { safetyGates: newSafetyGates };
    });
  },

  setNumberOfSafetyGateSwitches:(index, numberOfSafetyGateSwitches)=>{
      set((state) => {
        const newSafetyGates = [...state.safetyGates];
        newSafetyGates[index].safetyGateSwitches = setNumberOfItems(newSafetyGates[index].safetyGateSwitches, numberOfSafetyGateSwitches, safetyGateSwitchModel.create, newSafetyGates[index]);
        return { safetyGates: newSafetyGates };
      });
  },
  setSafetyGateSwitchValue:(indexObject, key, value,isUI,isData)=>{
    //const indexObject = item.getIndexObject();
    const safetyGateIndex = indexObject.safetyGateIndex;
    const safetyGateSwitchIndex = indexObject.safetyGateSwitchIndex;
    if(Object.keys(indexObject).length > 0){
      set((state) => {
        const newSafetyGates = [...state.safetyGates];
        const safetyGate = newSafetyGates[safetyGateIndex].safetyGateSwitches[safetyGateSwitchIndex]
        setModelValue(safetyGate, key, value, isUI, isData);
        return { safetyGates: newSafetyGates };
      });
    } else {
      set((state) => {
        const newSafetyGateSwitch = {...state.wipSafetyGateSwitch, [key]: value};
        return { wipSafetyGateSwitch: newSafetyGateSwitch };
      });
    }},
    }),
    {
      name: 'eec-state',
      storage: createJSONStorage(() => localStorage),
    }
));

export {
  safetyGateStore,
  safetyGateConfiguration,
  safetyGateOptions
}
