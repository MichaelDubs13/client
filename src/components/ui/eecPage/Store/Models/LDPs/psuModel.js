import { v4 as uuidv4 } from 'uuid';
import { lineConfiguration } from '../../lineStore';
import { formatToTwoDigits, getItemById } from '../../util';
import {  lpdStore } from '../../lpdStore';

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
          getIndexObject: function(){
            const lpdIndex = this.data.parent.getIndex();
            const psuIndex = this.getIndex();
            return {
              lpdIndex:lpdIndex,
              psuIndex:psuIndex,
            }
          },
          setValue: function(indexObject, key, value){
            lpdStore.getState().setPsuValue(indexObject, key, value);
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
          getNodeData: function(){
            return [
              this.location,
              this.deviceTag,
              this.MFG,
            ]
          },
          getStations: function(){
            var stations = []
            stations = lineConfiguration.getStations(this.drops, stations);
            stations = [...stations, this.location]
            return stations;
          },
          getDevices: function(station){
            var devices = []
            devices = lineConfiguration.getDevices(this.drops, devices, station);
            if(this.location === station){
              devices = [...devices, this.deviceTag]
            }
            return devices;
          }
          
        }
        return psu;
      },
}