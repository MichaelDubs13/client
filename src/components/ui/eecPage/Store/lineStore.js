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
    addDeviceOptions:['LETH','HMI',"GS", 'SIO', 'MIO', 'PSU']
}

const lineConfiguration = {
    networkSwitchIndicator:'LETH',
    hmiIndicator:'HMI',
    gateIndicator:'GS',
    safetyModuleIndicator:'SIO',
    ioModuleIndicator:'MIO',
    powerSupplyIndicator:'PSU',
    getDeviceFullName:(line,location, device)=>{
        return `++${line}+${location}-${device}`;
    },
    getLines:(array, lines) => {
        array.map((item) => {
            lines.push(...item.getLines());
        })
        return lines;
    },    

    getStations:(array, line, stations) => {
        array.map((item) => {
            const foundStations = item.getStations(line);
            if(foundStations.length > 0){
                stations.push(...foundStations);
            }
        })
        return stations;
    },    

    getStationOptions:(line)=>{
        const items = lineConfiguration.getAllStoreItems();
        var newStations = []
        newStations = lineConfiguration.getStations(items,line, newStations);
        newStations = newStations.filter(station => station)

        newStations = [...new Set(newStations)];
        newStations = newStations.sort();
        newStations = newStations.map((station) => {
            return {label:station, value:station}
        })

        return newStations;
    },

    /**
     * get all devices created in the UI
     * change this to auto parse
     * @param {*} station 
     * @returns 
     */
    getDeviceOptions:(line, station)=>{
        const items = lineConfiguration.getAllStoreItems();
        var newDevices = []
        newDevices = lineConfiguration.getDevices(items, newDevices,line, station);
        newDevices = newDevices.filter(device => device);
        newDevices = [...new Set(newDevices)];
        newDevices = newDevices.sort();
        newDevices = newDevices.map((device) => {
            return {label:device, value:device}
        })
        return newDevices;
    },

    getDevices:(array, devices, line, station) => {
        array.map((item) => {
            const foundDevices = item.getDevices(line, station);
            if(foundDevices.length > 0){
                devices.push(...foundDevices); 
            }
        })
        return devices;
    },
    getDeviceByNameGlobal:(name, location, line)=>{
        var items = lineConfiguration.getAllStoreItems();
        for(let i=0;i<items.length;i++){
            var foundItem = items[i].getDeviceByName(name, location, line);
            if(foundItem) return foundItem;
        }
    },
    getAllStoreItems:()=>{
        const pdps = pdpStore.getState().pdps;
        const xpdps= xpdpStore.getState().xpdps;
        const mcps = mcpStore.getState().mcps;
        const lpds = lpdStore.getState().lpds;
        const networkSwitches = networkSwitchStore.getState().networkSwitches;
        const hmis = hmiStore.getState().hmis;
        const safetyGates = safetyGateStore.getState().safetyGates;
        const ioModuleGroups = ioModuleStore.getState().ioModuleGroups;

        const items = pdps.concat(xpdps, mcps,lpds,networkSwitches,hmis,safetyGates,ioModuleGroups)
        return items;
    },

    setLines:(oldValue, newValue)=>{
        var items = lineConfiguration.getAllStoreItems();
        items.forEach(item => {
            item.setLine(oldValue, newValue);
        })
    },
    getDeviceById:(id)=>{
        const items = lineConfiguration.getAllStoreItems();
        for(let i=0;i<items.length;i++){
            var foundItem = items[i].getItemById(id);
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
    },

    getMcpPortOptions:()=>{
        const mcps = mcpStore.getState().mcps;
        var ports = [];
        mcps.forEach((mcp) => {
            const mcpPorts = mcp.getPortDevices();
            ports.push(...mcpPorts);
        });

        var portOptions = [];
        for(let i=0;i<2;i++){
            const port = ports[i];
            portOptions.push({label:port, value:port})
        }
        

        return portOptions;
    },

}
const lineStore = create((set) => ({
    lines:[],
    stations:[],
    plcs:[],

    getLineOptions:()=>{
        const items = lineConfiguration.getAllStoreItems();
        const line = projectStore.getState().line;
        var newLines = [line,]
        newLines = lineConfiguration.getLines(items, newLines);
        newLines = [...new Set(newLines)];  
        newLines = newLines.sort();
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