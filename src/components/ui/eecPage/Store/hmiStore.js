import {create} from "zustand";
import { lineConfiguration } from "./lineStore";
import {addItems, circularReplacer, setModelValue, setNumberOfItems} from './util'
import { hmiModel } from "./Models/HMIs/hmiModel";
import { extensionUnitPositionModel } from "./Models/HMIs/extensionUnitPositionModel";
import { createJSONStorage, persist } from 'zustand/middleware';

const hmiOptions = {
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

  getRfidPositions:(hmi)=>{
    if(hmi.rfidPosition === 'Right'){
        hmi.extensionUnitPositions[hmi.extensionUnitPositions.length-1].buttonSelection ="RFID Reader";
        hmi.extensionUnitPositions[hmi.extensionUnitPositions.length-2].buttonSelection ="RFID Reader";
    } else if(hmi.rfidPosition === 'Left'){
      hmi.extensionUnitPositions[0].buttonSelection ="RFID Reader";
      hmi.extensionUnitPositions[1].buttonSelection ="RFID Reader";
    }
  },

  getHmiOptions:(hmis)=>{
    const hmiOptions = hmis.map((hmi => {
        const value = lineConfiguration.getDeviceFullName(hmi.location, hmi.deviceTag);
        return {label:value, value:value}
    }))

    return hmiOptions;
  },

  generateData: (hmis) => {
    return hmis;
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
   },
  }
  

  const hmiStore = create(
    persist((set,get) => ({
        wipHmi:{},
        hmis:[],
        hmisOptions:[],
        setWipHmi: (hmi) => {
          console.log(hmi);
          set({wipHmi:hmi});
        },
        addWipHmi: () => {
          set((state) => {
            const newHmi = {...state.wipHmi}
            const newHmis = [...state.hmis, newHmi]
            return {hmis:newHmis}
          })    
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
            let newHmis = [...state.hmis];
            newHmis = addItems(newHmis, numberOfHmi, hmiModel.create);
            get().setHmisOptions(newHmis);
            return {hmis:newHmis}
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
    
      setHmiValue:(indexObject, key, value,isUI,isData)=>{
        //const indexObject = item.getIndexObject();
        const index = indexObject.hmiIndex
        if(Object.keys(indexObject).length > 0){
          set((state) => {
            const newHmis = [...state.hmis];
            setModelValue(newHmis[index], key, value, isUI, isData);
            get().setHmisOptions(newHmis);
            return { hmis: newHmis };
          });
        }else {
          set((state) => {
            const newHmi = {...state.wipHmi, [key]: value};
            return { wipHmi: newHmi };
          });
        }
      },

    setNumberOfExtensionUnitPositions:(index, numberOfExtensionUnitPositions)=>{
     
      set((state) => {
        const newHmis = [...state.hmis];
        newHmis[index] = {...newHmis[index]};
        numberOfExtensionUnitPositions = hmiConfiguration.calculateNumberOfExtensionUnitPositions(numberOfExtensionUnitPositions, newHmis[index]);
        newHmis[index].extensionUnitPositions = setNumberOfItems(newHmis[index].extensionUnitPositions, numberOfExtensionUnitPositions, extensionUnitPositionModel.create, newHmis[index]);
        return { hmis: newHmis };
      });
    },
    setExtensionUnitPositionValue:(indexObject, key, value, isUI, isData)=>{
      //const indexObject = item.getIndexObject();
      const hmiIndex = indexObject.hmiIndex;
      const extensionUnitPositionIndex = indexObject.extensionUnitPositionIndex;
      set((state) => {
        const newHmis = [...state.hmis];
        const extensionUnitPositions = newHmis[hmiIndex].extensionUnitPositions;
        setModelValue(extensionUnitPositions[extensionUnitPositionIndex], key, value, isUI, isData);
        return { hmis: newHmis };
      });
    },     
  }),
  {
    name: 'hmi-state',
    storage: createJSONStorage(() => localStorage),
    serialize: (state) => {
      return JSON.stringify(state, circularReplacer())
    },
    merge: (state, currentState) => { 
      return hmiModel.merge(state, currentState);
    } 
  }
));

export {
  hmiConfiguration,
  hmiStore,
  hmiOptions
}