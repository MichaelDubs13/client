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
        mcpMountingLocation:"", 
        psu_location:"", 
        psu_location_dt:"", 
        ups_ip:"",
        plc_plant_ip:"",
        plc_to_plc_ip:"",
        plc_local_ip:"",
        plc_local_ip_secondary:"", 
        plc_id:"",
        plc_port_x1p2r_target_location:"",
        plc_port_x1p2r_target_dt:"",
        ked_plant_ip:"",
        ked_plc_to_plc_ip:"",
        ked_local_ip:"",
        ked_local_ip_secondary:"",
        ked_port4_target_location:"",
        ked_port4_target_dt:"",
        ked_port5_target_location:"",
        ked_port5_target_dt:"",
        leth_plant_ip:"",
        leth_plc_to_plc_ip:"",
        leth_local_ip:"",
        leth_local_ip_secondary:"",
        leth_port2_target_location:"",
        leth_port2_target_dt:"",
        leth_port2_target_port:"",
        leth_port2_target_cable_length:"",
        leth_port3_target_location:"",
        leth_port3_target_dt:"",
        leth_port3_target_port:"",
        leth_port3_target_cable_length:"",
        leth_port4_target_location:"",
        leth_port4_target_dt:"",
        leth_port4_target_port:"",
        leth_port4_target_cable_length:"",
        leth_number_of_ports:"",
        eth_plant_ip:"",
        eth_plc_to_plc_ip:"",
        eth_local_ip:"",
        eth_local_ip_secondary:"",
        eth_port1_target_location:"",
        eth_port2_target_location:"",
        //Change branchCircuit to LETH Ports
        /* branchCircuit:{
          "10A":[],
          "20A":[],
          "30A":[],
          "40A":[],
          "60A":[],
          "70A":[],
          "100A":[],
          "250A":[],
        } */
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