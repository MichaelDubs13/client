import DropdownItem from '../Util/DropdownItem';
import { pdpOptions } from '../../Store/pdpStore';
import InputTextItem from '../Util/InputTextItem';
import "../../Eec.css";
  
  const HotPowerDropItem = ({ 
    pdpIndex,
    hotPowerIndex,    
    hotPowerDrop,
  }) => {
    const index = {pdpIndex:pdpIndex, hotPowerIndex:hotPowerIndex}  
  
    return (
      <div className="hot-power-drop-item">
        <div className="hot-power-drop-settings">
  
          <DropdownItem title={"Hot power drop type"} item={hotPowerDrop} property={"HotPwrDropType"} options={pdpOptions.hotPwrDropTypeOptions} index={index}/>

          {hotPowerDrop.HotPwrDropType ==="Device" && (
            <>              
              <InputTextItem title={"Hot power drop target location (i.e., Station number) (e.g., 00010)"} item={hotPowerDrop} property={"HotPwrDrp_Target_Location"} index={index} />
              <InputTextItem title={"Hot power drop target device tag (e.g., PSU01)"} item={hotPowerDrop} property={"HotPwrDrp_Target_DT"} index={index}/>
              <InputTextItem title={"Hot power target device description (i.e., function text)"} item={hotPowerDrop} property={"HotPwrDrp_Target_Desc"} index={index}/>
            </>
            )}
        </div>
      </div>
    );
  };
  
  export default HotPowerDropItem;