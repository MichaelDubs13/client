import {create} from "zustand";
import ProjectDataService from "../services/projectDataService";


const useProjectStore = create((set) => ({
    projects: [],
    fetchProjects: async (serverId) => {
        try {
          const data = await ProjectDataService.get(serverId);
          
          set({ projects:data.projects })
          return data.projects;
          
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      },
}));



export default useProjectStore;