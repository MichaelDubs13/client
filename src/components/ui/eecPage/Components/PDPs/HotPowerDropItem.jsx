import DropdownItem from '../Util/DropdownItem';
import { pdpStore, pdpOptions } from '../../Store/pdpStore';
import InputTextItem from '../Util/InputTextItem';
import "../../Eec.css";
  
  const HotPowerDropItem = ({ 
    pdpIndex,
    hotPowerIndex,    
    hotPowerDrop,
  }) => {
    const index = {pdpIndex:pdpIndex, hotPowerIndex:hotPowerIndex}
    const setHotPowerValue = pdpStore((state) => state.setHotPowerValue);
  
  
    return (
      <div className="hot-power-drop-item">
        <div className="hot-power-drop-settings">
  
          <DropdownItem title={"Hot power drop type"} placeHolder={hotPowerDrop.HotPwrDropType} options={pdpOptions.hotPwrDropTypeOptions} setModelValue={setHotPowerValue} index={index} property={"HotPwrDropType"}/>

          {hotPowerDrop.HotPwrDropType ==="Device" && (
            <>
              {/* Target device location */}
              <InputTextItem title={"Hot power drop target location (i.e., Station number) (e.g., 00010)"} placeHolder={hotPowerDrop.HotPwrDrp_Target_Location} setModelValue={setHotPowerValue} index={index} property={"HotPwrDrp_Target_Location"}/>
              {/* Target Device DT */}
              <InputTextItem title={"Hot power drop target device tag (e.g., PSU01)"} placeHolder={hotPowerDrop.HotPwrDrp_Target_DT} setModelValue={setHotPowerValue} index={index} property={"HotPwrDrp_Target_DT"}/>
              {/* Description Text */}
              <InputTextItem title={"Hot power target device description (i.e., function text)"} placeHolder={hotPowerDrop.HotPwrDrp_Target_Desc} setModelValue={setHotPowerValue} index={index} property={"HotPwrDrp_Target_Desc"}/>
            </>
            )}
        </div>
      </div>
    );
  };
  
  export default HotPowerDropItem;