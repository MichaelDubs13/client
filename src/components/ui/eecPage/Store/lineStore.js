import {create} from "zustand";
import { pdpStore } from "./pdpStore";
import { xpdpStore } from "./xpdpStore";
import { mcpStore } from "./mcpStore";
import { lpdStore } from "./lpdStore";
import { networkSwitchStore } from "./networkSwitchStore";
import { hmiStore } from "./hmiStore";
import { safetyGateStore } from "./safetyGateStore";
import { projectStore } from "./projectStore";
import { ioModuleStore } from "./ioModuleStore";

const lineOptions = {
    addDeviceOptions:['LETH','HMI',"GS", 'SIO', 'MIO']
}

const lineConfiguration = {
    networkSwitchIndicator:'LETH',
    hmiIndicator:'HMI',
    gateIndicator:'GS',
    safetyModuleIndicator:'SIO',
    ioModuleIndicator:'MIO',
    getDeviceFullName:(location, device)=>{
        return `+${location}-${device}`;
    },
    getLines:(array, lines) => {
        array.map((item) => {
            if(item.line){
                if(!lines.includes(item.line)){
                    lines.push(item.line);
                }
            }
        })
        return lines;
    },    
    getLocations:(array, locations) => {
        array.map((item) => {
            if(item.location){
                // if(item.line === line){
                //     if(!locations.includes(item.location)){
                //         locations.push(item.location)
                //     }
                // }
                if(!locations.includes(item.location)){
                    locations.push(item.location)
                }
            } 
        })
        return locations;
    },   
    getStations:(array, stations) => {
        array.map((item) => {
            const foundStations = item.getStations();
            if(foundStations.length > 0){
                stations.push(...foundStations);
            }
        })
        return stations;
    },    
    getDevices:(array, devices, station) => {
        array.map((item) => {
            const foundDevices = item.getDevices(station);
            if(foundDevices.length > 0){
                devices.push(...foundDevices); 
            }
        })
        return devices;
    },
    getDeviceByNameGlobal:(name, location, line)=>{
        const mcps = mcpStore.getState().mcps;
        const lpds = lpdStore.getState().lpds;
        const networkSwitches = networkSwitchStore.getState().networkSwitches;
        const hmis = hmiStore.getState().hmis;
        const safetyGates = safetyGateStore.getState().safetyGates;
        const ioModuleGroups = ioModuleStore.getState().ioModuleGroups;

        const items = networkSwitches.concat(hmis, lpds, mcps, safetyGates, ioModuleGroups);
        for(let i=0;i<items.length;i++){
            var foundItem = items[i].getDeviceByName(name, location, line);
            if(foundItem) return foundItem;
        }
    },
    getDeviceById:(id)=>{
        const pdps = pdpStore.getState().pdps;
        const xpdps= xpdpStore.getState().xpdps;
        const mcps = mcpStore.getState().mcps;
        const lpds = lpdStore.getState().lpds;
        const networkSwitches = networkSwitchStore.getState().networkSwitches;
        const hmis = hmiStore.getState().hmis;
        const safetyGates = safetyGateStore.getState().safetyGates;
        const ioModuleGroups = ioModuleStore.getState().ioModuleGroups;

        const items = pdps.concat(xpdps, mcps,lpds,networkSwitches,hmis,safetyGates,ioModuleGroups)

        for(let i=0;i<items.length;i++){
            if(items[i].data.id === id) return items[i];
            var foundItem = pdps[i].getItemById(id);
            if(foundItem) return foundItem;
        }
    },

    getLvPowerSourceDevice:(location, device)=>{
        const lpds = lpdStore.getState().lpds;
        const networkSwitches = networkSwitchStore.getState().networkSwitches;
        const hmis = hmiStore.getState().hmis;
        const safetyGates = safetyGateStore.getState().safetyGates;
        const items = lpds.concat(safetyGates)

        for(let i=0;i<items.length;i++){
            var foundItem = items[i].getPowerSource(location, device);
            if(foundItem) return foundItem;
        }
    }

}
const lineStore = create((set) => ({
    lines:[],
    stations:[],
    plcs:[],

    getLineOptions:()=>{
        const pdps = pdpStore.getState().pdps;
        const xpdps= xpdpStore.getState().xpdps;
        const mcps = mcpStore.getState().mcps;
        const lpds = lpdStore.getState().lpds;
        const hmis = hmiStore.getState().hmis;
        const safetyGates = safetyGateStore.getState().safetyGates;
        const networkSwitches = networkSwitchStore.getState().networkSwitches;
        const ioModuleGroups = ioModuleStore.getState().ioModuleGroups;
        const items = pdps.concat(xpdps, mcps,lpds,networkSwitches,hmis,safetyGates,ioModuleGroups)

        const line = projectStore.getState().line;
        var newLines = [line,]
        newLines = lineConfiguration.getLines(items, newLines);
        newLines = newLines.map((line) => {
            return {label:line, value:line}
        })
        set((state) => {
            return {lines: newLines};
        })
    },
    getPlcOptions:()=>{
        const mcps = mcpStore.getState().mcps;
        const plcOptions = mcps.map((mcp) => {
            return {label:mcp.getPlc(), value:mcp.getPlc()}
        })
        set((state) => {
            return {plcs: plcOptions};
        })
        return plcOptions;
    },
    getLocationOptions:(line)=>{
        const pdps = pdpStore.getState().pdps;
        const xpdps= xpdpStore.getState().xpdps;
        const mcps = mcpStore.getState().mcps;
        const lpds = lpdStore.getState().lpds;
        const networkSwitches = networkSwitchStore.getState().networkSwitches;
        const hmis = hmiStore.getState().hmis;
        const safetyGates = safetyGateStore.getState().safetyGates;
        const ioModuleGroups = ioModuleStore.getState().ioModuleGroups;
        const items = pdps.concat(xpdps, mcps,lpds,networkSwitches,hmis,safetyGates,ioModuleGroups)

        var newLocations = []
        newLocations = lineConfiguration.getLocations(items, newLocations); 
        newLocations = newLocations.filter(location => location);  
        newLocations = [...new Set(newLocations)];     
        newLocations = newLocations.map((location) => {
            return {label:location, value:location}
        })

        var newStations = []
        newStations = lineConfiguration.getStations(items, newStations);
        newStations = newStations.filter(station => station)
        newStations = [...new Set(newStations)];
        newStations = newStations.map((station) => {
            return {label:station, value:station}
        })

        newLocations.push(...newStations);
        newLocations = [...new Set(newLocations)];   
        return newLocations;
    },

    getStationOptions:()=>{
        const pdps = pdpStore.getState().pdps;
        const xpdps= xpdpStore.getState().xpdps;
        const mcps = mcpStore.getState().mcps;
        const lpds = lpdStore.getState().lpds;
        const networkSwitches = networkSwitchStore.getState().networkSwitches;
        const hmis = hmiStore.getState().hmis;
        const safetyGates = safetyGateStore.getState().safetyGates;
        const ioModuleGroups = ioModuleStore.getState().ioModuleGroups;
        const items = pdps.concat(xpdps, mcps,lpds,networkSwitches,hmis,safetyGates,ioModuleGroups)
        var newStations = []
        newStations = lineConfiguration.getStations(items, newStations);
        newStations = newStations.filter(station => station)
        newStations = [...new Set(newStations)];

        var newLocations = []
        newLocations = lineConfiguration.getLocations(items, newLocations); 
        newLocations = newLocations.filter(location => location);  
        newLocations = [...new Set(newLocations)];     
        
        newStations.push(...newLocations);
        newStations = [...new Set(newStations)];
        newStations = newStations.map((station) => {
            return {label:station, value:station}
        })
        
        set((state) => {
            return {stations: newStations};
        })

        return newStations;
    },

    /**
     * get all devices created in the UI
     * change this to auto parse
     * @param {*} station 
     * @returns 
     */
    getDeviceOptions:(station)=>{
        const pdps = pdpStore.getState().pdps;
        const xpdps= xpdpStore.getState().xpdps;
        const mcps = mcpStore.getState().mcps;
        const lpds = lpdStore.getState().lpds;
        const networkSwitches = networkSwitchStore.getState().networkSwitches;
        const hmis = hmiStore.getState().hmis;
        const safetyGates = safetyGateStore.getState().safetyGates;
        const ioModuleGroups = ioModuleStore.getState().ioModuleGroups;
        const items = pdps.concat(xpdps, mcps,lpds,networkSwitches,hmis,safetyGates,ioModuleGroups)
        var newDevices = []
        newDevices = lineConfiguration.getDevices(items, newDevices,station);
        newDevices = newDevices.filter(device => device);
        newDevices = [...new Set(newDevices)];
        newDevices = newDevices.map((device) => {
            return {label:device, value:device}
        })
        return newDevices;
    },

    getCbOptions:(location)=>{
        const pdps = pdpStore.getState().pdps;
        const xpdps= xpdpStore.getState().xpdps;
        var cbs = [];
        pdps.forEach(pdp => {
            var foundCBs = pdp.getCBs(location);
            cbs.push(...foundCBs);
        });
       
        xpdps.forEach(pdp => {
            var foundCBs = pdp.getCBs(location);
            cbs.push(...foundCBs);
        });

        cbs = cbs.sort().map(cb => {
            return {label:cb, value:cb}
        })

        return cbs;
    }
    
}))

export {
    lineStore,
    lineConfiguration,
    lineOptions,
}