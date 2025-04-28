import { projectStore } from '../../projectStore';
import { v4 as uuidv4 } from 'uuid';
import { lineConfiguration } from '../../lineStore';
import { lpdConfiguration, lpdStore } from '../../lpdStore';

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
          setValue: function(indexObject, key, value){
            lpdStore.getState().setLpdValue(this, key, value);
          },
          getMFG: function(){
            if(this.psu_selected){
              return this.psu_selected.split(':')[0];
            } else {
              return '';
            }
            
          },
          getPartNumber: function(){
            /* if(this.psu_selected){
              console.log(this.psu_selected);
              return this.psu_selected.split(':')[1].trim();
            } else {
              return '';
            } */
            return "";
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
            return lpdConfiguration.getItemById(this, id);
          },
          getNodeData: function(){
            return [
              this.psu_selected,
            ]
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
}