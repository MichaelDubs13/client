import {create} from "zustand";
import deviceDataService from "../services/deviceDataService";
import fileDataService from "../services/fileDataService";




const useDeviceStore = create((set) => ({
  shops:[],
  devices: [],
  device: null,
  deviceSettings: null,
  deviceLogs: null,
  serverLogs: null,
  plcRevisions:[],
  shop:"",
  line:"",
  plc:"",
  hardwares:[],
  labels:[],
  gsds:[],
  blocks:[],
  calls:[],
  gsdFolders:[],
  mastercopyGsds:[],
  groups:[],
  guides:[],
  links:[],

  setGroups: async(groups) => {
    set({ groups:groups})
  },
  updateGroup: async(oldGroup, newGroup) => {
    set((state) => ({
      groups: state.groups.map((group) => group.Name._text === oldGroup ? newGroup: group),
    }))
  },
  createHMI: async (formData) => {
    try{
      const response = await deviceDataService.createHMI(formData);
      //const data = await response.json();
      
      if (!response.ok) {
        const error = (formData && formData.message) || response.status;
        return Promise.reject(error);
      }
    }catch(error){
      console.error(error.message);
    }
  },
  createHMIs: async (formData) => {
    try{
      const response = await deviceDataService.createHMIs(formData);
      //const data = await response.json();
      
      if (!response.ok) {
        const error = (formData && formData.message) || response.status;
        return Promise.reject(error);
      }
    }catch(error){
      console.error(error.message);
    }
  },
  createPLC: async (formData) => {
    try{
      const response = await deviceDataService.createPLC(formData);
      //const data = await response.json();
      
      if (!response.ok) {
        const error = (formData && formData.message) || response.status;
        return Promise.reject(error);
      }
    }catch(error){
      console.error(error.message);
    }
  },

  createHardwareLink: async (id, formData) => {
    try{
      const response = await deviceDataService.createGsdLink(id, formData);
      //const data = await response.json();
      
      if (!response.ok) {
        const error = (formData && formData.message) || response.status;
        return Promise.reject(error);
      }
    }catch(error){
      console.error(error.message);
    }
  },

  uploadManual: async (id, formData) => {
    try{
      const response = await fileDataService.uploadManual(id, formData);
      //const data = await response.json();
      
      if (!response.ok) {
        const error = (formData && formData.message) || response.status;
        return Promise.reject(error);
      }
    }catch(error){
      console.error(error.message);
    }
  },
  updateGsdName: async(id, formData) => {
    try{
      const response = await deviceDataService.updateGsdName(id, formData);
      //const data = await response.json();
      
      if (!response.ok) {
        const error = (formData && formData.message) || response.status;
        return Promise.reject(error);
      }
    }catch(error){
      console.error(error.message);
    }
  },
updateLine: async(id, formData) => {
  try{
    const response = await deviceDataService.updateLine(id, formData);
    //const data = await response.json();
    
    if (!response.ok) {
      const error = (formData && formData.message) || response.status;
      return Promise.reject(error);
    }
  }catch(error){
    console.error(error.message);
  }
},

createLine: async(shop_id, formData) => {
  try{
    const response = await deviceDataService.createLine(shop_id, formData);
    //const data = await response.json();
    
    if (!response.ok) {
      const error = (formData && formData.message) || response.status;
      return Promise.reject(error);
    }
  }catch(error){
    console.error(error.message);
  }
},

createLabel: async(formData) => {
  try{
    const response = await deviceDataService.createLabel(formData);
    //const data = await response.json();
    
    if (!response.ok) {
      const error = (formData && formData.message) || response.status;
      return Promise.reject(error);
    }
  }catch(error){
    console.error(error.message);
  }
},
deleteLabel: async(formData) => {
  try{
    const response = await deviceDataService.deleteLabel(formData);
    //const data = await response.json();
    
    if (!response.ok) {
      const error = (formData && formData.message) || response.status;
      return Promise.reject(error);
    }
  }catch(error){
    console.error(error.message);
  }
},

fetchGSDs: async () => {
  try {
    const response = await deviceDataService.getGSDs();
    //const data = await response.json();
    
    set({ gsds:response})

  } catch (error) {
    console.error("Error fetching devices:", error);
  }
},


fetchGsdFolders: async () => {
  try {
    const response = await deviceDataService.getGsdFolders();
    //const data = await response.json();
    
    set({ gsdFolders:response})

  } catch (error) {
    console.error("Error fetching devices:", error);
  }
},

fetchMissingGSDs: async () => {
  try {
    const response = await deviceDataService.getMissingGSDs();
    //const data = await response.json();
    return response;
  } catch (error) {
    console.error("Error fetching devices:", error);
  }
},

fetchMastercopyGSDs: async () => {
  try {
    const response = await deviceDataService.getMastercopyGSDs();
    //const data = await response.json();
    set({ mastercopyGsds:response})
    return response;
  } catch (error) {
    console.error("Error fetching devices:", error);
  }
},
fetchGuidesByGSDs: async (parsedName) => {
  try {
    const response = await deviceDataService.getGuidesByGSD(parsedName);
    return response;
  } catch (error) {
    console.error("Error fetching devices:", error);
  }
},

fetchLinksByGSDs: async (parsedName) => {
  try {
    const response = await deviceDataService.getLinksByGSD(parsedName);
    return response;
  } catch (error) {
    console.error("Error fetching devices:", error);
  }
},

fetchBlocksPerPLC: async (plc_id, template_id) => {
  try {
    const response = await deviceDataService.getBlocksPerPLC(plc_id, template_id);

    set({ blocks:response})

    return response;

  } catch (error) {
    console.error("Error fetching devices:", error);
  }
},

fetchHMI: async (id) => {
    try {
      const response = await deviceDataService.getHMI(id);
      //const data = await response.json();
      console.log(response[0]);
      set({ device:response[0] })

    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  },
  fetchHmiSettings: async (id) => {
    try {
      const response = await deviceDataService.getHmiSettings(id);
      set({ deviceSettings:response.Settings })
      return response.Settings;

    } catch (error) {
      console.error("Error fetching HMI settings:", error);
    }
  },
  updateHmiSettingsById: async (id, formData) => {
    try{
      const response = await deviceDataService.updateHmiSettingsById(id, formData);
      //const data = await response.json();
      
      if (!response.ok) {
        const error = (formData && formData.message) || response.status;
        return Promise.reject(error);
      }
    }catch(error){
      console.error(error.message);
    }
  },
  updatePlcSettingsById: async (id, formData) => {
    try{
      const response = await deviceDataService.updatePlcSettingsById(id, formData);
      //const data = await response.json();
      
      if (!response.ok) {
        const error = (formData && formData.message) || response.status;
        return Promise.reject(error);
      }
    }catch(error){
      console.error(error.message);
    }
  },
  uploadHmiSettings: async (formData) => {
    try{
      const response = await fileDataService.uploadHmiSettings(formData);
      //const data = await response.json();
      return response;
    }catch(error){
      console.error(error.message);
    }
  },
  fetchServerLogs: async (shop_id, line_id) => {
    try {
      const response = await deviceDataService.getServerLogs(shop_id, line_id);
      set({ serverLogs:response })

    } catch (error) {
      console.error("Error fetching HMI settings:", error);
    }
  },
  fetchServerLog: async (shop_id, line_id, log_id) => {
    try {
      const response = await deviceDataService.getServerLog(shop_id, line_id, log_id);
      return response;

    } catch (error) {
      console.error("Error fetching HMI settings:", error);
    }
  },
  fetchHmiLogs: async (id) => {
    try {
      const response = await deviceDataService.getHmiLogs(id);
      set({ deviceLogs:response })

    } catch (error) {
      console.error("Error fetching HMI settings:", error);
    }
  },
  fetchHmiLog: async (hmi_id, log_id) => {
    try {
      const response = await deviceDataService.getHmiLog(hmi_id, log_id);
      return response;

    } catch (error) {
      console.error("Error fetching HMI settings:", error);
    }
  },
  fetchPLC: async (id) => {
    try {
      const response = await deviceDataService.getPLC(id);
      set({ device:response[0] })

    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  },

  fetchPlcRev: async (id) => {
    try {
      const response = await deviceDataService.getPlcRev(id);
      set({ plcRevisions:response })
    } catch (error) {
      console.error("Error fetching plc revisions:", error);
    }
  },
  fetchPlcCall: async (id) => {
    try {
      const response = await deviceDataService.getCallsByPLC(id);
      set({ calls:response })
      return response;
    } catch (error) {
      console.error("Error fetching plc calls:", error);
    }
  },

  fetchPlcRevDetail: async (plc_id, rev_id) => {
    try {
      const response = await deviceDataService.getPlcRevDetail(plc_id, rev_id);
      return response;
    } catch (error) {
      console.error("Error fetching plc revisions:", error);
    }
  },

  fetchPLCsPerLine:async(shop_id, line_id) => {
    try {
      const data = await deviceDataService.getPLCsPerLine(shop_id, line_id);
      return data;
      
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  },
  fetchPLCsPerShop:async(shop_id) => {
    try {
      const data = await deviceDataService.getPLCsPerShop(shop_id);
      return data;
      
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  },
  fetchLabels: async () => {
    
    try {
      const data = await deviceDataService.getLabels();
      set({ labels:data })
    } catch (error) {
      console.error("Error fetching labels:", error);
    }
  },
  fetchPLCs: async () => {
    
    try {
      const data = await deviceDataService.getPLCs();
      set({ devices:data })
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  },
  fetchPLCsByLabel: async (label) => {
    
    try {
      const data = await deviceDataService.getPlcsByLabel(label);
      set({ devices:data })
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  },
  fetchHMIs: async () => { 
    try {
      const data = await deviceDataService.getHMIs();
      set({ devices:data })
      
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  },
  setDevices:(data) => {
    set({ devices:data })
  },
  sortDevices: (sortField, sortOrder) => {
    if (sortField) {
      set((state) => ({devices:[...state.devices].sort((a, b) => {
      if (a[sortField] === null) return 1;
      if (b[sortField] === null) return -1;
      if (a[sortField] === null && b[sortField] === null) return 0;
      return (
       a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
        numeric: true,
       }) * (sortOrder === "asc" ? 1 : -1)
      );
     })}))
    }
   },
   fetchHMIsPerLine:async(shop_id, line_id) => {
    try {
      const data = await deviceDataService.getHMIsPerLine(shop_id, line_id);
      return data;
      
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  },
  fetchHMIsPerShop:async(shop_id) => {
    try {
      const data = await deviceDataService.getHMIsPerShop(shop_id);
      return data;
      
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  },
   fetchHMIsPerPLC:async(shop_id, line_id, plc_id) => {
    try {
      const data = await deviceDataService.getHMIsPerPLC(shop_id, line_id, plc_id);
      return data;
      
    } catch (error) {
      console.error("Error fetching hmi:", error);
    }
  },
  fetchHardwaresPerPLC:async(plc_id) => {
    try {
      const data = await deviceDataService.getPlcHardwares(plc_id);
      set({hardwares:data})
      return data;
      
    } catch (error) {
      console.error("Error fetching hardware:", error);
    }
  },
  fetchHardwaresGuidesPerPLC:async(plc_id) => {
    try {
      const data = await deviceDataService.getPlcHardwaresGuides(plc_id);
      set({guides:data})
      return data;
      
    } catch (error) {
      console.error("Error fetching hardware:", error);
    }
  },
  fetchHardwaresLinksPerPLC:async(plc_id) => {
    try {
      const data = await deviceDataService.getPlcHardwaresLinks(plc_id);
      set({links:data})
      return data;
      
    } catch (error) {
      console.error("Error fetching hardware:", error);
    }
  },

  fetchLabelsByPLC:async(plc_id) => {
    try {
      const data = await deviceDataService.getLabelsByPLC(plc_id);
      set({labels:data})
      
    } catch (error) {
      console.error("Error fetching labels:", error);
    }
  },

   addShop:(value) => {
    set((state) => ({shops:[...state.shops, value] }))
   },
   fetchShops: async () => {
    
    try {
      const data = await deviceDataService.getShops();

      set({ shops:data })
      return data;
      
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  },
  fetchLines: async (id) => {
    try {
      const data = await deviceDataService.getLines(id);
      return data;
      
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  },
  fetchLine: async (shop_id, line_id) => {
    try {
      const data = await deviceDataService.getLine(shop_id, line_id);
      return data;
      
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  },
  setShop: (value) => {
      set({shop:value})
  },
  setLine: (value) => {
    set({line:value})
  },
  setPLC: (value) => {
    set({plc:value})
  },
  setLabel: (value) => {
    set({labels:value})
  },
}));



export default useDeviceStore;
