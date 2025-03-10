import * as XLSX from 'xlsx'


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
}

export default psuParser;