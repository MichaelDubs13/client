import * as XLSX from 'xlsx'
import { splitIntoTwo } from './util';
import { lpdConfiguration } from '../Store/lpdStore';
import ProjectConfiguration from '../Models/ManufacturingEquipmentLine/ProjectConfiguration';
import { pdpConfiguration } from '../Store/pdpStore';
import { lpdModel } from '../Store/Models/LDPs/lpdModel';
import { psuModel } from '../Store/Models/LDPs/psuModel';
import { powerDropModel } from '../Store/Models/LDPs/powerDropModel';

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
            const psuLocationDt = item["PSU Location-DT"];     
            const psu_arr = splitIntoTwo(psuLocationDt, "-");
            const psu_location = psu_arr[0]
            const psu_dt = psu_arr[1] 
            const partNumber = item["Part Number"];     
            const powerFedFrom = item["Power Fed from"];   
            const supplyVoltage = item["Supply Voltage"];    
            const xpdpCBIndex = item["XPDP CB Index"]; 
            const psu = psuModel.create();   
            psu.lineside120AFLA=lineside120AFLA;
            psu.branchBreaker=branchBreaker;
            psu.branchOrder=branchOrder;
            psu.fla=fla;
            psu.inputPowerCord=inputPowerCord;
            psu.inputPowerTee=inputPowerTee;
            psu.MFG=MFG;
            psu.psuLocationDt=psuLocationDt;
            psu.location=psu_location;
            psu.deviceTag=psu_dt;
            psu.partNumber=partNumber;
            psu.powerFedFrom=powerFedFrom;
            psu.supplyVoltage=supplyVoltage;
            psu.xpdpCBIndex=xpdpCBIndex;
            psu.cable_length=0;
            psu.drops=[];
            psu.device={};
            psus.push(psu);
        })

        return psus;
    },
    getSupplyVoltage(value){
        var targetValue = lpdConfiguration.psuSupplyVoltageOptions.find(option => value.startsWith(option.value))
        if(targetValue) return targetValue;
        return "";
    },
    getLpds(psus, devices, pdps, xpdps){
        var results = []

         psus.forEach(psu => {
            var psuDevice = devices.find(device => device.target_device_location_dt === psu.psuLocationDt)
            if(psuDevice){
                if(psu.branchBreaker){
                    psuParser.createLpd(psu.branchBreaker, psuDevice.ac_primary_connection_source, psu, results, pdps, xpdps);
                } else if(psu.powerFedFrom){
                    var sourcePsu = psus.find(i => i.psuLocationDt === psu.powerFedFrom)
                    if(sourcePsu){
                        psuParser.createLpd(sourcePsu.branchBreaker, psu, results, pdps, xpdps);
                    }
                } else {
                    psuParser.createLpd(0, psuDevice.ac_primary_connection_source, psu, results, pdps, xpdps);
                }}
            }
        )
        
        return results;
    },

    createLpd(deviceTag, panel, psu, results, pdps, xpdps){
        var foundGroup = results.find(group => group.powerSourceDT === deviceTag && group.panel === panel)
        if(foundGroup){
            foundGroup.psus.push(psu)
            psu.data.parent = foundGroup;
        } else {
            const group = lpdModel.create()
            group.powerSourceDT = deviceTag;
            group.panel = panel;
            group.psus = [psu,];
            group.supplyVoltage = psu.supplyVoltage;
            group.psu_selected = `${psu.MFG}:${psu.partNumber}`
            group.line = ProjectConfiguration.line;
            group.location = panel //panel = location
            psu.data.parent = group;
            psu.line = group.line;
            psuParser.setSourceCb(group, pdps, xpdps, panel, deviceTag)

            results.push(group)
        }
        return results;
    },
    setSourceCb(group, pdps, xpdps, panel, deviceTag){
        let pdp = pdps.find(i => i.location === panel);
        if(!pdp) pdp=xpdps.find(i => i.location === panel);
        if(!pdp) return null;
        var brancCircuit = pdpConfiguration.getCB(pdp.branchCircuit, deviceTag);
        if(!brancCircuit) return null;
        brancCircuit.data.targetDevice = group.data.id
    },

    getPwrDrops(psus, devices){
        psus.forEach(psu => {
            var directDevices = devices.filter(device => device.direct24VDC === psu.psuLocationDt)
            const drops = [];
            directDevices.forEach(device => {
                const drop = powerDropModel.create(psu);
                drop.targetLocation = device.target_device_location;
                drop.targetDT = device.device_dt;
                drop.targetPort = '';
                drop.fla = device.fla;
                drop.description = device.target_device_function_text;
                drops.push(drop);
            })
            psu.drops = drops;
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