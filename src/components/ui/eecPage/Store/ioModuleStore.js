import {create} from "zustand";
import { lineConfiguration } from "./lineStore";
import { v4 as uuidv4 } from 'uuid';
import { projectStore } from "./projectStore";
import {formatToTwoDigits} from './util'

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
   //fetch child component by id
   getItemById:( ioModuleGroup, id) =>{
    for(let i=0;i<ioModuleGroup.ioModules.length;i++){
      const ioModule = ioModuleGroup.ioModules[i];
        if(ioModule.data.id === id){   
          return ioModule;
        }
    }

    return null;
  },
  getIOModuleGroupOptions:(ioModuleGroups)=>{
    const ioModuleGroupOptions = ioModuleGroups.map((ioModuleGroup => {
        const value = lineConfiguration.getDeviceFullName(ioModuleGroup.location, ioModuleGroup.ioModuleDT);
        return {label:value, value:value}
    }))

    return ioModuleGroupOptions;
  },

  createIOModule: (number, parent) => {
    return {
      // this is where the variables for the IO Module Configuration are defined going to the data model
      // below is the first variable example
      line: parent.line, // EEC variable name: ***needs to be created in EEC
      location:parent.location, // EEC variable name: s_frmUI_IOModLocation
      // need to change the default value to toggle between SIO and MIO
      ioModuleDT: `SIO or MIO${formatToTwoDigits(number)}`, // EEC variable name: s_IOModuleDT
      safetyRated: false, // EEC variable name: b_frmUI_SafetyIO

      sioManufacturerName: "Murr", // EEC variable name: s_frmUI_SIOModManuName
      sioParts_AB: "", // EEC variable name: s_frmUI_SIOModuleParts_A_B
      sioParts_Beckhoff: "", // EEC variable name: s_frmUI_SIOModuleParts_Beckhoff
      sioParts_Murr: "55557", // EEC variable name: s_frmUI_SIOModuleParts_Murr
      sioParts_Siemens: "", // EEC variable name: s_frmUI_SIOModuleParts_Siemens

      mioManufacturerName: "Balluff", // EEC variable name: s_frmUI_MIOModManuName
      mioParts_Balluff: "BNI005H", // EEC variable name: s_frmUI_MIOModuleParts_Balluff
      mioParts_Beckhoff: "", // EEC variable name: s_frmUI_MIOModuleParts_Beckhoff
      mioParts_PF: "", // EEC variable name: s_frmUI_MIOModuleParts_P_F
      mioParts_Siemens: "", // EEC variable name: s_frmUI_MIOModuleParts_Siemens
      mioParts_Turck: "", // EEC variable name: s_frmUI_MIOModuleParts_Turck

      localIP: "192.168.1.x", // EEC variable name: s_frmUI_IOModIPv_IP_Address
      opMode: "01", // EEC variable name: s_frmUI_OpMode

      portTypeDefaultSelection: "", // EEC variable name: s_frmUI_DefaultPortTypeSelection

      // ***************************************************************************************
      // These variables are for the individual ports (pin 4 and pin 2) of the IO Module
      portCounter: "",
      pinType: "", // EEC variable name: s_pin_type_selected
      pinDescription: "", // EEC variable name: s_pin_description
      pinAddress: "", // EEC variable name: s_pin_PLCaddress
      pinTargetPartNumber: "", // EEC variable name: s_TargetDevicePartNumber
      pinTargetLocation: "", // EEC variable name: s_TargetDeviceLocation
      pinTargetDT: "", // EEC variable name: s_TargetDeviceDT
      // ***************************************************************************************

      UI:{
        expanded:false,
        icon:"/ioModule.png"
      },
      data:{
        parent:parent,
        type:'ioModule',
        id:uuidv4(),
      },
      setValue: function(indexObject, key, value){
        ioModuleStore.getState().setIOModuleValue(indexObject, key, value);
      },
      getNodeData: function(){
        return [
          this.deviceTypeSelection,
        ]
      }
    }
  },

  create: () => { 
    var ioModuleGroup = {
       // this is where the variables for the IO Modules Collection Instances are defined going to the data model
      // below is the first variable example
      line: projectStore.getState().line, // EEC variable name: s_frmUI_IOModLine ***needs to be created in EEC
      location:"", // EEC variable name: s_frmUI_IOModLocation
      plcID:"", // EEC variable name: PLC_ID
      powerSourceLine:"", // EEC variable name: s_frmUI_IOModPSUSourceLine ***needs to be created in EEC
      powerSourceLocation:"", // EEC variable name: s_frmUI_IOModPSUSourceLocation
      powerSourceDT:"", // EEC variable name: s_frmUI_IOModPSUSourceDT
      ethernetSourceLine:"", // EEC variable name: s_frmUI_IOModNetworkSourceLine ***needs to be created in EEC
      ethernetSourceLocation:"", // EEC variable name: s_frmUI_IOModNetworkSourceLocation
      ethernetSourceDT:"", // EEC variable name: s_frmUI_IOModNetworkSourceDT
      ethernetSourceDevicePort:"", // EEC variable name: s_frmUI_IOModNetworkSourcePort

      ioModules:[],
      UI:{
        expanded:false,
        icon:"/ioModule.png"
      },
      data:{
        type:'ioModuleGroup',
        id:uuidv4(),
      },
      setValue: function(indexObject, key, value){
        ioModuleStore.getState().setIOModuleGroupValue(indexObject, key, value);
      },
      getFullName: function() {
        return lineConfiguration.getDeviceFullName(this.location, this.switchDT);
      },
      getIndex: function(){
        const ioModuleGroups = ioModuleStore.getState().ioModuleGroups;
        return ioModuleGroups.findIndex(ioModuleGroup => ioModuleGroup.data.id === this.data.id)
      },
      getItemById: function(id){
        return ioModuleGroupConfiguration.getItemById(this, id);
      },
      getNodeData: function(){
        return [
          this.ioModuleDT,
        ]
      }
    }
   
    return ioModuleGroup;
  },
  
  generateData: (ioModuleGroups) => {
    return ioModuleGroups;
  },

}
  
const ioModuleStore = create((set,get) => ({
    ioModuleGroups:[],
    ioModuleGroupsOptions:[],
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
        const diff = numberOfIOModuleGroup - [...state.ioModuleGroups].length
        if(diff > 0){
          const ioModuleGroups = []
          for (let i = 0; i < diff; i++) {
            var ioModuleGroup = ioModuleGroupConfiguration.create();
            ioModuleGroups.push(ioModuleGroup);
          }
          let newIOModuleGroups =[...state.ioModuleGroups, ...ioModuleGroups] 
          return {ioModuleGroups:newIOModuleGroups}
        } else if(diff < 0) {
          let newIOModuleGroups = [...state.ioModuleGroups];
          newIOModuleGroups = newIOModuleGroups.slice(0, newIOModuleGroups.length + diff);
          return {ioModuleGroups:newIOModuleGroups}
        } else {
          return {ioModuleGroups:[...state.ioModuleGroups]}
        }
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

  setIOModuleGroupValue:(indexObject, key, value)=>{
    const index = indexObject.ioModuleGroupIndex
    set((state) => {
      const newIOModuleGroups = [...state.ioModuleGroups];
      newIOModuleGroups[index] = {...newIOModuleGroups[index], [key]: value};
      get().setIOModuleGroupsOptions(newIOModuleGroups);
      return { ioModuleGroups: newIOModuleGroups };
    });
  },

    
  // this is for sub components under IO Module Collection
  // this would be for the IO Modules in this case
  setNumberOfIOModules:(index, numberOfIOModules)=>{
      set((state) => {
        const newIOModuleGroups = [...state.ioModuleGroups];
        
        const diff = numberOfIOModules - newIOModuleGroups[index].ioModules.length
        if(diff > 0){
          for (let i = 0; i < diff; i++) {
            var ioModule = ioModuleGroupConfiguration.createIOModule(i+1,newIOModuleGroups[index]);
            newIOModuleGroups[index] = {...newIOModuleGroups[index], 
              ioModules: [...newIOModuleGroups[index].ioModules, ioModule],
            };
          }  
        } else if(diff < 0) {
            const ioModules = newIOModuleGroups[index].ioModules.slice(0, newIOModuleGroups[index].ioModules.length + diff);
            newIOModuleGroups[index] = {...newIOModuleGroups[index], 
              ioModules: ioModules,
            };
        }
        return { ioModuleGroups: newIOModuleGroups };
      });
    },
    setIOModuleValue:(indexObject, key, value)=>{
      const ioModuleGroupIndex = indexObject.ioModuleGroupIndex;
      const ioModuleIndex = indexObject.ioModuleIndex;

      set((state) => {
        const newIOModuleGroups = [...state.ioModuleGroups];
        const ioModules = [...newIOModuleGroups[ioModuleGroupIndex].ioModules]
        ioModules[ioModuleIndex] = {...ioModules[ioModuleIndex], [key]:value}

        newIOModuleGroups[ioModuleGroupIndex] = {...newIOModuleGroups[ioModuleGroupIndex], 
          ioModules:ioModules
        };
        return { ioModuleGroups: newIOModuleGroups };
      });
    }, 
}));

export {
  ioModuleStore,
  ioModuleGroupConfiguration,
  ioModuleGroupOptions
}
