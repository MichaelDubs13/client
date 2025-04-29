import {create} from "zustand";
import {addItems, circularReplacer, setModelValue, setNumberOfItems} from './util'
import { mcpModel } from "./Models/MCPs/mcpModel";
import { portModel } from "./Models/MCPs/portModel";
import { createJSONStorage, persist } from 'zustand/middleware';

const mcpOptions = {
  cableLengthOptions: [
    { value: "NULL", label: "NULL" },
    { value: "1.5 m", label: "1.5 m" },
    { value: "3 m", label: "3 m" },
    { value: "5 m", label: "5 m" },
    { value: "10 m", label: "10 m" },
    { value: "15 m", label: "15 m" },
    { value: "20 m", label: "20 m" },
  ],
}
const mcpConfiguration = {
  generateData: (mcps) => {
   return mcps
  }
}
const mcpStore = create(
  persist((set) => ({
    mcps:[],    
    setMcps: (mcps) => {
      set({mcps:mcps});
    },    
    addMcp: (numberOfMcp) => {
       set((state) => {
        let newMcps = [...state.mcps];
        newMcps = addItems(newMcps, numberOfMcp, mcpModel.create);
        return {mcps:newMcps}
        })
    },
    duplicateMcp:(index) => {  
      set((state) => {
        const newMcp = {...state.mcps[index]}
        return {mcps: [...state.mcps, newMcp]};
      })
    },
    deleteMcp:(index) => {  
      set((state) => {
        return {mcps: [...state.mcps.slice(0, index), ...state.mcps.slice(index + 1)]};
      })
    },
    setMcpValue:(indexObject, key, value, isUI, isData)=>{
      //const indexObject = item.getIndexObject();
      const index = indexObject.mcpIndex
      set((state) => {
        const newMcps = [...state.mcps];
        setModelValue(newMcps[index], key, value, isUI, isData);
        return { mcps: newMcps };
      });
    },
    setNumberOfLethPorts:(index, numberOfPorts)=>{
      set((state) => {
        const newMcps = [...state.mcps];
        newMcps[index].ports = setNumberOfItems(newMcps[index].ports, numberOfPorts, portModel.create, newMcps[index]);
        return { mcps: newMcps };
      });
    },
    setPortValue:(indexObject, key, value, isUI, isData)=>{
      //const indexObject = item.getIndexObject();
      const mcpIndex = indexObject.mcpIndex;
      const portIndex = indexObject.portIndex;

      set((state) => {
        const newMcps = [...state.mcps];
        const ports = newMcps[mcpIndex].ports;
        setModelValue(ports[portIndex], key, value, isUI, isData);
        return { mcps: newMcps };
      });
    },
  }),
   {
     name: 'mcp-state',
     storage: createJSONStorage(() => localStorage),
     serialize: (state) => {
       return JSON.stringify(state, circularReplacer())
     },
     merge: (state, currentState) => { 
       return mcpModel.merge(state, currentState);
     } 
   }
));

export {
  mcpStore,
  mcpConfiguration,
  mcpOptions
}