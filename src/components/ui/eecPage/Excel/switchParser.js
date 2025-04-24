import * as XLSX from 'xlsx'
import { splitIntoTwo } from './util';
import { networkSwitchConfiguration } from '../Store/networkSwitchStore';
import ProjectConfiguration from '../Models/ManufacturingEquipmentLine/ProjectConfiguration';
import { lpdConfiguration } from '../Store/lpdStore';


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

            const localIP = item["Local IP"];  
            const plantIP = item["Plant IP"];  
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
            const networkSwitch = networkSwitchConfiguration.create();
            networkSwitch.fla=fla;
            networkSwitch.alarmOutput=alarmOutput;
            networkSwitch.alarmTag=alarmTag;
            networkSwitch.consoleOutput=consoleOutput;
            networkSwitch.consoleTag=consoleTag;
            networkSwitch.localIP=localIP;
            networkSwitch.plantIP=plantIP;
            networkSwitch.mcpName=mcpName;
            networkSwitch.networkType=networkType;
            networkSwitch.psu_location_dt=psu_location_dt;
            networkSwitch.psu_location=psu_location;
            networkSwitch.psu_dt=psu_dt;
            networkSwitch.portCount=portCount;
            networkSwitch.switch_location_dt=switch_location_dt;
            networkSwitch.line = ProjectConfiguration.line;
            networkSwitch.location=switch_location;
            networkSwitch.switchDT=switch_dt;
            networkSwitch.switchType=switchType;
            networkSwitch.inPort=inPort;
            networkSwitch.inSwitch=inSwitch;
            networkSwitch.mfg=mfg;
            networkSwitch.mcp={};
            networkSwitch.devices=[];
            switchParser.createAdditionalParameters(networkSwitch);
            
            switches.push(networkSwitch);
        })
        return switches;
    },

    setSourcePwrDrops(networkSwitches, lpds){
        networkSwitches.forEach(networkSwitch => {
            switchParser.setSourcePwrDrop(networkSwitch, lpds);
        })
        return networkSwitches;
    },
    setSourcePwrDrop(networkSwitch, lpds){
        var drop = lpdConfiguration.getDrop(lpds, networkSwitch.location, networkSwitch.switchDT)
        if(!drop) return null;
        drop.data.targetDevice = networkSwitch.data.id
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
        if(type === "6GK5216-0HA00-2AS6") return "Siemens";

        return "";
    },
    createNetworkTree(devices, switches){
        let results =[];
        switches.forEach(networkSwitch => {
            let connectedDevices = devices.filter(device => device.local_network_direct === networkSwitch.switch_location_dt);
            networkSwitch = {...networkSwitch, "devices": connectedDevices}
            const ports = [];
            connectedDevices.forEach(device => {
                const port = networkSwitchConfiguration.createPort(networkSwitch);
                port.targetLocation = device.target_device_location;
                port.targetDT = device.device_dt;
                port.line = ProjectConfiguration.line
                device.device_dt.startsWith('LETH') ? port.deviceTypeSelection = 'Network Switch' : port.deviceTypeSelection = 'Device';
                port.targetCableLength = device.local_cable_length;
                ports.push(port);
            })
            networkSwitch.ports = ports;
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