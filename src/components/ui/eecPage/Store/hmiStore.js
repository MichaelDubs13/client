import { projectStore } from "./projectStore";
import {create} from "zustand";
import { lineConfiguration } from "./lineStore";
import { v4 as uuidv4 } from 'uuid';
import {formatToTwoDigits} from './util'

const hmiOptions = {
  // example of dropdown options for the HMI parameters
  hmiScreenSizeOptions:[
    { value: "15in", label: "15in" },
    { value: "22in", label: "22in" },
  ],
  
  mountingTypeOptions:[
    { value: "Flange at Bottom", label: "Flange at Bottom" },
    { value: "Round Tube", label: "Round Tube" },
  ],

  hmiVersionOptions:[
    { value: "V16", label: "V16" },
    { value: "V17", label: "V17" },
  ],
  
  rfidPositionOptions:[
    { value: "Left", label: "Left" },
    { value: "Right", label: "Right" },
  ],

  buttonSelectionOptions:[
    { value: "SPARE", label: "SPARE" },
    { value: "Emergency Stop", label: "Emergency Stop" },
    { value: "Illuminated Pushbutton", label: "Illuminated Pushbutton" },
    { value: "Key-operated Switch", label: "Key-operated Switch" },
    { value: "Safety KeySwitch", label: "Safety KeySwitch" },
    { value: "Selector Switch", label: "Selector Switch" },
    { value: "RFID Reader", label: "RFID Reader" },
  ],

  numberOfExtensionUnitPositionsOptions:[
    { value: 0, label: "0" },
    { value: 8, label: "8" },
    { value: 12, label: "12" },
  ],

  
}


const hmiConfiguration = {
  //fetch child component by id
  getItemById:( hmi, id) =>{
    for(let i=0;i<hmi.extensionUnitPositions.length;i++){
      const extensionUnitPosition = hmi.extensionUnitPositions[i];
        if(extensionUnitPosition.data.id === id){   
          return extensionUnitPosition;
        }
    }

    return null;
  },
  getHmiOptions:(hmis)=>{
    const hmiOptions = hmis.map((hmi => {
        const value = lineConfiguration.getDeviceFullName(hmi.location, hmi.hmiDT);
        return {label:value, value:value}
    }))

    return hmiOptions;
  },
  

  // change this to the HMI extension unit positions
  createExtensionUnitPosition: () => {
    return {
      // change this to the values for the network switch ports
      buttonSelection: "SPARE", // EEC variable name: frmUI_ButtonSelection
      setValue: function(indexObject, key, value){
        hmiStore.getState().setExtensionUnitPositionValue(indexObject, key, value);
      },
    }
  },

  create: (number) => { 
      var hmi = {
        // this is where the variables for the network switch are defined going to the data model
        // below is the first variable example
        line: projectStore.getState().line, // EEC variable name: HMI_Line
        location:"", // EEC variable name: HMI_Location
        hmiDT: `HMI${formatToTwoDigits(number)}`, // EEC variable name: HMI_DT
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
        numberOfExtensionUnitPositions: 8, // EEC variable name: ???
        // change this for the subcomponent of the Extension unit positions
        extensionUnitPositions:hmiConfiguration.initializeExtensionUnitPositions(8),
        /* setValue: function(indexObject, key, value){
          hmiStore.getState().setHmiValue(indexObject, key, value); */
        UI:{
          expanded:false,
          icon: "/panel.png"
        },
        data:{
          type:'hmi',
          id:uuidv4(),
        },
        setValue: function(indexObject, key, value){
          hmiStore.getState().setHmiValue(indexObject, key, value);
        },
        getFullName: function() {
          return lineConfiguration.getDeviceFullName(this.location, this.hmiDT);
        },
        getIndex: function(){
          const hmis = hmiStore.getState().hmis;
          return hmis.findIndex(hmi => hmi.data.id === this.data.id)
        },
        getItemById: function(id){
          return hmiConfiguration.getItemById(this, id);
        },
        getNodeData: function(){
          return [
            this.hmiDT,
          ]
        }
      }
      
      return hmi;
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
  },
  calculateNumberOfExtensionUnitPositions: (numberOfExtensionUnitPositions, hmi) => {
    // set the numberOfExtensionUnitPositions to the value of 8 or 12
    // this will be used to create the Extension Unit Positions for the HMI's extension unit
    if (hmi.hmiScreenSize === "15in") {
      numberOfExtensionUnitPositions = 8;
    } else if (hmi.hmiScreenSize === "22in") {
      numberOfExtensionUnitPositions = 12;
    }
    return numberOfExtensionUnitPositions;
  }
}

    const hmiStore = create((set,get) => ({
        hmis:[],
        hmisOptions:[],
        /**
             * Replace current HMIs objects with input HMIs objects, this is used to set pdp data from excel sheet/save files
             * @param {Array} hmis 
             */
        setHmis: (hmis) => {
          set({hmis:hmis});
        },
        setHmisOptions:(hmis)=>{
          var hmisOptions= hmiConfiguration.getHmiOptions(hmis);
          set({hmisOptions:hmisOptions});
        },
        /**
         * Set HMIs and update hmiOptions
         * @param {*} hmis 
         */
        setHmis: (hmis) => {
          set({hmis:hmis});
          get().setHmisOptions(hmis);
        },
        /**
         * Update HMIs and update hmiOptions
         * @param {*} numberOfHmi 
         */    
        addHmis: (numberOfHmi) => {
          set((state) => {
            const diff = numberOfHmi - [...state.hmis].length
            if(diff > 0){
              const hmis = []
              for (let i = 0; i < diff; i++) {
                var hmi = hmiConfiguration.create(i+1);
                hmis.push(hmi);
              }
              let newHmis =[...state.hmis, ...hmis]  
              get().setHmisOptions(newHmis);
              return {hmis:newHmis}
            } else if(diff < 0) {
              let newHmis = [...state.hmis];
              newHmis = newHmis.slice(0, newHmis.length + diff);
              get().setHmisOptions(newHmis);
              return {hmis:newHmis}
            } else {
              return {hmis:[...state.hmis]}
            }
          })    
        },
    
      /**
       * Update HMI by index and update hmiOptions
       * @param {*} index 
       */
      deleteHmi:(index) => {  
        set((state) => {
          let newHmis = [...state.hmis.slice(0, index), ...state.hmis.slice(index + 1)];
          get().setHmisOptions(newHmis); 
          return {hmis: newHmis};
        })
      },
      duplicateHmis:(index) => {  
        set((state) => {
          const newHmi = {...state.hmis[index]}
          const newHmis = [...state.hmis, newHmi]
          get().setHmisOptions(newHmis); 
          return {hmis: newHmis};
        })
      },
    
      setHmiValue:(indexObject, key, value)=>{
        const index = indexObject.hmiIndex
        set((state) => {
          const newHmis = [...state.hmis];
          newHmis[index] = {...newHmis[index], [key]: value};
          get().setHmisOptions(newHmis);
          return { hmis: newHmis };
        });
      },

    
    // this is for sub components under HMIs
    // this would be for the Extension Units
    setNumberOfExtensionUnitPositions:(index, numberOfExtensionUnitPositions)=>{
     
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
        console.log(newHmis);
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
        console.log(newHmis);
        return { hmis: newHmis };
      });
    }, 
    
    
    
}));

export {
  hmiConfiguration,
  hmiStore,
  hmiOptions
}