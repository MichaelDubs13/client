import { projectStore } from '../../projectStore';
import { v4 as uuidv4 } from 'uuid';
import { lineConfiguration } from '../../lineStore';
import { lpdStore } from '../../lpdStore';
import { getItemById, recreateArrayElement, recreateObject } from '../../util';
import { powerDropModel } from './powerDropModel';
import { psuModel } from './psuModel';

export const lpdModel = {
    create: () => { 
        return {
          line:projectStore.getState().line,
          location:"",
          powerSourceLine:projectStore.getState().line,
          powerSourceLocation:"",
          powerSourceDT:"",
          supplyVoltage:lineConfiguration.getDefaultLpdVoltage(),
          psu_selected:lineConfiguration.getDefaultLpdPsu(), //only used for UI
          psus:[],
          UI:{
            expanded:false,
            icon:"/psuGroup.png",
          },
          data:{
            type:'lpd',
            id:uuidv4(),
          },
          setExpanded: function(value){
            var indexObject = this.getIndexObject();
            this.setValue(indexObject, "expanded", value, true, false);
          },
          getFullName: function() {
            return `++${this.powerSourceLine}+${this.powerSourceLocation}-${this.powerSourceDT}`;
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
              return this.psu_selected.split(':')[0].trim();
            } else {
              return '';
            }
            
          },
          getPartNumber: function(){
            if(this.psu_selected){
              var psuElements = this.psu_selected.split(':')
              if(psuElements.length == 2){
                return psuElements[1].trim();
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
          getStations: function(line){
            var stations = []
            stations = lineConfiguration.getStations(this.psus, line, stations);
            if(this.line === line)stations = [...stations,this.location]
            if(this.powerSourceLine === line)stations = [...stations,this.powerSourceLocation]
            
            return stations;
          },
          getDevices: function(line, station){
            var devices = []
            devices = lineConfiguration.getDevices(this.psus, devices,line,  station);
            if(station === this.powerSourceLocation && this.powerSourceLine === line){
              devices = [...devices, this.powerSourceDT];
            }
            return devices;
          },
           getLines:function(){
            var lines = [this.line,this.powerSourceLine,]
            this.psus.forEach(psu => {
              if(!lines.includes(psu.line)){
                  lines.push(psu.line);
              }
              psu.drops.forEach(drop => {
                if(!lines.includes(drop.line)){
                  lines.push(drop.line);
              }
              })
            })

            return lines;
          },
          getSourceLine:function(){
            return this.line
          },
          getSourceLocation:function(){
            return this.location;
          },
          getSourceDeviceTag:function(){
            return "";
          },
        }
      },
      generateData: (lpds) => {
        for(let i=0;i<lpds.length;i++){
          const lpd = lpds[i];
          for(let j=0;j<lpd.psus.length;j++){
            const psu = lpd.psus[j];
            psu.MFG = lpd.getMFG();
            psu.partNumber = lpd.getPartNumber();
          }
        }
        return lpds
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