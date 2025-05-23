import "../../Eec.css";
import CheckboxItem from '../Util/CheckboxItem';
import DropdownItem from '../Util/DropdownItem';
import InputTextItem from '../Util/InputTextItem';
import DeviceSelection from "../Common/DeviceSelection";
import { pdpOptions } from '../../Store/pdpStore';
import { isNumberValidation } from "../Util/Validations";
const PowerDropItem = ({ 
  pdpIndex,
  branchCircuitIndex,
  amperage,
  branchCircuit,  
}) => {
  const index = {pdpIndex:pdpIndex, branchCircuitIndex:branchCircuitIndex, amperage:amperage}
  const handleSparePowerChange = (value) =>{
    if(value){
      branchCircuit.setValue(index, 'DropType', 'A-external')
    }
  }
  return (
    <div className="power-drop-item">
      <div className="power-drop-settings">
        <CheckboxItem title={"Spare power drop"} item={branchCircuit} property={"PwrDrop_Spare"} index={index} onChange={handleSparePowerChange}/>

        {!branchCircuit.PwrDrop_Spare && (
          <>
            <DropdownItem title={"Power drop type"} item={branchCircuit} property={'DropType'} options={pdpOptions.dropTypeOptions} index={index}/>
            <InputTextItem title={"Power drop description (i.e., function text)"} item={branchCircuit} property={'description'} index={index}/>
            <DeviceSelection item={branchCircuit} index={index} 
              deviceProperty={"targetDT"}
              stationProperty={"targetLocation"}
              canCreateDevice={true} type="powerTarget"/>                                
            <InputTextItem title={"Cable length from PDP to target device (meters)"} item={branchCircuit} property={'targetCableLength'} 
                      index={index} validation={isNumberValidation}/>
            <InputTextItem title={"Target device FLA (Amps) (e.g., 12)"} item={branchCircuit} property={'targetFLA'} 
                    index={index} validation={isNumberValidation}/>
            <InputTextItem title={"Enter FLA of this power drop (Amps) (e.g., 10) (i.e., add up all current consuming devices connected to this power drop)"} 
                      item={branchCircuit} property={'targetFLA_Total'} index={index} validation={isNumberValidation}/>
          </>
        )}
      </div>
    </div>
  );
  };
  
  export default PowerDropItem;