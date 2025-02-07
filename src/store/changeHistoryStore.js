import {create} from "zustand";


const useChangeHistoryStore = create((set) => ({
    hmiChangeHistory: [],
    hmiChange: [],
  
    clearHistory: ()=>{
      set({hmiChangeHistory:[]});
    },
    clearChange: ()=>{
      set({hmiChange:[]});
    },
    addHistory: (value)=>{
      set((state) => ({hmiChangeHistory:[...state.hmiChangeHistory, value]}));
    },
    addChange: (value)=>{
      set((state) => ({hmiChange:[...state.hmiChange, value]}));
    },
    updateHistory:(group, id, value) =>{
      var object = {[group]:{[id]:value}} 
      set((state) => ({
        hmiChangeHistory: state.hmiChangeHistory.map((history) => Object.keys(history)[0] === group && Object.keys(history[group])[0] === id ? object: history),
      }
      ))
    },
    updateChange:(group, id, value) =>{
      var object = {[group]:{[id]:value}} 
      set((state) => ({
        hmiChange: state.hmiChange.map((history) => Object.keys(history)[0] === group && Object.keys(history[group])[0] === id ? object: history),
      }
      ))
    },
    removeHistory: (group, id) => {
      set((state) => ({hmiChangeHistory:state.hmiChangeHistory.filter((history) => Object.keys(history)[0] != group || Object.keys(history[group])[0] != id)
      }));
    },

    removeChange: (group, id) => {
      set((state) => ({hmiChange:state.hmiChange.filter((history) => Object.keys(history)[0] != group || Object.keys(history[group])[0] != id)
      }));
    }
}));



export default useChangeHistoryStore;