import {create} from "zustand";
import BlockDataService from "../services/blockDataService";


const useBlockStore = create((set) => ({
    blocks: [],
    fetchBlocks: async () => {
    
        //console.log("jobs:" +jobs.length);
        try {
          const data = await BlockDataService.getAll();
          set({ blocks:data })
          return data;
          
        } catch (error) {
          console.error("Error fetching blocks:", error);
        }
      },
}));



export default useBlockStore;