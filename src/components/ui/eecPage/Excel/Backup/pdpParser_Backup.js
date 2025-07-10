import * as XLSX from 'xlsx'
import {pdpConfiguration} from '../../Store/pdpStore';
import { findClosestHigherNumber } from '../util';
import ProjectConfiguration from '../../Models/ManufacturingEquipmentLine/ProjectConfiguration';
import { pdpModel } from '../../Store/Models/PDPs/pdpModel';
import { pdpBranchCircuitModel } from '../../Store/Models/PDPs/pdpBranchCircuitModel';

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

            const spare10A = item["Spare 10A"];
            const spare20A = item["Spare 20A"];
            const spare30A = item["Spare 30A"];
            const spare40A = item["Spare 40A"];
            const spare60A = item["Spare 60A"];
            const spare70A = item["Spare 70A"];
            const spare100A = item["Spare 100A"];
            const spare250A = item["Spare 250A"];
            const branchCircuit = pdpModel.initializeBranchCircuits();
            const hotPowerDrops = [] //only available in UI
            if(name){
                const pdp = pdpModel.create(null,name);
                pdp.deviceTag =name;
                pdp.amp = amp;
                pdp.FLA = FLA; 
                pdp.location = name; //location is name of the PDP eg:MPDP
                pdp.enclosureSize=enclosureSize;
                pdp.numberOfBusBar=numberOfBusBar;
                pdp.spare10A=spare10A;
                pdp.spare20A=spare20A;
                pdp.spare30A=spare30A;
                pdp.spare40A=spare40A;
                pdp.spare60A=spare60A;
                pdp.spare70A=spare70A;
                pdp.spare100A=spare100A;
                pdp.spare250A=spare250A;
                pdp.Opt_SurgeProtectionDevice=false
                pdp.PwrMonitorEnable=false;
                pdp.Opt_HotPwrEnable=false;
                pdp.branchCircuit=branchCircuit;
                pdp.hotPowerDrops=hotPowerDrops;
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
            var sources = devices.filter(device => device.ac_primary_connection_source === pdp.deviceTag)
            for(let i=0; i<sources.length; i++){
                const sourceDevice = sources[i];
                if(sourceDevice.ac_primary_power_branch_size){
                    const arr = sourceDevice.ac_primary_power_branch_size.split(" ")
                    if(arr.length > 2){
                        const branchSize = arr[2]
                        const branch = pdpParser.createBranchCircuit(sourceDevice, pdp, branchSize);
                        pdp.branchCircuit[branchSize].push(branch);
                    }
                }
            }
            //pdpConfiguration.updateBranchCircuitDT(pdp.branchCircuit)
            pdpConfiguration.calculateAllBranchFLA(pdp);
        })        
        return pdps;
    },
    createBranchCircuit:(sourceDevice, pdp, amperage)=>{
        const branch = pdpBranchCircuitModel.create(pdp, amperage);
        branch.line=ProjectConfiguration.line;
        branch.targetDT = sourceDevice.device_dt;
        branch.targetLocation = sourceDevice.target_device_location;
        branch.targetFLA = sourceDevice.primary_ac_power_fla;
        branch.targetCableLength = sourceDevice.ac_primary_power_length;
        branch.DropType = sourceDevice.ac_secondary_power_drop_type;
        branch.PwrDrop_DescTxt = sourceDevice.target_device_function_text;
        return branch;
    },
}

export default pdpParser