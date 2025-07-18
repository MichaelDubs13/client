import "../../Eec.css";
import { useState, useEffect } from "react";
import DropdownItem from '../Util/DropdownItem';
import LpdPsuItem from './LpdPsuItem';
import {lpdStore, lpdOptions} from "../../Store/lpdStore";
import HeadingItem from '../Util/HeadingItem';
import SetItemsNumberInputBox from "../Common/SetItemsNumberInputBox";
import DeviceSelection from "../Common/DeviceSelection";

const LpdConfiguration = ({lpd, lpdIndex}) => {
    const index = {lpdIndex:lpdIndex}    
    const [psuCascadingLimit, setPsuCascadingLimit]=useState("");
    const [manufacturer, setManufacturer]=useState("");
    const [partNumber, setPartNumber]=useState("");
    const setNumberOfPsus = lpdStore((state) => state.setNumberOfPsus);
    const psuOptions =Number(lpd.supplyVoltage) <= 240 ?
    lpdOptions.psuSelection120_240Options : 
    lpdOptions.psuSelection400_480Options;

    useEffect(() => {
        const value = lpd.psu_selected;
        getpsuCascadingLimit(value);
        var arr = value.split(':');
        const manufacturer = arr[0].trimEnd();
        const partNumber = arr[1].trimStart();
        setManufacturer(manufacturer);
        setPartNumber(partNumber);
    }, [lpd.psu_selected]);

    const getpsuCascadingLimit=(value)=>{
        if (value === "Balluff: BAE00ET" || value === "Balluff: BAE00FL") {
            setPsuCascadingLimit('maximum of 2 at 120V, 4 at 240V');
        } else if (value === "Balluff: BAE0133") {
            setPsuCascadingLimit('maximum of 3');
        } else if (value === "Siemens: 6ES7148-4PC00-0HA0") {
            setPsuCascadingLimit('maximum of 15');
        } else if (value === "Turck: PSU67-3P-1MP-2M5-24200-F") {
            setPsuCascadingLimit('maximum of 8');
        } else if (value === "Puls: FPT500.247-064-102") {
            setPsuCascadingLimit('maximum of 8');
        } else {
            setPsuCascadingLimit('maximum of 8');
        }
    }


    return (
        
        <div>
            <div style={{display:'grid'}} >
                <div style={{gridColumn:1,gridRow:1}}>
                    <DropdownItem title={"Select the supply voltage for the PSU(s):"} item={lpd} property={"supplyVoltage"} 
                        options={lpdOptions.psuSupplyVoltageOptions} index={index}/>
                </div>
                <div style={{gridColumn:1,gridRow:2}}>
                    <DropdownItem title={"Select the PSU:"} item={lpd} property={"psu_selected"} 
                        options={psuOptions} index={index}/>
                </div>
                <div style={{gridColumn:2,gridRow:'span 2'}}>
                    <img src={`/DeviceImages/${manufacturer}/${partNumber}.jpg`} style={{width:'200px', height:'225px'}}/>
                </div>
            </div>
            <DeviceSelection item={lpd} index={index} 
                lineProperty={"powerSourceLine"}
                stationProperty={"powerSourceLocation"}
                deviceProperty={"powerSourceDT"}
                type="powerSource"
                canCreateDevice={true}/>    
            <SetItemsNumberInputBox title={`Calculate and enter the total number of PSU(s) needed for this cascading group: (${psuCascadingLimit})`} 
                    items={lpd.psus} addItems={setNumberOfPsus} index={lpdIndex}/>          
            {
                lpd.psus.map((psu,index) => {
                    return <HeadingItem label={`24VDC Power Supply ${psu.getIndex()+1}: ++${psu.line}+${psu.location}-${psu.deviceTag} | ${lpd.psu_selected}`} 
                    size={18} margin={"20px"} open={false} 
                    component={psu}
                    headerIcon={psu.UI.icon}
                    children={<LpdPsuItem lpdIndex={lpdIndex} psuIndex={index} psu={psu} lpd={lpd}/>}/>
                })
            }
    </div>  
    );
};
export default LpdConfiguration;