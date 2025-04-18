import {create} from "zustand";
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
    }    

}
const lineStore = create((set) => ({
    lines:[],
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
            return {lines: [...state.lines, newLines]};
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
            
            return {lines: [...state.lines, newLines]};
        })
    },
}))

export {
    lineStore,
    lineConfiguration,
}