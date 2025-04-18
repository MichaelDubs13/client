import "../../Eec.css";
import CheckboxItem from '../Util/CheckboxItem';
import DropdownItem from '../Util/DropdownItem';
import InputTextItem from '../Util/InputTextItem';
import DeviceSelection from "../Common/DeviceSelection";
import { pdpOptions } from '../../Store/pdpStore';
const PowerDropItem = ({ 
  pdpIndex,
  branchCircuitIndex,
  setBranchCircuitValue,
  amperage,
  branchCircuit,  
}) => {
  const index = {pdpIndex:pdpIndex, branchCircuitIndex:branchCircuitIndex, amperage:amperage}
  
  return (
    <div className="power-drop-item">
      <div className="power-drop-settings">
        <CheckboxItem title={"Spare power drop"} placeHolder={false} setModelValue={setBranchCircuitValue} index={index} property={"PwrDrop_Spare"}/>

        {!branchCircuit.PwrDrop_Spare && (
          <>
            <DropdownItem title={"Power drop type"} placeHolder={branchCircuit.DropType} options={pdpOptions.dropTypeOptions} setModelValue={setBranchCircuitValue} index={index} property={'DropType'}/>
            <InputTextItem title={"Power drop description (i.e., function text)"} placeHolder={branchCircuit.PwrDrop_DescTxt} setModelValue={setBranchCircuitValue} index={index} property={'PwrDrop_DescTxt'}/>
            <InputTextItem title={"Cable length from PDP to target device (meters)"} placeHolder={branchCircuit.dbl_Cable_Length} setModelValue={setBranchCircuitValue} index={index} property={'dbl_Cable_Length'}/>
            <DeviceSelection item={branchCircuit} setModelValue={setBranchCircuitValue} index={index} 
              deviceTitle={"Target device tag (e.g., RBC01)"} deviceProperty={"TargetDevice_DT"}
              stationTitle={"Target device location (i.e., Station number) (e.g., 00010)"} stationProperty={"StrBox_DT"}/>                                
            <InputTextItem title={"Target device FLA (Amps) (e.g., 12)"} placeHolder={branchCircuit.TargetDevice_FLA} setModelValue={setBranchCircuitValue} index={index} property={'TargetDevice_FLA'}/>
            <InputTextItem title={"Enter FLA of this power drop (Amps) (e.g., 10) (i.e., add up all current consuming devices connected to this power drop)"} placeHolder={branchCircuit.StrBox_DT_FLA} setModelValue={setBranchCircuitValue} index={index} property={'StrBox_DT_FLA'}/>
          </>
        )}
      </div>
    </div>
  );
  };
  
  export default PowerDropItem;