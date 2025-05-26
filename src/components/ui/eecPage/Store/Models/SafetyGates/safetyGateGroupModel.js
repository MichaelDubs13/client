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
        setValue: function(indexObject, key, value, isUI, isData){
          safetyGateStore.getState().setSafetyGateValue(indexObject, key, value, isUI, isData);
        },
        setDataValue: function(key, value){
          const indexObject = this.getIndexObject();  
           this.setValue(indexObject, key, value,false, true);
         },
        getFullName: function() {
          return `++${this.line}+${this.location}`;
        },
        getIndex: function(){
          const safetyGates = safetyGateStore.getState().safetyGates;
          return safetyGates.findIndex(safetyGate => safetyGate.data.id === this.data.id)
        },
        getItemById: function(id){
          return getItemById(this.safetyGateSwitches, id);
        },
        getDeviceByName:function(name, location, line){
          for(let i=0;i<this.safetyGateSwitches.length;i++){
              var foundItem = this.safetyGateSwitches[i].getDeviceByName(name, location, line);
              if(foundItem) return foundItem;
          }
          return;
        },
        getNodeData: function(){
          return [
            this.location,
          ]
        },
        setLine:function(line, newLine){
          if(line === this.line){
            const indexObject = this.getIndexObject();
            this.setValue(indexObject, "line", newLine);
          }
          this.safetyGateSwitches.forEach(gate => {
            gate.setLine(line, newLine)
          })
        },
        getStations: function(line){
          var stations = []
          stations = lineConfiguration.getStations(this.safetyGateSwitches,line, stations);

          if(this.line === line)stations = [...stations, this.location]
          
          return stations;
        },
        getDevices: function(line,station){
          var devices = []
          devices = lineConfiguration.getDevices(this.safetyGateSwitches, devices, line, station);
          return devices;
        },
        getPowerSource: function(location, device, port){
          for(let i=0;i<this.safetyGateSwitches.length;i++){
            const drop = this.safetyGateSwitches[i].find(item => item.powerTargetLocation === location && item.powerTargetDT === device);
            if(drop) return drop;
          }
          return null;
        },
        getLines:function(){
          var lines = [this.line,]
          this.safetyGateSwitches.forEach(gate => {
            lines.push(...gate.getLines());
          })

            return lines;
        },
      }
     
      return safetyGate;
    },
    generateData: (safetyGateGroups) => {
      return safetyGateGroups;
    },
    merge: (state, currentState) => { 
      const gates = safetyGateGroupModel.recreate(state.safetyGates);
      state.safetyGates = gates;
      Object.assign(currentState, state)
      return currentState
    },
    recreate:(safetyGates) =>{
      const gates = safetyGates.map(gate => {
          var newGate = recreateObject(gate, safetyGateGroupModel.create)
          var safetyGateSwitches = recreateArrayElement(newGate, gate.safetyGateSwitches, safetyGateSwitchModel.create)
          newGate.safetyGateSwitches = safetyGateSwitches;
          return newGate;
      })
      return gates;
    }
    
}