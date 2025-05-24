import {create} from "zustand";
import {addItems, circularReplacer, setModelValue, setNumberOfItems} from './util'
import { lpdModel } from "./Models/LDPs/lpdModel";
import { psuModel } from "./Models/LDPs/psuModel";
import { powerDropModel } from "./Models/LDPs/powerDropModel";
import { createJSONStorage, persist } from 'zustand/middleware';

const lpdOptions = {
  turk:'Turck: PSU67-3P-1MP-2M5-24200-F',
  puls:'Puls: FPT500.247-064-102',
  ballufBAE0133:'Balluff: BAE0133',
  psuSupplyVoltageOptions: [
    { value: "120", label: "120V" },
    { value: "240", label: "240V" },
    { value: "400", label: "400V" },
    { value: "480", label: "480V" },
  ],

  psuSelection120_240Options:[
    {value: "Balluff: BAE00ET", label: "Balluff: BAE00ET"},
    {value: "Balluff: BAE00FL", label: "Balluff: BAE00FL"},
    {value: "Balluff: BAE0133", label: "Balluff: BAE0133"},
  ],

  psuSelection400_480Options:[
    {value: "Siemens: 6ES7148-4PC00-0HA0", label: "Siemens: 6ES7148-4PC00-0HA0"},
    {value: "Turck: PSU67-3P-1MP-2M5-24200-F", label: "Turck: PSU67-3P-1MP-2M5-24200-F"},
    {value: "Puls: FPT500.247-064-102", label: "Puls: FPT500.247-064-102"},
  ],
  psuToPsuCableLengthOptions:[
    { value: "TBD", label: "TBD" },
    { value: "0.6m", label: "0.6m" },
    { value: "1m", label: "1m" },
    { value: "2m", label: "2m" },
    { value: "5m", label: "5m" },
    { value: "10m", label: "10m" },
    { value: "15m", label: "15m" },
    { value: "20m", label: "20m" },
    { value: "25m", label: "25m" },
    { value: "30m", label: "30m" },
    { value: "NULL", label: "NULL" },
  ],
}
const lpdConfiguration = {
  getDrop:(lpds,location, device, port) => {
    for(let i=0;i<lpds.length;i++){
      const drop = lpds[i].getDrop(location, device, port);
      if(drop) return drop;
    }

    return null;
  },
  
}
const lpdStore = create(
  persist((set) => ({
    lpds:[],   
    wipPsu:{},
    setWipPsu: (psu) => {
      set({wipPsu:psu});
    },
    addWipPsu: (line, location, deviceTag, createNew) => {
      set((state) => {
        const newPsu = {...state.wipPsu}
        let newLpds = [...state.lpds]
        // const index = newLpds.findIndex(group => group.location === location && group.line === line);
        // if(index > -1 && !createNew){
        //   newPsu.data.parent = newLpds[index];
        //   newLpds[index].psus = [...newLpds[index].psus,newPsu ]
        // } else {
        //   const newLpd = lpdModel.create();
        //   newLpd.line = line;
        //   newLpd.location = location;
        //   newLpd.powerSourceLine = line;
        //   newLpd.powerSourceLocation = location;
        //   newLpd.powerSourceDT = deviceTag;
        //   newPsu.data.parent = newLpd;
        //   newLpd.psus.push(newPsu);
        //   newLpds = [...newLpds, newLpd]
        // }

        const newLpd = lpdModel.create();
        newLpd.line = line;
        newLpd.location = location;
        newLpd.powerSourceLine = newPsu.powerSourceLine;
        newLpd.powerSourceLocation = newPsu.powerSourceLocation;
        newLpd.powerSourceDT = newPsu.powerSourceDT;
        newPsu.data.parent = newLpd;
        newLpd.psus.push(newPsu);
        newLpds = [...newLpds, newLpd]
        
        return {lpds:newLpds}
      })    
    },
    setLpds: (lpds) => {
      set({lpds:lpds});
    },  
    addLpd: (numberOfLpd) => {
      set((state) => {
        let newLpds = [...state.lpds];
        newLpds = addItems(newLpds, numberOfLpd, lpdModel.create);
        return {lpds:newLpds};
      }
    )},
    duplicateLpd:(index) => {  
      set((state) => {
        const newLpd = {...state.lpds[index]}
        return {lpds: [...state.lpds, newLpd]};
      })
    },
    deleteLpd:(index) => {  
      set((state) => {
        return {lpds: [...state.lpds.slice(0, index), ...state.lpds.slice(index + 1)]};
      })
    },
    setLpdValue:(indexObject, key, value,isUI, isData)=>{
      //const indexObject = item.getIndexObject();
      const index = indexObject.lpdIndex
      set((state) => {
        const newLpds = [...state.lpds];
        setModelValue(newLpds[index], key, value, isUI, isData);
        return { lpds: newLpds };
      });
    },
    setNumberOfPsus:(index, numberOfPsus)=>{
      set((state) => {
        const newLpds = [...state.lpds];
        newLpds[index].psus = setNumberOfItems(newLpds[index].psus, numberOfPsus, psuModel.create, newLpds[index]);
        return { lpds: newLpds };
      })
    },
    setPsuValue:(indexObject, key, value, isUI, isData)=>{
      //const indexObject = item.getIndexObject();
      const lpdIndex = indexObject.lpdIndex;
      const psuIndex = indexObject.psuIndex;

      set((state) => {
        const newLpds = [...state.lpds];
        const psus = newLpds[lpdIndex].psus;
        setModelValue(psus[psuIndex], key, value, isUI, isData);
        return { lpds: newLpds };
      });
    },

    setNumberOfDrops:(index, numberOfDrops)=>{
      const lpdIndex = index.lpdIndex;
      const psuIndex = index.psuIndex;

      set((state) => {
        const newLpds = [...state.lpds];
        const psus = newLpds[lpdIndex].psus;
        const psu = psus[psuIndex]
        psu.drops = setNumberOfItems(psu.drops, numberOfDrops, powerDropModel.create, psu);
        return { lpds: newLpds };
      });
    },
    setDropValue:(indexObject, key, value,isUI,isData)=>{
      //const indexObject = item.getIndexObject();
      const lpdIndex = indexObject.lpdIndex;
      const psuIndex = indexObject.psuIndex;
      const dropIndex = indexObject.dropIndex;
      set((state) => {
        const newLpds = [...state.lpds];
        const psus = newLpds[lpdIndex].psus;
        const drops = psus[psuIndex].drops;
        setModelValue(drops[dropIndex], key, value, isUI, isData);
        return { lpds: newLpds };
      });
    },
  }),
   {
      name: 'lpd-state',
      storage: createJSONStorage(() => localStorage),
      serialize: (state) => {
        return JSON.stringify(state, circularReplacer())
      },
      merge: (state, currentState) => { 
        return lpdModel.merge(state, currentState);
      } 
    }
));

export {
  lpdStore,
  lpdConfiguration,
  lpdOptions,
}