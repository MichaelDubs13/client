import "../../Eec.css";
import SetItemsNumberInputBox from "../Common/SetItemsNumberInputBox";
import LpdPsuDropItem from './LpdPsuDropItem';
import HeadingItem from '../Util/HeadingItem';
import DropdownItem from '../Util/DropdownItem';
import { lpdStore, lpdOptions } from '../../Store/lpdStore';
import DeviceSelection from '../Common/DeviceSelection';
import { lineConfiguration } from "../../Store/lineStore";
import { useEffect, useState } from "react";
import CheckboxItem from "../Util/CheckboxItem";
import PsuLoadItem from "../Common/PsuLoadItem";

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


const getCapacity = ()=>{
  if(lpd.psu_selected === lpdOptions.turk)return 20;
  if(lpd.psu_selected === lpdOptions.puls)return 20;
  if(lpd.psu_selected === lpdOptions.ballufBAE0133)return 12.5;
  if(lpd.psu_selected === lpdOptions.ballufBAE00FL)return 8;
  if(lpd.psu_selected === lpdOptions.ballufBAE00ET)return 8;
  if(lpd.psu_selected === lpdOptions.siemens)return 8;
}

const hasFeedbackOption = () => {
  if(!lpd) return false;
  if(lpd.psu_selected === lpdOptions.turk) return true;
  if(lpd.psu_selected === lpdOptions.puls) return true;
  if(lpd.psu_selected === lpdOptions.ballufBAE0133) return true;
  if(lpd.psu_selected === lpdOptions.siemens) return true;
  return false;
}

const handlePsuFeedbackPortSelect = (value) => {
    var line = psu.psuFeedbackIOTargetLine;
    var location = psu.psuFeedbackIOTargetLocation;
    var dt = psu.psuFeedbackIOTargetDT;

    if(!dt.startsWith("MIO"))return;
    var foundMIO = lineConfiguration.getDeviceByNameGlobal(dt, location, line);

    if(!foundMIO) return;
    const portIndex = Number(value.replace("P", ""))-1;
    var indexObject = foundMIO.ports[portIndex].getIndexObject()

    if(lpd.psu_selected === lpdOptions.turk){
      foundMIO.ports[portIndex].setValue(indexObject, "isIOLink", false)
      foundMIO.ports[portIndex].setValue(indexObject, "pinType", "Input")
      foundMIO.ports[portIndex].setValue(indexObject, "pinDescription", "PSU feedback - Relay Ok")
      foundMIO.ports[portIndex].setValue(indexObject, "pinTargetPartNumber", psu.partNumber)
      foundMIO.ports[portIndex].setValue(indexObject, "pinTargetLocation", psu.location)
      foundMIO.ports[portIndex].setValue(indexObject, "pinTargetDT", psu.deviceTag)
    } else if(lpd.psu_selected === lpdOptions.puls){
      foundMIO.ports[portIndex].setValue(indexObject, "isIOLink", false)
      foundMIO.ports[portIndex].setValue(indexObject, "pinType", "IO-Link")
      foundMIO.ports[portIndex].setValue(indexObject, "pinDescription", "PSU feedback - IO-Link")
      foundMIO.ports[portIndex].setValue(indexObject, "pinTargetPartNumber", psu.partNumber)
      foundMIO.ports[portIndex].setValue(indexObject, "pinTargetLocation", psu.location)
      foundMIO.ports[portIndex].setValue(indexObject, "pinTargetDT", psu.deviceTag)
    } else if(lpd.psu_selected === lpdOptions.ballufBAE0133){
      foundMIO.ports[portIndex].setValue(indexObject, "isIOLink", false)
      foundMIO.ports[portIndex].setValue(indexObject, "pinType", "IO-Link")
      foundMIO.ports[portIndex].setValue(indexObject, "pinDescription", "PSU feedback - IO-Link")
      foundMIO.ports[portIndex].setValue(indexObject, "pinTargetPartNumber", psu.partNumber)
      foundMIO.ports[portIndex].setValue(indexObject, "pinTargetLocation", psu.location)
      foundMIO.ports[portIndex].setValue(indexObject, "pinTargetDT", psu.deviceTag)
    }else if(lpd.psu_selected === lpdOptions.siemens){
      foundMIO.ports[portIndex].setValue(indexObject, "isIOLink", false)
      foundMIO.ports[portIndex].setValue(indexObject, "pinType", "Input")
      foundMIO.ports[portIndex].setValue(indexObject, "pinDescription", "PSU feedback - Power Ok")
      foundMIO.ports[portIndex].setValue(indexObject, "pinTargetPartNumber", psu.partNumber)
      foundMIO.ports[portIndex].setValue(indexObject, "pinTargetLocation", psu.location)
      foundMIO.ports[portIndex].setValue(indexObject, "pinTargetDT", psu.deviceTag)
    }
    
    
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
                              onPortSelect={handlePsuFeedbackPortSelect}
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
                <PsuLoadItem title={"FLA Sum"} amperage={totalFLA} capacity={getCapacity()}/>
                {
                    lpd.psu_selected === lpdOptions.turk && 
                    <div>
                      <PsuLoadItem title={"Summation XD2 FLA"} amperage={totalXD2FLA} capacity={10}/>
                      <PsuLoadItem title={"Summation XD3 FLA"} amperage={totalXD3FLA} capacity={10}/>
                    </div>
                }
                {
                    lpd.psu_selected === lpdOptions.puls && 
                    <div>
                      <PsuLoadItem title={"Summation Class 2 FLA"} amperage={totalClass2FLA} capacity={4}/>
                      <PsuLoadItem title={"Summation X4 FLA"} amperage={totalXD4FLA} capacity={10}/>
                      <PsuLoadItem title={"Summation X5 FLA"} amperage={totalXD5FLA} capacity={10}/>
                    </div>
                }        
                {
                    lpd.psu_selected === lpdOptions.ballufBAE0133 && 
                    <div>
                      <PsuLoadItem title={"Summation X3 FLA"} amperage={totalXD3FLA} capacity={4.16}/>
                      <PsuLoadItem title={"Summation X4 FLA"} amperage={totalXD4FLA} capacity={4.16}/>
                      <PsuLoadItem title={"Summation X5 FLA"} amperage={totalXD5FLA} capacity={4.16}/>
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
                      component={drop}
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