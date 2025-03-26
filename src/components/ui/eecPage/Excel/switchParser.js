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
            const psu_location = switchParser.splitAndMergeFirstTwo(psu_location_dt, '-', '-')
            var psu_dt = '';
            var psuDtArr = psu_location_dt.split('-');
            if(psuDtArr.length > 2){
                psu_dt = psuDtArr[psuDtArr.length - 1]
            }
            const portCount = item["Port Count"];  
            const switch_location_dt = item["Switch Location-DT"]; 
            const switch_location = switchParser.splitAndMergeFirstTwo(switch_location_dt, '-', '-')
            var switch_dt = '';
            var switchDtArr = switch_location_dt.split('-');
            if(switchDtArr.length > 2){
                switch_dt = switchDtArr[switchDtArr.length - 1]
            }
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
                psu_location:psu_location,
                psu_dt:psu_dt,
                portCount:portCount,
                switch_location_dt:switch_location_dt,
                switch_location:switch_location,
                switch_dt:switch_dt,
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
    },

    splitAndMergeFirstTwo(str, separator, joiner) {
        const parts = str.split(separator);
        if (parts.length < 2) {
          return str; // Or handle the case where there are fewer than two elements
        }
        const mergedFirstTwo = parts.slice(0, 2).join(joiner);
        const remainingParts = parts.slice(2);
        return [mergedFirstTwo, ...remainingParts].join(separator);
      }
}

export default switchParser;