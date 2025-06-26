import { projectStore } from '../../projectStore';
import { v4 as uuidv4 } from 'uuid';
import { formatToTwoDigits, recreateArrayElement, recreateBranchCircuit, recreateObject } from '../../util';
import { lineConfiguration } from '../../lineStore';
import { pdpConfiguration } from "../../pdpStore";
import { xpdpStore } from '../../xpdpStore';
import { branchCircuitModel } from './branchCircuitModel';


export const xpdpModel = {
  create: (index, name) => { 
    const line = projectStore.getState().line;
    const location = name ? name : `XPDP${formatToTwoDigits(1+index)}` 
    return {
      numberOfPwrDrop8A:"",
      numberOfPwrDrop15A:"",
      numberOfPwrDrop20A1p:"",
      numberOfPwrDrop20A3p:"",
      amp:"",
      xf_cable_length:"",
      fla_demand:"",
      fed_from:"",
      line:line,
      location:location,
      notes:"",
      deviceTag:"",
      spare8A:"",
      spare15A:"",
      spare20A1p:"",
      spare20A3p:"",
      xf_size:"30kVA Transformer",
      xfmrLocation:"",
      branchCircuit:xpdpModel.initializeBranchCircuits(),
      UI:{
        expanded:false,
        icon:"/panel.png",
      },
      data:{
        type:'xpdp',
        id:uuidv4(),
      },
      setExpanded: function(value){
        var indexObject = this.getIndexObject();
        this.setValue(indexObject, "expanded", value, true, false);
      },
      getFullName: function (){
        return `++${this.line}+${this.location}`;
      },
      getIndexObject: function(){
          const pdpIndex = this.getIndex();
          return {
            pdpIndex:pdpIndex,
          }
      },
      setValue: function(indexObject, key, value, isUI, isData){
          xpdpStore.getState().setXPdpValue(indexObject, key, value, isUI, isData);
      },
      getCB: function(location, cb_dt){
        if(this.location === location){
          return pdpConfiguration.getCB(this.branchCircuit, cb_dt);
        }
        return null;
      },
      getIndex: function(){
        const xpdps = xpdpStore.getState().xpdps;
        return xpdps.findIndex(pdp => pdp.data.id === this.data.id)
      },
      getItemById: function(id){
        return pdpConfiguration.getItemById(this, id);
      },
      getDeviceByName:function(name, location, line){
        if(this.line != line) return;
        if(this.location != location) return;
        if(name == null) return this;
        var keys = Object.keys(this.branchCircuit);
        for(let i=0;i<keys.length;i++){
          const key = keys[i]
          for(let j=0;j<this.branchCircuit[key].length;j++){
            var foundDevice = this.branchCircuit[key][j].getDeviceByName(name, location, line);
            if(foundDevice) return foundDevice;
          }
        }
      },
      getNodeData: function(){
        return [
          this.location,
          this.amp,
        ]
      },
      getSourceLine:function(){
        return this.line
        },
      getSourceLocation:function(){
        return this.location;
      },
      getSourceDeviceTag:function(){
        return this.location;
      },
      setLine:function(line, newLine){
        if(line === this.line){
          const indexObject = this.getIndexObject();
          this.setValue(indexObject, "line", newLine);
        }
        Object.keys(this.branchCircuit).forEach(key => {
            this.branchCircuit[key].forEach(cb => {
              cb.setLine(line, newLine);
            })
          })
      },
      getNumberOfCBs: function(){
        var cbCount = 0;
        Object.keys(this.branchCircuit).forEach(key => {
          cbCount = this.branchCircuit[key].length + cbCount;
        })
        return cbCount;
      },
      getStations: function(line){
        var stations = []
        Object.keys(this.branchCircuit).forEach(key => {
          stations = lineConfiguration.getStations(this.branchCircuit[key], line, stations);
        })
        if(this.line === line){
          stations = [...stations, this.xfmrLocation, this.location]
        }
        return stations;
      },
      getDevices: function(line, station){
        var devices = []
        Object.keys(this.branchCircuit).forEach(key => {
          devices = lineConfiguration.getDevices(this.branchCircuit[key], devices, line, station);
        })
        return devices;
      },
      getCBs:function(location){
        var cbs = []
        if(this.location === location){
          Object.keys(this.branchCircuit).forEach(key => {
            this.branchCircuit[key].forEach(drop => {
                  if(drop.deviceDTCB_DT){
                      cbs.push(drop.deviceDT);
                  }
              })
          })
        }
        return cbs;
      },
      getLines:function(){
        var lines = [this.line,]
        Object.keys(this.branchCircuit).forEach(key => {
            this.branchCircuit[key].forEach(drop => {
                  if(!lines.includes(drop.line)){
                      lines.push(drop.line);
                  }
            })
        })
        return lines;
      },
      setPowerSource:function(line, location, deviceTag){

      },
      setNetworkSource:function(line, location, name){

      },
      setPowerTarget:function(line, location, name){

      },
      setNetworkTarget:function(line, location, name){
      },
    }  
  },
  initializeBranchCircuits: () => {
    const branchCircuit = {
      "8A 1ph": [],
      "15A 1ph": [],
      "20A 1ph": [],
      "20A 3ph": [],
     }

     return branchCircuit;
  },
  generateData: (xpdps) => {
    xpdps.forEach(pdp => {
      var branchCircuit3Ph = pdp.branchCircuit["20A 3ph"];
      if(branchCircuit3Ph.length > 2){
        branchCircuit3Ph = branchCircuit3Ph.slice(0, 1);
        pdp.branchCircuit["20A 3ph"] = branchCircuit3Ph;
      }
    });
   return xpdps;
  },
  merge: (state, currentState) => { 
      const pdps = xpdpModel.recreate(state.xpdps);
      state.xpdps = pdps;
      Object.assign(currentState, state)
      return currentState
  },
  recreate: (xpdps)=>{
      const newPdps = xpdps.filter(item => item !== null).map(pdp => {
          var newPdp = recreateObject(pdp, xpdpModel.create)
          Object.keys(pdp.branchCircuit).forEach(key => { 
              var branchCircuit = recreateBranchCircuit(newPdp,key, pdp.branchCircuit[key], branchCircuitModel.create);
              newPdp.branchCircuit[key] = branchCircuit;
          });

          return newPdp;
      })
      return newPdps;
  }
}