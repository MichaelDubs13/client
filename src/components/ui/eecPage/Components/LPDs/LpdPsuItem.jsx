import "../../Eec.css";
import SetItemsNumberInputBox from "../Common/SetItemsNumberInputBox";
import LpdPsuDropItem from './LpdPsuDropItem';
import HeadingItem from '../Util/HeadingItem';
import DropdownItem from '../Util/DropdownItem';
import { lpdStore, lpdOptions } from '../../Store/lpdStore';
import DeviceSelection from '../Common/DeviceSelection';
import InputTextItem from "../Util/InputTextItem";
import { useEffect, useState } from "react";
import CheckboxItem from "../Util/CheckboxItem";

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
const [totalXD2FLA, setTotalXD2FLA]= useState(0);
const [totalXD3FLA, setTotalXD3FLA]= useState(0);
const [totalClass2FLA, setTotalClass2FLA]= useState(0);
const [totalXD4FLA, setTotalXD4FLA]= useState(0);
const [totalXD5FLA, setTotalXD5FLA]= useState(0);
const [updateOutputPort, setUpdateOutputPort]=useState(0);
var accumulatedFla = 0;

useEffect(() => {
  handleFlaChange();
}, [psu.drops]);

const handleFlaChange =() => {
  var totalFLA = 0;
  var totalX2FLA = 0;
  var totalX3FLA = 0;
  var totalClass2FLA = 0;
  var totalX4FLA = 0;
  var totalX5FLA = 0;

  psu.drops.forEach((drop) => {
    var fla = drop.fla;
    var outputPort = drop.outputPort;
    totalFLA = totalFLA + Number(fla);
    
    if(outputPort === "XD2") totalX2FLA = totalX2FLA + Number(fla);
    if(outputPort === "XD3" || outputPort === "X3") totalX3FLA = totalX3FLA + Number(fla);
    if(outputPort === "Class 2") totalClass2FLA = totalClass2FLA + Number(fla);
    if(outputPort === "X4") totalX4FLA = totalX4FLA + Number(fla);
    if(outputPort === "X5") totalX5FLA = totalX5FLA + Number(fla);
  })
  setTotalFLA(totalFLA);
  setTotalXD2FLA(totalX2FLA);
  setTotalXD3FLA(totalX3FLA);
  setTotalClass2FLA(totalClass2FLA);
  setTotalXD4FLA(totalX4FLA);
  setTotalXD5FLA(totalX5FLA);
  setUpdateOutputPort(updateOutputPort+1);
}


const getColorStyle=(fla, capacity)=>{
  if(fla > capacity){
    return {color:'red'}
  } else if (fla > (capacity * 0.8)){
    return {color:'#E4D00A'}
  }
}

const getCapacity = ()=>{
  if(lpd.psu_selected === lpdOptions.turk)return 20;
  if(lpd.psu_selected === lpdOptions.puls)return 20;
  if(lpd.psu_selected === lpdOptions.ballufBAE0133)return 12.5;
}

const hasFeedbackOption = () => {
  if(lpd.psu_selected === lpdOptions.turk) return true;
  if(lpd.psu_selected === lpdOptions.puls) return true;
  if(lpd.psu_selected === lpdOptions.ballufBAE0133) return true;
  if(lpd.psu_selected === lpdOptions.siemens) return true;
  return false;
}

return (
      <div className="lpd-psu-item">
        <div className="lpd-psu-settings">
          <DeviceSelection item={psu} index={index} 
            deviceProperty={"deviceTag"}
            stationProperty={"location"}
            type ={"parentPowerSource"}/>                             
          {
            lpd &&
            lpd.psus.length > 1 && psuIndex < lpd.psus.length - 1 && (
            <>
                <DropdownItem title={"Enter the cable length to the next cascaded PSU (m)"} item={psu} property={"cable_length"}
                   options={lpdOptions.psuToPsuCableLengthOptions} index={index}/>    
            </>
          )}
          {
              hasFeedbackOption() && 
              <div>
                  <CheckboxItem title={"Activate PSU Feedback to I/O Module:"} item={psu} property={"enablePsuFeedback"} index={index}/> 
                  {
                      psu.enablePsuFeedback &&
                      <div>
                          <DeviceSelection item={psu} index={index} 
                              label={"Target PSU feedback I/O Module"}
                              lineProperty={"psuFeedbackIOTargetLine"}
                              stationProperty={"psuFeedbackIOTargetLocation"}
                              deviceProperty={"psuFeedbackIOTargetDT"}
                              type="ioModule"
                              canCreateDevice={true}
                              portConfig ={{
                                title:"Select the Port of the I/O Module:",
                                property:"psuFeedbackIOTargetPort",
                                type:"ioModule",
                                targetDT:psu.psuFeedbackIOTargetDT,
                                targetLocation:psu.psuFeedbackIOTargetLocation,
                                targetLine:psu.psuFeedbackIOTargetLine,
                            }}/>   
                      </div>
                  }
              </div> 
          }
          
          {
            lpd && 
            <div>
                <InputTextItem title={"FLA Sum"} placeHolder={`${totalFLA}A`} readOnly={true} valueStyle={getColorStyle(totalFLA, getCapacity())}/> 
                {
                    lpd.psu_selected === lpdOptions.turk && 
                    <div>
                      <InputTextItem title={"Summation XD2 FLA"} placeHolder={`${totalXD2FLA}A`} readOnly={true} valueStyle={getColorStyle(totalXD2FLA, 20)}/> 
                      <InputTextItem title={"Summation XD3 FLA "} placeHolder={`${totalXD3FLA}A`} readOnly={true} valueStyle={getColorStyle(totalXD3FLA, 20)}/> 
                    </div>
                }
                {
                    lpd.psu_selected === lpdOptions.puls && 
                    <div>
                      <InputTextItem title={"Summation Class 2 FLA"} placeHolder={`${totalClass2FLA}A`} readOnly={true} valueStyle={getColorStyle(totalClass2FLA, 4)}/> 
                      <InputTextItem title={"Summation X4 FLA "} placeHolder={`${totalXD4FLA}A`} readOnly={true} valueStyle={getColorStyle(totalXD4FLA+totalXD5FLA, 20)}/>
                      <InputTextItem title={"Summation X5 FLA "} placeHolder={`${totalXD5FLA}A`} readOnly={true} valueStyle={getColorStyle(totalXD4FLA+totalXD5FLA, 20)}/> 
                    </div>
                }        
                {
                    lpd.psu_selected === lpdOptions.ballufBAE0133 && 
                    <div>
                      <InputTextItem title={"Summation X3 FLA"} placeHolder={`${totalXD3FLA}A`} readOnly={true} /> 
                      <InputTextItem title={"Summation X4 FLA"} placeHolder={`${totalXD4FLA}A`} readOnly={true} />
                      <InputTextItem title={"Summation X5 FLA"} placeHolder={`${totalXD5FLA}A`} readOnly={true} /> 
                    </div>
                }      
            </div>
          }  
          {
            lpd && 
            <>
               <SetItemsNumberInputBox title={"Enter the number of devices to be powered by this PSU (i.e., number of 24V drops)"} 
                    items={psu.drops} addItems={setNumberOfDrops} index={index}/>          
                {
                    psu.drops.map((drop, index) => {
                      accumulatedFla = accumulatedFla + (drop.outputPort != "Class 2" ? Number(drop.fla) : 0);
                      return <HeadingItem label={`24VDC field power drop ${drop.getIndex()+1}`} 
                      size={18} margin={"20px"} open={false} 
                      headerIcon={drop.UI.icon}
                      children={<LpdPsuDropItem lpdIndex={lpdIndex} psuIndex={psuIndex} dropIndex={index} 
                        drop={drop} lpd={lpd} psu={psu} accumulatedFla={accumulatedFla}
                        onFlaChange={handleFlaChange} updateOutputPort={updateOutputPort}/>}/>
                    })
                } 
            </>
          }
        </div>
      </div>
    );
  };
  
  export default LpdPsuItem;