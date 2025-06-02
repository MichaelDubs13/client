import { v4 as uuidv4 } from 'uuid';
import { hmiStore } from '../../hmiStore';


export const extensionUnitPositionModel = {
   // change this to the HMI extension unit positions
   create: (parent) => {
    return {
      // change this to the values for the network switch ports
      buttonSelection: "SPARE", // EEC variable name: frmUI_ButtonSelection
      UI:{
        expanded:false,
        icon: "/position.png"
      },
      data:{
        type:'hmiPosition',
        id:uuidv4(),
        parent:parent,
      },
      setExpanded: function(value){
        var indexObject = this.getIndexObject();
        this.setValue(indexObject, "expanded", value, true, false);
      },
      getIndexObject: function(){
        const hmiIndex = this.data.parent.getIndex();
        const extensionUnitPositionIndex = this.getIndex();
        return {hmiIndex:hmiIndex, extensionUnitPositionIndex:extensionUnitPositionIndex}
      },
      getIndex: function(){
        const index = this.data.parent.extensionUnitPositions.findIndex(position => position.data.id === this.data.id)
        return index;
      },
      setValue: function(indexObject, key, value, isUI, isData){
        hmiStore.getState().setExtensionUnitPositionValue(indexObject, key, value, isUI, isData);
      },
      setDataValue: function(key, value){
        const indexObject = this.getIndexObject();  
        hmiStore.getState().setExtensionUnitPositionValue(indexObject, key, value,false, true);
      },
    }
  },
     
}