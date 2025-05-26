import * as XLSX from 'xlsx'
import { xpdpConfiguration } from '../Store/xpdpStore';
import { pdpConfiguration } from '../Store/pdpStore';
import ProjectConfiguration from '../Models/ManufacturingEquipmentLine/ProjectConfiguration';
import { xpdpModel } from '../Store/Models/XPDPs/xpdpModel';
import { branchCircuitModel } from '../Store/Models/XPDPs/branchCircuitModel';


const xpdpParser = {
     parse(workbook, worksheet){
           var arr = XLSX.utils.sheet_to_json(workbook.Sheets[worksheet]);
           let xpdps = [];
           arr.forEach(item => {
               var amp = item["Amperage"];
               amp = `${amp}A`;
               const xf_cable_length = item["Cable Length from XF (m)"];
               const fla_demand = item["FLA Demand (average per phase)"];
               const fed_from = item["Fed From"];
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
               const branchCircuit = xpdpModel.initializeBranchCircuits();
   
               if(name){
                    const xpdp = xpdpModel.create(null,name);
                    xpdp.amp=amp;
                    xpdp.xf_cable_length=xf_cable_length;
                    xpdp.fla_demand=fla_demand;
                    xpdp.fed_from=fed_from;
                    xpdp.deviceTag=name;
                    xpdp.location=name; //location is name, eg:XPDP01
                    xpdp.notes=notes;
                    xpdp.spare8A=spare8A;
                    xpdp.spare15A=spare15A;
                    xpdp.spare20A1p=spare20A1p;
                    xpdp.spare20A3p=spare20A3p;
                    xpdp.xf_size=xf_size;
                    xpdp.branchCircuit=branchCircuit;
                    xpdps.push(xpdp);
               }
           })
   
           return xpdps;
       },
    createXpdpBranchCircuit:(xpdps, devices)=>{
        xpdps.forEach(xpdp => {
            var sources = devices.filter(device => device.ac_primary_connection_source === xpdp.name)
            for(let i=0; i<sources.length; i++){
                const sourceDevice = sources[i];
                if(sourceDevice.ac_primary_power_branch_size){
                    const arr = sourceDevice.ac_primary_power_branch_size.split(" ")
                    if(arr.length > 2){
                        const branchSize = arr[2]
                        const branch = xpdpParser.createBranchCircuit(sourceDevice,xpdp, branchSize);
                        if(xpdp.branchCircuit.hasOwnProperty(branchSize)){
                            xpdp.branchCircuit[branchSize].push(branch);
                        }
                    }
                }
            }
            //pdpConfiguration.updateBranchCircuitDT(xpdp.branchCircuit)
            pdpConfiguration.calculateAllBranchFLA(xpdp);
        })        
        return xpdps;
    },
    createBranchCircuit:(sourceDevice, parent, amperage)=>{
        const branch = branchCircuitModel.create(parent, amperage);
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

export default xpdpParser;