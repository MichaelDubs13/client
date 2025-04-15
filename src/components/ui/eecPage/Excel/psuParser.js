import * as XLSX from 'xlsx'
import { splitIntoTwo } from './util';
import { lpdConfiguration } from '../Store/lpdStore';

const psuParser = {
    parse(workbook, worksheet){
        var arr = XLSX.utils.sheet_to_json(workbook.Sheets[worksheet]);
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
            const psu_arr = splitIntoTwo(psuLocationDt, "-");
            const psu_location = psu_arr[0]
            const psu_dt = psu_arr[1] 
            const partNumber = item["Part Number"];     
            const powerFedFrom = item["Power Fed from"];   
            let supplyVoltage = item["Supply Voltage"];    
            const xpdpCBIndex = item["XPDP CB Index"];     
            const psu = {
                lineside120AFLA:lineside120AFLA,
                branchBreaker:branchBreaker,
                branchOrder:branchOrder,
                fla:fla,
                inputPowerCord:inputPowerCord,
                inputPowerTee:inputPowerTee,
                MFG:MFG,
                numberOfDrops:numberOfDrops, //not used
                numberOfDevices:numberOfDevices, //not used
                psuLocationDt:psuLocationDt,
                psu_location:psu_location,
                psu_dt:psu_dt,
                partNumber:partNumber,
                powerFedFrom:powerFedFrom,
                supplyVoltage:supplyVoltage,
                xpdpCBIndex:xpdpCBIndex,
                cable_length:0,
                pwrDrops:[],
                device:{}
            }
            psus.push(psu);
        })

        return psus;
    },
    getSupplyVoltage(value){
        var targetValue = lpdConfiguration.psuSupplyVoltageOptions.find(option => value.startsWith(option.value))
        if(targetValue){
            return targetValue;
        }
        
        return "";
    },
    getLpds(psus, devices){
        var results = []

         psus.forEach(psu => {
            var psuDevice = devices.find(device => device.target_device_location_dt === psu.psuLocationDt)
            if(psuDevice){
                if(psu.branchBreaker){
                    psuParser.addToBranch(psu.branchBreaker, psuDevice.ac_primary_connection_source, psu, results);
                } else if(psu.powerFedFrom){
                    var sourcePsu = psus.find(i => i.psuLocationDt === psu.powerFedFrom)
                    if(sourcePsu){
                        psuParser.addToBranch(sourcePsu.branchBreaker, psu, results);
                    }
                } else {
                    psuParser.addToBranch(0, psuDevice.ac_primary_connection_source, psu, results);
                }}
            }
            
        )

        return results;
    },

    addToBranch(cb, panel, psu, results){
        var foundGroup = results.find(group => group.cb === cb && group.panel === panel)
        if(foundGroup){
            foundGroup.psus.push(psu)
        } else {
            const newEntry = {cb:cb, panel:panel, psus:[psu,]}
            results.push(newEntry)
        }
        return results;
    },

    getPwrDrops(psus, devices){
        psus.forEach(psu => {
            var directDevices = devices.filter(device => device.direct24VDC === psu.psuLocationDt)
            psu.pwrDrops = directDevices;
        })

        return psus;
    },

    getDevice(psus, devices){
        psus.forEach(psu => {
            var networkDevice = devices.filter(device => device.target_device_location_dt === psu.psuLocationDt)
            psu.device = networkDevice;
        })

        return psus;
    }

}

export default psuParser;