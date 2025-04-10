import * as XLSX from 'xlsx'
import {pdpConfiguration} from '../../../../store/eec/pdpStore';
import { findClosestHigherNumber } from './util';

const pdpParser = {
    enclosureSizeOptions: ["800x1400x500", "1000x1800x500"],
    ampOptions : [600, 400, 200],
    parse:(workbook, sheet) => {
        var arr = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        let pdps = [];
        arr.forEach(item => {
            const name = item["PDP name"];
            var enclosureSize = item["Enclosure Size"];
            enclosureSize = pdpParser.getEnclosureSize(enclosureSize);

            const numberOfBusBar = pdpParser.getNumberOfBusBar(enclosureSize);

            var amp = item["Amperage"];
            if(amp){
                amp = findClosestHigherNumber(pdpParser.ampOptions, amp)
                amp = `${amp}A`;
            }

            const FLA = item["FLA Demand"];
            var location = item["Location"];
            if(location){
                var locationArray = location.split('-')
                if(locationArray.length > 1){
                    location = locationArray[1]
                }
            }

            let numberOf10APwrDrps = item["Number of 10A Power Drops"];
            let numberOf20APwrDrps = item["Number of 20A Power Drops"];
            let numberOf30APwrDrps = item["Number of 30A Power Drops"];
            let numberOf40APwrDrps = item["Number of 40A Power Drops"];
            let numberOf60APwrDrps = item["Number of 60A Power Drops"];
            let numberOf70APwrDrps = item["Number of 70A Power Drops"];
            let numberOf100APwrDrps = item["Number of 100A Power Drops"];
            let numberOf250APwrDrps = item["Number of 250A Power Drops"];

            numberOf10APwrDrps = numberOf10APwrDrps ? numberOf10APwrDrps : 0;
            numberOf20APwrDrps = numberOf20APwrDrps ? numberOf20APwrDrps : 0;
            numberOf30APwrDrps = numberOf30APwrDrps ? numberOf30APwrDrps : 0;
            numberOf40APwrDrps = numberOf40APwrDrps ? numberOf40APwrDrps : 0;
            numberOf60APwrDrps = numberOf60APwrDrps ? numberOf60APwrDrps : 0;
            numberOf70APwrDrps = numberOf70APwrDrps ? numberOf70APwrDrps : 0;
            numberOf100APwrDrps = numberOf100APwrDrps ? numberOf100APwrDrps : 0;
            numberOf250APwrDrps = numberOf250APwrDrps ? numberOf250APwrDrps : 0;

            const spare10A = item["Spare 10A"];
            const spare20A = item["Spare 20A"];
            const spare30A = item["Spare 30A"];
            const spare40A = item["Spare 40A"];
            const spare60A = item["Spare 60A"];
            const spare70A = item["Spare 70A"];
            const spare100A = item["Spare 100A"];
            const spare250A = item["Spare 250A"];
            const branchCircuit = pdpConfiguration.createBranchCircuits();
            const hotPowerDrops = [] //only available in UI
            if(location){
                const pdp = {name:name, amp:amp, FLA:FLA, location:location, 
                    enclosureSize:enclosureSize,
                    numberOfBusBar:numberOfBusBar,
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
                    branchCircuit:branchCircuit,
                    hotPowerDrops:hotPowerDrops,
                }
                pdps.push(pdp);
            }
        })

        return pdps;
    },
    getEnclosureSize:(enclosureSize)=>{
        if(!enclosureSize || enclosureSize === "N/A"){
            enclosureSize = "1000x1800x500(WHD)";
        } else {
            if(pdpParser.enclosureSizeOptions.includes(enclosureSize)){
                enclosureSize = `${enclosureSize}(WHD)`;
            } else {
                enclosureSize = "1000x1800x500(WHD)";
            }
        }

        return enclosureSize;
    },
    getNumberOfBusBar:(enclosureSize)=>{
        if(enclosureSize == "800x1400x500(WHD)"){
            return 3;
        } else {
            return 4;
        }
    },
    createPdpBranchCircuit:(pdps, devices)=>{
        pdps.forEach(pdp => {
            var sources = devices.filter(device => device.ac_primary_connection_source === pdp.name)
            for(let i=0; i<sources.length; i++){
                const sourceDevice = sources[i];
                if(sourceDevice.ac_primary_power_branch_size){
                    const arr = sourceDevice.ac_primary_power_branch_size.split(" ")
                    if(arr.length > 2){
                        const branchSize = arr[2]
                        const branch = pdpParser.createBranchCircuit(sourceDevice);
                        pdp.branchCircuit[branchSize].push(branch);
                    }
                }
            }
            pdpParser.fillEmptyBranchCircuits(pdp);
            pdpParser.calculateAllBranchFLA(pdp);
        })        
        return pdps;
    },
    createBranchCircuit:(sourceDevice)=>{
        const branch = pdpConfiguration.createBranchCircuit();
        branch.dbl_Cable_Length = sourceDevice.ac_primary_power_length;
        branch.TargetDevice_DT = sourceDevice.device_dt;
        branch.StrBox_DT = sourceDevice.station;
        branch.TargetDevice_FLA = sourceDevice.primary_ac_power_fla;
        branch.DropType = sourceDevice.ac_secondary_power_drop_type;
        return branch;
    },
    fillEmptyBranchCircuit: (numberOfPwrDrps, pdp, key)=>{
        const numberOfEmptyPwrDrps = numberOfPwrDrps - pdp.branchCircuit[key].length;
        if(numberOfEmptyPwrDrps > 0)
        for(let i = 0; i < numberOfEmptyPwrDrps; i++){
            var branch =  pdpConfiguration.createBranchCircuit();
            pdp.branchCircuit[key].push(branch);
        }
    },
    fillEmptyBranchCircuits:(pdp) => {
        pdpParser.fillEmptyBranchCircuit(pdp.numberOf250APwrDrps, pdp, "250A");
        pdpParser.fillEmptyBranchCircuit(pdp.numberOf100APwrDrps, pdp, "100A");
        pdpParser.fillEmptyBranchCircuit(pdp.numberOf70APwrDrps, pdp, "70A");
        pdpParser.fillEmptyBranchCircuit(pdp.numberOf60APwrDrps, pdp, "60A");
        pdpParser.fillEmptyBranchCircuit(pdp.numberOf40APwrDrps, pdp, "40A");
        pdpParser.fillEmptyBranchCircuit(pdp.numberOf30APwrDrps, pdp, "30A");
        pdpParser.fillEmptyBranchCircuit(pdp.numberOf20APwrDrps, pdp, "20A");
        pdpParser.fillEmptyBranchCircuit(pdp.numberOf10APwrDrps, pdp, "10A");
    },
    calculateBranchFLA:(branchCircuits)=>{
        var fla = 0;
        branchCircuits.forEach(branchCircuit => {
            fla = fla + branchCircuit.TargetDevice_FLA;
        })

        branchCircuits.forEach(branchCircuit => {
            branchCircuit.StrBox_DT_FLA = fla;
        })
    },
    calculateAllBranchFLA:(pdp)=>{
        pdpParser.calculateBranchFLA(pdp.branchCircuit["250A"])
        pdpParser.calculateBranchFLA(pdp.branchCircuit["100A"])
        pdpParser.calculateBranchFLA(pdp.branchCircuit["70A"])
        pdpParser.calculateBranchFLA(pdp.branchCircuit["60A"])
        pdpParser.calculateBranchFLA(pdp.branchCircuit["40A"])
        pdpParser.calculateBranchFLA(pdp.branchCircuit["30A"])
        pdpParser.calculateBranchFLA(pdp.branchCircuit["20A"])
        pdpParser.calculateBranchFLA(pdp.branchCircuit["10A"])
    },
}

export default pdpParser