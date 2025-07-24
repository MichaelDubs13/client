import * as XLSX from 'xlsx'
import {pdpConfiguration} from '../Store/pdpStore';
import { findClosestHigherNumber, getCellValue } from './util';
import ProjectConfiguration from '../Models/ManufacturingEquipmentLine/ProjectConfiguration';
import { pdpModel } from '../Store/Models/PDPs/pdpModel';
import { pdpBranchCircuitModel } from '../Store/Models/PDPs/pdpBranchCircuitModel';
import { formatToTwoDigits } from '../Store/util';

const col = {
    line:0,
    location:1,
    disconnectSize:2,
    enclosureSize:3,
    nameplateFLA:4,
    powerMonitor:5,
    surgeProtection:6,
    hotPowerPanel:7,
    hotPowerPowerDrop:{
        hpdpLine:8,
        hpdpLocation:9,
        dropType:10,
        amperage:11,
        line:12,
        location:13,
        dt:14,
        description:15,
    },
    branchCircuitPowerDrop:{
        spare: 16,
        amperage:17,
        dropType:18,
        description:19,
        line:20,
        location:21,
        dt:22,
        cableLength:23,
        fla:24,
        totalFla:25,
    }
}


const pdpParser = {
    parse:(workbook, sheet) => {
        let pdps = [];
        let pdpData = [];
        const startRow = 3;
        const worksheet = workbook.Sheets[sheet];
        const range = XLSX.utils.decode_range(worksheet['!ref']);

        //create PDPs
        for(let row=startRow;row<range.e.r;row++){
            const line = getCellValue(worksheet, row, col.line);
            
            if(line){
                const location = getCellValue(worksheet, row, col.location);
                const disconnectSize = getCellValue(worksheet, row, col.disconnectSize);
                const enclosureSize = getCellValue(worksheet, row, col.enclosureSize);
                const nameplateFLA = getCellValue(worksheet, row, col.nameplateFLA);
                const powerMonitor = getCellValue(worksheet, row, col.powerMonitor);
                const surgeProtection = getCellValue(worksheet, row, col.surgeProtection);

                var pdp = pdpModel.create();
                pdp.line = line;
                pdp.amp = disconnectSize;
                pdp.location = location;
                pdp.enclosureSize = enclosureSize;
                pdp.FLA = nameplateFLA;
                pdp.PwrMonitorEnable = powerMonitor;
                pdp.Opt_SurgeProtectionDevice = surgeProtection;
                pdps.push(pdp);
                
                //set endRow for previous pdp
                if(pdpData.length > 0){
                    pdpData.at(-1).endRow = row-1;
                }
                pdpData.push({model:pdp, startRow: row, endRow:0})
            }
        }

        //create branchCircuits
        for(let i=0;i<pdpData.length;i++){
            var cbNumber = 0;
            const item = pdpData[i];
            const pdp = item.model;
            const endRow = i === pdpData.length-1 ? range.e.r : item.endRow;
            var branchCircuitData = [];
            for(let row=item.startRow;row<endRow;row++){
                const amperage = getCellValue(worksheet, row, col.branchCircuitPowerDrop.amperage);
                if(amperage){
                    const dto = {amperage:amperage}
                    dto.spare = getCellValue(worksheet, row, col.branchCircuitPowerDrop.spare);
                    dto.line = getCellValue(worksheet, row, col.branchCircuitPowerDrop.line);
                    dto.location = getCellValue(worksheet, row, col.branchCircuitPowerDrop.location);
                    dto.dropType = getCellValue(worksheet, row, col.branchCircuitPowerDrop.dropType);
                    dto.description = getCellValue(worksheet, row, col.branchCircuitPowerDrop.description);
                    dto.dt = getCellValue(worksheet, row, col.branchCircuitPowerDrop.dt);
                    dto.cableLength = getCellValue(worksheet, row, col.branchCircuitPowerDrop.cableLength);
                    dto.fla = getCellValue(worksheet, row, col.branchCircuitPowerDrop.fla);
                    dto.totalFla = getCellValue(worksheet, row, col.branchCircuitPowerDrop.totalFla);
                    branchCircuitData.push(dto);
                }
            }

            branchCircuitData = branchCircuitData.sort().reverse()

            console.log(branchCircuitData)
            var cbNumber = 0;
            branchCircuitData.forEach(dto => {
                pdpParser.createBranchCircuit(pdp, dto, cbNumber)
                cbNumber = cbNumber + 1;
            })
        }

        //create hotPowerDrops
        /* for(let i=0;i<hpdpData.length;i++){
            const item = hpdpData[i];
            const hpdp = item.model;
            const endRow = i === hpdpData.length-1 ? range.e.r : item.endRow;
            for(let row=item.startRow;row<endRow;row++){
                const hotPowerPanel = getCellValue(worksheet, row, col.hotPowerPanel);
                if(hotPowerPanel){
                    const hpdpLine = getCellValue(worksheet, row, col.hotPowerPowerDrop.hpdpLine);
                    const hpdpLocation = getCellValue(worksheet, row, col.hotPowerPowerDrop.hpdpLocation);
                    const dropType = getCellValue(worksheet, row, col.hotPowerPowerDrop.dropType);
                    const amperage = getCellValue(worksheet, row, col.hotPowerPowerDrop.amperage);
                    const line = getCellValue(worksheet, row, col.hotPowerPowerDrop.line);
                    const location = getCellValue(worksheet, row, col.hotPowerPowerDrop.location);
                    const dt = getCellValue(worksheet, row, col.hotPowerPowerDrop.dt);
                    const description = getCellValue(worksheet, row, col.hotPowerPowerDrop.description);

                    hpdp.setHotPowerBranchCircuit(hotPowerPanel, hpdpLine, hpdpLocation,
                        dropType, amperage, line, location, dt, description)
                }
            }
        } */


        return pdps;
    },
    createBranchCircuit:(pdp,dto, cbNumber)=>{
        const branchCircuit = pdpBranchCircuitModel.create(pdp, dto.amperage);
        branchCircuit.PwrDrop_Spare = dto.spare;
        branchCircuit.DropType = dto.dropType;
        branchCircuit.description = dto.description;
        branchCircuit.deviceDT = `CB${formatToTwoDigits(1+cbNumber)}`;
        branchCircuit.line = dto.line;
        branchCircuit.targetLocation = dto.location;
        branchCircuit.targetDT = dto.dt;
        branchCircuit.targetCableLength = dto.cableLength;
        branchCircuit.targetFLA = dto.fla;
        branchCircuit.targetFLA_Total = dto.totalFla;
        pdp.branchCircuit[dto.amperage].push(branchCircuit)
    }
}

export default pdpParser