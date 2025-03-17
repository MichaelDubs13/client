import {create} from "zustand";

const mcpConfiguration = {
  
  // Change this to reflect the Ethernet drops
  /* createBranchCircuit: () => {
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
  }, */

  // Change this to reflect the Main Control Panel configuration
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
const mcpStore = create((set) => ({
  counts : [
    {
      parameter: 'NumberofMCP_Instances',
      name :'Enter the number of Main Control Panels required for this line:',
      placeholder: "1",
      type:"number",
      value:""
    },
  ],
    mcps:[],    
    addMcp: (numberOfMcp, data) => {
      set({mcps:[]});
      for (let i = 0; i < numberOfMcp; i++) {
        var mcp = mcpConfiguration.create();
        set((state) => ({mcps:[...state.mcps, mcp]}));
      }
    },

    // Change this to reflect the Ethernet drops
    /* addBranchCircuit:()=>{
      return mcpConfiguration.createBranchCircuit();
    } */

}));

export default mcpStore