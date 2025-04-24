import "../../Eec.css";
import { useState, useEffect } from "react";
import DropdownItem from '../Util/DropdownItem';
import LpdPsuItem from './LpdPsuItem';
import {lpdStore, lpdOptions} from "../../Store/lpdStore";
import { projectStore } from '../../Store/projectStore';
import HeadingItem from '../Util/HeadingItem';
import SetItemsNumberInputBox from "../Common/SetItemsNumberInputBox";
import LineLocationSelection from '../Common/LineLocationSelection';
import { lineStore } from '../../Store/lineStore';
import { pdpStore } from '../../Store/pdpStore';
import { xpdpStore } from '../../Store/xpdpStore';

const LpdConfiguration = ({lpd, lpdIndex}) => {
    const index = {lpdIndex:lpdIndex}    
    const [psuCascadingLimit, setPsuCascadingLimit]=useState("");
    const getCbOptions = lineStore((state)=> state.getCbOptions)
    const line = projectStore((state) => state.line);
    const setNumberOfPsus = lpdStore((state) => state.setNumberOfPsus);
    const pdps = pdpStore((state) => state.pdps);
    const xpdps = xpdpStore((state) => state.xpdps);
    const [cbOptions, setCbOptions] = useState([])
    let absIndex = 0;
    const psuOptions =Number(lpd.supplyVoltage) <= 240 ?
    [
        {value: "Balluff-BAE00ET", label: "Balluff: BAE00ET"},
        {value: "Balluff-BAE00FL", label: "Balluff: BAE00FL"},
        {value: "Balluff-BAE0133", label: "Balluff: BAE0133"},
    ] : [
        {value: "Siemens", label: "Siemens: 6ES7148-4PC00-0HA0"},
        {value: "Turck", label: "Turck: PSU67-3P-1MP-2M5-24200-F"},
        {value: "Puls", label: "Puls: FPT500.247-064-102"},
    ]

    const getpsuCascadingLimit=(value)=>{
        if (value === "Balluff-BAE00ET" || value === "Balluff-BAE00FL") {
            setPsuCascadingLimit('maximum of 2 at 120V, 4 at 240V');
        } else if (value === "Balluff-BAE0133") {
            setPsuCascadingLimit('maximum of 3');
        } else if (value === "Siemens") {
            setPsuCascadingLimit('maximum of 15');
        } else if (value === "Turck") {
            setPsuCascadingLimit('maximum of 8');
        } else if (value === "Puls") {
            setPsuCascadingLimit('maximum of 8');
        } else {
            setPsuCascadingLimit('maximum of 8');
        }
    }
    useEffect(() => {
        var options = getCbOptions(lpd.location)
        console.log(options)
        setCbOptions(options);
    }, [lpd.location]);

    // Initilize lpdPsuItems based on numberOfPsu and psuSelection
    // this was intended to limit the number of psu items based on the psuSelection
    // but it is not working as expected
    // useEffect(() => {
    //     const InitializePsuItems = () => {
    //         if (psuSelection === "Balluff-BAE00ET" || psuSelection === "Balluff-BAE00FL") {
    //             return {[psuSelection]: 2};
    //         } else if (psuSelection === "Balluff-BAE0133") {
    //             return {[psuSelection]: 3};
    //         } else if (psuSelection === "Siemens") {
    //             return {[psuSelection]: 15};
    //         } else if (psuSelection === "Turck") {
    //             return {[psuSelection]: 8};
    //         } else if (psuSelection === "Puls") {
    //             return {[psuSelection]: 8};
    //         } else {
    //             return {};
    //         }
    //     };
    //     setLpdPsuItems(InitializePsuItems());
    // }, [psuSelection, numberOfPsu]);

    const handleSetpsuSelectionChange = (event)=> {
        const value = event.value;
        getpsuCascadingLimit(value);
    }

    const handleDropChange = (value) => {
        if(lpd.location && lpd.line && value){
            for(let i=0;i<pdps.length;i++){
                var cb = pdps[i].getCB(lpd.location, value);
                if(cb){
                    cb.setDataValue("targetDevice", lpd.data.id)
                    return;
                }
            }
            for(let i=0;i<xpdps.length;i++){
                var cb = xpdps[i].getCB(lpd.location, value);
                if(cb){
                    cb.setDataValue("targetDevice", lpd.data.id)
                    return;
                }
            }
        }
    }

    return (
        
        <div>
            <DropdownItem title={"Select the supply voltage for the PSU(s):"} item={lpd} property={"supplyVoltage"} 
                options={lpdOptions.psuSupplyVoltageOptions} index={index}/>
            <DropdownItem title={"Select the PSU:"} item={lpd} property={"psu_selected"} 
                options={psuOptions} index={index} onChange={handleSetpsuSelectionChange}/>
            <LineLocationSelection item={lpd} index={index}
                        lineTitle='Enter the power source Line name: (e.g., UBM01)'
                        locationTitle='Enter the power source location designation: (e.g., XPDP01)'/>

            <DropdownItem title={"Enter the power source device tag: (e.g., CB01)"} item={lpd} property={"cb"} 
                options={cbOptions} index={index} onChange={handleDropChange}/>
            <SetItemsNumberInputBox title={"Calculate and enter the total number of PSU(s) needed for this cascading group: (${psuCascadingLimit})"} 
                    items={lpd.psus} addItems={setNumberOfPsus} index={lpdIndex}/>          

            {
                lpd.psus.map((psu,index) => {
                    absIndex++;
                    return <HeadingItem label={`24VDC Power Supply ${absIndex}: ++${line}+${psu.psu_location}-${psu.psu_dt} | ${lpd.psu_selected}`} 
                    size={18} margin={"20px"} open={false} 
                    headerIcon={psu.UI.icon}
                    children={<LpdPsuItem lpdIndex={lpdIndex} psuIndex={index} psu={psu} lpd={lpd}/>}/>
                })
            }
    </div>  
    );
};
export default LpdConfiguration;