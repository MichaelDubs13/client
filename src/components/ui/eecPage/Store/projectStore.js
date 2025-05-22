import {create} from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';
import { circularReplacer } from "./util";

const projectStore = create(
    persist((set) => ({
    plant:"PLANT",
    shop:"SHOP",
    line:"LINE", 
    installation_location:"UL",
    installation_location_options:["UL", "EU"],

    setPlant:(value)=>{
        set({plant:value});        
    },
    setShop:(value)=>{
        set({shop:value});
    },
    setLine:(value)=>{
        console.log(value)
        set({line:value});
    },
    setinstallation_location:(value)=>{
        set({installation_location:value});
    },

    setConfig:(data)=>{
        set({plant:data.plant}); 
        set({shop:data.shop});  
        set({line:data.line});
        set({installation_location:data.installation_location});
    },

    clearConfig:()=>{
        set({plant:"PLANT"}); 
        set({shop:"SHOP"});  
        set({line:"LINE"});
        set({installation_location:"UL"});
    },

    getConfig:()=>{
        return {
            plant:projectStore.getState().plant,
            shop:projectStore.getState().shop,
            line:projectStore.getState().line,
            installation_location:projectStore.getState().installation_location,
        }
    }
    }),
    {
        name: 'project-state',
        storage: createJSONStorage(() => localStorage),
        serialize: (state) => {
            return JSON.stringify(state, circularReplacer())
        },        
    }
));

export {
    projectStore,
}