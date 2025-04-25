import {create} from "zustand";
import { pdpStore } from "./pdpStore";
import { xpdpStore } from "./xpdpStore";
import { mcpStore } from "./mcpStore";
import { lpdStore } from "./lpdStore";
import { networkSwitchStore } from "./networkSwitchStore";
import { hmiStore } from "./hmiStore";
import { safetyGateStore } from "./safetyGateStore";
import { projectStore } from "./projectStore";

const lineOptions = {
    addDeviceOptions:['LETH','HMI',"GS"]
}

const lineConfiguration = {
    networkSwitchIndicator:'LETH',
    hmiIndicator:'HMI',
    gateIndicator:'GS',
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
    getLocations:(array, line, locations) => {
        array.map((item) => {
            if(item.location){
                if(item.line === line){
                    if(!locations.includes(item.location)){
                        locations.push(item.location)
                    }
                }
            }
            
        })
        return locations;
    },   
    getStations:(array, stations, keys) => {
        array.map((item) => {
            keys.forEach(key => {
                if(item[key]){
                    if(!stations.includes(item[key])){
                        stations.push(item[key])
                    }
                } 
            });
        })
        return stations;
    },    
    getDevices:(array, devices, station, keys) => {
        array.map((item) => {
            keys.forEach(key => {
                if(item[key.station] === station)
                {
                    if(item[key.device]){
                        if(!devices.includes(item[key.device])){
                            devices.push(item[key.device])
                        }
                    } 
                }
            });
        })
        return devices;
    },

    getDeviceByName:(name, location, line)=>{
        const networkSwitches = networkSwitchStore.getState().networkSwitches;
        const hmis = hmiStore.getState().hmis;
        const safetyGates = safetyGateStore.getState().safetyGates;

        for(let i=0;i<networkSwitches.length;i++){
            if(networkSwitches[i].line != line) continue;
            if(networkSwitches[i].location != location) continue;
            if(networkSwitches[i].switchDT != name) continue;
            var foundItem = networkSwitches[i]
            if(foundItem) return foundItem;
        }

        for(let i=0;i<hmis.length;i++){
            if(hmis[i].line != line) continue;
            if(hmis[i].location != location) continue;
            if(hmis[i].hmiDT != name) continue;
            var foundItem = hmis[i]
            if(foundItem) return foundItem;
        }

        for(let i=0;i<safetyGates.length;i++){
            if(safetyGates[i].line != line) continue;
            if(safetyGates[i].location != location) continue;
            for(let j=0;j<safetyGates[i].safetyGateSwitches.length;j++){
                if(safetyGates[i].safetyGateSwitches[j].safetyGateDT === name){
                    return safetyGates[i].safetyGateSwitches[j];
                }
            }
        }
    },
    getDeviceById:(id)=>{
        const pdps = pdpStore.getState().pdps;
        const xpdps= xpdpStore.getState().xpdps;
        const mcps = mcpStore.getState().mcps;
        const lpds = lpdStore.getState().lpds;
        const networkSwitches = networkSwitchStore.getState().networkSwitches;

        for(let i=0;i<pdps.length;i++){
            if(pdps[i].data.id === id) return pdps[i];
            var foundItem = pdps[i].getItemById(id);
            if(foundItem) return foundItem;
        }

        for(let i=0;i<xpdps.length;i++){
            if(xpdps[i].data.id === id) return xpdps[i];
            var foundItem = xpdps[i].getItemById(id);
            if(foundItem) return foundItem;
        }

        for(let i=0;i<mcps.length;i++){
            if(mcps[i].data.id === id) return mcps[i];
            var foundItem = mcps[i].getItemById(id);
            if(foundItem) return foundItem;
        }

        for(let i=0;i<lpds.length;i++){
            if(lpds[i].data.id === id) return lpds[i];
            var foundItem = lpds[i].getItemById(id);
            if(foundItem) return foundItem;
        }

        for(let i=0;i<networkSwitches.length;i++){
            if(networkSwitches[i].data.id === id) return networkSwitches[i];
            var foundItem = networkSwitches[i].getItemById(id);
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
        const line = projectStore.getState().line;

        var newLines = [line,]
        newLines = lineConfiguration.getLines(pdps, newLines);
        newLines = lineConfiguration.getLines(xpdps, newLines);
        newLines = lineConfiguration.getLines(mcps, newLines);
        newLines = lineConfiguration.getLines(lpds, newLines);
        newLines = lineConfiguration.getLines(networkSwitches, newLines);
        newLines = lineConfiguration.getLines(hmis, newLines);
        newLines = lineConfiguration.getLines(safetyGates, newLines);

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
        
        var newLocations = []
        newLocations = lineConfiguration.getLocations(pdps, line, newLocations);
        newLocations = lineConfiguration.getLocations(xpdps, line, newLocations);
        newLocations = lineConfiguration.getLocations(mcps, line, newLocations);
        newLocations = lineConfiguration.getLocations(lpds, line, newLocations);
        newLocations = lineConfiguration.getLocations(networkSwitches, line, newLocations);
        newLocations = lineConfiguration.getLocations(hmis, line, newLocations);
        newLocations = lineConfiguration.getLocations(safetyGates, line, newLocations);
        
        newLocations = newLocations.map((location) => {
            return {label:location, value:location}
        })
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
        
        var newStations = []
        var keys = [];
        newStations = lineConfiguration.getStations(pdps, newStations,keys);

        keys=["StrBox_DT"]
        pdps.forEach(pdp => {
            Object.keys(pdp.branchCircuit).forEach(key => {
                newStations = lineConfiguration.getStations(pdp.branchCircuit[key], newStations,keys);
            })
        })

        keys = ["xfmrLocation",];
        newStations = lineConfiguration.getStations(xpdps,newStations,keys);

        keys=["StrBox_DT"]
        xpdps.forEach(pdp => {
            Object.keys(pdp.branchCircuit).forEach(key => {
                newStations = lineConfiguration.getStations(pdp.branchCircuit[key], newStations,keys);
            })
        })

        keys = ["mcpMountingLocation","psu_location"];
        newStations = lineConfiguration.getStations(mcps, newStations,keys);

        keys =["psu_location"];
        lpds.forEach(lpd => {
            newStations = lineConfiguration.getStations(lpd.psus, newStations,keys);
        })

        keys =["power1InLocation", "power2InLocation", "powerInLocation", "location"];
        newStations = lineConfiguration.getStations(networkSwitches, newStations,keys);

        keys =["targetLocation", ];
        networkSwitches.forEach(networkSwitch => {
            newStations = lineConfiguration.getStations(networkSwitch.ports, newStations,keys);
        })

        keys = ["location",];
        newStations = lineConfiguration.getStations(hmis,newStations,keys);

        keys = ["location",];
        newStations = lineConfiguration.getStations(safetyGates,newStations,keys);

        safetyGates.forEach(safetyGate => {
            newStations = lineConfiguration.getStations(safetyGate.safetyGateSwitches, newStations,keys);
        })
        
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
        
        var newDevices = []
        var keys = [];
        newDevices = lineConfiguration.getDevices(pdps, newDevices,station,keys);

        keys=[{station:"StrBox_DT", device:"TargetDevice_DT"}]
        pdps.forEach(pdp => {
            Object.keys(pdp.branchCircuit).forEach(key => {
                newDevices = lineConfiguration.getDevices(pdp.branchCircuit[key], newDevices,station,keys);
            })
        })

        keys=[{station:"StrBox_DT", device:"TargetDevice_DT"}]
        xpdps.forEach(pdp => {
            Object.keys(pdp.branchCircuit).forEach(key => {
                newDevices = lineConfiguration.getDevices(pdp.branchCircuit[key], newDevices,station,keys);
            })
        })

        keys = [{station:"psu_location", device:"psu_location_dt"},];
        newDevices = lineConfiguration.getDevices(mcps, newDevices,station, keys);

        keys =[{station:"psu_location", device:"psu_dt"},];
        lpds.forEach(lpd => {
            newDevices = lineConfiguration.getDevices(lpd.psus, newDevices,station, keys);
        })

        keys=[{station:"location", device:"deviceTag"},]
        lpds.forEach(lpd => {
            lpd.psus.forEach(psu => {
                newDevices = lineConfiguration.getDevices(psu.pwrDrops, newDevices,station, keys);
            })
        })

        keys = [{station:"power1InLocation", device:"power1InDT"},
            {station:"power2InLocation", device:"power2InDT"},
            {station:"powerInLocation", device:"powerInDT"},
            {station:"location", device:"switchDT"},
        ]
        newDevices = lineConfiguration.getDevices(networkSwitches, newDevices, station, keys);

        keys = [{station:"targetLocation", device:"targetDT"}]
        networkSwitches.forEach(networkSwitch => {
            newDevices = lineConfiguration.getDevices(networkSwitch.ports, newDevices, station, keys);
        })
        
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
            if(pdp.location === location){
                Object.keys(pdp.branchCircuit).forEach(key => {
                    pdp.branchCircuit[key].forEach(drop => {
                        if(drop.UI.CB_DT){
                            cbs.push(drop.UI.CB_DT);
                        }
                    })
                })
            }
        });
        xpdps.forEach(pdp => {
            if(pdp.location === location){
                Object.keys(pdp.branchCircuit).forEach(key => {
                    pdp.branchCircuit[key].forEach(drop => {
                        if(drop.UI.CB_DT){
                            cbs.push(drop.UI.CB_DT);
                        }
                    })
                })
            }
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