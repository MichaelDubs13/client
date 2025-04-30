import { projectStore } from '../../projectStore';
import { v4 as uuidv4 } from 'uuid';
import { formatToTwoDigits, getItemById, recreateArrayElement, recreateObject } from '../../util';
import { lineConfiguration } from '../../lineStore';
import { mcpStore, mcpConfiguration } from '../../mcpStore';
import { portModel } from './portModel';

export const mcpModel = {
    create: (index, name) => { 
        const line = projectStore.getState().line;
        const location = name ? name : `MCP${formatToTwoDigits(1+index)}`;
        const mcp = {
          fla:"",
          line:line,
          location:location,
          deviceTag:location,
          mcpMountingLocation: "",
          psu_location:"",
          psu_location_dt:"",
          ups_ip: "",
          plc_network_switch_required:false,
          plc_plant_ip:"",
          plc_to_plc_ip:"",
          plc_local_ip:"192.168.1.2",
          plc_local_ip_secondary: "",
          plc_id: `${line}-${location}-PLC01`,
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
          gb_Port2_CableLength: "NULL",
          gb_Port3_CableLength: "NULL",
          gb_Port4_CableLength: "NULL",
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
          UI:{
            expanded:false,
            icon:"/panel.png",
          },
          data:{
            type:'mcp',
            id:uuidv4(),
          },
          getIndexObject: function(){
            const mcpIndex = this.getIndex();
            return {
              mcpIndex:mcpIndex,
            }
          },
          setValue: function(indexObject, key, value){
            mcpStore.getState().setMcpValue(indexObject, key, value);
          },
          getIndex: function(){
            const mcps = mcpStore.getState().mcps;
            return mcps.findIndex(mcp => mcp.data.id === this.data.id)
          },
          getItemById: function(id){
            return getItemById(this.portss, id);
          },
          getNodeData: function(){
            return [
              this.location,
            ]
          },
          getPlc: function(){
            return `${this.line}-${this.location}-PLC01`;
          },
          getStations: function(){
            var stations = []
            stations = lineConfiguration.getStations(this.ports, stations);
            stations = [...stations, this.mcpMountingLocation, this.psu_location]
            return stations;
          },
          getDevices: function(station){
            var devices = []
            devices = lineConfiguration.getDevices(this.ports, devices, station);
            devices = [...devices, ]
            return devices;
          }
      }
      mcp.ports = mcpModel.initializePorts(3, mcp);
      return mcp;
    },
    initializePorts: (numberOfPorts, parent) => {
        var ports = [];
        for (let i = 0; i < numberOfPorts; i++) {
        var port = portModel.create(parent);
        ports.push(port)
        }
        return ports;
    },
    generateData: (mcps) => {
        mcps.forEach(mcp => {
          const length = mcp.ports.length > 4 ? 4 : mcp.ports.length;
          for(let i=0; i < length; i++){
            const port = mcp.ports[i];
            if(i === 1){
              mcp.leth_port2_target_location = port.targetLocation;
              mcp.leth_port2_target_dt = port.targetDT;
              mcp.leth_port2_target_port = port.targetPort;
              mcp.gb_Port2_CableLength = port.targetCableLength;
            } else if(i===2){
              mcp.leth_port3_target_location = port.targetLocation;
              mcp.leth_port3_target_dt = port.targetDT;
              mcp.leth_port3_target_port = port.targetPort;
              mcp.gb_Port3_CableLength = port.targetCableLength;
            } else if(i===3){
              mcp.leth_port4_target_location = port.targetLocation;
              mcp.leth_port4_target_dt = port.targetDT;
              mcp.leth_port4_target_port = port.targetPort;
              mcp.gb_Port4_CableLength = port.targetCableLength;
            }
          }
        });
       return mcps
    },
    merge: (state, currentState) => { 
        const mcps = mcpModel.recreate(state.mcps);
        state.mcps = mcps;
        Object.assign(currentState, state)
        return currentState
    },
    recreate:(mcps)=>{
        const newMcps = mcps.map(mcp => {
            var newMcp = recreateObject(mcp, mcpModel.create)
            var ports = recreateArrayElement(newMcp, mcp.ports, portModel.create)
            newMcp.ports = ports;
            return newMcp;
        })
        return newMcps;
    }
}