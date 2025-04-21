import * as XLSX from 'xlsx'
import { findClosestHigherNumber, splitIntoTwo } from './util';
import ProjectConfiguration from '../Models/ManufacturingEquipmentLine/ProjectConfiguration';
import { mcpConfiguration } from '../Store/mcpStore';


const mcpParser = {
    cable_length_options:[50, 20, 10, 5, 3, 1.5],
    parse:(workbook, sheet) => {
        var arr = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            let mcps = [];
            arr.forEach(item => {
                const fla = item["24Vdc FLA"];
                const isPlcToPlcSwRequired = item["Is PLC-PLC SW required (Y/N)?"];
                const ked_local_ip = item["KED Local IP"];
                const ked_plant_ip = item["KED Plant IP"];
                const ked_plc_plc_ip = item["KED PLC-PLC IP"];
                const ked_local_ip_secondary = item["KED Local IP Secondary"];
                const ked_port4_target_location = item["KED Port4 Target Location"];
                const ked_port4_target_dt = item["KED Port4 Target DT"];
                const ked_port5_target_location = item["KED Port5 Target Location"];
                const ked_port5_target_dt = item["KED Port5 Target DT"];
                const leth_sw_ip = item["LETH SW IP"];
                const leth_sw_ip_secondary = item["LETH SW IP Secondary"];
                const leth_plant_ip = item["LETH Plant IP"];
                const leth_plc_plc_ip = item["LETH PLC-PLC IP"];
                const leth_sw_type = item["LETH SW Type (4-Gb vs 16-Gb)"];
                const location = item["Location"];
                const mcp_name = item["MCP Name"];
                const mcpMountingLocation = item["MCP Mounting Location"];
                const plc_local_x1_ip = item["PLC Local (X1) IP"]; 
                const plc_local_x3_ip = item["PLC Plant (X3) IP"];
                const plc_plc_ip = item["PLC-PLC IP"];
                const plc_local_ip_secondary = item["PLC Local IP Secondary"];
                const plc_portx1p2r_target_location = item["PLC PortX1P2R Target Location"];
                const plc_portx1p2r_target_dt = item["PLC PortX1P2R Target DT"];
                const psu_location = item["PSU Location"];
                const psu_location_dt = item["PSU Location-DT"];
                const ups_ipAddress = item["UPS IP Address"];
                //const plc_id = item["PLC ID"];
                
                const leth_port2 = item["XPF-LETH01.P2 (LETH-LETH)"];
                const leth_port3 = item["XPF-LETH01.P3 (LETH-LETH)"];
                const leth_port4 = item["XPF-LETH01.P4 (LETH-LETH)"];
                var leth_port2_arr = splitIntoTwo(leth_port2, "-");
                var leth_port3_arr = splitIntoTwo(leth_port3, "-");
                var leth_port4_arr = splitIntoTwo(leth_port4, "-");
                let leth_port2_target_location = leth_port2_arr[0];
                let leth_port3_target_location = leth_port3_arr[0];
                let leth_port4_target_location = leth_port4_arr[0];
                let leth_port2_target_dt = leth_port2_arr[1]
                let leth_port3_target_dt = leth_port3_arr[1]
                let leth_port4_target_dt = leth_port4_arr[1]
                let b_PLC_ETH = false //if true => create ring topology

                const leth_port2_target_port = "";
                const leth_port3_target_port = "";
                const leth_port4_target_port = "";
                const gb_Port2_CableLength = "NULL";
                const gb_Port3_CableLength = "NULL";
                const gb_Port4_CableLength = "NULL";
                const leth_numberOfDevices = item["Number of Devices"];
                const eth_plant_ip = item["ETH Plant IP"];
                const eth_plc_to_plc_ip = item["ETH PLC-PLC IP"];
                const eth_local_ip = item["ETH Local IP"];
                const eth_local_ip_secondary = item["ETH Local IP Secondary"];
                const eth_port1_target_location = item["ETH Port1 Target Location"];
                const eth_port2_target_location = item["ETH Port2 Target Location"];

                const plc_id = `${ProjectConfiguration.line}-${mcp_name}-PLC01`;
                const ports = [];
                const mcp = mcpConfiguration.create(mcp_name)
                mcp.fla=fla;
                mcp.location=mcp_name;
                mcp.mcp_name=mcp_name;
                mcp.mcpMountingLocation=location;
                mcp.psu_location=psu_location;
                mcp.psu_location_dt=psu_location_dt;
                mcp.ups_ip=ups_ipAddress;
                mcp.plc_network_switch_required=isPlcToPlcSwRequired;
                mcp.plc_plant_ip=plc_local_x3_ip;
                mcp.plc_to_plc_ip=plc_plc_ip;
                mcp.plc_local_ip=plc_local_x1_ip;
                mcp.plc_local_ip_secondary=plc_local_ip_secondary;
                mcp.plc_id=plc_id;
                mcp.plc_portx1p2r_target_location=plc_portx1p2r_target_location;
                mcp.plc_portx1p2r_target_dt=plc_portx1p2r_target_dt;
                mcp.ked_plant_ip=ked_plant_ip;
                mcp.ked_plc_to_plc_ip=ked_plc_plc_ip;
                mcp.ked_local_ip=ked_local_ip;
                mcp.ked_local_ip_secondar=ked_local_ip_secondary;
                mcp.ked_port4_target_location=ked_port4_target_location;
                mcp.ked_port4_target_dt=ked_port4_target_dt;
                mcp.ked_port5_target_location=ked_port5_target_location;
                mcp.ked_port5_target_dt=ked_port5_target_dt;
                mcp.leth_plant_ip=leth_plant_ip;
                mcp.leth_plc_to_plc_ip=leth_plc_plc_ip;
                mcp.leth_local_ip=leth_sw_ip;
                mcp.leth_local_ip_secondary=leth_sw_ip_secondary;
                mcp.leth_sw_type=leth_sw_type;
                mcp.leth_port2=leth_port2;
                mcp.leth_port3=leth_port3;
                mcp.leth_port4=leth_port4;
                mcp.leth_port2_target_location=leth_port2_target_location;
                mcp.leth_port3_target_location=leth_port3_target_location;
                mcp.leth_port4_target_location=leth_port4_target_location;
                mcp.leth_port2_target_dt=leth_port2_target_dt;
                mcp.leth_port3_target_dt=leth_port3_target_dt;
                mcp.leth_port4_target_dt=leth_port4_target_dt;
                mcp.leth_port2_target_port=leth_port2_target_port;
                mcp.leth_port3_target_port=leth_port3_target_port;
                mcp.leth_port4_target_port=leth_port4_target_port;
                mcp.gb_Port2_CableLength=gb_Port2_CableLength;
                mcp.gb_Port3_CableLength=gb_Port3_CableLength;
                mcp.gb_Port4_CableLength=gb_Port4_CableLength;
                mcp.leth_number_of_ports=leth_numberOfDevices;
                mcp.eth_plant_ip=eth_plant_ip;
                mcp.eth_plc_to_plc_ip=eth_plc_to_plc_ip;
                mcp.eth_local_ip=eth_local_ip;
                mcp.eth_local_ip_secondary=eth_local_ip_secondary;
                mcp.eth_port1_target_location=eth_port1_target_location;
                mcp.eth_port2_target_location=eth_port2_target_location;
                mcp.b_PLC_ETH=b_PLC_ETH;
                mcp.ports=ports;
                mcp.direct_network_devices=[];
                mcp.connected_network_devices=[];

                //validation
                //name must not include -
                if(!mcp.mcp_name.includes('-')){
                    mcps.push(mcp);
                }
            });
            
        return mcps;
    },


    getNetworkTopology:(mcps)=>{
        if(mcps.length < 2){
            return;
        }
        for(let i = 0; i<mcps.length;i++){
            mcps[i].b_PLC_ETH = true;
            if(i==0){
                mcps[i].eth_port1_target_location = mcps[i+1].mcp_name
                mcps[i].eth_port2_target_location = mcps[i+1].mcp_name
            } else if(i == mcps.length-1) {
                mcps[i].eth_port1_target_location = mcps[0].mcp_name
                mcps[i].eth_port2_target_location = mcps[0].mcp_name
            }
        }
        return mcps
    },

    getNetworkPorts:(mcps, devices) => {
        mcps.forEach(mcp => {
            var targetSwitch = devices.find(device => mcp.leth_port2 === device.target_device_location_dt)
            if(targetSwitch){
                mcp.leth_port2_target_port = targetSwitch.local_switch_port;
                mcp.leth_port2_target_cable_length = `${targetSwitch.local_cable_length} m`;
            }

            var targetSwitch = devices.find(device => mcp.leth_port3 === device.target_device_location_dt)
            if(targetSwitch){
                mcp.leth_port3_target_port = targetSwitch.local_switch_port;
                mcp.leth_port3_target_cable_length = `${targetSwitch.local_cable_length} m`;
            }

            var targetSwitch = devices.find(device => mcp.leth_port4 === device.target_device_location_dt)
            if(targetSwitch){
                mcp.leth_port4_target_port = targetSwitch.local_switch_port;
                mcp.leth_port4_target_cable_length = `${targetSwitch.local_cable_length} m`;
            }
        })

        return mcps;
    },
    getConnectedNetworkDevices:(mcps, devices, networkSwitches) => {
        mcps.forEach(mcp => {
            var localSwitches = networkSwitches.filter(networkSwitch => networkSwitch.mcpName === mcp.mcp_name && networkSwitch.networkType.toLowerCase() === "local")

            localSwitches.forEach(localSwitch => {
                var directNetworkSwitches = devices.filter(device => localSwitch.switch_location_dt === device.local_network_direct)
                mcp.connected_network_devices = [...directNetworkSwitches, ...mcp.connected_network_devices]
            })
        })
        return mcps;
    },

    getDirectNetworkDevices:(mcps, devices) => {
        mcps.forEach(mcp => {
            var directDevices = devices.filter(device => device.local_network_direct === mcp.mcpName)
            mcp.direct_network_devices = directDevices;
        })

        return mcps;
    },
}

export default mcpParser;