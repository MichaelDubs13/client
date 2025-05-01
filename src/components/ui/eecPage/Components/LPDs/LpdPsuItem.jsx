import "../../Eec.css";
import SetItemsNumberInputBox from "../Common/SetItemsNumberInputBox";
import LpdPsuDropItem from './LpdPsuDropItem';
import HeadingItem from '../Util/HeadingItem';
import DropdownItem from '../Util/DropdownItem';
import { lpdStore, lpdOptions } from '../../Store/lpdStore';
import DeviceSelection from '../Common/DeviceSelection';

const LpdPsuItem = ({ 
  psuIndex,
  lpdIndex,
  lpd,
  psu,
  createNew,
}) => {   
const index = createNew ?  {} : {psuIndex:psuIndex, lpdIndex:lpdIndex}
const setNumberOfDrops =  lpdStore((state) => state.setNumberOfDrops);

return (
      <div className="lpd-psu-item">
        <div className="lpd-psu-settings">
          <DeviceSelection item={psu} index={index} 
            deviceTitle={"PSU Device Tag (e.g., PSU01)"} deviceProperty={"deviceTag"}
            stationTitle={"PSU Location (i.e., Station number) (e.g., 00010)"} stationProperty={"location"}/>                                
          {
            lpd &&
            lpd.psus.length > 1 && psuIndex < lpd.psus.length - 1 && (
            <>
                <DropdownItem title={"Enter the cable length to the next cascaded PSU (m)"} item={psu} property={"cable_length"}
                   options={lpdOptions.psuToPsuCableLengthOptions} index={index}/>    
            </>
          )}
          {
            lpd && 
            <>
               <SetItemsNumberInputBox title={"Enter the number of devices to be powered by this PSU (i.e., number of 24V drops)"} 
                    items={psu.drops} addItems={setNumberOfDrops} index={index}/>          
                {
                    psu.drops.map((drop, index) => {
                      return <HeadingItem label={`24VDC field power drop ${drop.getIndex()+1}`} 
                      size={18} margin={"20px"} open={false} 
                      headerIcon={drop.UI.icon}
                      children={<LpdPsuDropItem lpdIndex={lpdIndex} psuIndex={psuIndex} dropIndex={index} drop={drop} lpd={lpd} psu={psu}/>}/>
                    })
                } 
            </>
          }
        </div>
      </div>
    );
  };
  
  export default LpdPsuItem;