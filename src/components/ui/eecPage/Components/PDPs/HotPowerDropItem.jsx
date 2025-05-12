import DropdownItem from '../Util/DropdownItem';
import { pdpOptions } from '../../Store/pdpStore';
import InputTextItem from '../Util/InputTextItem';
import DeviceSelection from '../Common/DeviceSelection';
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
              <DeviceSelection item={hotPowerDrop} index={index} 
                deviceProperty={"targetDT"}
                stationProperty={"targetLocation"}
                canCreateDevice={true} type="powerTarget"/>      
              <InputTextItem title={"Hot power target device description (i.e., function text)"} item={hotPowerDrop} property={"description"} index={index}/>
            </>
            )}
        </div>
      </div>
    );
  };
  
  export default HotPowerDropItem;