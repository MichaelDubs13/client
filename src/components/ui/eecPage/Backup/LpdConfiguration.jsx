import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import { FormLabel, FormInputText, Button, FormItem, FormInputCheckbox, FormInputDropdown } from '@tesla/design-system-react';
import { useEffect, useState } from "react";
import "../Eec.css";
import { lpdStore } from "../Store/lpdStore";
// change this import to ethernet drops
//import PowerDropItem from "./PowerDropItem";
import ItemStore from "./ItemStore";
//import LpdLethPorts from "./LpdLethPorts";
import LpdPsuItem from "./LpdPsuItem";

const LpdConfiguration = ({lpd}) => {

    // Get plant, shop, line, and installationLocation values from store
    const plant = ItemStore.lineGroupItems.find(
        item => item.parameter === "FunctionalAssignment_(PLANT)"
    )?.value || "N/A";  // Using optional chaining and default value

    const shop = ItemStore.lineGroupItems.find(
        item => item.parameter === "FunctionDesignation_(SHOP)"
    )?.value || "N/A";
    
    const line = ItemStore.lineGroupItems.find(
        item => item.parameter === "InstallationSite_(LINE)"
    )?.value || "N/A";

    const installationLocation = ItemStore.lineGroupItems.find(
        item => item.parameter === "InstallationLocation"
    )?.value || "N/A";

    // Custom hook to manage the state of the form inputs
    function useLpdState(initialValue, property) {
        const [value, setValue] = useState(initialValue);
        const handleChange = (event) => {
            const newValue = event.target.value;
            setValue(newValue);
            lpd[property] = newValue;
        };
        return [value, handleChange, setValue];
    }

    // State variables for each form input
    const [Line, setLine] = useState(line);
    const [Location, setLocation] = useState(0);
    //const [psuSupplyVoltage, handleSetpsuSupplyVoltageChange] = useLpdState("", 'psu_supply_voltage'); //EEC var: _PSUSupplyVoltage_
    const [psuSupplyVoltage, setPsuSupplyVoltage] = useState(0);
    const [psuSelection, setPsuSelection] = useState(0);
    const [psuSelection120_240, handleSetpsuSelection120_240Change] = useLpdState(0, 'psu_selection_120_240'); //EEC var: s_PSU_Selection_120_240
    const [psuSelection400_480, handleSetpsuSelection400_480Change] = useLpdState(0, 'psu_selection_400_480'); //EEC var: s_PSU_Selection_400_480
    const [psuSupplySourceLocation, handleSetpsuSupplySourceLocationChange] = useLpdState("", 'psu_supply_source_location'); //EEC var: LocationDesignation
    const [psuSupplySourceDevice, handleSetpsuSupplySourceDeviceChange] = useLpdState("", 'psu_supply_source_device'); //EEC var: DeviceTag
    const [psuCascadingLimit, setPsuCascadingLimit] = useState(0);
    const [numberOfPsu, handleSetnumberOfPsuChange] = useLpdState("", 'number_of_psu'); //EEC var: Balluff_CLS2_BAE0133_NUmberOfPSU, Balluff_BAE00FL_BAE00ET_NumberOfPSU, Siemens_NumberOfPSU, Turck_NumberOfPSU, Puls_NumberOfPSU
    const [numberOf24V_Drops, handleSetnumberOf24V_DropsChange] = useLpdState(0, 'number_of_24V_Drops'); //EEC var: NumberOf24V_PowerDrops
    const [psuLocation, handleSetpsuLocationChange] = useLpdState(0, 'psu_location'); //EEC var: Location
    const [psuDT, handleSetpsuDTChange] = useLpdState(0, 'psu_location_dt'); //EEC var: PSU_DT
    const [psuToPsuCableLength, handleSetpsuToPsuCableLengthChange] = useLpdState(0, 'psu_to_psu_cable_length'); //EEC var: s_PSU-to-PSU_CableLength

    // these 2 constants are specific to Puls PSU
    const [psuClass2PortEnable, handleSetpsuClass2PortEnableChange] = useLpdState(false, 'psu_class2_port_enable'); //EEC var: b_Class2_Port_Needed
    const [numberOfClass2_Drops, handleSetnumberOfClass2_DropsChange] = useLpdState(0, 'number_of_class2_drops'); //EEC var: NumberOf24V_Class2_PowerDrop
    
    const [psuOutputPort1Sum, handleSetpsuOutputPort1SumChange] = useLpdState(0, 'psu_output_port1_sum');
    const [psuOutputPort2Sum, handleSetpsuOutputPort2SumChange] = useLpdState(0, 'psu_output_port2_sum');
    const [psuOutputPort3Sum, handleSetpsuOutputPort3SumChange] = useLpdState(0, 'psu_output_port3_sum');
    const [psuOutputPortClass2Sum, handleSetpsuOutputPortClass2SumChange] = useLpdState(0, 'psu_output_port_class2_sum');
    
    const handleSetpsuSupplyVoltageChange = (event)=> {
        const value = event.value;
        setPsuSupplyVoltage(value);
    }
    const handleSetLineChange = (event)=> {
        const value = event.target.value;
        setLine(value);
        lpd.line = value;
    }

    const handleSetLocationChange = (event)=> {
        const value = event.target.value;
        setLocation(value);
        lpd.location = value;
    }

    const handleSetpsuSelectionChange = (event)=> {
        const value = event.target.value;
        setPsuSelection(value);
    }

    const handleSetpsuCascadingLimitChange = (event)=> {
        const value = event.target.value;
        setPsuCascadingLimit(value);
    }

    const psuSupplyVoltageOptions = [
        { value: "120", label: "120V" },
        { value: "240", label: "240V" },
        { value: "400", label: "400V" },
        { value: "480", label: "480V" },
      ];

    const psuSelection120_240Options = [
    { value: "Balluff-BAE00ET", label: "Balluff: BAE00ET" },
    { value: "Balluff-BAE00FL", label: "Balluff: BAE00FL" },
    { value: "Balluff-BAE0133", label: "Balluff: BAE0133" },
    ];

    const psuSelection400_480Options = [
    { value: "Siemens", label: "Siemens: 6ES7148-4PC00-0HA0" },
    { value: "Turck", label: "Turck: PSU67-3P-1MP-2M5-24200-F" },
    { value: "Puls", label: "Puls: FPT500.247-064-102" },
    ];

    /* const getPsuSelectionOptions = () => {
        if (Number(psuSupplyVoltage) > 240) {
            return [
                {value: "Siemens", label: "Siemens: 6ES7148-4PC00-0HA0"},
                {value: "Turck", label: "Turck: PSU67-3P-1MP-2M5-24200-F"},
                {value: "Puls", label: "Puls: FPT500.247-064-102"},
                ];
        } else {
            return [
                {value: "Balluff-BAE00ET", label: "Balluff: BAE00ET"},
                {value: "Balluff-BAE00FL", label: "Balluff: BAE00FL"},
                {value: "Balluff-BAE0133", label: "Balluff: BAE0133"},
                ];
        }
    }; */

    // Update psuCascadeLimit based on psuSelection
    // Need help with this logic as it is not working as expected
    // it is not updating the UI when the psuSelection changes
    useEffect(() => {
        if (psuSelection === "Balluff-BAE00ET" || psuSelection === "Balluff-BAE00FL") {
            setPsuCascadingLimit('maximum of 2 at 120V, 4 at 240V');
        } else if (psuSelection === "Balluff-BAE0133") {
            setPsuCascadingLimit('maximum of 3');
        } else if (psuSelection === "Siemens") {
            setPsuCascadingLimit('maximum of 15');
        } else if (psuSelection === "Turck") {
            setPsuCascadingLimit('maximum of 8');
        } else if (psuSelection === "Puls") {
            setPsuCascadingLimit('maximum of 8');
        } else {
            setPsuCascadingLimit('maximum of 8');
        }
    },[psuSelection]);

    // Initilize lpdPsuItems based on numberOfPsu and psuSelection
    // this was intended to limit the number of psu items based on the psuSelection
    // but it is not working as expected
    useEffect(() => {
        const InitializePsuItems = () => {
            if (psuSelection === "Balluff-BAE00ET" || psuSelection === "Balluff-BAE00FL") {
                return {[psuSelection]: 2};
            } else if (psuSelection === "Balluff-BAE0133") {
                return {[psuSelection]: 3};
            } else if (psuSelection === "Siemens") {
                return {[psuSelection]: 15};
            } else if (psuSelection === "Turck") {
                return {[psuSelection]: 8};
            } else if (psuSelection === "Puls") {
                return {[psuSelection]: 8};
            } else {
                return {};
            }
        };
        setLpdPsuItems(InitializePsuItems());
    }, [psuSelection, numberOfPsu]);

    // State for each PSU item
    const [lpdPsuItems, setLpdPsuItems] = useState({
        [psuSelection]: numberOfPsu
    });

    // Create array of PSU items
    const renderLpdPsuItems = () => {
        return Array.from({ length: numberOfPsu }).map((_, index) => (
            <LpdPsuItem
                key={`${psuSelection}-${index}`}
                lpdPsuItem={psuSelection}
                psuLine={Line}
                psuLocation={psuLocation}
                psuDT={psuDT}
                numberOfPsu={numberOfPsu}
                numberOf24V_Drops={numberOf24V_Drops}
                index={index}
                absIndex={index + 1}
                line={Line}
            />
        ));
    }; 

    // code for creating collapsible menus
    const [expandedStates, setExpandedStates] = useState({
        menu1: true,
    });

    const createToggleHandler = (menuKey) => () => {
        setExpandedStates(prev => ({
            ...prev,
            [menuKey]: !prev[menuKey]
        }));
    };

    const handleToggleClick1 = createToggleHandler('menu1');
    

    return (
        
        <div>
            <div className="div-inline">
                <IconContext.Provider value={{ color:"black", size:20 }}>
                {
                    expandedStates.menu1?<IoIosArrowDown/>:<IoIosArrowForward/>
                }
                </IconContext.Provider>
                <button style={{fontSize:16, fontWeight:"bolder", marginBottom:"10px"}} 
                    onClick={handleToggleClick1}>
                    24V Field mounted Power Supply Unit (PSU) Configuration
                </button>
                {
                    expandedStates.menu1 &&
                    <div>
                    <FormItem className="form-item">
                        <FormLabel className="form-label" htmlFor="context">Select the supply voltage for the PSU(s):</FormLabel>
                        <FormInputDropdown
                        id="context"
                        value={psuSupplyVoltage}
                        selected={psuSupplyVoltage}
                        options={psuSupplyVoltageOptions}                        
                        onOptionSelect={handleSetpsuSupplyVoltageChange}
                        />
                    </FormItem> 
                    <FormItem className="form-item">
                        <FormLabel className="form-label" htmlFor="context">Select the PSU:</FormLabel>
                        <FormInputDropdown
                        id="context"
                        value={psuSelection}
                        options={
                            Number(psuSupplyVoltage) <= 240 ?
                            [
                                {value: "Balluff-BAE00ET", label: "Balluff: BAE00ET"},
                                {value: "Balluff-BAE00FL", label: "Balluff: BAE00FL"},
                                {value: "Balluff-BAE0133", label: "Balluff: BAE0133"},
                            ] : [
                                {value: "Siemens", label: "Siemens: 6ES7148-4PC00-0HA0"},
                                {value: "Turck", label: "Turck: PSU67-3P-1MP-2M5-24200-F"},
                                {value: "Puls", label: "Puls: FPT500.247-064-102"},
                            ]
                        }
                        onChange={handleSetpsuSelectionChange}
                        />
                    </FormItem>
                    
                    <FormItem className="form-item">
                        <FormLabel className="form-label" htmlFor="context">Enter the power source Line name: (e.g., UBM01)</FormLabel>
                        <FormInputText
                        id="context"
                        value={Line}
                        onChange={handleSetLineChange}
                        />
                    </FormItem>
                    <FormItem className="form-item">
                        <FormLabel className="form-label" htmlFor="context">Enter the power source location designation: (e.g., XPDP01)</FormLabel>
                        <FormInputText
                        id="context"
                        value={psuSupplySourceLocation}
                        onChange={handleSetpsuSupplySourceLocationChange}
                        />
                    </FormItem>
                    <FormItem className="form-item">
                        <FormLabel className="form-label" htmlFor="context">Enter the power source device tag: (e.g., CB01)</FormLabel>
                        <FormInputText
                        id="context"
                        value={psuSupplySourceDevice}
                        onChange={handleSetpsuSupplySourceDeviceChange}
                        />
                    </FormItem> 
                    <FormItem className="form-item">
                        <FormLabel className="form-label" htmlFor="context">Calculate and enter the total number of PSU(s) needed for this cascading group: ({psuCascadingLimit})</FormLabel>
                        <FormInputText
                        id="context"
                        value={numberOfPsu}
                        onChange={handleSetnumberOfPsuChange}
                        />
                    </FormItem> 
                
                    {/* Cascading PSUs within this configuration */}
                        <>
                            {renderLpdPsuItems()}
                        </>
                    
                    </div>
                }
        </div>       
    </div>  
    );
};
export default LpdConfiguration;