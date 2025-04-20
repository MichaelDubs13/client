import {create} from "zustand";
import pdpParser from "../Excel/pdpParser";
import { projectStore } from "./projectStore";
import { v4 as uuidv4 } from 'uuid';
import {formatToTwoDigits} from './util'


const pdpOptions = {
  amperageOptions: [
    { value: "200A", label: "200A" },
    { value: "400A", label: "400A" },
    { value: "600A", label: "600A" }
  ],

  enclosureSizeOptions:[
    { value: "800x1400x500(WHD)", label: "800(W) x 1400(H) x 500(D)" },
    { value: "1000x1800x500(WHD)", label: "1000(W) x 1800(H) x 500(D)" }
  ],

  hotPwrDropTypeOptions: [
    { value: "Spare", label: "Spare" },
    { value: "Device", label: "Device" }
  ],

  dropTypeOptions: [
    { value: "A-external", label: "A - External" },
    { value: "B-internal", label: "B - Internal" },
    { value: "C-spare", label: "C - Spare" }
  ],
}


const pdpConfiguration = {
  getItemById:(pdp, id) =>{
    const branchCircuit = pdp.branchCircuit;
    const keys = Object.keys(branchCircuit).reverse();
    for(let i=0;i<keys.length;i++){
      const key = keys[i];
      for(let j=0;j<branchCircuit[key].length;j++){
        const drop = branchCircuit[key][j];
        if(drop.data.id === id){   
          return drop;
        }
      }
    }

    return null;
  },
  
  getCB:(branchCircuit, cb_dt) =>{
    const keys = Object.keys(branchCircuit).reverse();
    for(let i=0;i<keys.length;i++){
      const key = keys[i];
      for(let j=0;j<branchCircuit[key].length;j++){
        const drop = branchCircuit[key][j];
        if(drop.UI.CB_DT === cb_dt){   
          return drop;
        }
      }
    }

    return null;
  },
  
  /**
   * creates a new branch circuit with default values
   * @returns 
   */
  createBranchCircuit: (parent, amperage) => {
    return {
      PwrDrop_Spare: false,
      DropType: "A-external",
      PwrDrop_DescTxt: "",
      dbl_Cable_Length: 0,
      StrBox_DT: "",
      TargetDevice_DT: "",
      TargetDevice_FLA: 0,
      StrBox_DT_FLA: 0,
      UI:{
        expanded:false,
        CB_DT:"",
        icon:"/powerdrop.png",
      },

      data:{
        type:'cb',
        parent:parent,
        amperage:amperage,
        targetDevice:'',
        id:uuidv4(),
      },
      setValue: function(indexObject, key, value){
        pdpStore.getState().setBranchCircuitValue(indexObject, key, value, false, false);
      },
      setDataValue: function(key, value){
        const pdps = pdpStore.getState().pdps;
        const pdpIndex = this.data.parent.getIndex();
        const amperage = this.data.amperage;
        const branchCircuitIndex = Array.from(pdps[pdpIndex].branchCircuit[amperage]).indexOf(this);
        const indexObject = {
          pdpIndex:pdpIndex,
          branchCircuitIndex:branchCircuitIndex,
          amperage:amperage,
        }
        pdpStore.getState().setBranchCircuitValue(indexObject, key, value, false, true);
      },
      getNodeData: function(){
        return [
          this.data.amperage,
        ]
      }
    }
  },

  /**
   * creates a new branchCircuits object with empty branches
   * @returns 
   */
  initializeBranchCircuits: () => {
       const branchCircuit = {
          "10A":[],
          "20A":[],
          "30A":[],
          "40A":[],
          "60A":[],
          "70A":[],
          "100A":[],
          "250A":[],
        }

        return branchCircuit;
  },

  /**
   * Update CB_DT value in the UI object, this should be called after CB creation, this is to generate a list a CB identifier for the PDP
   * @param {*} branchCircuit all branchCircuits in a PDP
   * @returns 
   */
  updateBranchCircuitCB_DT:(branchCircuit) => {
    var i = 1;
    Object.keys(branchCircuit).reverse().forEach(key => {
      branchCircuit[key].forEach(drop => {
        drop.UI.CB_DT = `CB${i}`;
        i = i +1;
      })
    });
    return branchCircuit;  
  },
  createBranchCircuits: (numberOfDrps, parent, amperage) => {
    var newPwrDrops = []
    for(let i=0; i<numberOfDrps; i++){
        var newPwrDrop = pdpConfiguration.createBranchCircuit(parent, amperage);
        newPwrDrops.push(newPwrDrop);
    }
    return newPwrDrops;
  },

  /**
   * creates a new hotPower Branch circuit with default values
   * @returns 
   */
  createHotPowerBranchCircuit: () => {
    return {
      HotPwrDropType: "Spare",
      HotPwrDrp_Target_Location: "",
      HotPwrDrp_Target_DT: "",
      HotPwrDrp_Target_Desc: "",
      data:{
        type:'hotPower',
        id:uuidv4(),
      },
      setValue: function(indexObject, key, value){
        pdpStore.getState().setHotPowerValue(indexObject, key, value);
      },
      getNodeData: function(){
        return [
          
        ]
      }
    }
  },

  /**
   * creates a new pdp object with default values, all default values should be specified here
   * @returns new pdp with default values
   */
  create: (location) => { 
    const line = projectStore.getState().line;
    const pdp = {
      name:"", 
      amp:"400A", 
      FLA:0,
      line:line, 
      location:location, 
      enclosureSize:"1000x1800x500(WHD)",
      numberOfBusBar:0,
      branchCircuit:pdpConfiguration.initializeBranchCircuits(),
      spare10A:0,
      spare20A:0,
      spare30A:0,
      spare40A:0,
      spare60A:0,
      spare70A:0,
      spare100A:0,
      spare250A:0,
      Opt_SurgeProtectionDevice:false,
      PwrMonitorEnable:false,
      Opt_HotPwrEnable:false,
      hotPowerDrops:[],
      UI:{
        expanded:false,
        icon:"/panel.png",
      },
      data:{
        type:'pdp',
        id:uuidv4(),
      },
      setValue: function(indexObject, key, value){
        pdpStore.getState().setPdpValue(indexObject, key, value);
      },
      getCB: function(location, cb_dt){
          if(this.location === location){
            const cb = pdpConfiguration.getCB(this.branchCircuit, cb_dt);
            return cb;
          }
          return null;
      },
      getIndex: function(){
        const pdps = pdpStore.getState().pdps;
        return pdps.findIndex(pdp => pdp.data.id === this.data.id)
      },
      getItemById: function(id){
        return pdpConfiguration.getItemById(this, id);
      },
      getNodeData: function(){
        return [
          this.location,
          this.amp,
          this.FLA,
          this.enclosureSize,
        ]
      }
    }

    return pdp;
  },
  /**
   * This function is intended to do the final clean ups and data manipulation and run right before data is send to Model class for IMX generation, 
   * @param {Array} pdps pdp class generated by excel/UI forms
   * @returns finalized pdps objects for model class
   */
  generateData: (pdps) => {
      pdps.forEach(pdp => {
        const numberOfBusBar = pdpParser.getNumberOfBusBar(pdp.enclosureSize);
        pdp.numberOfBusBar = numberOfBusBar;
      });
      return pdps;
  }
}
const pdpStore = create((set) => ({
    pdps:[],
    /**
     * Replace current pdps objects with input pdp objects, this is used to set pdp data from excel sheet/save files
     * @param {Array} pdps 
     */
    setPdps: (pdps) => {
      set({pdps:pdps});
    },
    /**
     * Add additional pdps objects, example:if numberOfPdp specified in the input is 5 and current number of Pdps is 3,
     * an addition of 2 pdps with default values will be added
     * @param {Number} numberOfPdp 
     */    
    addPdps: (numberOfPdp) => {
      set((state) => {
        const diff = numberOfPdp - [...state.pdps].length
        if(diff > 0){
          const pdps = []
          for (let i = 0; i < diff; i++) {
            const location = `PDP${formatToTwoDigits(i+1)}`
            var pdp = pdpConfiguration.create(location);
            pdps.push(pdp);
          }  
          return {pdps:[...state.pdps, ...pdps]}
        } else if(diff < 0) {
            let newPdps = [...state.pdps];
            newPdps = newPdps.slice(0, newPdps.length + diff);
            return {pdps:newPdps}
        } else {
          
          return {pdps:[...state.pdps]}
        }
      })
    },
    /**
     * delete target pdp, this function use index to find the target pdp.
     * @param {Number} index 
     */
    deletePdp:(index) => {  
      set((state) => {
        return {pdps: [...state.pdps.slice(0, index), ...state.pdps.slice(index + 1)]};
      })
    },
    /**
     * add an copy of target pdp, this function use index to find the target pdp.
     * @param {Number} index 
     */
    duplicatePdp:(index) => {  
      set((state) => {
        const newPdp = {...state.pdps[index]}
        return {pdps: [...state.pdps, newPdp]};
      })
    },

    /**
     * update a parameter of the target pdp with a new value, this function use index to find the target pdp.
     * @param {Object} indexObject json object containing index of target pdp
     * @param {String} key name of the parameter
     * @param {String} value value of the parameter
     */
    setPdpValue:(indexObject, key, value)=>{
      const index = indexObject.pdpIndex
      set((state) => {
        const newPdps = [...state.pdps];
        newPdps[index] = {...newPdps[index], [key]: value};
        return { pdps: newPdps };
      });
    },
    /**
     * update a parameter of the target branchCircuit with a new value, this function use index to find the target pdp and 
     * another index to find target branchCircuit
     * @param {Object} indexObject json object containing index of target pdp and index of target branchCircuit
     * @param {String} key name of the parameter
     * @param {String} value value of the parameter
     * @param {Boolean} isUI set value for UI object in the main object
     */
    setBranchCircuitValue:(indexObject, key, value, isUI, isData)=>{
      const pdpIndex = indexObject.pdpIndex;
      const branchCircuitIndex = indexObject.branchCircuitIndex;
      const amperage = indexObject.amperage;
      set((state) => {
        const newPdps = [...state.pdps];
        const branches = newPdps[pdpIndex].branchCircuit[amperage];
        var branch = newPdps[pdpIndex].branchCircuit[amperage][branchCircuitIndex];
        if(isUI){
          branch.UI[key] = value
        } else if(isData){
          branch.data[key] = value
        } else {
          branch[key] = value;
        }
        branches[branchCircuitIndex] = branch;

        newPdps[pdpIndex] = {...newPdps[pdpIndex], 
          branchCircuit:{
            ...newPdps[pdpIndex].branchCircuit, 
            [amperage]:branches,
          }
        };
        return { pdps: newPdps };
      });
    },

    /**
     * Creates X number of the powerDrops in a target branchCircuit 
     * @param {Object} index index of the target pdp
     * @param {String} amperage key of the branchCircuits to be updated, 
     * @param {String} value numberOfBranchCircuit to be created
     */
    setNumberOfPowerDrps:(index, amperage, value)=>{
      set((state) => {
        var newPdps = [...state.pdps];
        var branchCircuit  = pdpConfiguration.createBranchCircuits(value, newPdps[index], amperage);
        newPdps[index].branchCircuit[amperage] = branchCircuit;
        branchCircuit = pdpConfiguration.updateBranchCircuitCB_DT(newPdps[index].branchCircuit);
        return { pdps: newPdps };
      });
    },
 
    /**
     * Creates 3 instances of the hotpoweritems for target pdp, this function uses index to find the target pdp
     * @param {Number} index index of the target pdp
     */
    setHotPowerBranchCircuit:(index) => {
      var newPwrDrops = []
      for(let i=0; i<3; i++){
          var newPwrDrop = pdpConfiguration.createHotPowerBranchCircuit();
          newPwrDrops.push(newPwrDrop);
      }

      set((state) => {
        const newPdps = [...state.pdps];
        newPdps[index] = {...newPdps[index], hotPowerDrops: newPwrDrops};
        return { pdps: newPdps };
      });
    },

     /**
     * update a parameter of the target HotPower with a new value, this function use index to find the target pdp and 
     * another index to find target hotPower
     * @param {Object} indexObject json object containing index of target pdp and index of target HotPower
     * @param {String} key name of the parameter
     * @param {String} value value of the parameter
     */
    setHotPowerValue:(indexObject, key, value)=>{
      const pdpIndex = indexObject.pdpIndex;
      const hotPowerIndex = indexObject.hotPowerIndex;

      set((state) => {
        const newPdps = [...state.pdps];
        const hotPowerDrops = [...newPdps[pdpIndex].hotPowerDrops]
        hotPowerDrops[hotPowerIndex] = {...hotPowerDrops[hotPowerIndex], [key]:value}

        newPdps[pdpIndex] = {...newPdps[pdpIndex], 
          hotPowerDrops:hotPowerDrops
        };
        return { pdps: newPdps };
      });
    },

}));

export {
  pdpStore,
  pdpConfiguration,
  pdpOptions
}