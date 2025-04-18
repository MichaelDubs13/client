import { lpdStore } from '../../Store/lpdStore';
import { projectStore } from '../../Store/projectStore';
import DropdownItem from '../Util/DropdownItem';
import InputTextItem from '../Util/InputTextItem';
import "../../Eec.css";
import { networkSwitchOptions } from '../../Store/networkSwitchStore';
  
  const LpdPsuDropItem = ({ 
    lpdIndex,
    psuIndex,
    dropIndex,
    drop,
    lpd,
    psu,
  }) => {
    const line = projectStore((state) => state.line);
    const setDropValue = lpdStore((state) => state.setDropValue);
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
                {/* PSU output port */}
                <DropdownItem title={"Select the output port of the PSU:"} placeHolder={drop.outputPort} setModelValue={setDropValue} options={outputPortOptions} index={index} property={"outputPort"}/>    
            </>
          )}

          {/* Drop: Target Line */}
          <InputTextItem title={"Manufacturing Line name (e.g., UBM1, DOR1)"} placeHolder={line} readOnly={true}/>
          {/* Drop: Target Location */}
          <InputTextItem title={"Location designation (i.e., Station number) (e.g., 00010)"} placeHolder={drop.location} setModelValue={setDropValue} index={index} property={"location"}/>    
          {/* Drop: Target DT */}
          <InputTextItem title={"Device Tag (e.g., MIO01)"} placeHolder={drop.deviceTag} setModelValue={setDropValue} index={index} property={"deviceTag"}/>    
          {
            drop.deviceTag.startsWith("LETH") && 
            <DropdownItem title={"Enter the device port to be connected to"} placeHolder={drop.outputPort} options={networkSwitchOptions.networkPortOptions} 
                    setModelValue={setDropValue} index={index} property={"outputPort"}/>
          }
          {/* Drop: Description */}
          <InputTextItem title={"Enter the description of the target device"} placeHolder={drop.description} setModelValue={setDropValue} index={index} property={"description"}/>    
          {/* Drop: FLA */}
          <InputTextItem title={"FLA"} placeHolder={drop.fla} setModelValue={setDropValue} index={index} property={"fla"}/>              
        </div>
      </div>
    );
  };
  
  export default LpdPsuDropItem;