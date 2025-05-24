import "../../Eec.css";
import DropdownItem from '../Util/DropdownItem';
import InputTextItem from '../Util/InputTextItem';
import DeviceSelection from "../Common/DeviceSelection";
import { useEffect } from "react";
import { lpdOptions } from "../../Store/lpdStore";
  
  const LpdPsuDropItem = ({ 
    lpdIndex,
    psuIndex,
    dropIndex,
    drop,
    lpd,
    accumulatedFla,
    onFlaChange,
    updateOutputPort,
  }) => {
    const index = {lpdIndex:lpdIndex,psuIndex:psuIndex,dropIndex:dropIndex }
    const outputPortBrandOptions = [lpdOptions.turk, lpdOptions.puls, lpdOptions.ballufBAE0133]
    const outputPortOptions = lpd.psu_selected === lpdOptions.ballufBAE0133 ?
    [
        {value: "X3", label: "X3"},
        {value: "X4", label: "X4"},
        {value: "X5", label: "X5"},
    ] : lpd.psu_selected === lpdOptions.puls ?
    [
        {value: "Class 2", label: "Class 2"},
        {value: "X4", label: "X4"},
        {value: "X5", label: "X5"},
    ] : lpd.psu_selected === lpdOptions.turk ?
    [
        {value: "XD2", label: "XD2"},
        {value: "XD3", label: "XD3"},
    ] : []

    useEffect(() => {
      assignOutputPort(accumulatedFla)
      onFlaChange();
    }, [drop.fla, drop.outputPort]);



    const assignOutputPort = (accumulatedFla) =>{
      if(drop.fla > 0) return;
      if(lpd.psu_selected === lpdOptions.turk){
        if(accumulatedFla < 10){
          drop.setValue(index, "outputPort", "XD2");
        } else {
          drop.setValue(index, "outputPort", "XD3");
        }
      }
      else if(lpd.psu_selected === lpdOptions.puls){
        if(accumulatedFla < 10){
          drop.setValue(index, "outputPort", "X4"); 
        } else {
          drop.setValue(index, "outputPort", "X5"); 
        }
      }
      else if(lpd.psu_selected === lpdOptions.ballufBAE0133){
        if(accumulatedFla < 4.16){
          drop.setValue(index, "outputPort", "X3"); 
        } else if(accumulatedFla < 4.16 * 2) {
          drop.setValue(index, "outputPort", "X4"); 
        } else {
          drop.setValue(index, "outputPort", "X5"); 
        }
      }
    }

    return (
      <div className="lpd-psu-drop-item">
        <div className="lpd-psu-drop-settings">
        {outputPortBrandOptions.includes(lpd.psu_selected) && (
            <>
                <DropdownItem title={"Select the output port of the PSU:"} item={drop} property={"outputPort"} options={outputPortOptions} index={index}/>    
            </>
          )}     
          <DeviceSelection item={drop} index={index} 
              deviceProperty={"targetDT"}
              stationProperty={"targetLocation"}
              type="powerTarget"
              canCreateDevice={true}
              portConfig ={{
                  title:"Enter the device port to be connected to",
                  property:"ethernetSourceDevicePort",
                  type:"power",
                  targetDT:drop.targetDT,
                  targetLocation:drop.targetLocation,
                  targetLine:drop.line,
              }}/>                                
       
          <InputTextItem title={"Enter the description of the target device"} item={drop} index={index} property={"description"}/>    
          <InputTextItem title={"FLA"} item={drop} index={index} property={"fla"}/>    
              
        </div>
      </div>
    );
  };
  
  export default LpdPsuDropItem;