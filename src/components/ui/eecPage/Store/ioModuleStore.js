import {create} from "zustand";
import { lineConfiguration } from "./lineStore";
import {addItems, circularReplacer, setModelValue, setNumberOfItems} from './util'
import { ioModuleGroupModel } from "./Models/IoModules/ioModuleGroupModel";
import { ioModuleModel } from "./Models/IoModules/ioModuleModel";
import { createJSONStorage, persist } from 'zustand/middleware';

const ioModuleGroupOptions = {
  // example of dropdown options for the IO Module parameters
  sioManufacturerNameOptions: [
    {label:"A-B (WIP)", value:"A-B (WIP)"},
    {label:"Beckhoff (WIP)", value:"Beckhoff (WIP)"},
    {label:"Murr", value:"Murr"},
    {label:"Siemens (WIP)", value:"Siemens (WIP)"},
  ],

  sioParts_ABOptions: [
    {label:"NULL", value:"NULL"},
  ],

  sioParts_BeckhoffOptions: [
    {label:"NULL", value:"NULL"},
  ],

  sioParts_MurrOptions: [
    {label:"55556", value:"55556"},
    {label:"55557", value:"55557"},
  ],

  sioParts_SiemensOptions: [
    {label:"NULL", value:"NULL"},
  ],

  mioManufacturerNameOptions: [
    {label:"Balluff", value:"Balluff"},
    {label:"Beckhoff (WIP)", value:"Beckhoff (WIP)"},
    {label:"P+F (WIP)", value:"P+F (WIP)"},
    {label:"Siemens (WIP)", value:"Siemens (WIP)"},
    {label:"Turck (WIP)", value:"Turck (WIP)"},
  ],

  mioParts_BalluffOptions: [
    {label:"BNI00AZ", value:"BNI00AZ"},
    {label:"BNI00FW", value:"BNI00FW"},
    {label:"BNI00HL", value:"BNI00HL"},
    {label:"BNI005H", value:"BNI005H"},
    {label:"BNI0052", value:"BNI0052"},
  ],

  mioParts_BeckhoffOptions: [
    {label:"NULL", value:"NULL"},
  ],

  mioParts_PFOptions: [
    {label:"NULL", value:"NULL"},
  ],

  mioParts_SiemensOptions: [
    {label:"NULL", value:"NULL"},
  ],

  mioParts_TurckOptions: [
    {label:"NULL", value:"NULL"},
  ],

  opModeOptions: [
    {label:"01", value:"01"},
    {label:"02", value:"02"},
    {label:"03", value:"03"},
    {label:"04", value:"04"},
    {label:"05", value:"05"},
    {label:"06", value:"06"},
    {label:"07", value:"07"},
    {label:"08", value:"08"},
    {label:"09", value:"09"},
    {label:"10", value:"10"},
  ],

  portTypeDefaultSelectionOptions: [
    {label:"IO-Link", value:"IO-Link"},
    {label:"Input", value:"Input"},
    {label:"Output", value:"Output"},
  ],

  portTypeDefaultSelection_Balluff_BNI0052Options: [
    {label:"Input", value:"Input"},
    {label:"Output", value:"Output"},
  ],
}


const ioModuleGroupConfiguration = {
  getIOModuleGroupOptions:(ioModuleGroups)=>{
    const ioModuleGroupOptions = ioModuleGroups.map((ioModuleGroup => {
        const value = lineConfiguration.getDeviceFullName(ioModuleGroup.location, ioModuleGroup.ioModuleDT);
        return {label:value, value:value}
    }))

    return ioModuleGroupOptions;
  },
}
  
const ioModuleStore = create(
  persist((set,get) => ({
    ioModuleGroups:[],
    ioModuleGroupsOptions:[],
    wipIoModule:{},
    setWipIoModule: (ioModule) => {
         set({wipIoModule:ioModule});
    },
    addWipIoModule: () => {
      set((state) => {
        const newIoMOdule = {...state.wipIoModule}
        let newIoModuleGroups = [...state.ioModuleGroups]
        const index = newIoModuleGroups.findIndex(group => group.location === newIoMOdule.location && group.line === newIoMOdule.line);
        if(index > -1){
          newIoMOdule.data.parent = newIoModuleGroups[index];
          newIoModuleGroups[index].ioModules = [...newIoModuleGroups[index].ioModules,newIoMOdule ]
        } else {
          const newIoModuleGroup = ioModuleGroupModel.create();
          newIoModuleGroup.line = newIoMOdule.line;
          newIoModuleGroup.location = newIoMOdule.location;
          if(newIoMOdule.powerSourceLine)newIoModuleGroup.powerSourceLine = newIoMOdule.powerSourceLine;
          if(newIoMOdule.powerSourceLocation)newIoModuleGroup.powerSourceLocation = newIoMOdule.powerSourceLocation
          if(newIoMOdule.powerSourceDT)newIoModuleGroup.powerSourceDT = newIoMOdule.powerSourceDT
          if(newIoMOdule.ethernetSourceLine)newIoModuleGroup.ethernetSourceLine = newIoMOdule.ethernetSourceLine;
          if(newIoMOdule.ethernetSourceLocation)newIoModuleGroup.ethernetSourceLocation = newIoMOdule.ethernetSourceLocation
          if(newIoMOdule.ethernetSourceDT)newIoModuleGroup.ethernetSourceDT = newIoMOdule.ethernetSourceDT
          if(newIoMOdule.ethernetSourceDevicePort)newIoModuleGroup.ethernetSourceDevicePort = newIoMOdule.ethernetSourceDevicePort
          newIoMOdule.data.parent = newIoModuleGroup;
          newIoModuleGroup.ioModules.push(newIoMOdule);
          newIoModuleGroups = [...newIoModuleGroups, newIoModuleGroup]
        }
        return {ioModuleGroups:newIoModuleGroups}
      })    
    },
    /**
     * Replace current ioModuleGroups objects with input ioModuleGroups objects, this is used to set pdp data from excel sheet/save files
     * @param {Array} ioModuleGroups 
     */
    setIOModuleGroups: (ioModuleGroups) => {
      set({ioModuleGroups:ioModuleGroups});
    },
    setIOModuleGroupsOptions:(ioModuleGroups)=>{
      var ioModuleGroupsOptions= ioModuleGroupConfiguration.getIOModuleGroupOptions(ioModuleGroups);
      set({ioModuleGroupsOptions:ioModuleGroupsOptions});
    },
    /**
     * Set ioModuleGroups and update ioModuleGroupOptions
     * @param {*} ioModuleGroups 
     */
    setIOModuleGroups: (ioModuleGroups) => {
      set({ioModuleGroups:ioModuleGroups});
      get().setIOModuleGroupsOptions(ioModuleGroups);
    },
    /**
     * Update ioModuleGroups and update ioModuleGroupOptions
     * @param {*} numberOfIOModuleGroup 
     */    
    addIOModuleGroups: (numberOfIOModuleGroup) => {
      set((state) => {
        let newIOModuleGroups = [...state.ioModuleGroups];
        newIOModuleGroups = addItems(newIOModuleGroups, numberOfIOModuleGroup, ioModuleGroupModel.create);
        return {ioModuleGroups:newIOModuleGroups}
      })    
    },

  /**
   * Update safeyGate by index and update ioModuleGroupOptions
   * @param {*} index 
   */
  deleteIOModuleGroup:(index) => {  
    set((state) => {
      let newIOModuleGroups = [...state.ioModuleGroups.slice(0, index), ...state.ioModuleGroups.slice(index + 1)];
      get().setIOModuleGroupsOptions(newIOModuleGroups); 
      return {ioModuleGroups: newIOModuleGroups};
    })
  },
  duplicateIOModuleGroups:(index) => {  
    set((state) => {
      const newIOModuleGroup = {...state.ioModuleGroups[index]}
      const newIOModuleGroups = [...state.ioModuleGroups, newIOModuleGroup]
      get().setIOModuleGroupsOptions(newIOModuleGroups); 
      return {ioModuleGroups: newIOModuleGroups};
    })
  },

  setIOModuleGroupValue:(indexObject, key, value,isUI,isData)=>{
    //const indexObject = item.getIndexObject();
    const index = indexObject.ioModuleGroupIndex
    set((state) => {
      const newIOModuleGroups = [...state.ioModuleGroups];
      setModelValue(newIOModuleGroups[index], key, value, isUI, isData);
      get().setIOModuleGroupsOptions(newIOModuleGroups);
      return { ioModuleGroups: newIOModuleGroups };
    });
  },

    
  // this is for sub components under IO Module Collection
  // this would be for the IO Modules in this case
  setNumberOfIOModules:(index, numberOfIOModules)=>{
      set((state) => {
        const newIOModuleGroups = [...state.ioModuleGroups];
        newIOModuleGroups[index].ioModules = setNumberOfItems(newIOModuleGroups[index].ioModules, numberOfIOModules, ioModuleModel.create, newIOModuleGroups[index]);
        return { ioModuleGroups: newIOModuleGroups };
      });
    },
  setIOModuleValue:(indexObject, key, value,isUI,isData)=>{
      //const indexObject = item.getIndexObject();
      const ioModuleGroupIndex = indexObject.ioModuleGroupIndex;
      const ioModuleIndex = indexObject.ioModuleIndex;
      if(Object.keys(indexObject).length > 0){
        set((state) => {
          const newIOModuleGroups = [...state.ioModuleGroups];
          const ioModules = newIOModuleGroups[ioModuleGroupIndex].ioModules
          setModelValue(ioModules[ioModuleIndex], key, value, isUI, isData);
          return { ioModuleGroups: newIOModuleGroups };
        });
      } else {
        set((state) => {
          const newIoModule = {...state.wipIoModule, [key]: value};
          return { wipIoModule: newIoModule };
        });
      }
    },
    setIOModulePortType:(indexObject, value)=>{
      const ioModuleGroupIndex = indexObject.ioModuleGroupIndex;
      const ioModuleIndex = indexObject.ioModuleIndex;
      set((state) => {
        const newIOModuleGroups = [...state.ioModuleGroups];
        const ioModule = newIOModuleGroups[ioModuleGroupIndex].ioModules[ioModuleIndex];
        for(let i=0;i<ioModule.ports.length;i++){
          ioModule.ports[i].pinType = value;
        }
        return { ioModuleGroups: newIOModuleGroups };
      });
    },
    setPortValue:(indexObject, key, value,isUI,isData)=>{
      //const indexObject = item.getIndexObject();
      const ioModuleGroupIndex = indexObject.ioModuleGroupIndex;
      const ioModuleIndex = indexObject.ioModuleIndex;
      const ioPortIndex = indexObject.ioPortIndex;
      if(Object.keys(indexObject).length > 0){
        set((state) => {
          const newIOModuleGroups = [...state.ioModuleGroups];
          const port = newIOModuleGroups[ioModuleGroupIndex].ioModules[ioModuleIndex].ports[ioPortIndex];
          setModelValue(port, key, value, isUI, isData);
          return { ioModuleGroups: newIOModuleGroups };
        });
      } else {
        set((state) => {
          const newIoModule = {...state.wipIoModule, [key]: value};
          return { wipIoModule: newIoModule };
        });
      }
    },  
  }),
  {
    name: 'ioModule-state',
    storage: createJSONStorage(() => localStorage),
    serialize: (state) => {
      return JSON.stringify(state, circularReplacer())
    },
    merge: (state, currentState) => { 
      return ioModuleGroupModel.merge(state, currentState);
    } 
  }
));

export {
  ioModuleStore,
  ioModuleGroupConfiguration,
  ioModuleGroupOptions
}
