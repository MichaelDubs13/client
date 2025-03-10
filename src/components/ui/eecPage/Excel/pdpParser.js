import * as XLSX from 'xlsx'
import {pdpConfiguration} from '../../../../store/eec/pdpStore';

const pdpParser = {
    parse:(workbook, sheet) => {
        var arr = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
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
            const branchCircuit = pdpConfiguration.createBranchCircuits();
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
                    branchCircuit:branchCircuit,
                }
                pdps.push(pdp);
            }
        })

        return pdps;
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
    }


}

export default pdpParser