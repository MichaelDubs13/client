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
    },

    getOrderedBranch(psus){
        var results = {}

        psus.forEach(psu => {
            if(psu.xpdpCBIndex){
                psuParser.addToBranch(psu.xpdpCBIndex, psu, results);
            } else {
                if(psu.powerFedFrom){
                    var sourcePsu = psus.find(i => i.psuLocationDt === psu.powerFedFrom)
                    if(sourcePsu){
                        psuParser.addToBranch(sourcePsu.xpdpCBIndex, psu, results);
                    }
                }
            }
        })

        return results;
    },

    addToBranch(key, psu, results){
        if(key in results){
            results[key].push(psu)
        } else {
            results[key] = [psu,]
        }

        return results;
    }

}

export default psuParser;