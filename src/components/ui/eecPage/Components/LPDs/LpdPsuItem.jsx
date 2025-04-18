import {
  FormLabel,
  FormInputText,
  FormItem,
} from '@tesla/design-system-react';
import { projectStore } from '../../Store/projectStore';
import LpdPsuDropItem from './LpdPsuDropItem';
import HeadingItem from '../Util/HeadingItem';
import DropdownItem from '../Util/DropdownItem';
import { lpdStore, lpdOptions } from '../../Store/lpdStore';
import DeviceSelection from '../Common/DeviceSelection';
import "../../Eec.css";
import LineLocationSelection from '../Common/LineLocationSelection';
import StationSelection from '../Common/StationSelection';
  
const LpdPsuItem = ({ 
  psuIndex,
  lpdIndex,
  lpd,
  psu,
}) => {   
  const index = {psuIndex:psuIndex, lpdIndex:lpdIndex}
  const line = projectStore((state) => state.line);
  const setNumberOfDrops =  lpdStore((state) => state.setNumberOfDrops);
  const setPsuValue =  lpdStore((state) => state.setPsuValue);
  let absIndex = 0;
const handleNumberOfDropsChange = (event) => {
    const value = event.target.value;
    setNumberOfDrops(index,value)
}

return (
      <div className="lpd-psu-item">
        <div className="lpd-psu-settings">
          <LineLocationSelection item={psu} setModelValue={setPsuValue} index={index}/>
          <StationSelection title={"PSU Location (i.e., Station number) (e.g., 00010)"} item={psu} setModelValue={setPsuValue} index={index} property={"psu_location"}/>      
          <DeviceSelection title={"PSU Device Tag (e.g., PSU01)"} item={psu} setModelValue={setPsuValue} index={index} property={"psu_dt"} station={psu.psu_location}/>                                
          {
            lpd.psus.length > 1 && psuIndex < lpd.psus.length - 1 && (
            <>
                {/* PSU-to-PSU cable length */}
                <DropdownItem title={"Enter the cable length to the next cascaded PSU (m)"} placeHolder={psu.cable_length} options={lpdOptions.psuToPsuCableLengthOptions} setModelValue={setPsuValue} index={index} property={"cable_length"}/>    
            </>
          )}
          {/* Number of 24V drops */}
          <FormItem className="form-item">
            <FormLabel className="form-label" htmlFor={`number-of-24V-drops-${psuIndex}`}>
              Enter the number of devices to be powered by this PSU (i.e., number of 24V drops)
            </FormLabel>
            <FormInputText
              id={`number-of-24V-drops-${psuIndex}`}
              value={psu.pwrDrops.length}
              onChange={handleNumberOfDropsChange}
            />
          </FormItem>

          {/* Cascading PSUs within this configuration */}
           {
              psu.pwrDrops.map((drop, index) => {
                absIndex++
                return <HeadingItem label={`24VDC field power drop ${absIndex}`} 
                size={18} margin={"20px"} open={false} 
                headerIcon={"/powerdrop.png"}
                children={<LpdPsuDropItem lpdIndex={lpdIndex} psuIndex={psuIndex} dropIndex={index} drop={drop} lpd={lpd} psu={psu}/>}/>
                
              })
           } 
        </div>
      </div>
    );
  };
  
  export default LpdPsuItem;