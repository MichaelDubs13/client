import { FormLabel, FormItem, FormInputDropdown } from '@tesla/design-system-react';
import { useState } from "react";
import DropdownItem from '../Util/DropdownItem';
import LpdPsuItem from './LpdPsuItem';
import {lpdStore, lpdOptions} from "../../Store/lpdStore";
import InputTextItem from "../Util/InputTextItem";
import { projectStore } from '../../Store/projectStore';
import HeadingItem from '../Util/HeadingItem';
import InputTextItemBasic from '../Util/InputTextItemBasic';
import { lineStore } from '../../Store/lineStore';
import LineLocationSelection from '../Common/LineLocationSelection';
import "../../Eec.css";

const LpdConfiguration = ({lpd, lpdIndex}) => {
    const index = {lpdIndex:lpdIndex}
    const [psuSelection, setPsuSelection]=useState("");
    const [psuCascadingLimit, setPsuCascadingLimit]=useState("");
    const line = projectStore((state) => state.line);
    const setLpdValue = lpdStore((state) => state.setLpdValue);
    const setNumberOfPsus = lpdStore((state) => state.setNumberOfPsus);
    const lines = lineStore((state) => state.lines)   
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


    const handlePsuNumberChange = (value)=> {
        setNumberOfPsus(lpdIndex, value)
    }
    const handleSetpsuSelectionChange = (event)=> {
        const value = event.value;
        setPsuSelection(value);
        getpsuCascadingLimit(value);
        setLpdValue(index,"psu_selected", value)
    }

    return (
        
        <div>
            <DropdownItem title={"Select the supply voltage for the PSU(s):"} placeHolder={lpd.supplyVoltage} options={lpdOptions.psuSupplyVoltageOptions} setModelValue={setLpdValue} index={index} property={"supplyVoltage"}/>
            <FormItem className="form-item">
                <FormLabel className="form-label" htmlFor="context">Select the PSU:</FormLabel>
                <FormInputDropdown
                id="context"
                value={psuSelection}
                options={psuOptions}
                onChange={handleSetpsuSelectionChange}
                />
            </FormItem>
            <LineLocationSelection item={lpd} index={index} setModelValue={setLpdValue} 
                        lineTitle='Enter the power source Line name: (e.g., UBM01)'
                        locationTitle='Enter the power source location designation: (e.g., XPDP01)'/>
            <InputTextItem title={"Enter the power source device tag: (e.g., CB01)"} placeHolder={lpd.cb} setModelValue={setLpdValue} index={index} property={"cb"}/>    
            <InputTextItemBasic title={`Calculate and enter the total number of PSU(s) needed for this cascading group: (${psuCascadingLimit})`} 
                data={lpd.psus.length} 
                onTypingFinished={handlePsuNumberChange}/>

            {
                lpd.psus.map((psu,index) => {
                    absIndex++;
                    return <HeadingItem label={`24VDC Power Supply ${absIndex}: ++${line}+${psu.psu_location}-${psu.psu_dt} | ${psuSelection}`} 
                    size={18} margin={"20px"} open={false} 
                    headerIcon={"/psu.png"}
                    children={<LpdPsuItem lpdIndex={lpdIndex} psuIndex={index} psu={psu} lpd={lpd}/>}/>
                })
            }
    </div>  
    );
};
export default LpdConfiguration;