import * as XLSX from 'xlsx'

export default class Parser {
    constructor(data) {
        this._data = data;
        this._wb = XLSX.read(this._data, {type:'binary'});
        this._projectWorksheet = "Project";
        this._devicesWorksheet = "Devices";
        this._cablesWorksheet = "Cables";
        this._pdpWorksheet = "PDP";
        this._xpdpWorksheet = "XPDP";
        this._psuWorksheet = "PSU";
        this._mcpWorksheet = "MCP";
        this._networkWorksheet = "Network";
        this._ios = "IO";
    }

    parse(){
        const config = this.parseProjectSheet();
        const pdps = this.parsePdpSheet();
        const xpdps = this.parseXpdpSheet();
        const mcps = this.parseMcpSheet();
        const psus = this.parsePsuSheet();
        let switches = this.parseNetworkSheet();
        const devices = this.parseDeviceSheet();
        switches = this.createNetworkTree(devices, switches);
        const ios = this.createIODevices(devices);

        return {config:config, pdps:pdps,xpdps:xpdps, mcps:mcps, psus:psus, switches:switches,devices:devices, ios:ios }
        
    }

    parseProjectSheet(){
        var arr = XLSX.utils.sheet_to_json(this._wb.Sheets[this._projectWorksheet]);

        const PLANT = arr[1].Value;
        const SHOP = arr[2].Value;
        const LINE = arr[3].Value;
        const INSTALLATION_LOCATION = arr[4].Value;

        //General Project properties
        const SHAREPOINT = arr[6].Value;
        const PROJECT_DESCRIPTION = arr[7].Value;
        const PROJECT_TYPE = arr[8].Value;
        const REVISION_STATUS = arr[9].Value;
        const REVISION_NUMBER = arr[10].Value;
        const DRAWING_NUMBER = arr[11].Value;
        const APPROVED_DATE = arr[12].Value;
        const MANUFACURING_DATE = arr[13].Value;
        //Project Template properties
        const VOLTAGE = arr[15].Value;
        const VOLTAGE_FREQUENCY = arr[16].Value;
        const FLA = arr[17].Value;
        const SCCR = arr[18].Value;
        const CONTROL_VOLTAGE = arr[19].Value;
        const PLC_SYSTEM = arr[20].Value;
        const BUS_SYSTEM = arr[21].Value;

        //Project Customer properties
        const CUSTOMER_FULL_NAME = arr[23].Value;
        const CUSTOMER_DESCRIPTION = arr[24].Value;
        const CUSTOMER_STREET = arr[25].Value;
        const CUSTOMER_CITY = arr[26].Value;
        const CUSTOMER_COUNTRY = arr[27].Value;
        const CUSTOMER_PHONE = arr[28].Value;
        const CUSTOMER_EMAIL = arr[29].Value;

        //Project Creator properties
        const CREATOR_ENGINEER_NAME = arr[31].Value;
        const CREATOR_MANAGER_NAME = arr[32].Value;
        const CREATOR_APPROVER_NAME = arr[33].Value;
        const CREATOR_FULL_NAME = arr[34].Value;
        const CREATOR_STREET = arr[35].Value;
        const CREATOR_CITY = arr[36].Value;
        const CREATOR_COUNTRY = arr[37].Value;
        const CREATOR_PHONE = arr[38].Value;
        const CREATOR_EMAIL = arr[39].Value;

        return {plant:PLANT, shop:SHOP, line:LINE, installation_location:INSTALLATION_LOCATION}
    }

    parsePdpSheet(){
        var arr = XLSX.utils.sheet_to_json(this._wb.Sheets[this._pdpWorksheet]);
        let pdps = [];
        arr.forEach(item => {
            const name = item["PDP name"];
            var enclosureSize = item["Enclosure Size"];
            if(!enclosureSize || enclosureSize === "N/A"){
                enclosureSize = "1000x1800x500(WHD)";
            }
            var amp = item["Amperage"];
            amp = `${amp}A`;
            const FLA = item["FLA Demand"];
            var location = item["Location"];
            if(location){
                var locationArray = location.split('-')
                if(locationArray.length > 1){
                    location = locationArray[1]
                }
            }

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
            const branchCircuits = [];

            if(location){
                const pdp = {name:name, amp:amp, FLA:FLA, location:location, 
                    enclosureSize:enclosureSize,
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
                    Opt_SurgeProtectionDevice:false,
                    PwrMonitorEnable:false,
                    Opt_HotPwrEnable:false,
                    branchCircuits:branchCircuits,
                }
                pdps.push(pdp);
            }
        })

        return pdps;
    }
    parseXpdpSheet(){
        var arr = XLSX.utils.sheet_to_json(this._wb.Sheets[this._xpdpWorksheet]);
        let xpdps = [];
        arr.forEach(item => {
            var numberOfPwrDrop8A = item["# of Power Drops 8A (1Ph)"];
            var numberOfPwrDrop15A = item["# of Power Drops 15A (1Ph)"];
            var numberOfPwrDrop20A1p = item["# of Power Drops 20A (1Ph)"];
            var numberOfPwrDrop20A3p = item["# of Power Drops 20A (3Ph)"];

            numberOfPwrDrop8A = numberOfPwrDrop8A > 2 ? 2 : numberOfPwrDrop8A;
            numberOfPwrDrop15A = numberOfPwrDrop15A > 2 ? 2 : numberOfPwrDrop15A;
            numberOfPwrDrop20A1p = numberOfPwrDrop20A1p > 2 ? 2 : numberOfPwrDrop20A1p;
            numberOfPwrDrop20A3p = numberOfPwrDrop20A3p > 2 ? 2 : numberOfPwrDrop20A3p;

            var amp = item["Amperage"];
            amp = `${amp}A`;
            const xf_cable_length = item["Cable Length from XF (m)"];
            const fla_demand = item["FLA Demand (average per phase)"];
            const fed_from = item["Fed From"];
            var location = item["Location"];
            var location = item["Location"];
            if(location){
                var locationArray = location.split('-')
                if(locationArray.length > 1){
                    location = locationArray[1]
                }
            }
            const notes = item["Notes"];
            const name = item["PDP name"];
            const spare8A = item["Spare 8A (1Ph)"];
            const spare15A = item["Spare 15A (1Ph)"];
            const spare20A1p = item["Spare 20A (1Ph)"];
            const spare20A3p = item["Spare 20A (3Ph)"];
            var xf_size = item["XF Size"];
            if(xf_size){
                if(xf_size.startsWith("30kVA")){
                    xf_size = "30kVA Transformer"
                }
            }
            const branchCircuits = [];
            

            if(location){
                const xpdp = {numberOfPwrDrop8A:numberOfPwrDrop8A,
                    numberOfPwrDrop15A:numberOfPwrDrop15A,
                    numberOfPwrDrop20A1p:numberOfPwrDrop20A1p,
                    numberOfPwrDrop20A3p:numberOfPwrDrop20A3p,
                    amp:amp,
                    xf_cable_length:xf_cable_length,
                    fla_demand:fla_demand,
                    fed_from:fed_from,
                    location:location,
                    notes:notes,
                    name:name,
                    spare8A:spare8A,
                    spare15A:spare15A,
                    spare20A1p:spare20A1p,
                    spare20A3p:spare20A3p,
                    xf_size:xf_size,
                    branchCircuits:branchCircuits,
               }
               xpdps.push(xpdp);
            }
        })

        console.log(xpdps);
        return xpdps;
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
            var location = item["Location"];
            if(location){
                var locationArray = location.split('-')
                if(locationArray.length > 1){
                    location = locationArray[1]
                }
            }
            const mcp_name = item["MCP Name"];
            const plc_local_x1_ip = item["PLC Local (X1) IP"];
            const plc_local_x3_ip = item["PLC Plant (X3) IP"];
            const psu_location_dt = item["PSU Location-DT"];
            const ups_ipAddress = item["UPS IP Address"];
            const leth_port2 = item["XPF-LETH01.P2 (LETH-LETH)"];
            const leth_port3 = item["XPF-LETH01.P3 (LETH-LETH)"];
            const leth_port4 = item["XPF-LETH01.P4 (LETH-LETH)"];
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
                ups_ipAddress: ups_ipAddress,
            }
            mcps.push(mcp);
        });
        return mcps;
    }

    parsePsuSheet(){
        var arr = XLSX.utils.sheet_to_json(this._wb.Sheets[this._psuWorksheet]);
        let psus = [];
        arr.forEach(item => {
            const lineside120AFLA = item["120V Lineside FLA"];     
            const branchBreaker = item["Branch Breaker (A)"];     
            const branchOrder = item["Branch Order"];     
            const fla = item["FLA Total"];       
            const inputPowerCord = item["Input Power Cord"];     
            const inputPowerTee = item["Input Power TEE"];     
            const MFG = item["MFG"];     
            const numberOfDrops = item["Number of Drops"];     
            const numberOfDevices = item["Number of connected Devices"];     
            const psuLocationDt = item["PSU Location-DT"];     
            const partNumber = item["Part Number"];     
            const powerFedFrom = item["Power Fed from"];   
            const supplyVoltage = item["Supply Voltage"];    
            const xpdpCBIndex = item["XPDP CB Index"];     
            const psu = {
                lineside120AFLA:lineside120AFLA,
                branchBreaker:branchBreaker,
                branchOrder:branchOrder,
                fla:fla,
                inputPowerCord:inputPowerCord,
                inputPowerTee:inputPowerTee,
                MFG:MFG,
                numberOfDrops:numberOfDrops,
                numberOfDevices:numberOfDevices,
                psuLocationDt:psuLocationDt,
                partNumber:partNumber,
                powerFedFrom:powerFedFrom,
                supplyVoltage:supplyVoltage,
                xpdpCBIndex:xpdpCBIndex,
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
        var arr = XLSX.utils.sheet_to_json(this._wb.Sheets[this._devicesWorksheet]);
        let devices = [];
        console.log(arr);
        arr.forEach(item => {
            const ac_primary_connection_direct = item["AC Primary Connection Direct"];  
            const ac_primary_connection_source = item["AC Primary Connection Source"];  
            const ac_primary_power_branch_size = item["AC Primary Power Branch Size"];  
            const ac_primary_power_drop = item["AC Primary Power Drop"];  
            const ac_primary_power_length = item["AC Primary Power Length (<100m)"];  
            const ac_secondary_connection_direct = item["AC Secondary Connection Direct"];  
            const ac_secondary_connection_source = item["AC Secondary Connection Source"];  
            const ac_secondary_power_branch_size = item["AC Secondary Power Branch Size"];  
            const ac_secondary_power_drop = item["AC Secondary Power Drop"];  
            const ac_secondary_power_drop_demand_amp = item["AC Secondary Power Drop - Demand Amps"];  
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
            const local_cable_length = item["Local Cable Length (<90m)"]; 
            const local_network_direct = item["Local Network Direct"];  
            const local_network_source = item["Local Network Source"];  
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

            const device = {
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
            }

            devices.push(device);
        })

        return devices;
    }




    createNetworkTree(devices, switches){
        let results =[];
        switches.forEach(networkSwitch => {
            let connectedDevices = devices.filter(device => device.local_network_direct === networkSwitch.switch_location_dt);
            networkSwitch = {...networkSwitch, "devices": connectedDevices}
            results.push(networkSwitch);
        })

        return results;
    }

    createIODevices(devices){
        let results =[];
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