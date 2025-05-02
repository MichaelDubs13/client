import "../../Eec.css";
import DropdownItem from '../Util/DropdownItem';
import InputTextItem from '../Util/InputTextItem';
import DeviceSelection from "../Common/DeviceSelection";
import NetworkPortSelection from "../Common/NetworkPortSelection";
  
  const LpdPsuDropItem = ({ 
    lpdIndex,
    psuIndex,
    dropIndex,
    drop,
    lpd,
    onFlaChange,
  }) => {
    const index = {lpdIndex:lpdIndex,psuIndex:psuIndex,dropIndex:dropIndex }
    const outputPortBrandOptions = ['Turck', 'Puls', 'Balluff-BAE0133']
    const outputPortOptions = lpd.psu_selection === 'Balluff-BAE0133' ?
    [
        {value: "X3", label: "X3"},
        {value: "X4", label: "X4"},
        {value: "X5", label: "X5"},
    ] : lpd.psu_selection === 'Puls' ?
    [
        {value: "X3", label: "X3"},
        {value: "X4", label: "X4"},
        {value: "X5", label: "X5"},
    ] : lpd.psu_selection === 'Turck' ?
    [
        {value: "XD2", label: "XD2"},
        {value: "XD3", label: "XD3"},
    ] : []    
  
    return (
      <div className="lpd-psu-drop-item">
        <div className="lpd-psu-drop-settings">
        {outputPortBrandOptions.includes(lpd.psu_selection) && (
            <>
                <DropdownItem title={"Select the output port of the PSU:"} item={drop} property={"outputPort"} options={outputPortOptions} index={index}/>    
            </>
          )}     
          <DeviceSelection item={drop} index={index} 
              deviceTitle={"Device Tag (e.g., MIO01)"} deviceProperty={"targetDT"}
              stationTitle={"Location designation(i.e., Station number)"} stationProperty={"targetLocation"}
              type="powerTarget"
              canCreateDevice={true}/>                                
          <NetworkPortSelection title={"Enter the device port to be connected to"} item={drop} 
              index={index} property={"ethernetSourceDevicePort"} targetDT={drop.targetDT} targetLocation={drop.targetLocation} targetLine={drop.line}
              portSelect="power"/>
          <InputTextItem title={"Enter the description of the target device"} item={drop} index={index} property={"description"}/>    
          <InputTextItem title={"FLA"} item={drop} index={index} property={"fla"} onChange={onFlaChange}/>              
        </div>
      </div>
    );
  };
  
  export default LpdPsuDropItem;