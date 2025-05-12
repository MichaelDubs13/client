import "../../Eec.css";
import SetItemsNumberInputBox from "../Common/SetItemsNumberInputBox";
import LpdPsuDropItem from './LpdPsuDropItem';
import HeadingItem from '../Util/HeadingItem';
import DropdownItem from '../Util/DropdownItem';
import { lpdStore, lpdOptions } from '../../Store/lpdStore';
import DeviceSelection from '../Common/DeviceSelection';
import InputTextItem from "../Util/InputTextItem";
import { useEffect, useState } from "react";

const LpdPsuItem = ({ 
  psuIndex,
  lpdIndex,
  lpd,
  psu,
  createNew,
}) => {   
const index = createNew ?  {} : {psuIndex:psuIndex, lpdIndex:lpdIndex}
const setNumberOfDrops =  lpdStore((state) => state.setNumberOfDrops);
const [totalFLA, setTotalFLA]= useState(0);
const handleFlaChange =() => {
  var totalFLA = 0;
  psu.drops.forEach(drop => {
    totalFLA = totalFLA + Number(drop.fla);
  })
  setTotalFLA(totalFLA);
}
return (
      <div className="lpd-psu-item">
        <div className="lpd-psu-settings">
          <DeviceSelection item={psu} index={index} 
            deviceProperty={"deviceTag"}
            stationProperty={"location"}/>                             
          {
            lpd &&
            lpd.psus.length > 1 && psuIndex < lpd.psus.length - 1 && (
            <>
                <DropdownItem title={"Enter the cable length to the next cascaded PSU (m)"} item={psu} property={"cable_length"}
                   options={lpdOptions.psuToPsuCableLengthOptions} index={index}/>    
            </>
          )}
          <InputTextItem title={"FLA Sum"} placeHolder={`${totalFLA}A`} readOnly={true} />   
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
                      children={<LpdPsuDropItem lpdIndex={lpdIndex} psuIndex={psuIndex} dropIndex={index} 
                        drop={drop} lpd={lpd} psu={psu}
                        onFlaChange={handleFlaChange}/>}/>
                    })
                } 
            </>
          }
        </div>
      </div>
    );
  };
  
  export default LpdPsuItem;