import { projectStore } from '../../projectStore';
import { v4 as uuidv4 } from 'uuid';
import { lineConfiguration } from '../../lineStore';
import { lpdConfiguration, lpdStore } from '../../lpdStore';
import { getItemById, recreateArrayElement, recreateObject } from '../../util';
import { powerDropModel } from './powerDropModel';
import { psuModel } from './psuModel';

export const lpdModel = {
    create: () => { 
        return {
          line:projectStore.getState().line,
          powerSourceDT:"",
          panel:"",
          location:"",
          supplyVoltage:"",
          psu_selected:"", //only used for UI
          psus:[],
          UI:{
            expanded:false,
            icon:"/psuGroup.png",
          },
          data:{
            type:'lpd',
            id:uuidv4(),
          },
          getIndexObject: function(){
            const lpdIndex = this.getIndex();
            return {lpdIndex:lpdIndex}
          },
          setValue: function(indexObject, key, value, isUI, isData){
            lpdStore.getState().setLpdValue(indexObject, key, value, isUI, isData);
          },
          setDataValue: function(key, value){
            const indexObject = this.getIndexObject();  
             this.setValue(indexObject, key, value,false, true);
           },
          getMFG: function(){
            if(this.psu_selected){
              return this.psu_selected.split(':')[0];
            } else {
              return '';
            }
            
          },
          getPartNumber: function(){
            if(this.psu_selected){
              var psuElements = this.psu_selected.split(':')
              if(psuElements.length == 2){
                return psuElements[1];
              }else{
                return '';
              }
            } else {
              return '';
            }
          },
          getPowerSource: function(location, device, port){
            for(let i=0;i<this.psus.length;i++){
              const drop = this.psus[i].getPowerSource(location, device, port);
              if(drop) return drop;
            }
            return null;
          },
          getIndex: function(){
            const lpds = lpdStore.getState().lpds;
            return lpds.findIndex(lpd => lpd.data.id === this.data.id)
          },
          getItemById: function(id){
            return getItemById(this.psus, id);
          },
          getDeviceByName:function(name, location, line){
            for(let i=0;i<this.psus.length;i++){
                var foundItem = this.psus[i].getDeviceByName(name, location, line);
                if(foundItem) return foundItem;
            }
            return;
          },
          getNodeData: function(){
            return [
              this.psu_selected,
            ]
          },
          setLine:function(line, newLine){
            if(line === this.line){
              const indexObject = this.getIndexObject();
              this.setValue(indexObject, "line", newLine);
            }
            this.psus.forEach(psu => {
              psu.setLine(line, newLine)
            })
          },
          getStations: function(){
            var stations = []
            stations = lineConfiguration.getStations(this.psus, stations);
            stations = [...stations, this.location]
            return stations;
          },
          getDevices: function(station){
            var devices = []
            devices = lineConfiguration.getDevices(this.psus, devices, station);
            devices = [...devices, ]
            return devices;
          }
        }
      },
      merge: (state, currentState) => { 
          const lpds = lpdModel.recreate(state.lpds);
          state.lpds = lpds;
          Object.assign(currentState, state)
          return currentState
      },
      recreate:(lpds)=>{
        const newLpds = lpds.map(lpd => {
              var newLpd = recreateObject(lpd, lpdModel.create)
              var newPsus = recreateArrayElement(newLpd, lpd.psus, psuModel.create)
              newPsus=newPsus.map(newPsu => {
                var drops = recreateArrayElement(newPsu, newPsu.drops, powerDropModel.create)
                newPsu.drops = drops;
                return newPsu;
              });
            newLpd.psus = newPsus;
            return newLpd;
        })
        return newLpds;
      } 
}