import { number } from "prop-types";
import {create} from "zustand";

const hmiOptions = {
  // example of dropdown options for the HMI parameters
  networkPortOptions:[
    { value: "SPARE", label: "SPARE" },
  ],

  
}


const hmiConfiguration = {
  // look at pdpStore for example of default values
  

  // change this to the HMI extension unit positions
  createExtensionUnitPosition: () => {
    return {
      // change this to the values for the network switch ports
      deviceTypeSelection: "SPARE", // EEC variable name: Device_Type_Selection
      targetLocation: "", // EEC variable name: Target_Location
      targetDT: "", // EEC variable name: NotPLC_Connection_DT
      targetCableLength: "TBD", // EEC variable name: Cable_Length_Selection
      communicationFlow: "Out", // EEC variable name: Interruption_InOrOut
      cascadingSwitch: false, // EEC variable name: Switch_Cascading
      connectedDevice: "", // EEC variable name: Connected_Device
      selectedSwitch: "", // EEC variable name: frmUI_NetworkSwitchSelection
      targetPort: "", // EEC varaible name: frmUI_DevicePortSelection
    }
  },

  create: () => { 
    return {
      // this is where the variables for the network switch are defined going to the data model
      // below is the first variable example
      line: "", // EEC variable name: HMI_Line
      location:"", // EEC variable name: HMI_Location
      switchDT: "", // EEC variable name: HMI_DT
      plcID: "", // EEC variable name: PLC_ID
      localIP: "", // EEC variable name: Local_IP
      plantIP: "", // EEC variable name: Plant_IP
      powerInLine: "", // EEC variable name: HMI_PwrIn_Line
      powerInLocation: "", // EEC variable name: HMI_PwrIn_Station
      powerInDT: "", // EEC variable name: HMI_PwrIn_DT
      ethernetCascadingFrom: false, // EEC variable name: HMI_CascadingFrom
      ethernetInLine: "", // EEC variable name: HMI_NetworkIn_Line
      ethernetInLocation: "", // EEC variable name: HMI_ETHIn_Station
      ethernetInDT: "", // EEC variable name: HMI_ETHIn_DT
      ethernetInDevicePort: "", // EEC variable name: HMI_ETHIn_DevicePort
      ethernetCascadingTo: false, // EEC variable name: HMI_CascadingTo
      ethernetCascadingToOutside: false, // EEC variable name: HMI_CascadingTo_Outside
      hmiScreenSize: "22in", // EEC variable name: HMI_ScreenSize
      mountingType: "Flange at Bottom", // EEC variable name: Mounting_Selection
      hmiVersion: "V17", // EEC variable name: Version_Selection
      rfidPosition: "Right", // EEC variable name: RFID_Side

      hmiCascadingToSelection: "", // EEC variable name: frmUI_HMI_Selection
      ethernetOutLine: "", // EEC variable name: HMI_ETHOut_Line
      ethernetOutLocation: "", // EEC variable name: HMI_ETHOut_Station
      ethernetOutDT: "", // EEC variable name: HMI_ETHOut_DT
      ethernetOutDevicePort: "", // EEC variable name: HMI_ETHOut_DevicePort

      // this is the number of extension unit positions for the HMI
      numberOfExtensionUnitPositions: 0, // EEC variable name: ???
      // change this for the subcomponent of the Extension unit positions
      extensionUnitPositions:hmiConfiguration.initializeExtensionUnitPositions(8),
  }
  },
  
  generateData: (hmis) => {
    return hmis;
  },

  // change this to Extension unit positions
  initializeExtensionUnitPositions: (numberOfExtensionUnitPositions) => {
    var extensionUnitPositions = [];
    for (let i = 0; i < numberOfExtensionUnitPositions; i++) {
      var extensionUnitPosition = hmiConfiguration.createExtensionUnitPosition();
      extensionUnitPositions.push(extensionUnitPosition)
    }
    return extensionUnitPositions;
  }
}
const hmiStore = create((set) => ({
    hmis:[],
    setHmis: (hmis) => {
      set({hmis:hmis});
    },    
    addHmis: (numberOfHmi) => {
      set((state) => {
        const diff = numberOfHmi - [...state.hmis].length
        if(diff > 0){
          const hmis = []
          for (let i = 0; i < diff; i++) {
            var hmi = hmiConfiguration.create();
            hmis.push(hmi);
          }  
          return {hmis:[...state.hmis, ...hmis]}
        } else if(diff < 0) {
            let newHmis = [...state.hmis];
            newHmis = newHmis.slice(0, newHmis.length + diff);
            return {hmis:newHmis}
        } else {
          
          return {hmis:[...state.hmis]}
        }
      })
    },

    deleteHmi:(index) => {  
      set((state) => {
        return {hmis: [...state.hmis.slice(0, index), ...state.hmis.slice(index + 1)]};
      })
    },
  duplicateHmis:(index) => {  
      set((state) => {
        const newHmi = {...state.hmis[index]}
        return {hmis: [...state.hmis, newHmi]};
      })
    },

    setHmiValue:(indexObject, key, value)=>{
      const index = indexObject.hmiIndex
      set((state) => {
        const newHmis = [...state.hmis];
        newHmis[index] = {...newHmis[index], [key]: value};
        return { hmis: newHmis };
      });
    },

    
    // this is for sub components under HMIs
    // this would be for the Extension Units
    setNumberOfExtensionUnitPoistions:(index, numberOfExtensionUnitPositions)=>{
     
      set((state) => {

        const newHmis = [...state.hmis];
        newHmis[index] = {...newHmis[index]};
       
        // create the extension unit positions for the HMI
        numberOfExtensionUnitPositions = hmiConfiguration.calculateNumberOfExtensionUnitPositions(numberOfExtensionUnitPositions, newHmis[index]);
        var extensionUnitPositions = [];
        for (let i = 0; i < numberOfExtensionUnitPositions; i++) {
          var extensionUnitPosition = hmiConfiguration.createExtensionUnitPosition();
          extensionUnitPositions.push(extensionUnitPosition)
        }

        newHmis[index].extensionUnitPositions = extensionUnitPositions;
        return { hmis: newHmis };
      });
    },
    setExtensionUnitPositionValue:(indexObject, key, value)=>{
      const hmiIndex = indexObject.hmiIndex;
      const extensionUnitPositionIndex = indexObject.extensionUnitPositionIndex;

      set((state) => {
        const newHmis = [...state.hmis];
        const extensionUnitPositions = [...newHmis[hmiIndex].extensionUnitPositions]
        extensionUnitPositions[extensionUnitPositionIndex] = {...extensionUnitPositions[extensionUnitPositionIndex], [key]:value}

        newHmis[hmiIndex] = {...newHmis[hmiIndex], 
          extensionUnitPositions:extensionUnitPositions
        };
        return { hmis: newHmis };
      });
    }, 
    
    
    
}));

export {
  hmiConfiguration,
  hmiStore,
  hmiOptions
}