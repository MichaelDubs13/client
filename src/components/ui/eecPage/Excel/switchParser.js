import * as XLSX from 'xlsx'
import { splitIntoTwo } from './util';


const switchParser = {
    parse(workbook, worksheet){
        var arr = XLSX.utils.sheet_to_json(workbook.Sheets[worksheet]);
        let switches = [];
        arr.forEach(item => {
            const fla = item["24Vdc FLA"];  
            let alarmOutput = item["Alarm Output?"];  
            alarmOutput = alarmOutput == "Y";
            let alarmTag = item["Alarm Tag"];  
            let consoleOutput = item["Console Output?"];  
            consoleOutput = consoleOutput == "Y";
            let consoleTag = item["Console Tag"];  

            const localIp = item["Local IP"];  
            const plantIp = item["Plant IP"];  
            const mcpName = item["MCP Name"];  
            const networkType = item["Network Type"];  
            const psu_location_dt = item["PSU 1 Location-DT"];
            const psu_arr = splitIntoTwo(psu_location_dt, "-");
            var psu_location = psu_arr[0];
            var psu_dt = psu_arr[1];

            let portCount = item["Port Count"];  
            if(!portCount){
                portCount = 16;
            }
            
            const switch_location_dt = item["Switch Location-DT"]; 
            const switch_arr = splitIntoTwo(switch_location_dt, "-");
            var switch_location = switch_arr[0];
            var switch_dt = switch_arr[1];
          
            const switchType = item["Switch type"];  
            const inPort = item["in port"];  
            const inSwitch = item["in switch"];  
            const mfg = switchParser.getMFG(switchType);
            const networkSwitch = {
                fla:fla,
                alarmOutput:alarmOutput,
                alarmTag:alarmTag,
                consoleOutput:consoleOutput,
                consoleTag:consoleTag,
                localIp:localIp,
                plantIp:plantIp,
                mcpName:mcpName,
                networkType:networkType,
                psu_location_dt:psu_location_dt,
                psu_location:psu_location,
                psu_dt:psu_dt,
                portCount:portCount,
                switch_location_dt:switch_location_dt,
                switch_location:switch_location,
                switch_dt:switch_dt,
                switchType:switchType,
                inPort:inPort,
                inSwitch:inSwitch,
                mfg:mfg,
                mcp:{},
            }
            switchParser.createAdditionalParameters(networkSwitch);
            switches.push(networkSwitch);
        })
        return switches;
    },

    createAdditionalParameters(networkSwitch){
        //Parameter for F_Network_switchConfig
        networkSwitch.pwr_in_location = ""
        networkSwitch.pwr_in_dt = ""
        networkSwitch.pwr1_in_location = ""
        networkSwitch.pwr1_in_dt = ""
        networkSwitch.managedtype = "Managed";
        if(networkSwitch.mfg === "Siemens"){
            networkSwitch.pwr_in_location = ""
            networkSwitch.pwr_in_dt = ""
            networkSwitch.pwr1_in_location = networkSwitch.psu_location;
            networkSwitch.pwr1_in_dt = networkSwitch.psu_dt;
            networkSwitch.managedtype = "Managed";
        } else if (networkSwitch.mfg === "Balluf"){
            networkSwitch.pwr_in_location = networkSwitch.psu_location;
            networkSwitch.pwr_in_dt = networkSwitch.psu_dt;
            networkSwitch.pwr1_in_location = ""
            networkSwitch.pwr1_in_dt = ""
            networkSwitch.managedtype = "Unmanaged";
        }

        //Parameter for C_Siemens_Switch
        networkSwitch.is6GK5216_0HA00_2AS6 = false;
        networkSwitch.is6GK5208_0HA00_2AS6 = false;
        if(networkSwitch.switchType == "6GK5216-0HA00-2AS6"){
            networkSwitch.is6GK5216_0HA00_2AS6 = true;
        } else if (networkSwitch.switchType == "6GK5208_0HA00_2AS6"){
            networkSwitch.is6GK5208_0HA00_2AS6 = false;
        }

        //Parameter for C_Balluf_Switch
        networkSwitch.isBNI0089 = false;
        networkSwitch.isBalluff = false;
        if(networkSwitch.switchType == "BNI0089"){
            networkSwitch.isBNI0089 = true;
            networkSwitch.isBalluff = true;
        }
    },

    getMFG(type){
        //need to complete this list
        if(type === "6GK5216-0HA00-2AS6")
        {
            return "Siemens";
        }

        return "";
    },
    createNetworkTree(devices, switches){
        let results =[];
        switches.forEach(networkSwitch => {
            let connectedDevices = devices.filter(device => device.local_network_direct === networkSwitch.switch_location_dt);
            networkSwitch = {...networkSwitch, "devices": connectedDevices}
            results.push(networkSwitch);
        })

        return results;
    },
    getMcp(switches, mcps){
        switches = switches.map(networkSwitch => {
            if(networkSwitch.mcpName){
                const targetMcp = mcps.find(mcp => mcp.mcp_name == networkSwitch.mcpName);
                if(targetMcp){
                    networkSwitch = {...networkSwitch, mcp:targetMcp};
                }
            }
            return networkSwitch;
        })
        return switches;
    },
}

export default switchParser;