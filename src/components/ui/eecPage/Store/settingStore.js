import {create} from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';
import { circularReplacer } from "./util";

const settingStore = create(
    persist((set) => ({
        options:{
            displayOnlySelected: false,
        },

        selected:{
          
        },
    
        setSelectedValue(value, key){
            set((state) => {
                const newProperty = {...state.selected}
                newProperty[key] = value;
                return {selected: newProperty};
        })},
        setOptionsValue(value, key){
            set((state) => {
                const newProperty = {...state.options}
                newProperty[key] = value;
                return {options: newProperty};
        })},
    }),
    {
        name: 'setting-state',
        storage: createJSONStorage(() => localStorage),
        serialize: (state) => {
            return JSON.stringify(state, circularReplacer())
        },        
    }
));

export {
    settingStore,
}