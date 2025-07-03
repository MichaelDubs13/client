import { projectStore } from '../../projectStore';
import { v4 as uuidv4 } from 'uuid';
import { formatToTwoDigits, isString, recreateArrayElement, recreateBranchCircuit, recreateObject } from '../../util';
import { lineConfiguration } from '../../lineStore';
import { pdpConfiguration } from "../../pdpStore";
import { pdpStore } from "../../pdpStore";
import pdpParser from '../../../Excel/pdpParser';
import { pdpBranchCircuitModel } from './pdpBranchCircuitModel';
import { hotPowerBranchCircuitModel } from './hotPowerBranchCircuitModel';

/**
 * creates a new pdp object with default values, all default values should be specified here
 * @returns new pdp with default values
 */
export const pdpModel = {
    create:(index, name) => { 
        const line = projectStore.getState().line;
        const location = name ? name : `PDP${formatToTwoDigits(1+index)}` 
        const pdp = {
          deviceTag:location, 
          amp:"400A", 
          FLA:0,
          line:line, 
          location:location, 
          enclosureSize:"1000x1800x500(WHD)",
          numberOfBusBar:0,
          branchCircuit:pdpModel.initializeBranchCircuits(),
          spare10A:0,
          spare20A:0,
          spare30A:0,
          spare40A:0,
          spare60A:0,
          spare70A:0,
          spare100A:0,
          spare250A:0,
          Opt_SurgeProtectionDevice:false,
          PwrMonitorEnable:false,
          Opt_HotPwrEnable:false,
          hotPowerPanelLocation:"",
          hotPowerDrops:[],
          UI:{
            expanded:false,
            icon:"/panel.png",
          },
          data:{
            type:'pdp',
            id:uuidv4(),
          },
          getSpaceUsed: function() {
            var total = 0;
            Object.keys(this.branchCircuit).forEach(key => {
              const spaceUsed = this.branchCircuit[key].length * pdpBranchCircuitModel.getSpaceUsed(key);
              total = total + spaceUsed;
            })

            if(this.Opt_HotPwrEnable) total = total + 45;
            if(this.Opt_SurgeProtectionDevice) total = total + 55;
            if(this.PwrMonitorEnable) total = total + 90;

            return total;
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
            pdpStore.getState().setPdpValue(indexObject, key, value, isUI, isData);
          },
          getCB: function(location, cb_dt){
              if(this.location === location){
                const cb = pdpConfiguration.getCB(this.branchCircuit, cb_dt);
                return cb;
              }
              return null;
          },
          getIndex: function(){
            const pdps = pdpStore.getState().pdps;
            return pdps.findIndex(pdp => pdp.data.id === this.data.id)
          },
          getItemById: function(id){
            return pdpConfiguration.getItemById(this, id);
          },
          getDeviceByName:function(name, location, line){
            if(this.line != line) return;
            if(this.location === location){
              var keys = Object.keys(this.branchCircuit);
              for(let i=0;i<keys.length;i++){
                const key = keys[i]
                for(let j=0;j<this.branchCircuit[key].length;j++){
                  var foundDevice = this.branchCircuit[key][j].getDeviceByName(name, location, line);
                  if(foundDevice) return foundDevice;
                }
              };
            }
            
            for(let i=0;i<this.hotPowerDrops.length;i++){
              if(this.hotPowerPanelLocation != location) continue;
              if(this.hotPowerDrops[i].deviceDT === name){
                return this.hotPowerDrops[i];
              }
            }
          },
          getNodeData: function(){
            return [
              this.location,
              this.amp,
              this.FLA,
              this.enclosureSize,
            ]
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
            this.hotPowerDrops.forEach(drop => {
              drop.setLine(line, newLine);
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
              stations = [...stations, this.location]
            }

            if(this.line === line && this.Opt_HotPwrEnable){
              stations = [...stations, this.hotPowerPanelLocation]
            }
            stations = lineConfiguration.getStations(this.hotPowerDrops, line, stations);

            return stations;
          },
          getDevices: function(line, station){
            var devices = []
            Object.keys(this.branchCircuit).forEach(key => {
              devices = lineConfiguration.getDevices(this.branchCircuit[key], devices, line, station);
            })
            devices = lineConfiguration.getDevices(this.hotPowerDrops, devices, line, station);

            if(this.Opt_HotPwrEnable && this.line === line && this.hotPowerPanelLocation === station){
              devices = [...devices, "DS01"]
            }

            return devices;
          },
          getCBs:function(location){
            var cbs = []
            if(this.location === location){
              Object.keys(this.branchCircuit).forEach(key => {
                this.branchCircuit[key].forEach(drop => {
                      if(drop.deviceDT){
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
            this.hotPowerDrops.forEach(drop => {
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
          setHotPowerBranchCircuit:function(){
            pdpStore.getState().setHotPowerBranchCircuit(this);
          }
        }
    
        return pdp;
    },
    initializeBranchCircuits: () => {
      const branchCircuit = {
        "10A":[],
        "20A":[],
        "30A":[],
        "40A":[],
        "60A":[],
        "70A":[],
        "100A":[],
        "250A":[],
      }

      return branchCircuit;
    },
    /**
     * This function is intended to do the final clean ups and data manipulation and run right before data is send to Model class for IMX generation, 
     * @param {Array} pdps pdp class generated by excel/UI forms
     * @returns finalized pdps objects for model class
     */
    generateData: (pdps) => {
      pdps.forEach(pdp => {
        const numberOfBusBar = pdpParser.getNumberOfBusBar(pdp.enclosureSize);
        pdp.numberOfBusBar = numberOfBusBar;
        if(isString(pdp.FLA)){
            pdp.FLA = pdp.FLA.toLowerCase().endsWith("a") ? pdp.FLA : `${pdp.FLA}A`;
        }
      });
      return pdps;
    },
    merge: (state, currentState) => { 
      const pdps = pdpModel.recreate(state.pdps);
      state.pdps = pdps;
      Object.assign(currentState, state)
      return currentState
    },
    recreate:(pdps) =>{
      const newPdps = pdps.filter(pdp => pdp !== null).map(pdp => {
        var newPdp = recreateObject(pdp, pdpModel.create)
        Object.keys(pdp.branchCircuit).forEach(key => { 
            var branchCircuit = recreateBranchCircuit(newPdp,key, pdp.branchCircuit[key], pdpBranchCircuitModel.create);
            newPdp.branchCircuit[key] = branchCircuit;
        });
        var hotPowerDrops = recreateArrayElement(newPdp, pdp.hotPowerDrops, hotPowerBranchCircuitModel.create)
        newPdp.hotPowerDrops = hotPowerDrops;
        return newPdp;
      })
      return newPdps;
    }
}
