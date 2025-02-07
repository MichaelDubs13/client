import {create} from "zustand";
import deviceDataService from "../services/deviceDataService";


const useTiaServerStore = create((set) => ({
    
    fetchInstalledProducts: async (shop_id, line_id) => {
        try {
          const data = await deviceDataService.getLineInstalledProducts(shop_id, line_id);
          
          return data;
          
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      },
    installGSDs: async (shop_id, line_id) => {
        try {
          const data = await deviceDataService.installGSDs(shop_id, line_id);
          
          return data;
          
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
    },
    installHSPs: async (shop_id, line_id) => {
        try {
          const data = await deviceDataService.installHSPs(shop_id, line_id);
          
          return data;
          
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
    },
    installISOs: async (shop_id, line_id, formData) => {
        try {
          const data = await deviceDataService.installISOs(shop_id, line_id, formData);
          
          return data;
          
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
    },
}));



export default useTiaServerStore;