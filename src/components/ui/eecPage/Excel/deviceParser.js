import * as XLSX from 'xlsx'
import { filterItemsByStartsOptions, getCableLength, splitIntoTwo } from './util';


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
            local_cable_length = getCableLength(deviceParser.cable_length_options, local_cable_length);
            const local_network_direct = item["Local Network Direct"];  
            const local_network_source = item["Local Network Source"]; 
            const local_network_source_arr = splitIntoTwo(local_network_source, "-");
            const local_network_source_location = local_network_source_arr[0]
            const local_network_source_dt = local_network_source_arr[1] 
            const local_switch_port = item["Local Switch Port"];  
            const target_switch_port = item["Target Switch Port"];  
            const mcp_name = item["MCP Name"];  
            let opmode = item["OP MODE"];  
            opmode = opmode ? opmode.replace('OP', '') : '';
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
            const target_device_location = item["Target Device (Location)"];  
            const target_device_location_dt = item["Target Device (Location-DT)"];  
            const totalDevice24V_FLA = item["Total Device 24VDC FLA"];  
            const direct24VDC = item["24Vdc Direct"]; 
            const source24VDC = item["24Vdc Source"]; 
            let source24VDC_arr = splitIntoTwo(source24VDC, "-");
            const source24VDC_location = source24VDC_arr[0]
            const source24VDC_dt = source24VDC_arr[1]
            const localip = item["Local IP"]; 
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
                local_network_source_location:local_network_source_location,
                local_network_source_dt:local_network_source_dt,
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
                source24VDC_location:source24VDC_location,
                source24VDC_dt:source24VDC_dt,
                localip:localip,
                deviceType: "",
                switchCascading: false,
                interruption_InOrOut:"", //in or out
                io_pin:0, //pin2 or pin4
                ios:[] //container for connected IO devices
            }
            devices.push(device);
        })

        return devices;
    },

    getNetworkType(devices, mcps){
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
    getHMIs(devices){
        const hmiFilterOptions = ["HMI", ]
        const hmis = filterItemsByStartsOptions(hmiFilterOptions, devices, "device_dt")
        deviceParser.getHMIParameters(hmis)

        return hmis
    },
    getHMIParameters(hmis){
        hmis.map(hmi => {
                let screen_size = "22in" //size options 22in, 15in
                let mounting = "Round Tube" //options Round Tube, Flange at Bottom
                let version = "V17" //options V16, V17
                let rfid_side = "Left" //options Left, Right
                if(hmi.partnumber === "6AV7264-3TS44-0AA0"){
                    screen_size = "22in";
                    hmi = {...hmi, screen_size:screen_size, mounting:mounting, version:version, rfid_side:rfid_side};
                }
        })
    },
    getSafetyGates(devices){
        const gatesFilterOptions = ["GS", ]
        const gates = filterItemsByStartsOptions(gatesFilterOptions, devices, "device_dt")
        deviceParser.getGateParameters(gates);
        return gates
    },
    getGateParameters(gates){
        gates.map(gate => {
                let communication_type = "PROFINET" //Hardwired, Ethernet, PROFINET
                let handleside = "Left" //Left, Right
                if(gate.mfg === "Euchner"){
                    communication_type = "PROFINET"
                    if(gate.partnumber === "MGB2-L1HEB-PN-U-S4-CA-L-168720"){
                        handleside = "Left" 
                    } else if(gate.partnumber === "MGB2-L1HEB-PN-U-S4-CA-R-168719"){
                        handleside = "Right" 
                    }
                    gate = {...gate, communication_type:communication_type, handleside:handleside};
                }
        })
    },
    getGroupedIOModules(devices){
        let groups =[];
        const ioModuleFilterOptions = ["SIO", "MIO"]
        const ioModules = filterItemsByStartsOptions(ioModuleFilterOptions, devices, "device_dt")
        
        ioModules.forEach(ioModule => {
            if(ioModule.local_network_direct && ioModule.local_network_direct != ioModule.target_device_location_dt){
                const ioModuleAdded = deviceParser.addIOModuleToGroup(groups, ioModule);
                if(!ioModuleAdded){
                    groups.push([ioModule]);
                }
            } else {
                groups.push([ioModule,])
            }
        })

        return groups;
    },

    addIOModuleToGroup(groups, ioModule){
        for(let i=0;i<groups.length;i++){
            var hasItem = groups[i].some(item => item.target_device_location_dt === ioModule.local_network_direct)
            if(hasItem){
                groups[i].push(ioModule)
                return true;
            }
        }

        return false;
    },
    
    addIO(groups, cables, devices){
        var ioCables = cables.filter(cable => cable.layer === "Cable - IO");
        
        for(let i=0;i<groups.length;i++){
            const ioModuleGroup = groups[i];
            ioModuleGroup.forEach(ioModule => {
                var targetCables =  ioCables.filter(cable => cable.cable_source === ioModule.target_device_location_dt)
                for(let i=0;i<targetCables.length;i++){
                    var targetDevice = devices.find(device => device.target_device_location_dt === targetCables[i].cable_target)
                    if(targetDevice){
                        targetDevice = {...targetDevice, io_pin:2}
                        if(!targetDevice.io_port){
                            const nextAvailablePort = ioModule.ios.length; //port number is 0~7
                            targetDevice = {...targetDevice, io_port:nextAvailablePort}
                        }
                        ioModule.ios.push(targetDevice);
                    }
                }
            })
        }
        
    }
    
    
}



export default deviceParser;