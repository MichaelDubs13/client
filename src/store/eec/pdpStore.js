import {create} from "zustand";

const pdpCondiguration = {
  createBranchCircuit: () => {
    return {
      PwrDrop_Spare: false,
      DropType: "A-external",
      PwrDrop_DescTxt: "",
      dbl_Cable_Length: 0,
      StrBox_DT: "",
      TargetDevice_DT: "",
      TargetDevice_FLA: 0,
      StrBox_DT_FLA: 0,
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
        branchCircuit:{
          "10A":[],
          "20A":[],
          "30A":[],
          "40A":[],
          "60A":[],
          "70A":[],
          "100A":[],
          "250A":[],
        }
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