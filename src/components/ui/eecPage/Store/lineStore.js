import {create} from "zustand";
import { pdpStore } from "./pdpStore";
import { xpdpStore } from "./xpdpStore";
import { mcpStore } from "./mcpStore";
import { lpdStore } from "./lpdStore";
import { networkSwitchStore } from "./networkSwitchStore";
import { projectStore } from "./projectStore";

const lineConfiguration = {
    createLine: (name) => {
        return {
            name:name,
            locations: [],
        }
    },
    createLocation: (name) => {
        return {
            name:name,
            devices: [],
        }
    },
    createDevice: (name) => {
        return {
            name:name,
        }
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

}
const lineStore = create((set) => ({
    lines:[],
    stations:[],
    addLine:(name)=>{
        set((state) => {
            const newLine = lineConfiguration.createLine(name);
            return {lines: [...state.lines, newLine]};
        })
    },

    addLocation:(name, index)=>{
        set((state) => {
            const newLocation = lineConfiguration.createLocation(name);
            const newLines = {...state.lines}
            newLines[index].locations = [...state.newLines[index].locations, newLocation]
            return {lines: newLines};
        })
    },
    addDevice:(name, index)=>{
        const lineIndex = index.lineIndex
        const locationIndex = index.locationIndex
        set((state) => {
            const newLines = {...state.lines}
            const newLocation = newLines[lineIndex].locations[locationIndex];
            const newDevice = lineConfiguration.createDevice(name);
            newLocation.devices = {...state.newLocation.devices, newDevice}
            
            return {lines: newLines};
        })
    },

    getLineOptions:()=>{
        const pdps = pdpStore.getState().pdps;
        const xpdps= xpdpStore.getState().xpdps;
        const mcps = mcpStore.getState().mcps;
        const lpds = lpdStore.getState().lpds;
        const networkSwitches = networkSwitchStore.getState().networkSwitches;
        const line = projectStore.getState().line;

        var newLines = [line,]
        newLines = lineConfiguration.getLines(pdps, newLines);
        newLines = lineConfiguration.getLines(xpdps, newLines);
        newLines = lineConfiguration.getLines(mcps, newLines);
        newLines = lineConfiguration.getLines(lpds, newLines);
        newLines = lineConfiguration.getLines(networkSwitches, newLines);

        newLines = newLines.map((line) => {
            return {label:line, value:line}
        })
        set((state) => {
            return {lines: newLines};
        })
    },

    getLocationOptions:(line)=>{
        const pdps = pdpStore.getState().pdps;
        const xpdps= xpdpStore.getState().xpdps;
        const mcps = mcpStore.getState().mcps;
        const lpds = lpdStore.getState().lpds;
        const networkSwitches = networkSwitchStore.getState().networkSwitches;
        
        var newLocations = []
        newLocations = lineConfiguration.getLocations(pdps, line, newLocations);
        newLocations = lineConfiguration.getLocations(xpdps, line, newLocations);
        newLocations = lineConfiguration.getLocations(mcps, line, newLocations);
        newLocations = lineConfiguration.getLocations(lpds, line, newLocations);
        newLocations = lineConfiguration.getLocations(networkSwitches, line, newLocations);
        
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

        keys =["power1InLocation", "power2InLocation", "powerInLocation"];
        newStations = lineConfiguration.getStations(networkSwitches, newStations,keys);

        keys =["targetLocation"];
        networkSwitches.forEach(networkSwitch => {
            newStations = lineConfiguration.getStations(networkSwitch.ports, newStations,keys);
        })
        
        newStations = newStations.map((station) => {
            return {label:station, value:station}
        })

        set((state) => {
            return {stations: newStations};
        })

        return newStations;
    },
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

        keys = ["xfmrLocation",];
        newDevices = lineConfiguration.getDevices(xpdps,newDevices,station,keys);

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

        keys = [{station:"power1InLocation", device:"power1InDT"},
            {station:"power2InLocation", device:"power2InDT"},
            {station:"powerInLocation", device:"powerInDT"},
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
    }
}))

export {
    lineStore,
    lineConfiguration,
}