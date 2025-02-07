import { BACKEND_URL } from "../lib/config";

class DeviceDataService {
  getShops() {
    const result = fetch(`${BACKEND_URL}/devices/shop`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }
  updateLine(id, data) {
    const result = fetch(`${BACKEND_URL}/devices/shop/${id}/line`, {
      method: "PUT",
      body:data
    })

    return result;
  }
  createLine(id, data) {
    console.log(data);
    const result = fetch(`${BACKEND_URL}/devices/shop/${id}/line`, {
      method: "POST",
      body:data
    })

    return result;
  }
  getLines(id) {
    const result = fetch(`${BACKEND_URL}/devices/shop/${id}/line`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      } 
      
    })

    return result;
  }
  getLine(shop_id, line_id) {
    const result = fetch(`${BACKEND_URL}/devices/shop/${shop_id}/line/${line_id}`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      } 
      
    })

    return result;
  }
  getLineInstalledProducts(shop_id, line_id) {
    const result = fetch(`${BACKEND_URL}/devices/shop/${shop_id}/line/${line_id}/installed-product`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      } 
      
    })

    return result;
  }
  pingLineService(shop_id, line_id) {
    const result = fetch(`${BACKEND_URL}/devices/shop/${shop_id}/line/${line_id}/ping`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      } 
      
    })

    return result;
  }

  installISOs(shop_id, line_id, data) {
    const result = fetch(`${BACKEND_URL}/devices/shop/${shop_id}/line/${line_id}/install-iso`, {
      method: "POST",
      body:data
    })
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      } 
      
    })

    return result;
  }

  installGSDs(shop_id, line_id) {
    const result = fetch(`${BACKEND_URL}/devices/shop/${shop_id}/line/${line_id}/install-gsd`, {
      method: "POST",
      body:{}
    })
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      } 
      
    })

    return result;
  }

  installHSPs(shop_id, line_id) {
    const result = fetch(`${BACKEND_URL}/devices/shop/${shop_id}/line/${line_id}/install-hsp`, {
      method: "POST",
      body:{}
    })
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      } 
      
    })

    return result;
  }

  getGSDs() {
    const result = fetch(`${BACKEND_URL}/devices/gsd`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      } 
      
    })

    return result;
  }
  getMissingGSDs() {
    const result = fetch(`${BACKEND_URL}/devices/gsd/missing`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      } 
      
    })

    return result;
  }

  getMastercopyGSDs() {
    const result = fetch(`${BACKEND_URL}/devices/gsd/mastercopies`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      } 
      
    })

    return result;
  }

  getGsdFolders() {
    const result = fetch(`${BACKEND_URL}/devices/gsd/folders`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      } 
      
    })

    return result;
  }
  createLabel(data) {
    const result = fetch(`${BACKEND_URL}/devices/labels`, {
      method: "POST",
      body:data
    })

    return result;
  }
  deleteLabel(data) {
    const result = fetch(`${BACKEND_URL}/devices/labels`, {
      method: "PUT",
      body:data
    })

    return result;
  }

  getBlocksPerPLC(plc_id, template_id) {

    const result = fetch(`${BACKEND_URL}/devices/plc/${plc_id}/block?` + new URLSearchParams({
      template_id: template_id,
    })).then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })
    

    return result;
  }

  getHMI(id) {
    const result = fetch(`${BACKEND_URL}/devices/hmi/${id}`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }
  getHmiSettings(id) {
    const result = fetch(`${BACKEND_URL}/devices/hmi/${id}/settings`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }
  updatePlcSettingsById(id,data) {
    const result = fetch(`${BACKEND_URL}/devices/plc/${id}/settings`, {
      method: "POST",
      body:data
    })

    return result;
  }  
  updateHmiSettingsById(id,data) {
    const result = fetch(`${BACKEND_URL}/devices/hmi/${id}/settings`, {
      method: "POST",
      body:data
    })

    return result;
  }  
  getServerLogs(shop_id, line_id) {
    const result = fetch(`${BACKEND_URL}/devices/shop/${shop_id}/line/${line_id}/logs`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }
  getServerLog(shop_id, line_id, log_id) {
    var uri = encodeURIComponent(log_id)
    const result = fetch(`${BACKEND_URL}/devices/shop/${shop_id}/line/${line_id}/logs/${uri}`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }
  getHmiLogs(id) {
    const result = fetch(`${BACKEND_URL}/devices/hmi/${id}/logs`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }
  
  getHmiLog(hmi_id, log_id) {
    const result = fetch(`${BACKEND_URL}/devices/hmi/${hmi_id}/logs/${log_id}`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }

  getHMIsPerPLC(shop_id, line_id, plc_id) {
    const result = fetch(`${BACKEND_URL}/devices/shop/${shop_id}/line/${line_id}/plc/${plc_id}/hmi`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }

  getHMIsPerShop(shop_id) {
    const result = fetch(`${BACKEND_URL}/devices/shop/${shop_id}/line/all/plc/all/hmi`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }

  getHMIsPerLine(shop_id, line_id) {
    const result = fetch(`${BACKEND_URL}/devices/shop/${shop_id}/line/${line_id}/plc/all/hmi`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }

  

  getHMIs() {
    const result = fetch(`${BACKEND_URL}/devices/hmi`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }

  getPLCsPerLine(shop_id, line_id) {
    const result = fetch(`${BACKEND_URL}/devices/shop/${shop_id}/line/${line_id}/plc`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }

  getPLCsPerShop(shop_id) {
    const result = fetch(`${BACKEND_URL}/devices/shop/${shop_id}/line/all/plc`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }

  getPLCs() {
    const result = fetch(`${BACKEND_URL}/devices/plc`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }

  getPlcsByLabel(label) {
    const result = fetch(`${BACKEND_URL}/devices/plc?` + new URLSearchParams({
      labels: label,
    })).then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }


  getLabels() {
    const result = fetch(`${BACKEND_URL}/devices/labels`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }

  getPLC(id) {
    const result = fetch(`${BACKEND_URL}/devices/plc/${id}`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }
  getPlcHardwares(id) {
    const result = fetch(`${BACKEND_URL}/devices/plc/${id}/hardwares`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }
  getPlcHardwaresGuides(id) {
    const result = fetch(`${BACKEND_URL}/devices/plc/${id}/hardwares/guides`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }
  getPlcHardwaresLinks(id) {
    const result = fetch(`${BACKEND_URL}/devices/plc/${id}/hardwares/links`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }
  getCallsByPLC(id) {
    const result = fetch(`${BACKEND_URL}/devices/plc/${id}/call`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }
  getCallsByName(id) {
    const result = fetch(`${BACKEND_URL}/devices/call/${id}`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }
  getHardwaresByBlock(id) {
    const result = fetch(`${BACKEND_URL}/devices/hardware?`+ new URLSearchParams({
      block: id,
    })).then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }

  getLabelsByPLC(id) {
    const result = fetch(`${BACKEND_URL}/devices/labels?`+ new URLSearchParams({
      plcs: id,
    })).then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }

  getPlcRev(id) {
    const result = fetch(`${BACKEND_URL}/devices/plc/${id}/rev`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }

  getPlcRevDetail(plc_id, rev_id) {
    const result = fetch(`${BACKEND_URL}/devices/plc/${plc_id}/rev/${rev_id}`)
    .then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }

  createPLC(data) {
    
    console.log(data);
    const result = fetch(`${BACKEND_URL}/devices/plc`, {
      method: "POST",
      body:data
    })

    return result;
  }
  getDevicesByGSD(name) {
    const result = fetch(`${BACKEND_URL}/devices/gsd/devices?`+ new URLSearchParams({
      name: name,
    })).then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }

  getBlocksByGSD(name) {
    const result = fetch(`${BACKEND_URL}/devices/gsd/blocks?`+ new URLSearchParams({
      name: name,
    })).then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }
  getGuidesByGSD(parsedName) {
    const result = fetch(`${BACKEND_URL}/devices/gsd/guides?`+ new URLSearchParams({
      parsedName: parsedName,
    })).then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }
  getLinksByGSD(parsedName) {
    const result = fetch(`${BACKEND_URL}/devices/gsd/links?`+ new URLSearchParams({
      parsedName: parsedName,
    })).then(async response => {
      if(!response.ok){
        throw new Error(response.status);
      } 
      else{
        return await response.json()
      }
    })

    return result;
  }
  createGsdLink(id, data) {
    
    const result = fetch(`${BACKEND_URL}/devices/gsd/${id}/links`, {
      method: "POST",
      body:data
    })

    return result;
  }
  

  updateGsdName(id, data) {
    const result = fetch(`${BACKEND_URL}/devices/gsd/${id}`, {
      method: "PUT",
      body:data
    })

    return result;
  }
  updatePLC(id, data) {
    const result = fetch(`${BACKEND_URL}/devices/plc/${id}`, {
      method: "PUT",
      body:data
    })

    return result;
  }

  deletePLC(id) {
    const result = fetch(`${BACKEND_URL}/devices/plc/${id}`, {
      method: "DELETE",
    })

    return result;
  }

  createHMI(data) {
    
    const result = fetch(`${BACKEND_URL}/devices/hmi`, {
      method: "POST",
      body:data
    })

    return result;
  }
  createHMIs(data) {
    
    const result = fetch(`${BACKEND_URL}/devices/hmi/upload`, {
      method: "POST",
      body:data
    })
  
    return result;
  }
}




export default new DeviceDataService();