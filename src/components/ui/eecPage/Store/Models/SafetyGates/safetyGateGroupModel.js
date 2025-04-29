import { projectStore } from '../../projectStore';
import { v4 as uuidv4 } from 'uuid';
import { lineConfiguration } from '../../lineStore';
import { safetyGateStore, safetyGateConfiguration } from '../../safetyGateStore';
import { getItemById, recreateArrayElement, recreateObject } from '../../util';
import { safetyGateSwitchModel } from './safetyGateSwitchModel';

export const safetyGateGroupModel = {
    create: () => { 
      var safetyGate = {
         // this is where the variables for the safety gate switch instances are defined going to the data model
        // below is the first variable example
        line: projectStore.getState().line, // EEC variable name: Switch_Line
        location:"", // EEC variable name: Switch_Location
        safetyGateSwitches:[],
        UI:{
          expanded:false,
          icon:"/deviceGroup.png"
        },
        data:{
          type:'safetyGate',
          id:uuidv4(),
        },
        getIndexObject: function(){
          const safetyGateIndex = this.getIndex();
          return {
            safetyGateIndex:safetyGateIndex,
          }
        },
        setValue: function(indexObject, key, value){
          safetyGateStore.getState().setSafetyGateValue(indexObject, key, value);
        },
        getFullName: function() {
          return lineConfiguration.getDeviceFullName(this.location);
        },
        getIndex: function(){
          const safetyGates = safetyGateStore.getState().safetyGates;
          return safetyGates.findIndex(safetyGate => safetyGate.data.id === this.data.id)
        },
        getItemById: function(id){
          return getItemById(this.safetyGateSwitches, id);
        },
        getNodeData: function(){
          return [
            this.location,
          ]
        },
        getStations: function(){
          var stations = []
          stations = lineConfiguration.getStations(this.safetyGateSwitches, stations);
          stations = [...stations, this.location]
          return stations;
        },
        getDevices: function(station){
          var devices = []
          devices = lineConfiguration.getDevices(this.safetyGateSwitches, devices, station);
          return devices;
        },
        getPowerSource: function(location, device, port){
          for(let i=0;i<this.safetyGateSwitches.length;i++){
            const drop = this.safetyGateSwitches[i].find(item => item.powerTargetLocation === location && item.powerTargetDT === device);
            if(drop) return drop;
          }
          return null;
        },
      }
     
      return safetyGate;
    },

     merge: (state, currentState) => { 
        const gates = state.safetyGates.map(gate => {
            var newGate = recreateObject(gate, safetyGateGroupModel.create)
            var safetyGateSwitches = recreateArrayElement(newGate, gate.safetyGateSwitches, safetyGateSwitchModel.create)
            newGate.safetyGateSwitches = safetyGateSwitches;
            return newGate;
        })
        state.safetyGates = gates;
        Object.assign(currentState, state)
        return currentState
    } 
    
}