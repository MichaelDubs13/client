import * as XLSX from 'xlsx'


const switchParser = {
    parse(workbook, worksheet){
        var arr = XLSX.utils.sheet_to_json(workbook.Sheets[worksheet]);
        let switches = [];
        arr.forEach(item => {
            const fla = item["24Vdc FLA"];  
            const alarmOutput = item["Alarm Output?"];  
            const consoleOutput = item["Console Output?"];  
            const localIp = item["Local IP"];  
            const mcpName = item["MCP Name"];  
            const networkType = item["Network Type"];  
            const psu_location_dt = item["PSU 1 Location-DT"];  
            const portCount = item["Port Count"];  
            const switch_location_dt = item["Switch Location-DT"];  
            const switchType = item["Switch type"];  
            const inPort = item["in port"];  
            const inSwitch = item["in switch"];  

            const networkSwitch = {
                fla:fla,
                alarmOutput:alarmOutput,
                consoleOutput:consoleOutput,
                localIp:localIp,
                mcpName:mcpName,
                networkType:networkType,
                psu_location_dt:psu_location_dt,
                portCount:portCount,
                switch_location_dt:switch_location_dt,
                switchType:switchType,
                inPort:inPort,
                inSwitch:inSwitch,
            }

            switches.push(networkSwitch);
        })

        return switches;
    },
    createNetworkTree(devices, switches){
        let results =[];
        switches.forEach(networkSwitch => {
            let connectedDevices = devices.filter(device => device.local_network_direct === networkSwitch.switch_location_dt);
            networkSwitch = {...networkSwitch, "devices": connectedDevices}
            results.push(networkSwitch);
        })

        return results;
    }
}

export default switchParser;