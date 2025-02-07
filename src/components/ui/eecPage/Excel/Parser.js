import * as XLSX from 'xlsx'

export default class Parser {
    constructor(data) {
        this._data = data;
        this._wb = XLSX.read(this._data, {type:'binary'});
        this._projectWorksheet = "Project";
        this._pdpWorksheet = "PDP";
        this._mcpWorksheet = "MCP";
        this._psuWorksheet = "PSU";
        this._networkWorksheet = "Network";
        this._devices = "Devices";
        this._ios = "IO";
    }

    parseProjectSheet(){
        var arr = XLSX.utils.sheet_to_json(this._wb.Sheets[this._projectWorksheet]);
        const PLANT = arr[1].Value;
        const SHOP = arr[2].Value;
        const LINE = arr[3].Value;
        const INSTALLATION_LOCATION = arr[4].Value;

        return {plant:PLANT, shop:SHOP, line:LINE, installation_location:INSTALLATION_LOCATION}
    }

    parsePdpSheet(){
        var arr = XLSX.utils.sheet_to_json(this._wb.Sheets[this._pdpWorksheet]);

        let pdps = [];
        arr.forEach(item => {
            const name = item["PDP name*"];
            const amp = item["Amperage*"];
            const FLA = item["FLA Demand"];
            const location = item["Location+"];
            const numberOf10APwrDrps = item["Number of 10A Power Drops"];
            const numberOf20APwrDrps = item["Number of 20A Power Drops"];
            const numberOf30APwrDrps = item["Number of 30A Power Drops"];
            const numberOf40APwrDrps = item["Number of 40A Power Drops"];
            const numberOf60APwrDrps = item["Number of 60A Power Drops"];
            const numberOf70APwrDrps = item["Number of 70A Power Drops"];
            const numberOf100APwrDrps = item["Number of 100A Power Drops"];
            const numberOf250APwrDrps = item["Number of 250A Power Drops"];
            const spare10A = item["Spare 10A"];
            const spare20A = item["Spare 20A"];
            const spare30A = item["Spare 30A"];
            const spare40A = item["Spare 40A"];
            const spare60A = item["Spare 60A"];
            const spare70A = item["Spare 70A"];
            const spare100A = item["Spare 100A"];
            const spare250A = item["Spare 250A"];
            const pdp = {name:name, amp:amp, FLA:FLA, location:location, 
                numberOf10APwrDrps:numberOf10APwrDrps, 
                numberOf20APwrDrps:numberOf20APwrDrps,
                numberOf30APwrDrps:numberOf30APwrDrps,
                numberOf40APwrDrps:numberOf40APwrDrps,
                numberOf60APwrDrps:numberOf60APwrDrps,
                numberOf70APwrDrps:numberOf70APwrDrps,
                numberOf100APwrDrps:numberOf100APwrDrps,
                numberOf250APwrDrps:numberOf250APwrDrps,
                spare10A:spare10A,
                spare20A:spare20A,
                spare30A:spare30A,
                spare40A:spare40A,
                spare60A:spare60A,
                spare70A:spare70A,
                spare100A:spare100A,
                spare250A:spare250A,
            }
            pdps.push(pdp);
        })

        return pdps;
    }

    parseMcpSheet(){
        var arr = XLSX.utils.sheet_to_json(this._wb.Sheets[this._mcpWorksheet]);
        let mcps = [];
        arr.forEach(item => {
            const fla = item["24Vdc FLA"];
            const isPlcToPlcSwRequired = item["Is PLC-PLC SW required (Y/N)?"];
            const ked_local_ip = item["KED Local IP"];
            const ked_plant_ip = item["KED Plant IP"];
            const leth_sw_ip = item["LETH SW IP"];
            const leth_sw_type = item["LETH SW Type (4-Gb vs 16-Gb)"];
            const location = item["Location"];
            const mcp_name = item["MCP Name"];
            const plc_local_x1_ip = item["PLC Local (X1) IP"];
            const plc_local_x3_ip = item["PLC Plant (X3) IP"];
            const psu_location_dt = item["PSU Location-DT*"];
            const leth_port2 = item["Port 2 (LETH-LETH)"];
            const leth_port3 = item["Port 3 (LETH-LETH)"];
            const leth_port4 = item["Port 4 (LETH-LETH)"];
            const leth_port5 = item["Port 5"];
            const leth_port6 = item["Port 6"];
            const leth_port7 = item["Port 7"];
            const leth_port8 = item["Port 8"];
            const leth_port9 = item["Port 9"];
            const leth_port10 = item["Port 10"];
            const leth_port11 = item["Port 11"];
            const leth_port12 = item["Port 12"];
            const leth_port13 = item["Port 13"];
            const mcp = {
                fla:fla, isPlcToPlcSwRequired:isPlcToPlcSwRequired,
                ked_local_ip:ked_local_ip,
                ked_plant_ip:ked_plant_ip,
                leth_sw_ip:leth_sw_ip,
                leth_sw_type:leth_sw_type,
                location:location,
                mcp_name:mcp_name,
                plc_local_x1_ip:plc_local_x1_ip,
                plc_local_x3_ip:plc_local_x3_ip,
                psu_location_dt:psu_location_dt,
                leth_port2:leth_port2,
                leth_port3:leth_port3,
                leth_port4:leth_port4,
                leth_port5:leth_port5,
                leth_port6:leth_port6,
                leth_port7:leth_port7,
                leth_port8:leth_port8,
                leth_port9:leth_port9,
                leth_port10:leth_port10,
                leth_port11:leth_port11,
                leth_port12:leth_port12,
                leth_port13:leth_port13,
            }
            mcps.push(mcp);
        });
        return mcps;
    }

    parsePsuSheet(){
        var arr = XLSX.utils.sheet_to_json(this._wb.Sheets[this._psuWorksheet]);
        let psus = [];

        arr.forEach(item => {
            const branchBreaker = item["Branch Breaker (A)"];     
            const branchOrder = item["Branch Order"];     
            const fla = item["FLA Total"];     
            const inputBranch = item["Input Branch"];     
            const inputPowerCord = item["Input Power Cord"];     
            const inputPowerTee = item["Input Power TEE"];     
            const MFG = item["MFG"];     
            const numberOfDevices = item["Number of connected Devices"];     
            const psuLocationDt = item["PSU Location-DT"];     
            const partNumber = item["Part Number"];     
            const supplyVoltage = item["Supply Voltage"];     
            const psu = {
                branchBreaker:branchBreaker,
                branchOrder:branchOrder,
                fla:fla,
                inputBranch:inputBranch,
                inputPowerCord:inputPowerCord,
                inputPowerTee:inputPowerTee,
                MFG:MFG,
                numberOfDevices:numberOfDevices,
                psuLocationDt:psuLocationDt,
                partNumber:partNumber,
                supplyVoltage:supplyVoltage,
            }
            psus.push(psu);
        })

        return psus;
    }

    parseNetworkSheet(){
        var arr = XLSX.utils.sheet_to_json(this._wb.Sheets[this._networkWorksheet]);
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
    }

    parseDeviceSheet(){
        var arr = XLSX.utils.sheet_to_json(this._wb.Sheets[this._devices]);
        let devices = [];

        arr.forEach(item => {
            const class2 = item["Class 2?"];  
            const fla = item["Device 24VDC FLA*"];  
            const mfg = item["Device MFG"];  
            const partNumber = item["Device Part Number"];  
            const localIp = item["Local IP*?"];  
            const local_switch_dt = item["Local Switch Location-DT"];  
            const local_switch_port = item["Local Switch Port*"];  
            const mcp_name = item["MCP Name"];  
            const opmode = item["OP MODE"];  
            const psu_location_dt = item["PSU Location-DT*"];  
            const power_drop_amp = item["Power Drop - Demand Amps (calculated)"];  
            const target_device_dt = item["Target Device DT*"];  
            const target_device_function_text = item["Target Device Function Text*"];  
            const target_device_location = item["Target Device Location*"];  
            const target_device_location_dt = item["Target Device Location-DT"];  

            const device = {
                class2:class2,
                fla:fla,
                mfg:mfg,
                partNumber:partNumber,
                localIp:localIp,
                local_switch_dt:local_switch_dt,
                local_switch_port:local_switch_port,
                mcp_name:mcp_name,
                opmode:opmode,
                psu_location_dt:psu_location_dt,
                power_drop_amp:power_drop_amp,
                target_device_dt:target_device_dt,
                target_device_function_text:target_device_function_text,
                target_device_location:target_device_location,
                target_device_location_dt:target_device_location_dt,
            }

            devices.push(device);
        })

        return devices;
    }

    parseIOSheet(){
        var arr = XLSX.utils.sheet_to_json(this._wb.Sheets[this._ios]);
        console.log(arr);

        let ios = [];

        arr.forEach(item => {
            const addressCounter = item["Address Counter"];  
            const function_text = item["Function Text"];  
            const io_address = item["IO Address"];  
            const io_mfg = item["IO MFG"];  
            const io_partNumber = item["IO Part Number"];  
            const io_type = item["IO Type"];  
            const ip_address = item["IP Address"];  
            const ip_octet = item["IP Octet"];  
            const mio_sio_location_dt = item["MIO/SIO Location-DT"];  
            const pin = item["Pin"];  
            const port = item["Port"];  
            const type = item["Type"];  

            const io = {
                addressCounter:addressCounter,
                function_text:function_text,
                io_address:io_address,
                io_mfg:io_mfg,
                io_partNumber:io_partNumber,
                io_type:io_type,
                ip_address:ip_address,
                ip_octet:ip_octet,
                mio_sio_location_dt:mio_sio_location_dt,
                pin:pin,
                port:port,
                type:type,
            }

            ios.push(io);
        })

        return ios;
    }


    createNetworkTree(devices, switches){
        let results =[];
        switches.forEach(networkSwitch => {
            let connectedDevices = devices.filter(device => device.local_switch_dt === networkSwitch.switch_location_dt);
            networkSwitch = {...networkSwitch, "devices": connectedDevices}
            results.push(networkSwitch);
        })

        return results;
    }

    createIODevices(devices, ios){
        let results =[];
        devices.forEach(device => {
            if(device.target_device_dt){
                let matchedIOs = ios.filter(io =>io.mio_sio_location_dt === device.target_device_location_dt );
                if(matchedIOs.length > 0 ){
                    const ioDevices = {"device": device, "ios": matchedIOs}
                    results.push(ioDevices);
                }
            }
        })
        console.log(results);
        return results;
    }
}