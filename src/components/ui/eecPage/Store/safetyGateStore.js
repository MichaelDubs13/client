import {create} from "zustand";
import { lineConfiguration } from "./lineStore";
import { v4 as uuidv4 } from 'uuid';
import { projectStore } from "./projectStore";
import {formatToTwoDigits} from './util'

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
   //fetch child component by id
   getItemById:( safetyGate, id) =>{
    for(let i=0;i<safetyGate.safetyGateSwitches.length;i++){
      const safetyGateSwitch = safetyGate.safetyGateSwitches[i];
        if(safetyGateSwitch.data.id === id){   
          return safetyGateSwitch;
        }
    }

    return null;
  },
  getSafetyGateOptions:(safetyGates)=>{
    const safetyGateOptions = safetyGates.map((safetyGate => {
        const value = lineConfiguration.getDeviceFullName(safetyGate.location, safetyGate.safetyGateDT);
        return {label:value, value:value}
    }))

    return safetyGateOptions;
  },

  createSafetyGateSwitch: (parent, number) => {
    return {
      // this is where the variables for the network switch are defined going to the data model
        // below is the first variable example
        line: parent?.line, // EEC variable name: safetyGate_Line
        location:parent?.location, // EEC variable name: MountingLocation
        safetyGateDT: number? `GS${formatToTwoDigits(number)}`:'', // EEC variable name: GateSwitch_DT\
        safetyGateSwitchType: "PROFINET", // EEC variable name: GateSwitch_Type
        safetyGateSwitchHandle: "Right", // EEC variable name: GateSwitch_HandleSide
        plcID: "", // EEC variable name: PLC_ID
        localIP: "", // EEC variable name: Local_IP
        gateSwitchCascadingFrom: false, // EEC variable name: CascadingFrom

        powerSourceLine: "", // EEC variable name: PowerLine ***needs to be created in EEC
        powerSourceLocation: "", // EEC variable name: PowerStation
        powerSourceDT: "", // EEC variable name: PowerDT
        
        ethernetSourceLine: "", // EEC variable name: EthernetLine ***needs to be created in EEC
        ethernetSourceLocation: "", // EEC variable name: EthernetStation
        ethernetSourceDT: "", // EEC variable name: EthernetDT
        ethernetSourceDevicePort: "", // EEC variable name: EthernetIn_DevicePort

        safetyGateCascadingTo: false, // EEC variable name: CascadingTo
        safetyGateCascadingToSelection: "", // EEC variable name: frmUI_GateSwitchSelection

        safetyGateCascadingToOutside: false, // EEC variable name: CascadingTo_Outside
        powerTargetLine: "", // EEC variable name: CascadingTo_PowerLine ***needs to be created in EEC
        powerTargetLocation: "", // EEC variable name: CascadingTo_PowerStation
        powerTargetDT: "", // EEC variable name: CascadingTo_PowerDT
        ethernetTargetLine: "", // EEC variable name: CascadingTo_EthernetLine ***needs to be created in EEC
        ethernetTargetLocation: "", // EEC variable name: CascadingTo_EthernetStation
        ethernetTargetDT: "", // EEC variable name: CascadingTo_EthernetDT
        ethernetTargetDevicePort: "", // EEC variable name: CascadingTo_EthernetDT_DevicePort
      UI:{
        expanded:false,
        icon:"/safetyGateSwitch.png"
      },
      data:{
        parent:parent,
        type:'safetyGateSwitch',
        id:uuidv4(),
      },
      setValue: function(indexObject, key, value){
        safetyGateStore.getState().setSafetyGateSwitchValue(indexObject, key, value);
      },
      getNodeData: function(){
        return [
          this.deviceTypeSelection,
        ]
      }
    }
  },

  create: () => { 
    var safetyGate = {
       // this is where the variables for the safety gate switch instances are defined going to the data model
      // below is the first variable example
      line: projectStore.getState().line, // EEC variable name: Switch_Line
      location:"", // EEC variable name: Switch_Location
      safetyGateSwitches:[],
      UI:{
        expanded:false,
        icon:"/safetyGate.png"
      },
      data:{
        type:'safetyGate',
        id:uuidv4(),
      },
      setValue: function(indexObject, key, value){
        safetyGateStore.getState().setSafetyGateValue(indexObject, key, value);
      },
      getFullName: function() {
        return lineConfiguration.getDeviceFullName(this.location, this.switchDT);
      },
      getIndex: function(){
        const safetyGates = safetyGateStore.getState().safetyGates;
        return safetyGates.findIndex(safetyGate => safetyGate.data.id === this.data.id)
      },
      getItemById: function(id){
        return safetyGateConfiguration.getItemById(this, id);
      },
      getNodeData: function(){
        return [
          this.safetyGateDT,
        ]
      }
    }
   
    return safetyGate;
  },
  
  generateData: (safetyGates) => {
    return safetyGates;
  },

}
  
const safetyGateStore = create((set,get) => ({
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
        if(index > 0){
          newGate.data.parent = newSafetyGates[index];
          newSafetyGates[index].safetyGateSwitches = [...newSafetyGates[index].safetyGateSwitches,newGate ]
        } else {
          const newSafetyGate = safetyGateConfiguration.create();
          newSafetyGate.line = newGate.line;
          newSafetyGate.location = newGate.location;
          newGate.data.parent = newSafetyGate;
          newSafetyGate.safetyGateSwitches.push(newGate);
          newSafetyGates = [...newSafetyGates, newSafetyGate]
        }
        
        return {safetyGates:newSafetyGates}
      })    
    },
    /**
     * Replace current safetyGates objects with input safetyGates objects, this is used to set pdp data from excel sheet/save files
     * @param {Array} safetyGates 
     */
    setSafetyGates: (safetyGates) => {
      set({safetyGates:safetyGates});
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
        const diff = numberOfSafetyGate - [...state.safetyGates].length
        if(diff > 0){
          const safetyGates = []
          for (let i = 0; i < diff; i++) {
            var safetyGate = safetyGateConfiguration.create();
            safetyGates.push(safetyGate);
          }
          let newSafetyGates =[...state.safetyGates, ...safetyGates] 
          return {safetyGates:newSafetyGates}
        } else if(diff < 0) {
          let newSafetyGates = [...state.safetyGates];
          newSafetyGates = newSafetyGates.slice(0, newSafetyGates.length + diff);
          return {safetyGates:newSafetyGates}
        } else {
          return {safetyGates:[...state.safetyGates]}
        }
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

  setSafetyGateValue:(indexObject, key, value)=>{
    const index = indexObject.safetyGateIndex
    set((state) => {
      const newSafetyGates = [...state.safetyGates];
      newSafetyGates[index] = {...newSafetyGates[index], [key]: value};
      get().setSafetyGatesOptions(newSafetyGates);
      return { safetyGates: newSafetyGates };
    });
  },

    
  // this is for sub components under safety gate instance
  // this would be for the safety gate switches in this case
  setNumberOfSafetyGateSwitches:(index, numberOfSafetyGateSwitches)=>{
      set((state) => {
        const newSafetyGates = [...state.safetyGates];
        
        const diff = numberOfSafetyGateSwitches - newSafetyGates[index].safetyGateSwitches.length
        if(diff > 0){
          for (let i = 0; i < diff; i++) {
            var safetyGateSwitch = safetyGateConfiguration.createSafetyGateSwitch(newSafetyGates[index], i+1+newSafetyGates[index].safetyGateSwitches.length);
            newSafetyGates[index] = {...newSafetyGates[index], 
              safetyGateSwitches: [...newSafetyGates[index].safetyGateSwitches, safetyGateSwitch],
            };
          }  
        } else if(diff < 0) {
            const safetyGateSwitches = newSafetyGates[index].safetyGateSwitches.slice(0, newSafetyGates[index].safetyGateSwitches.length + diff);
            newSafetyGates[index] = {...newSafetyGates[index], 
              safetyGateSwitches: safetyGateSwitches,
            };
        }
        return { safetyGates: newSafetyGates };
      });
    },
    setSafetyGateSwitchValue:(indexObject, key, value)=>{
      const safetyGateIndex = indexObject.safetyGateIndex;
      const safetyGateSwitchIndex = indexObject.safetyGateSwitchIndex;
      if(Object.keys(indexObject).length > 0){
        set((state) => {
          const newSafetyGates = [...state.safetyGates];
          const safetyGateSwitches = [...newSafetyGates[safetyGateIndex].safetyGateSwitches]
          safetyGateSwitches[safetyGateSwitchIndex] = {...safetyGateSwitches[safetyGateSwitchIndex], [key]:value}

          newSafetyGates[safetyGateIndex] = {...newSafetyGates[safetyGateIndex], 
            safetyGateSwitches:safetyGateSwitches
          };
          return { safetyGates: newSafetyGates };
        });
      } else {
        set((state) => {
          const newSafetyGateSwitch = {...state.wipSafetyGateSwitch, [key]: value};
          return { wipSafetyGateSwitch: newSafetyGateSwitch };
        });
      }},
}));

export {
  safetyGateStore,
  safetyGateConfiguration,
  safetyGateOptions
}
