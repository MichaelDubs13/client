import {create} from "zustand";
import { lineConfiguration } from "./lineStore";

const lpdOptions = {
  psuSupplyVoltageOptions: [
    { value: "120", label: "120V" },
    { value: "240", label: "240V" },
    { value: "400", label: "400V" },
    { value: "480", label: "480V" },
  ],

  psuSelection120_240Options:[
  { value: "Balluff-BAE00ET", label: "Balluff: BAE00ET" },
  { value: "Balluff-BAE00FL", label: "Balluff: BAE00FL" },
  { value: "Balluff-BAE0133", label: "Balluff: BAE0133" },
  ],

  psuSelection400_480Options:[
  { value: "Siemens", label: "Siemens: 6ES7148-4PC00-0HA0" },
  { value: "Turck", label: "Turck: PSU67-3P-1MP-2M5-24200-F" },
  { value: "Puls", label: "Puls: FPT500.247-064-102" },
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
  getDrop:(location, device, port) => {
    const lpds = lpdStore.getState().lpds;
    for(let i=0;i<lpds.length;i++){
      const drop = lpds[i].getDrop(location, device, port);
      if(drop) return drop;
    }

    return null;
  },
  createPsu: (line) => {
    const psu = {
      lineside120AFLA:"",
      branchBreaker:"",
      branchOrder:"",
      fla:"",
      line:line,
      inputPowerCord:"",
      inputPowerTee:"",
      MFG:"",
      psuLocationDt:"",
      psu_location:"",
      psu_dt:"",
      partNumber:"",
      powerFedFrom:"",
      cable_length:0,
      supplyVoltage:"",
      xpdpCBIndex:0,
      pwrDrops:[],
      device:{},
      UI:{
        expanded:false,
      },
      getFullName: function() {
        return lineConfiguration.getDeviceFullName(this.psu_location, this.psu_dt);
      },
      getDrop: function(location, device){
        var drop = this.pwrDrops.find(drop => drop.location === location && drop.deviceTag === device);
        return drop;
      },
    }
    return psu;
  },
  createDrop:(line, parent)=>{
    return {
      psuSelection: "",
      outputPort: "",
      line: line,
      location: "",
      deviceTag: "",
      description: "",
      fla: "",
      UI:{
        expanded:false,
        parent:parent,
      },
      getFullName: function() {
        return lineConfiguration.getDeviceFullName(this.location, this.description);
      },
    }
  },
  create: () => { 
      return {
          cb:"",
          panel:"",
          psu_selected:"", //only used for UI
          psus:[],
          UI:{
            expanded:false,
          },
          getDrop: function(location, device, port){
            for(let i=0;i<this.psus.length;i++){
              const drop = this.psus[i].getDrop(location, device, port);
              if(drop) return drop;
            }

            return null;
          },
    }
  },
  generateData: (lpds) => {
    return lpds;
  }
}
const lpdStore = create((set) => ({
    lpds:[],   
    setLpds: (lpds) => {
      set({lpds:lpds});
    },  
    addLpd: (numberOfLpd) => {
      set((state) => {
        const diff = numberOfLpd - [...state.lpds].length
        if(diff > 0){
          const lpds = [];
          for (let i = 0; i < diff; i++) {
            var lpd = lpdConfiguration.create();
            lpds.push(lpd);
          } 
          return {lpds:[...state.lpds, ...lpds]} 
        } else if(diff < 0) {
            let newLpds = [...state.lpds];
            newLpds = newLpds.slice(0, newLpds.length + diff);
            return {lpds:newLpds}
        }else {
          return {lpds:[...state.lpds]}
        }
      })
    },
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
    setLpdValue:(indexObject, key, value)=>{
      const index = indexObject.lpdIndex
      set((state) => {
        const newLpds = [...state.lpds];
        newLpds[index] = {...newLpds[index], [key]: value};
        return { lpds: newLpds };
      });
    },
    setNumberOfPsus:(index, numberOfPsus)=>{
      set((state) => {
        const newLpds = [...state.lpds];
        const diff = numberOfPsus - newLpds[index].psus.length
        if(diff > 0){
          for (let i = 0; i < diff; i++) {
            var psu = lpdConfiguration.createPsu(newLpds[index].line);
            newLpds[index] = {...newLpds[index], 
              psus: [...newLpds[index].psus, psu],
            };
          }  
        } else if(diff < 0) {
            const psus = newLpds[index].psus.slice(0, newLpds[index].psus.length + diff);
            newLpds[index] = {...newLpds[index], 
              psus: psus,
            };
        }
        return { lpds: newLpds };
      })
    },
    setPsuValue:(indexObject, key, value)=>{
      const lpdIndex = indexObject.lpdIndex;
      const psuIndex = indexObject.psuIndex;

      set((state) => {
        const newLpds = [...state.lpds];
        const psus = newLpds[lpdIndex].psus;
        psus[psuIndex] = {...psus[psuIndex], [key]:value}
        newLpds[lpdIndex] = {...newLpds[lpdIndex], 
          psus:psus
        };
        return { lpds: newLpds };
      });
    },

    setNumberOfDrops:(index, numberOfDrops)=>{
      const lpdIndex = index.lpdIndex;
      const psuIndex = index.psuIndex;

      set((state) => {
        const newLpds = [...state.lpds];
        const psus = newLpds[lpdIndex].psus;

        var drops = [];
        for (let i = 0; i < numberOfDrops; i++) {
          var drop = lpdConfiguration.createDrop(psus[psuIndex].line, psus[psuIndex]);
          drops.push(drop)
        }
        psus[psuIndex] = {...psus[psuIndex], pwrDrops:drops}

        newLpds[lpdIndex] = {...newLpds[lpdIndex], 
          psus: psus,
        };
        return { lpds: newLpds };
      });
    },
    setDropValue:(indexObject, key, value)=>{
      const lpdIndex = indexObject.lpdIndex;
      const psuIndex = indexObject.psuIndex;
      const dropIndex = indexObject.dropIndex;

      set((state) => {
        const newLpds = [...state.lpds];
        const psus = newLpds[lpdIndex].psus;
        const pwrDrops = psus[psuIndex].pwrDrops;
        pwrDrops[dropIndex] = {...pwrDrops[dropIndex], [key]: value}

        newLpds[lpdIndex] = {...newLpds[lpdIndex], 
          psus:psus
        };
        return { lpds: newLpds };
      });
    },
}));

export {
  lpdStore,
  lpdConfiguration,
  lpdOptions,
}