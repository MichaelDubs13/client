import {create} from "zustand";
import { lineConfiguration } from "./lineStore";
import { v4 as uuidv4 } from 'uuid';
import { projectStore } from "./projectStore";
import {formatToTwoDigits} from './util'

const networkSwitchOptions = {
  deviceTypeSelectionOptions: [
    { value: "SPARE", label: "SPARE" },
    { value: "Device", label: "Device" },
    { value: "Network Switch", label: "Network Switch" }
  ],

  communicationFlowOptions: [
    { value: "In", label: "In" },
    { value: "Out", label: "Out" }
  ],

  networkTypeOptions: [
    { value: "Local", label: "Local" },
    //{ value: "Plant", label: "Plant" }  // uncomment this when Plant is added to the network switch configuration within EEC
  ],

  switchTypeOptions: [
    { value: "Managed", label: "Managed" },
    { value: "Unmanaged", label: "Unmanaged" }
  ],

  switchSpeedOptions: [
    { value: "Gigabit", label: "Gigabit" },
    { value: "Fast", label: "Fast" }
  ],

  ports_8Options: [
    { value: 0, label: 0 },
    { value: 8, label: 8 },
  ],

  ports_8or16Options: [
    { value: 0, label: 0 },
    { value: 8, label: 8 },
    { value: 16, label: 16 },
  ],

  ports_8or16or24Options: [
    { value: 0, label: 0 },
    { value: 8, label: 8 },
    { value: 16, label: 16 },
    { value: 24, label: 24 },
  ],

  cableLengthOptions: [
    { value: "TBD", label: "TBD" },
    { value: 1.5, label: 1.5 },
    { value: 3, label: 3 },
    { value: 5, label: 5 },
    { value: 10, label: 10 },
    { value: 15, label: 15 },
    { value: 20, label: 20 },
  ],
}


const networkSwitchConfiguration = {
   //fetch child component by id
   getItemById:( networkSwitch, id) =>{
    for(let i=0;i<networkSwitch.ports.length;i++){
      const port = networkSwitch.ports[i];
        if(port.data.id === id){   
          return port;
        }
    }

    return null;
  },
  getNetworkSwitchOptions:(networkSwitches)=>{
    const networkSwitchOptions = networkSwitches.map((networkSwitch => {
        const value = lineConfiguration.getDeviceFullName(networkSwitch.location, networkSwitch.switchDT);
        return {label:value, value:value}
    }))

    return networkSwitchOptions;
  },
  getNetworkDropPortOptions:(numberOfPorts, networkType, switchType) => {
    const ports = [];
    for(let i=0;i<numberOfPorts;i++){
      const portNumber = i+1;

      const xCodedPorts = [10,12,14,16];
      var port = "";
      if(networkType === "Local" && switchType === "Managed" && xCodedPorts.includes(portNumber)){
        port = `P${portNumber} (M12 X-Coded)`;
      } else {
        port = `P${portNumber} (M12 D-Coded)`;
      }

      ports.push(port)
    }
    return ports;
  },

  createPort: (parent) => {
    return {
      // change this to the values for the network switch ports
      deviceTypeSelection: "SPARE", // EEC variable name: Device_Type_Selection
      line:parent.line,
      targetLocation: "", // EEC variable name: Target_Location
      targetDT: "", // EEC variable name: NotPLC_Connection_DT
      targetCableLength: "TBD", // EEC variable name: Cable_Length_Selection
      communicationFlow: "Out", // EEC variable name: Interruption_InOrOut
      cascadingSwitch: false, // EEC variable name: Switch_Cascading
      connectedDevice: "", // EEC variable name: Connected_Device
      selectedSwitch: "", // EEC variable name: frmUI_NetworkSwitchSelection
      targetPort: "", // EEC varaible name: frmUI_DevicePortSelection
      UI:{
        expanded:false,
        icon:"/networkPort.png"
      },
      data:{
        type:'networkPort',
        parent:parent,
        id:uuidv4(),
      },
      setValue: function(indexObject, key, value){
        networkSwitchStore.getState().setPortValue(indexObject, key, value);
      },
      getNodeData: function(){
        return [
          this.deviceTypeSelection,
        ]
      }
    }
  },

  create: () => { 
    var networkSwitch = {
       // this is where the variables for the network switch are defined going to the data model
      // below is the first variable example
      line: projectStore.getState().line, // EEC variable name: Switch_Line
      location:"", // EEC variable name: Switch_Location
      switchDT: "", // EEC variable name: Switch_DT
      plcID: "", // EEC variable name: PLC_ID
      networkType: "Local", // EEC variable name: Network_Type_Selection
      localIP: "", // EEC variable name: Local_IP
      plantIP: "", // EEC variable name: Plant_IP
      switchType: "Managed", // EEC variable name: Switch_Type_Selection
      switchSpeed: "Gigabit", // EEC variable name: Switch_Speed_Selection
      power1InLocation: "", // EEC variable name: PWR1_IN_Location
      power1InDT: "", // EEC variable name: PWR1_IN_DT
      power2InLocation: "", // EEC variable name: PWR2_IN_Location
      power2InDT: "", // EEC variable name: PWR2_IN_DT
      powerInLocation: "", // EEC variable name: PWR_IN_Location
      powerInDT: "", // EEC variable name: PWR_IN_DT
      alarmEnable: false, // EEC variable name: Alarm_Output_Selection
      consoleEnable: false, // EEC variable name: Console_Output_Selection
      alarmName: "", // EEC variable name: Alarm_DT
      consuleName: "", // EEC variable name: Console_DT
      ports_8: 0, // EEC variable name: 8_ports
      ports_8or16: 16, // EEC variable name: 8or16_ports
      ports_8or16or24: 0, // EEC variable name: 8or16or24_ports
      ports:[],
      UI:{
        expanded:false,
        icon:"/networkSwitch.png"
      },
      data:{
        type:'networkSwitch',
        id:uuidv4(),
      },
      setValue: function(indexObject, key, value){
        networkSwitchStore.getState().setNetworkSwitchValue(indexObject, key, value);
      },
      getFullName: function() {
        return lineConfiguration.getDeviceFullName(this.location, this.switchDT);
      },
      getPortOptions: function() {
        return networkSwitchConfiguration.getNetworkDropPortOptions(this.ports.length, this.networkType, this.switchType);
      },
      getIndex: function(){
        const networkSwitches = networkSwitchStore.getState().networkSwitches;
        return networkSwitches.findIndex(networkSwitch => networkSwitch.data.id === this.data.id)
      },
      getItemById: function(id){
        return networkSwitchConfiguration.getItemById(this, id);
      },
      getNodeData: function(){
        return [
          this.switchDT,
        ]
      }
    }
    networkSwitch.ports = networkSwitchConfiguration.initializePorts(16, networkSwitch);
    return networkSwitch;
  },
  
  generateData: (networkSwitches) => {
    return networkSwitches;
  },

  initializePorts: (numberOfPorts, parent) => {
    var ports = [];
    for (let i = 0; i < numberOfPorts; i++) {
      var port = networkSwitchConfiguration.createPort(parent);
      ports.push(port)
    }
    return ports;
  },
  calculateNumberOfPorts: (numberOfPorts, networkSwitch) => {
        // set the numberOfPorts to the value of ports_8, ports_8or16, or ports_8or16or24
        // this will be used to create the ports for the network switch
        // check the values in priority order
        if (networkSwitch.networkType === "Local" && networkSwitch.switchType === "Unmanaged") {
          numberOfPorts = networkSwitch.ports_8;
        } else if (networkSwitch.networkType === "Local" && networkSwitch.switchType === "Managed") {
          numberOfPorts = networkSwitch.ports_8or16;
        } else if (networkSwitch.networkType === "Plant" && networkSwitch.switchType === "Fast") {
          numberOfPorts = networkSwitch.ports_8or16;
        } else if (networkSwitch.networkType === "Plant" && networkSwitch.switchSpeed === "Gigabit") {
          numberOfPorts = networkSwitch.ports_8or16or24;
        }
        return numberOfPorts;
  }
}
const networkSwitchStore = create((set,get) => ({
    networkSwitches:[],
    networkSwitchesOptions:[],
    /**
         * Replace current networkSwitches objects with input networkSwitches objects, this is used to set pdp data from excel sheet/save files
         * @param {Array} networkSwitches 
         */
    setNetworkSwitches: (networkSwitches) => {
      set({networkSwitches:networkSwitches});
    },
    setNetworkSwitchesOptions:(networkSwitches)=>{
      var networkSwitchesOptions= networkSwitchConfiguration.getNetworkSwitchOptions(networkSwitches);
      set({networkSwitchesOptions:networkSwitchesOptions});
    },
    /**
     * Set networkSwitches and update networkSwitchOptions
     * @param {*} networkSwitches 
     */
    setNetworkSwitches: (networkSwitches) => {
      set({networkSwitches:networkSwitches});
      get().setNetworkSwitchesOptions(networkSwitches);
    },
    /**
     * Update networkSwitches and update networkSwitchOptions
     * @param {*} numberOfNetworkSwitch 
     */    
    addNetworkSwitches: (numberOfNetworkSwitch) => {
      set((state) => {
        const diff = numberOfNetworkSwitch - [...state.networkSwitches].length
        if(diff > 0){
          const networkSwitches = []
          for (let i = 0; i < diff; i++) {
            var networkSwitch = networkSwitchConfiguration.create();
            networkSwitches.push(networkSwitch);
          }
          let newNetworkSwitches =[...state.networkSwitches, ...networkSwitches]  
          get().setNetworkSwitchesOptions(newNetworkSwitches);
          return {networkSwitches:newNetworkSwitches}
        } else if(diff < 0) {
          let newNetworkSwitches = [...state.networkSwitches];
          newNetworkSwitches = newNetworkSwitches.slice(0, newNetworkSwitches.length + diff);
          get().setNetworkSwitchesOptions(newNetworkSwitches);
          return {networkSwitches:newNetworkSwitches}
        } else {
          return {networkSwitches:[...state.networkSwitches]}
        }
      })    
    },

  /**
   * Update networkSwitch by index and update networkSwitchOptions
   * @param {*} index 
   */
  deleteNetworkSwitch:(index) => {  
    set((state) => {
      let newNetworkSwitches = [...state.networkSwitches.slice(0, index), ...state.networkSwitches.slice(index + 1)];
      get().setNetworkSwitchesOptions(newNetworkSwitches); 
      return {networkSwitches: newNetworkSwitches};
    })
  },
  duplicateNetworkSwitches:(index) => {  
    set((state) => {
      const newNetworkSwitch = {...state.networkSwitches[index]}
      const newNetworkSwitches = [...state.networkSwitches, newNetworkSwitch]
      get().setNetworkSwitchesOptions(newNetworkSwitches); 
      return {networkSwitches: newNetworkSwitches};
    })
  },

  setNetworkSwitchValue:(indexObject, key, value)=>{
    const index = indexObject.networkSwitchIndex
    set((state) => {
      const newNetworkSwitches = [...state.networkSwitches];
      newNetworkSwitches[index] = {...newNetworkSwitches[index], [key]: value};
      get().setNetworkSwitchesOptions(newNetworkSwitches);
      return { networkSwitches: newNetworkSwitches };
    });
  },

    
  // this is for sub components under network switch
  // this would be for the ports in this case
  setNumberOfPorts:(index, numberOfPorts)=>{
      set((state) => {

        const newNetworkSwitches = [...state.networkSwitches];
        newNetworkSwitches[index] = {...newNetworkSwitches[index]};
       
        // create the ports for the network switch
        numberOfPorts = networkSwitchConfiguration.calculateNumberOfPorts(numberOfPorts, newNetworkSwitches[index]);
        var ports = [];
        for (let i = 0; i < numberOfPorts; i++) {
          var port = networkSwitchConfiguration.createPort(newNetworkSwitches[index]);
          ports.push(port)
        }
        newNetworkSwitches[index].ports = ports;
        return { networkSwitches: newNetworkSwitches };
      });
    },
    setPortValue:(indexObject, key, value)=>{
      const networkSwitchIndex = indexObject.networkSwitchIndex;
      const portIndex = indexObject.portIndex;

      set((state) => {
        const newNetworkSwitches = [...state.networkSwitches];
        const ports = [...newNetworkSwitches[networkSwitchIndex].ports]
        ports[portIndex] = {...ports[portIndex], [key]:value}

        newNetworkSwitches[networkSwitchIndex] = {...newNetworkSwitches[networkSwitchIndex], 
          ports:ports
        };
        return { networkSwitches: newNetworkSwitches };
      });
    }, 
}));

export {
  networkSwitchStore,
  networkSwitchConfiguration,
  networkSwitchOptions
}