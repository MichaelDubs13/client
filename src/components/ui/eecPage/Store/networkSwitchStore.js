import {create} from "zustand";
import { lineConfiguration } from "./lineStore";
import {addItems, circularReplacer, setModelValue, setNumberOfItems} from './util'
import { networkSwitchModel } from "./Models/NetworkSwitches/networkSwitchModel";
import { networkPortModel } from "./Models/NetworkSwitches/networkPortModel";
import { createJSONStorage, persist } from 'zustand/middleware';

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
    { value: "1.5 m", label: "1.5 m" },
    { value: "3 m", label: "3 m" },
    { value: "5 m", label: "5 m" },
    { value: "10 m", label: "10 m" },
    { value: "15 m", label: "15 m" },
    { value: "20 m", label: "20 m" },
  ],
}


const networkSwitchConfiguration = {
  getNetworkSwitchOptions:(networkSwitches)=>{
    const networkSwitchOptions = networkSwitches.map((networkSwitch => {
        const value = lineConfiguration.getDeviceFullName(networkSwitch.line, networkSwitch.location, networkSwitch.deviceTag);
        return {label:value, value:value}
    }))

    return networkSwitchOptions;
  },

  getNetworkSwitchWithPortsOptions:(networkSwitches)=>{
    const options = []
    for(let i=0;i<networkSwitches.length;i++){
      const networkSwitch = networkSwitches[i];
      const networkSwitchName = lineConfiguration.getDeviceFullName(networkSwitch.line, networkSwitch.location, networkSwitch.deviceTag);
      for(let j=0;j<networkSwitch.ports.length;j++){
        const port = `P${j+1}`;
        const value = `${networkSwitchName}:${port}`;
        options.push({label:value, value:value})
      }
        
    }

    return options;
  },

  getEthernetNetworkPortOption:(networkType, switchType, portNumber) => {
    const xCodedPorts = [10,12,14,16];
    var port = "";
    if(networkType === "Local" && switchType === "Managed" && xCodedPorts.includes(portNumber)){
      port = `P${portNumber} (M12 X-Coded)`;
    } else {
      port = `P${portNumber} (M12 D-Coded)`;
    }
    return port;
  },
  getEthernetNetworkPortOptions:(numberOfPorts, networkType, switchType) => {
    const ports = [];
    for(let i=0;i<numberOfPorts;i++){
      const portNumber = i+1;
      var port = networkSwitchConfiguration.getEthernetNetworkPortOption(networkType, switchType, portNumber);
      ports.push(port)
    }
    return ports;
  },

  getEthernetPowerPortOptions:(networkType, switchType, switchSpeed) => {
    var ports = [];
    if(networkType === "Local" && switchType === "Managed"){
      ports = [
        "L1 (M12 L-coded)",
        "L2 (M12 L-coded)",
        "FAULT (M12 A-coded)",
        "CONSOLE (M12 B-coded)",
      ]
    } else {
      if(networkType === "Local" && switchType === "Unmanaged"){
        ports = [
          `POWER_IN (7/8")`,
          "ETHERNET (M12 D-coded)",
        ]
      } else if(switchSpeed === "Fast" && networkType === "Plant") {
        ports = [
          `POWER (7/8")`,
          "ETHERNET (M12 D-coded)",
        ]
      }
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
const networkSwitchStore = create(
  persist(
    (set,get) => ({
    wipNetworkSwitch:{},
    networkSwitches:[],
    networkSwitchesOptions:[],
    networkSwitcheWithPortsOptions:[],
    setNetworkSwitchesOptions:(networkSwitches)=>{
      var networkSwitchesOptions= networkSwitchConfiguration.getNetworkSwitchOptions(networkSwitches);
      set({networkSwitchesOptions:networkSwitchesOptions});

      var networkSwitcheWithPortsOptions= networkSwitchConfiguration.getNetworkSwitchWithPortsOptions(networkSwitches);
      set({networkSwitcheWithPortsOptions:networkSwitcheWithPortsOptions});
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
        let newNetworkSwitches = [...state.networkSwitches];
        newNetworkSwitches = addItems(newNetworkSwitches, numberOfNetworkSwitch, networkSwitchModel.create);
        get().setNetworkSwitchesOptions(newNetworkSwitches);
        return {networkSwitches:newNetworkSwitches}
      })    
    },
    setWipNetworkSwitch: (networkSwitch) => {
      set({wipNetworkSwitch:networkSwitch});
    },
    /**
     * Add an WIP networkSwitch to main object array
     * @param {*} networkSwitch 
     */
    addWipNetworkSwitch: () => {
      set((state) => {
        const newNetworkSwitch = {...state.wipNetworkSwitch}
        const newNetworkSwitches = [...state.networkSwitches, newNetworkSwitch]
        return {networkSwitches:newNetworkSwitches}
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

  setNetworkSwitchValue:(indexObject, key, value,isUI, isData)=>{
    //const indexObject = item.getIndexObject();
    const index = indexObject.networkSwitchIndex
    
    if(Object.keys(indexObject).length > 0){
      set((state) => {
        const newNetworkSwitches = [...state.networkSwitches];
        newNetworkSwitches[index] && setModelValue(newNetworkSwitches[index], key, value, isUI, isData);
        get().setNetworkSwitchesOptions(newNetworkSwitches);
        return { networkSwitches: newNetworkSwitches };
      });
    } else {
      set((state) => {
        const newNetworkSwitch = {...state.wipNetworkSwitch, [key]: value};
        return { wipNetworkSwitch: newNetworkSwitch };
      });
    }
  },

  setNumberOfPorts:(index, numberOfPorts)=>{
      set((state) => {
        const newNetworkSwitches = [...state.networkSwitches];
        numberOfPorts = networkSwitchConfiguration.calculateNumberOfPorts(numberOfPorts, newNetworkSwitches[index]);
        newNetworkSwitches[index].ports = setNumberOfItems(newNetworkSwitches[index].ports, numberOfPorts, networkPortModel.create, newNetworkSwitches[index]);
        return { networkSwitches: newNetworkSwitches };
      });
    },
  setPortValue:(indexObject, key, value,isUI,isData)=>{
    //const indexObject = item.getIndexObject();
    const networkSwitchIndex = indexObject.networkSwitchIndex;
    const portIndex = indexObject.portIndex;
    set((state) => {
      if(networkSwitchIndex > -1){
        const newNetworkSwitches = [...state.networkSwitches];
        const ports = newNetworkSwitches[networkSwitchIndex].ports;
        setModelValue(ports[portIndex], key, value, isUI, isData);
        return { networkSwitches: newNetworkSwitches };
      } else {
        var wipNetworkSwitch = {...state.wipNetworkSwitch};
        const ports = wipNetworkSwitch.ports;
        setModelValue(ports[portIndex], key, value, isUI, isData);
        return { wipNetworkSwitch: wipNetworkSwitch };
      }
    });
    }, 
  }),
  {
    name: 'networkswitch-state',
    storage: createJSONStorage(() => localStorage),
    serialize: (state) => {
      return JSON.stringify(state, circularReplacer())
    },
    merge: (state, currentState) => { 
      return networkSwitchModel.merge(state, currentState);
    } 
  }
));

export {
  networkSwitchStore,
  networkSwitchConfiguration,
  networkSwitchOptions
}