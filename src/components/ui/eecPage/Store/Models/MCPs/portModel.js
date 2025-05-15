import { v4 as uuidv4 } from 'uuid';
import { mcpStore, } from '../../mcpStore';
import { projectStore } from '../../projectStore';

export const portModel = {
    create: (parent) => {
    return {
        line:parent?.line,
        targetLocation: "",
        targetDT: "",
        targetPort: "",
        targetCableLength: "NULL",
        deviceTypeSelection: "SPARE",
        UI:{
        expanded:false,
        },
        data:{
        parent:parent,
        type:'lethPort',
        ethernetTarget:'',
        id:uuidv4(),
        },
        getIndexObject: function(){
            const mcpIndex = this.data.parent.getIndex();
            const portIndex = this.getIndex();
            return {
                mcpIndex:mcpIndex,
                portIndex:portIndex,
            }
        },
        setValue: function(indexObject, key, value, isUI, isData){
            mcpStore.getState().setPortValue(indexObject, key, value, isUI, isData);
        },
        setDataValue: function(key, value){
            const indexObject = this.getIndexObject();  
            this.setValue(indexObject, key, value,false, true);
        },
        getIndex: function(){
        return this.data.parent.ports.findIndex(port => port.data.id === this.data.id)
        },
        getDeviceByName:function(name, location, line){
        // if(this.line != line) return;
        // if(this.targetLocation != location) return;
        // if(this.targetDT != name) return;
        // return this;
        },
        getNodeData: function(){
        return [
        ]
        },
        getStations: function(){
        return [this.targetLocation,]
        },
        getDevices: function(station){
        if(this.targetLocation  === station){
            return [this.targetDT,]
        }
        return []
        },
        getSourceLine:function(){
        return this.data.parent.line;
        },
        getSourceLocation:function(){
            return this.data.parent.location;
        },
        getSourceDeviceTag:function(){
            return this.data.parent.deviceTag;
        },
        setLine:function(line, newLine){
            if(line === this.line){
                const indexObject = this.getIndexObject();
                this.setValue(indexObject, "line", newLine);
            }
        },
        }
      },
    
}