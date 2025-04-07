import * as XLSX from 'xlsx'


const deviceParser = {
    cable_length_options:[50, 20, 10, 5, 3, 1.5],
    parse:(workbook, sheet) => {
        var arr = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        let devices = [];
        arr.forEach(item => {
            const ac_primary_connection_direct = item["AC Primary Direct"];  
            const ac_primary_connection_source = item["AC Primary Source"];  
            const ac_primary_power_branch_size = item["AC Primary Power Branch Size"];  
            const ac_primary_power_drop = item["AC Primary Power Drop"];  
            const ac_primary_power_length = item["AC Primary Power Length (<100m)"];  
            const ac_secondary_connection_direct = item["AC Secondary Connection Direct"];  
            const ac_secondary_connection_source = item["AC Secondary Connection Source"];  
            const ac_secondary_power_branch_size = item["AC Secondary Power Branch Size"];  
            const ac_secondary_power_drop = item["AC Secondary Power Drop"];  
            const ac_secondary_power_drop_demand_amp = item["AC Secondary Power Drop - Demand Amps"];  
            const ac_secondary_power_drop_type = item["AC Primary Power Type"];  
            const ac_secondary_power_length = item["AC Secondary Power Length (<100m)"];  
            const aux_cable_length = item["Aux Cable Length (<90m)"];  
            const aux_network_direct = item["Aux Network Direct"];  
            const aux_network_source = item["Aux Network Source"];  
            const fla = item["Device 24VDC FLA"];  
            const mfg = item["Device MFG"];  
            const partNumber = item["Device Part Number"];  
            const device_dt = item["Comment (Device DT)"]; 
            const dc_cable_length = item["DC Cable Length (<30m)"]; 
            const device24V_FLA = item["Device 24VDC FLA"];
            const ground_cable_length = item["Ground Cable Length"];
            const ground_direct = item["Ground Direct"];
            const ground_source = item["Ground Source"];
            const io_cable_length = item["IO Cable Length"];
            const io_direct = item["IO Direct"];
            const io_FLA = item["IO FLA"];
            const io_source = item["IO Source"];
            const io_type = item["IO Type"];
            const io_port = item["IO Port"];
            const layer = item["Layer"];
            const line = item["Line"];  
            let local_cable_length = item["Local Cable Length (<90m)"]; 
            local_cable_length = deviceParser.getCableLength(local_cable_length);
            const local_network_direct = item["Local Network Direct"];  
            const local_network_source = item["Local Network Source"];  
            const local_switch_port = item["Local Switch Port"];  
            const target_switch_port = item["Target Switch Port"];  
            const mcp_name = item["MCP Name"];  
            const opmode = item["OP MODE"];  
            const other_cable_length = item["Other Cable Length"];  
            const other_cable_source = item["Other Cable Source"];  
            const psu_connection_source = item["PSU Connection Source"];  
            const psu_port = item["PSU Port"];  
            const plant_cable_length = item["Plant Cable Length (<90m)"];  
            const plant_ip = item["Plant IP"];  
            const plant_network_direct = item["Plant Network Direct"];  
            const plant_network_source = item["Plant Network Source"]; 
            const primary_ac_power_fla = item["Primary AC Power FLA"];  
            const secondary_ac_power_fla = item["Secondary AC Power FLA"];  
            const name_mcp_op_st = item["Space (Plant-Line Division-Line Name-MCP-OP-ST)"]; 
            const station = item["Station"]; 
            const subDevice_FLA = item["Sub-Device FLA"];  
            const target_device_function_text = item["Subject (Function Text)"];  
            const target_device_location = item["Target Device (location)"];  
            const target_device_location_dt = item["Target Device (Location-DT)"];  
            const totalDevice24V_FLA = item["Total Device 24VDC FLA"];  
            const direct24VDC = item["24Vdc Direct"]; 
            const source24VDC = item["24Vdc Source"]; 
            let device = {
                ac_primary_connection_direct:ac_primary_connection_direct,
                ac_primary_connection_source:ac_primary_connection_source, 
                ac_primary_power_branch_size:ac_primary_power_branch_size,
                ac_primary_power_drop:ac_primary_power_drop,
                ac_primary_power_length:ac_primary_power_length,
                ac_secondary_connection_direct:ac_secondary_connection_direct,
                ac_secondary_connection_source:ac_secondary_connection_source,
                ac_secondary_power_branch_size:ac_secondary_power_branch_size,
                ac_secondary_power_drop:ac_secondary_power_drop,
                ac_secondary_power_drop_demand_amp:ac_secondary_power_drop_demand_amp,
                ac_secondary_power_drop_type:ac_secondary_power_drop_type,
                ac_secondary_power_length:ac_secondary_power_length,
                aux_cable_length:aux_cable_length,
                aux_network_direct:aux_network_direct,
                aux_network_source:aux_network_source,
                fla:fla,
                mfg:mfg,
                partNumber:partNumber,
                device_dt:device_dt,
                dc_cable_length:dc_cable_length,
                device24V_FLA:device24V_FLA,
                ground_cable_length :ground_cable_length,
                ground_direct:ground_direct,
                ground_source:ground_source,
                io_cable_length:io_cable_length,
                io_direct:io_direct,
                io_FLA:io_FLA,
                io_source:io_source,
                io_type:io_type,
                io_port:io_port,
                layer:layer,
                line:line,
                local_cable_length:local_cable_length,
                local_network_direct:local_network_direct,
                local_network_source:local_network_source,
                target_switch_port:target_switch_port,
                local_switch_port:local_switch_port,
                mcp_name:mcp_name,
                opmode:opmode,
                other_cable_length:other_cable_length,
                other_cable_source:other_cable_source,
                psu_connection_source:psu_connection_source,
                psu_port:psu_port,
                plant_cable_length:plant_cable_length,
                plant_ip:plant_ip,
                plant_network_direct:plant_network_direct,
                plant_network_source:plant_network_source,
                primary_ac_power_fla:primary_ac_power_fla,
                secondary_ac_power_fla:secondary_ac_power_fla,
                name_mcp_op_st:name_mcp_op_st,
                station:station,
                subDevice_FLA:subDevice_FLA,
                target_device_function_text:target_device_function_text,
                target_device_location:target_device_location,
                target_device_location_dt:target_device_location_dt,
                totalDevice24V_FLA:totalDevice24V_FLA,
                direct24VDC: direct24VDC,
                source24VDC: source24VDC,
                deviceType: "",
                switchCascading: false,
                interruption_InOrOut:"", //in or out
            }
            devices.push(device);
        })

        return devices;
    },

    getCableLength(length){
        if(length){
            var cable_length = deviceParser.findNearest(deviceParser.cable_length_options, length)
            return `${cable_length} m`;
        } else {
            return `TBD`;
        }
    },

    findNearest(array, target) {
        if (!array || array.length === 0) {
          return null;
        }
      
        let nearest = array[0];
        let minDiff = array[0] - target
      
        for (let i = 1; i < array.length; i++) {
            const diff = array[i] - target;
            if(diff > 0){
                if (diff < minDiff) {
                    minDiff = diff;
                    nearest = array[i];
                  }
            }
        }
        return nearest;
    },

    updateDeviceType(devices, mcps){
        //return options: Device, Network Switch, Spare
        devices.forEach(device => {
            const networkSwitchIdentifers = ["LETH", "PETH"]
            var startsWithAny = networkSwitchIdentifers.some(prefix => device.device_dt.startsWith(prefix));
            if(startsWithAny){
                device.deviceType = "Network Switch";
                const foundMcp = mcps.find(mcp => mcp.mcpName === device.local_network_direct);
                if(foundMcp){
                    device.switchCascading = true;
                }
    
                const directNetworkArr = device.local_network_direct.split('-');
                const directNetworkDevice = directNetworkArr[directNetworkArr.length - 1];
                startsWithAny = networkSwitchIdentifers.some(prefix => directNetworkDevice.startsWith(prefix));
                if(startsWithAny){
                    device.interruption_InOrOut = "out"; //need to change to figure out if a network is going out or coming in to the switch
                }
    
            } else {
                device.deviceType = "Device";
            }
        })
       
        return devices;
    },


    createIODevices(devices){
        let results =[];
        console.log(devices);
        devices.forEach(io => {
            if(io.io_direct){
                let matchedDevice = devices.filter(device =>device.target_device_location_dt === io.io_direct);
                if(matchedDevice.length > 0){
                    const parentDevice = results.filter(result => result.device.target_device_location_dt === matchedDevice[0].target_device_location_dt);
                    if(parentDevice.length > 0){
                        parentDevice[0].ios.push(io);
                    } else {
                        const ios = [io,]
                        const ioDevices = {"device": matchedDevice[0], "ios": ios}
                        results.push(ioDevices);
                    }
                }
            }
        })
        //console.log(results);
        return results;
    }    
}

export default deviceParser;