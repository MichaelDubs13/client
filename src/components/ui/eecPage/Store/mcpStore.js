import {create} from "zustand";
const mcpOptions = {
  cableLengthOptions: [
    { value: "NULL", label: "NULL" },
    { value: "1.5 m", label: "1.5 m" },
    { value: "3 m", label: "3 m" },
    { value: "5 m", label: "5 m" },
    { value: "10 m", label: "10 m" },
    { value: "15 m", label: "15 m" },
    { value: "20 m", label: "20 m" },
  ],
}
const mcpConfiguration = {
  
  createLethPort: () => {
    return {
      targetLocation: "",
      targetDT: "",
      targetPort: "",
      targetCableLength: "NULL"
    }
  },

  create: () => { 
    return {
      fla:"",
      location:"",
      mcp_name:"",
      mcpMountingLocation: "",
      psu_location:"",
      psu_location_dt:"",
      ups_ip: "",
      plc_network_switch_required:false,
      plc_plant_ip:"",
      plc_to_plc_ip:"",
      plc_local_ip:"",
      plc_local_ip_secondary: "",
      plc_id: "",
      plc_portx1p2r_target_location: "",
      plc_portx1p2r_target_dt: "",
      ked_plant_ip:"", 
      ked_plc_to_plc_ip: "",
      ked_local_ip:"", 
      ked_local_ip_secondar:"",
      ked_port4_target_location: "",
      ked_port4_target_dt: "",
      ked_port5_target_location: "",
      ked_port5_target_dt: "",
      leth_plant_ip: "",
      leth_plc_to_plc_ip: "",
      leth_local_ip:"", 
      leth_local_ip_secondary:"",
      leth_sw_type:"",
      leth_port2:"",
      leth_port3:"",
      leth_port4:"",
      leth_port2_target_location: "",
      leth_port3_target_location: "",
      leth_port4_target_location: "",
      leth_port2_target_dt: "",
      leth_port3_target_dt: "",
      leth_port4_target_dt: "",
      leth_port2_target_port: "",
      leth_port3_target_port: "",
      leth_port4_target_port: "",
      gb_Port2_CableLength: "",
      gb_Port3_CableLength: "",
      gb_Port4_CableLength: "",
      leth_number_of_ports: 16,
      eth_plant_ip: "",
      eth_plc_to_plc_ip: "",
      eth_local_ip: "",
      eth_local_ip_secondary: "",
      eth_port1_target_location: "",
      eth_port2_target_location: "",
      b_PLC_ETH:false,
      direct_network_devices:[],
      connected_network_devices:[],
      ports:[],
  }
  },
  generateData: (mcps) => {
   return mcps
  }
}
const mcpStore = create((set) => ({
    mcps:[],    
    setMcps: (mcps) => {
      set({mcps:mcps});
    },    
    addMcp: (numberOfMcp) => {
       set((state) => {
          const diff = numberOfMcp - [...state.mcps].length
          if(diff > 0){
            const mcps = [];
            for (let i = 0; i < diff; i++) {
              var mcp = mcpConfiguration.create();
              mcps.push(mcp);
            } 
            return {mcps:[...state.mcps, ...mcps]} 
          } else if(diff < 0) {
              let newMcps = [...state.mcps];
              newMcps = newMcps.slice(0, newMcps.length + diff);
              return {mcps:newMcps}
          } else {
            return {mcps:[...state.mcps]}
          }
        })
    },
    duplicateMcp:(index) => {  
      set((state) => {
        const newMcp = {...state.mcps[index]}
        return {mcps: [...state.mcps, newMcp]};
      })
    },
    deleteMcp:(index) => {  
      set((state) => {
        return {mcps: [...state.mcps.slice(0, index), ...state.mcps.slice(index + 1)]};
      })
    },
    setMcpValue:(indexObject, key, value)=>{
      const index = indexObject.mcpIndex
      set((state) => {
        const newMcps = [...state.mcps];
        newMcps[index] = {...newMcps[index], [key]: value};
        return { mcps: newMcps };
      });
    },
    setNumberOfLethPorts:(index, numberOfPorts)=>{
      var ports = [];
      for (let i = 0; i < numberOfPorts; i++) {
        var port = mcpConfiguration.createLethPort();
        ports.push(port)
      }

      set((state) => {
        const newMcps = [...state.mcps];
        newMcps[index] = {...newMcps[index], 
          ports: ports,
        };
        return { mcps: newMcps };
      });
    },
    setPortValue:(indexObject, key, value)=>{
      const mcpIndex = indexObject.mcpIndex;
      const portIndex = indexObject.portIndex;

      set((state) => {
        const newMcps = [...state.mcps];
        const ports = [...newMcps[mcpIndex].ports]
        ports[portIndex] = {...ports[portIndex], [key]:value}

        newMcps[mcpIndex] = {...newMcps[mcpIndex], 
          ports:ports
        };
        return { mcps: newMcps };
      });
    },

}));

export {
  mcpStore,
  mcpConfiguration,
  mcpOptions
}