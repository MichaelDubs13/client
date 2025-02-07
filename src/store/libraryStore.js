import {create} from "zustand";
import LibraryDataService from "../services/libraryDataService";


const useLibraryStore = create((set) => ({
    inconsistentLib: [],
    inconsistentDepLib: [],
    duplicateNameLib: [],
    nondefaultInstances: [],
    changeSets: [],
    revisions: [],
    libs: [],
    fetchUnreleasedChanges: async () => {
    
        //console.log("jobs:" +jobs.length);
        try {
          const data = await LibraryDataService.getUnreleasedChanges();
          set({ changeSets:data })
          
        } catch (error) {
          console.error("Error fetching libraries:", error);
        }
      },
      fetchUnreleasedRevs: async () => {
    
        //console.log("jobs:" +jobs.length);
        try {
          const data = await LibraryDataService.getUnreleasedRevs();
          set({ revisions:data })
          
        } catch (error) {
          console.error("Error fetching libraries:", error);
        }
      },
      fetchReleasedLibs: async () => {
    
        //console.log("jobs:" +jobs.length);
        try {
          const data = await LibraryDataService.getReleasedLibs();
          set({ libs:data })
          
        } catch (error) {
          console.error("Error fetching libraries:", error);
        }
      },
      fetchReleasedLibRevs: async (id) => {
    
        //console.log("jobs:" +jobs.length);
        try {
          const data = await LibraryDataService.getReleasedLibRevs(id);
          return data;
        } catch (error) {
          console.error("Error fetching libraries:", error);
        }
      },
    fetchInconsistentLib: async () => {
    
        //console.log("jobs:" +jobs.length);
        try {
          const data = await LibraryDataService.getInconsistent();
          set({ inconsistentLib:data })
          
        } catch (error) {
          console.error("Error fetching libraries:", error);
        }
      },
    fetchInconsistentDepLib: async () => {
    
        //console.log("jobs:" +jobs.length);
        try {
          const data = await LibraryDataService.getInconsistentDependency();
          set({ inconsistentDepLib:data })
          
        } catch (error) {
          console.error("Error fetching libraries:", error);
        }
      },
    fetchDuplicateNameLib: async () => {
    
        //console.log("jobs:" +jobs.length);
        try {
          const data = await LibraryDataService.getDuplicateNames();
          set({ duplicateNameLib:data })

        } catch (error) {
          console.error("Error fetching libraries:", error);
        }
      },
    fetchNondefaultInstances: async () => {
    
        //console.log("jobs:" +jobs.length);
        try {
          const data = await LibraryDataService.getNonDefaultInstance();
          set({ nondefaultInstances:data })
          
        } catch (error) {
          console.error("Error fetching libraries:", error);
        }
      },

      createReleaseNotes: async (formData) => {
        try{
          const response = await LibraryDataService.createReleaseNotes(formData);
          //const data = await response.json();
          
          if (!response.ok) {
            const error = (formData && formData.message) || response.status;
            return Promise.reject(error);
          }
        }catch(error){
          console.error(error.message);
        }
      },
}));



export default useLibraryStore;