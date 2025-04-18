import { lpdStore } from '../../Store/lpdStore';
import { projectStore } from '../../Store/projectStore';
import DropdownItem from '../Util/DropdownItem';
import InputTextItem from '../Util/InputTextItem';
import "../../Eec.css";
import { networkSwitchOptions } from '../../Store/networkSwitchStore';
import LineLocationSelection from '../Common/LineLocationSelection';
  
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
                <DropdownItem title={"Select the output port of the PSU:"} placeHolder={drop.outputPort} setModelValue={setDropValue} options={outputPortOptions} index={index} property={"outputPort"}/>    
            </>
          )}

          <LineLocationSelection item={drop} index={index} setModelValue={setDropValue}/>
          <InputTextItem title={"Device Tag (e.g., MIO01)"} placeHolder={drop.deviceTag} setModelValue={setDropValue} index={index} property={"deviceTag"}/>    
          {
            drop.deviceTag.startsWith("LETH") && 
            <DropdownItem title={"Enter the device port to be connected to"} placeHolder={drop.outputPort} options={networkSwitchOptions.networkPortOptions} 
                    setModelValue={setDropValue} index={index} property={"outputPort"}/>
          }
          <InputTextItem title={"Enter the description of the target device"} placeHolder={drop.description} setModelValue={setDropValue} index={index} property={"description"}/>    
          <InputTextItem title={"FLA"} placeHolder={drop.fla} setModelValue={setDropValue} index={index} property={"fla"}/>              
        </div>
      </div>
    );
  };
  
  export default LpdPsuDropItem;