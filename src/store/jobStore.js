import {create} from "zustand";
import JobDataService from "../services/jobDataService";




const useJobStore = create((set) => ({
  jobs: [],
  codeGenHistory: [],
  ptpHistory: [],
  job: null,

  //createJob: (job) => set((state)=> ({jobs:[...state.jobs, job]})),
  clearJobs: () => set({jobs:[]}),
    
  deleteJob: async (jobId) => {
    console.log("id"+jobId)
    try{
      const response = await JobDataService.delete(jobId);
      if (!response.ok) {
        const error = response.status;
        return Promise.reject(error);
      }
    }catch(error){
      console.error(error.message);
    }
  },

  createJob: async (formData) => {
    try{
      const response = await JobDataService.create(formData);
      //const data = await response.json();
      
      if (!response.ok) {
        const error = (formData && formData.message) || response.status;
        return Promise.reject(error);
      }

      return response;
    }catch(error){
      console.error(error.message);
    }
  },
  fetchJobs: async () => {
    
    //console.log("jobs:" +jobs.length);
    try {
      const response = await JobDataService.getAll();
      const data = await response.json();
      
      set({ jobs:data.jobs })
      
      
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  },

  fetchJob: async (id) =>{
    try {
      const response = await JobDataService.get(id);
    
      
      set({ job: response.job })
      
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } 
  },

  fetchCodeGenHistory: async () =>{
    try {
      const response = await JobDataService.getCodeGenHistory();
    
      set({ codeGenHistory: response })
      
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } 
  },
  
  fetchPtpHistory: async () =>{
    try {
      const response = await JobDataService.getPtpHistory();
    
      set({ ptpHistory: response })
      
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } 
  },

  setJob: (value) => {
    //set({ jobs:  results})
    set((state)=> ({jobs:[...state.jobs.map((job) => {
      if(job._id === value._id){
        return value;
      }else{
        return job;
      }
  })]}))
  }
  
}));



export default useJobStore;
