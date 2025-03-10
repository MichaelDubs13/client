import * as XLSX from 'xlsx'


const mcpParser = {
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
                var location = item["Location"];
                if(location){
                    var locationArray = location.split('-')
                    if(locationArray.length > 1){
                        location = locationArray[1]
                    }
                }
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
                const plc_id = item["PLC ID"];
                const leth_port2 = item["XPF-LETH01.P2 (LETH-LETH)"];
                const leth_port3 = item["XPF-LETH01.P3 (LETH-LETH)"];
                const leth_port4 = item["XPF-LETH01.P4 (LETH-LETH)"];
                const leth_port2_target_port = item["LETH Port2 Target Port"];
                const leth_port3_target_port = item["LETH Port3 Target Port"];
                const leth_port4_target_port = item["LETH Port4 Target Port"];
                const gb_Port2_CableLength = item["Gigabit Port2 Cable Length"];
                const gb_Port3_CableLength = item["Gigabit Port3 Cable Length"];
                const gb_Port4_CableLength = item["Gigabit Port4 Cable Length"];
                const leth_numberOfDevices = item["Number of Devices"];
                const eth_plant_ip = item["ETH Plant IP"];
                const eth_plc_to_plc_ip = item["ETH PLC-PLC IP"];
                const eth_local_ip = item["ETH Local IP"];
                const eth_local_ip_secondary = item["ETH Local IP Secondary"];
                const eth_port1_target_location = item["ETH Port1 Target Location"];
                const eth_port2_target_location = item["ETH Port2 Target Location"];
                const mcp = {
                    //left side variables are from UI, right variables go to data model
                    fla:fla, //not needed, to be removed
                    location:location,
                    mcp_name:mcp_name,
                    mcpMountingLocation: mcpMountingLocation,
                    psu_location:psu_location,
                    psu_location_dt:psu_location_dt,
                    ups_ip: ups_ipAddress,
                    plc_network_switch_required:isPlcToPlcSwRequired,
                    plc_plant_ip:plc_local_x3_ip,
                    plc_to_plc_ip:plc_plc_ip,
                    plc_local_ip:plc_local_x1_ip,
                    plc_local_ip_secondary: plc_local_ip_secondary,
                    plc_id: plc_id,
                    plc_portx1p2r_target_location: plc_portx1p2r_target_location,
                    plc_portx1p2r_target_dt: plc_portx1p2r_target_dt,
                    ked_plant_ip:ked_plant_ip, 
                    ked_plc_to_plc_id: ked_plc_plc_ip,
                    ked_local_ip:ked_local_ip, 
                    ked_local_ip_secondar:ked_local_ip_secondary,
                    ked_port4_target_location: ked_port4_target_location,
                    ked_port4_target_dt: ked_port4_target_dt,
                    ked_port5_target_location: ked_port5_target_location,
                    ked_port5_target_dt: ked_port5_target_dt,
                    leth_plant_ip: leth_plant_ip,
                    leth_plc_to_plc_ip: leth_plc_plc_ip,
                    leth_local_ip:leth_sw_ip, 
                    leth_local_ip_secondary:leth_sw_ip_secondary,
                    leth_sw_type:leth_sw_type,
                    leth_port2:leth_port2,
                    leth_port3:leth_port3,
                    leth_port4:leth_port4,
                    leth_port2_target_location: leth_port2.split("-")[0],
                    leth_port3_target_location: leth_port3.split("-")[0],
                    leth_port4_target_location: leth_port4.split("-")[0],
                    leth_port2_target_dt: leth_port2.split("-")[1],
                    leth_port3_target_dt: leth_port3.split("-")[1],
                    leth_port4_target_dt: leth_port4.split("-")[1],
                    leth_port2_target_port: leth_port2_target_port,
                    leth_port3_target_port: leth_port3_target_port,
                    leth_port4_target_port: leth_port4_target_port,
                    leth_port2_target_cable_length: gb_Port2_CableLength,
                    leth_port3_target_cable_length: gb_Port3_CableLength,
                    leth_port4_target_cable_length: gb_Port4_CableLength,
                    leth_number_of_ports: leth_numberOfDevices,
                    eth_plant_ip: eth_plant_ip,
                    eth_plc_to_plc_ip: eth_plc_to_plc_ip,
                    eth_local_ip: eth_local_ip,
                    eth_local_ip_secondary: eth_local_ip_secondary,
                    eth_port1_target_location: eth_port1_target_location,
                    eth_port2_target_location: eth_port2_target_location,
    
                }
                mcps.push(mcp);
            });
        return mcps;
    }
}

export default mcpParser;