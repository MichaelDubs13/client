import {create} from "zustand";

const pdpCondiguration = {
  createBranchCircuit: (index, amp) => {
    return {
      index: index,
      amp: amp,
    }
  },
  create: () => { 
    return {
        name:"",
        line:"",
        amp:"", 
        FLA:"", 
        location:"", 
        enclosureSize:"",
        Opt_SurgeProtectionDevice:"",
        PwrMonitorEnable:"",
        Opt_HotPwrEnable:"",
        numberOf10APwrDrps:"", 
        numberOf20APwrDrps:"",
        numberOf30APwrDrps:"",
        numberOf40APwrDrps:"",
        numberOf60APwrDrps:"",
        numberOf70APwrDrps:"",
        numberOf100APwrDrps:"",
        numberOf250APwrDrps:"",
        spare10A:"",
        spare20A:"",
        spare30A:"",
        spare40A:"",
        spare60A:"",
        spare70A:"",
        spare100A:"",
        spare250A:"",
  }
  }
}
const pdpStore = create((set) => ({
  counts : [
    {
      parameter: 'NumberofPDP_Instances',
      name :'Enter the number of Power Distribution Panels required for this line:',
      placeholder: "1",
      type:"number",
      value:""
    },
  ],
    pdps:[],    
    addPdp: (numberOfPdp, data) => {
      set({pdps:[]});
      for (let i = 0; i < numberOfPdp; i++) {
        var pdp = pdpCondiguration.create();
        set((state) => ({pdps:[...state.pdps, pdp]}));
      }
    },

    addBranchCircuit:()=>{
      return pdpCondiguration.createBranchCircuit();
    }

}));

export default pdpStore