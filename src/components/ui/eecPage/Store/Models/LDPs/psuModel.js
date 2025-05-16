import { v4 as uuidv4 } from 'uuid';
import { lineConfiguration } from '../../lineStore';
import { formatToTwoDigits, getItemById } from '../../util';
import {  lpdStore } from '../../lpdStore';
import { projectStore } from '../../projectStore';

export const psuModel = {
    create: (parent, index) => {
        const psu = {
          line:parent?.line,
          location:"",
          deviceTag:index > -1 ? `PSU${formatToTwoDigits(index+1)}`:'',
          supplyVoltage:parent?.supplyVoltage,
          MFG:parent?.getMFG(),
          partNumber:parent?.getPartNumber(),
          lineside120AFLA:"",
          branchBreaker:"",
          branchOrder:"",
          fla:"",
          inputPowerCord:"",
          inputPowerTee:"",
          psuLocationDt:"",
          powerFedFrom:"",
          cable_length:0,
          xpdpCBIndex:0,
          drops:[],
          device:{},
          UI:{
            expanded:false,
            icon:"/psu.png",
          },
          data:{
            type:'psu',
            id:uuidv4(),
            parent:parent,
          },
          getDescription: function(){
            return 'Power Supply';
          },
          getFLA:function(){
            return 0;
          },
          getIndexObject: function(){
            const lpdIndex = this.data.parent.getIndex();
            const psuIndex = this.getIndex();
            return {
              lpdIndex:lpdIndex,
              psuIndex:psuIndex,
            }
          },
          setValue: function(indexObject, key, value, isUI, isData){
            lpdStore.getState().setPsuValue(indexObject, key, value, isUI, isData);
          },
          setDataValue: function(key, value){
            const indexObject = this.getIndexObject();  
             this.setValue(indexObject, key, value,false, true);
           },
          getFullName: function() {
            return lineConfiguration.getDeviceFullName(this.location, this.deviceTag);
          },
          getPowerSource: function(location, device){
            var drop = this.drops.find(drop => drop.targetLocation === location && drop.targetDT === device);
            return drop;
          },
          getIndex: function(){
            return this.data.parent.psus.findIndex(psu => psu.data.id === this.data.id)
          },
          getItemById:function(id){
            return getItemById(this.drops, id);
          },
          getDeviceByName:function(name, location, line){
            if(this.line != line) return;
            if(this.location != location) return;
            if(this.deviceTag != name) return;
            return this;
          },
          getNodeData: function(){
            return [
              this.location,
              this.deviceTag,
              this.MFG,
            ]
          },
          setLine:function(line, newLine){
            if(line === this.line){
              const indexObject = this.getIndexObject();
              this.setValue(indexObject, "line", newLine);
            }
            this.drops.forEach(drop => {
                drop.setLine(line, newLine)
              })
          },
          getStations: function(line){
            var stations = []
            stations = lineConfiguration.getStations(this.drops,line, stations);
            if(this.line === line)stations = [...stations,this.location]
            return stations;
          },
          getDevices: function(line, station){
            var devices = []
            devices = lineConfiguration.getDevices(this.drops, devices, line, station);
            if(this.location === station && this.line === line){
              devices = [...devices, this.deviceTag]
            }
            return devices;
          },
          setPowerSource:function(line, location, name){
            const indexObject = this.getIndexObject();
            lpdStore.getState().setPsuValue(indexObject, "powerSourceLine", line);
            lpdStore.getState().setPsuValue(indexObject, "powerSourceLocation", location);
            lpdStore.getState().setPsuValue(indexObject, "powerSourceDT", name);
          },
          setNetworkSource:function(line, location, name){
            const indexObject = this.getIndexObject();
            lpdStore.getState().setPsuValue(indexObject, "ethernetSourceLine", line);
            lpdStore.getState().setPsuValue(indexObject, "ethernetSourceLocation", location);
            lpdStore.getState().setPsuValue(indexObject, "ethernetSourceDT", name);
          },
          setPowerTarget:function(line, location, name){
            const indexObject = this.getIndexObject();
            lpdStore.getState().setPsuValue(indexObject, "powerTargetLine", line);
            lpdStore.getState().setPsuValue(indexObject, "powerTargetLocation", location);
            lpdStore.getState().setPsuValue(indexObject, "powerTargetDT", name);
          },
          setNetworkTarget:function(line, location, name){
            const indexObject = this.getIndexObject();
            lpdStore.getState().setPsuValue(indexObject, "ethernetTargetLine", line);
            lpdStore.getState().setPsuValue(indexObject, "ethernetTargetLocation", location);
            lpdStore.getState().setPsuValue(indexObject, "ethernetTargetDT", name);
          },
          getSourceLine:function(){
            return this.line
          },
          getSourceLocation:function(){
            return this.location;
          },
          getSourceDeviceTag:function(){
            return this.deviceTag;
          },
          
        }
        return psu;
      },
}