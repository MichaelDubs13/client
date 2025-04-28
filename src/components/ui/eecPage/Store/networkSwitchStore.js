import {create} from "zustand";
import { lineConfiguration } from "./lineStore";
import {addItems, setModelValue, setNumberOfItems} from './util'
import { networkSwitchModel } from "./Models/NetworkSwitches/networkSwitchModel";
import { networkPortModel } from "./Models/NetworkSwitches/networkPortModel";

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
        const value = lineConfiguration.getDeviceFullName(networkSwitch.location, networkSwitch.deviceTag);
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


  generateData: (networkSwitches) => {
    return networkSwitches;
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
    wipNetworkSwitch:{},
    networkSwitches:[],
    networkSwitchesOptions:[],

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

  setNetworkSwitchValue:(item, key, value,isUI, isData)=>{
    const indexObject = item.getIndexObject();
    const index = indexObject.networkSwitchIndex
    
    if(Object.keys(indexObject).length > 0){
      set((state) => {
        const newNetworkSwitches = [...state.networkSwitches];
        setModelValue(newNetworkSwitches[index], key, value, isUI, isData);
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

    
  // this is for sub components under network switch
  // this would be for the ports in this case
  setNumberOfPorts:(index, numberOfPorts)=>{
      set((state) => {
        const newNetworkSwitches = [...state.networkSwitches];
        numberOfPorts = networkSwitchConfiguration.calculateNumberOfPorts(numberOfPorts, newNetworkSwitches[index]);
        newNetworkSwitches[index].ports = setNumberOfItems(newNetworkSwitches[index].ports, numberOfPorts, networkPortModel.create, newNetworkSwitches[index]);
        return { networkSwitches: newNetworkSwitches };
      });
    },
  setPortValue:(item, key, value,isUI,isData)=>{
    const indexObject = item.getIndexObject();
    const networkSwitchIndex = indexObject.networkSwitchIndex;
    const portIndex = indexObject.portIndex;

    set((state) => {
      const newNetworkSwitches = [...state.networkSwitches];
      const ports = newNetworkSwitches[networkSwitchIndex].ports;
      setModelValue(ports[portIndex], key, value, isUI, isData);

      return { networkSwitches: newNetworkSwitches };
    });
    }, 
}));

export {
  networkSwitchStore,
  networkSwitchConfiguration,
  networkSwitchOptions
}