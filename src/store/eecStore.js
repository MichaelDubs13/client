import {create} from "zustand";
import eecDataService from "../services/eecDataService";




const useEecStore = create((set) => ({  
  jobHistory: [],

  fetchJobHistory: async () =>{
    try {
      const response = await eecDataService.getEecJobHistory();
    
      set({ jobHistory: response })
      
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } 
  },
  
}));



export default useEecStore;
