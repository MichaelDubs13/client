import ListGroup from "./ListGroup";
import mcpStore from "../../../store/eec/mcpStore";
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import { FormLabel, FormInputText, Button, FormItem, FormInputCheckbox, FormInputDropdown } from '@tesla/design-system-react';
import { useEffect, useState } from "react";
import "./Eec.css";
// change this import to ethernet drops
import PowerDropItem from "./PowerDropItem";
import ItemStore from "../../../store/eec/ItemStore";

const McpConfiguration = ({mcp}) => {

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

    // change this to local ethernet drops
    //const addBranchCircuit = mcpStore((state) => state.addBranchCircuit);  //New code
    //const addBranchCircuit = pdpStore((state) => state.addBranchCircuit);  //OG code

    // Custom hook to manage the state of the form inputs
    function useMcpState(initialValue, property) {
        const [value, setValue] = useState(initialValue);
        const handleChange = (event) => {
            const newValue = event.target.value;
            setValue(newValue);
            mcp[property] = newValue;
        };
        return [value, handleChange, setValue];
    }

    // State variables for each form input
    const [Line, setLine] = useState(line);
    const [Location, setLocation] = useState(0);
    const [mcpMountingLocation, handleSetmcpMountingLocationChange] = useMcpState(0, 'mcpMountingLocation');
    const [mcpPSU_Location, handleSetmcpPSU_LocationChange] = useMcpState(0, 'psu_location');
    const [mcpPSU_DT, handleSetmcpPSU_DTChange] = useMcpState(0, 'psu_location_dt');
    const [mcpUpsIp, handleSetmcpUpsIpChange] = useMcpState(0, 'ups_ip');
    //const [plcNetworkSwitchRequired, handleSetplcNetworkSwitchRequiredChange] = useMcpState(false, 'plc_network_switch_required');
    const [plcPlantIp, handleSetplcPlantIpChange] = useMcpState(0, 'plc_plant_ip');
    const [plcToPlcIp, handleSetplcToPlcIpChange] = useMcpState(0, 'plc_to_plc_ip');
    const [plcLocalIp, handleSetplcLocalIpChange] = useMcpState(0, 'plc_local_ip');
    const [plcLocalIpSecondary, handleSetplcLocalIpSecondaryChange] = useMcpState(0, 'plc_local_ip_secondary');
    const [plcID, handleSetplcIDChange] = useMcpState(0, 'plc_id');
    const [plcPortX1P2RTargetLocation, handleSetplcPortX1P2RTargetLocationChange] = useMcpState(0, 'plc_port_x1p2r_target_location');
    const [plcPortX1P2RTargetDT, handleSetplcPortX1P2RTargetDTChange] = useMcpState(0, 'plc_port_x1p2r_target_dt');
    const [kedPlantIp, handleSetkedPlantIpChange] = useMcpState(0, 'ked_plant_ip');
    const [kedPlcToPlcIp, handleSetkedPlcToPlcIpChange] = useMcpState(0, 'ked_plc_to_plc_ip');
    const [kedLocalIp, handleSetkedLocalIpChange] = useMcpState(0, 'ked_local_ip');
    const [kedLocalIpSecondary, handleSetkedLocalIpSecondaryChange] = useMcpState(0, 'ked_local_ip_secondary');
    const [kedPort4TargetLocation, handleSetkedPort4TargetLocationChange] = useMcpState(0, 'ked_port4_target_location');
    const [kedPort4TargetDT, handleSetkedPort4TargetDTChange] = useMcpState(0, 'ked_port4_target_dt');
    const [kedPort5TargetLocation, handleSetkedPort5TargetLocationChange] = useMcpState(0, 'ked_port5_target_location');
    const [kedPort5TargetDT, handleSetkedPort5TargetDTChange] = useMcpState(0, 'ked_port5_target_dt');
    const [lethPlantIp, handleSetlethPlantIpChange] = useMcpState(0, 'leth_plant_ip');
    const [lethPlcToPlcIp, handleSetlethPlcToPlcIpChange] = useMcpState(0, 'leth_plc_to_plc_ip');
    const [lethLocalIp, handleSetlethLocalIpChange] = useMcpState(0, 'leth_local_ip');
    const [lethLocalIpSecondary, handleSetlethLocalIpSecondaryChange] = useMcpState(0, 'leth_local_ip_secondary');
    const [lethPort2TargetLocation, handleSetlethPort2TargetLocationChange] = useMcpState(0, 'leth_port2_target_location');
    const [lethPort2TargetDT, handleSetlethPort2TargetDTChange] = useMcpState(0, 'leth_port2_target_dt');
    const [lethPort2TargetPort, handleSetlethPort2TargetPortChange] = useMcpState(0, 'leth_port2_target_port');
    const [lethPort2TargetCableLength, handleSetlethPort2TargetCableLengthChange] = useMcpState(0, 'leth_port2_target_cable_length');
    const [lethPort3TargetLocation, handleSetlethPort3TargetLocationChange] = useMcpState(0, 'leth_port3_target_location');
    const [lethPort3TargetDT, handleSetlethPort3TargetDTChange] = useMcpState(0, 'leth_port3_target_dt');
    const [lethPort3TargetPort, handleSetlethPort3TargetPortChange] = useMcpState(0, 'leth_port3_target_port');
    const [lethPort3TargetCableLength, handleSetlethPort3TargetCableLengthChange] = useMcpState(0, 'leth_port3_target_cable_length');
    const [lethPort4TargetLocation, handleSetlethPort4TargetLocationChange] = useMcpState(0, 'leth_port4_target_location');
    const [lethPort4TargetDT, handleSetlethPort4TargetDTChange] = useMcpState(0, 'leth_port4_target_dt');
    const [lethPort4TargetPort, handleSetlethPort4TargetPortChange] = useMcpState(0, 'leth_port4_target_port');
    const [lethPort4TargetCableLength, handleSetlethPort4TargetCableLengthChange] = useMcpState(0, 'leth_port4_target_cable_length');
    const [lethNumberOfPorts, handleSetlethNumberOfPortsChange] = useMcpState(0, 'leth_number_of_ports');
    const [ethPlantIp, handleSetethPlantIpChange] = useMcpState(0, 'eth_plant_ip');
    const [ethPlcToPlcIp, handleSetethPlcToPlcIpChange] = useMcpState(0, 'eth_plc_to_plc_ip');
    const [ethLocalIp, handleSetethLocalIpChange] = useMcpState(0, 'eth_local_ip');
    const [ethLocalIpSecondary, handleSetethLocalIpSecondaryChange] = useMcpState(0, 'eth_local_ip_secondary');
    const [ethPort1TargetLocation, handleSetethPort1TargetLocationChange] = useMcpState(0, 'eth_port1_target_location');
    const [ethPort2TargetLocation, handleSetethPort2TargetLocationChange] = useMcpState(0, 'eth_port2_target_location');

    const [plcNetworkSwitchRequired, setplcNetworkSwitchRequired] = useState(false);
    
    //const [mcpMountingLocation, setmcpMountingLocation] = useState(0);
    /* const [mcpPSU_Location, setmcpPSU_Location] = useState(0);
    const [mcpPSU_DT, setmcpPSU_DT] = useState(0);
    const [mcpUpsIpAddress, setmcpUpsIpAddress] = useState(0);
    const [plcNetworkSwitchRequired, setplcNetworkSwitchRequired] = useState(false);
    const [plcPlantIpAddress, setplcPlantIpAddress] = useState(0);
    const [plcToPlcIpAddress, setplcToPlcIpAddress] = useState(0);
    const [plcLocalIpAddress, setplcLocalIpAddress] = useState(0);
    const [plcLocalIpAddressSecondary, setplcLocalIpAddressSecondary] = useState(0);
    const [plcID, setplcID] = useState(0);
    const [plcPortX1TargetLocation, setplcPortX1TargetLocation] = useState(0);
    const [plcPortX1TargetDT, setplcPortX1TargetDT] = useState(0);
    const [kedPlantIpAddress, setkedPlantIpAddress] = useState(0);
    const [kedPlcToPlcIpAddress, setkedPlcToPlcIpAddress] = useState(0);
    const [kedLocalIpAddress, setkedLocalIpAddress] = useState(0);
    const [kedLocalIpAddressSecondary, setkedLocalIpAddressSecondary] = useState(0);
    const [kedPort4TargetLocation, setkedPort4TargetLocation] = useState(0);
    const [kedPort4TargetDT, setkedPort4TargetDT] = useState(0);
    const [kedPort5TargetLocation, setkedPort5TargetLocation] = useState(0);
    const [kedPort5TargetDT, setkedPort5TargetDT] = useState(0);
    const [lethPlantIpAddress, setlethPlantIpAddress] = useState(0);
    const [lethPLCtoPLCIpAddress, setlethPLCtoPLCIpAddress] = useState(0);
    const [lethLocalIpAddress, setlethLocalIpAddress] = useState(0);
    const [lethLocalIpAddressSecondary, setlethLocalIpAddressSecondary] = useState(0);
    const [lethPort2TargetLocation, setlethPort2TargetLocation] = useState(0);
    const [lethPort2TargetDT, setlethPort2TargetDT] = useState(0);
    const [lethPort2TargetPort, setlethPort2TargetPort] = useState(0);
    const [lethPort2TargetCableLength, setlethPort2TargetCableLength] = useState(0);
    const [lethPort3TargetLocation, setlethPort3TargetLocation] = useState(0);
    const [lethPort3TargetDT, setlethPort3TargetDT] = useState(0);
    const [lethPort3TargetPort, setlethPort3TargetPort] = useState(0);
    const [lethPort3TargetCableLength, setlethPort3TargetCableLength] = useState(0);
    const [lethPort4TargetLocation, setlethPort4TargetLocation] = useState(0);
    const [lethPort4TargetDT, setlethPort4TargetDT] = useState(0);
    const [lethPort4TargetPort, setlethPort4TargetPort] = useState(0);
    const [lethPort4TargetCableLength, setlethPort4TargetCableLength] = useState(0);
    const [lethNumberOfPorts, setlethNumberOfPorts] = useState(0);
    const [ethPlantIpAddress, setethPlantIpAddress] = useState(0);
    const [ethPLCtoPLCIpAddress, setethPLCtoPLCIpAddress] = useState(0);
    const [ethLocalIpAddress, setethLocalIpAddress] = useState(0);
    const [ethLocalIpAddressSecondary, setethLocalIpAddressSecondary] = useState(0);
    const [ethPort1TargetLocation, setethPort1TargetLocation] = useState(0);
    const [ethPort2TargetLocation, setethPort2TargetLocation] = useState(0); */

    
    const handleSetLineChange = (event)=> {
        const value = event.target.value;
        setLine(value);
        mcp.line = value;
    }

    const handleSetLocationChange = (event)=> {
        const value = event.target.value;
        setLocation(value);
        mcp.location = value;
    }

    const handleSetplcNetworkSwitchRequiredChange = (event)=> {
        const value = event.target.checked;
        setplcNetworkSwitchRequired(value);
        mcp.plc_network_switch_required = value;
    }

    /* const handleSetmcpMountingLocationChange = (event)=> {
        const value = event.target.value;
        setmcpMountingLocation(value);
        mcp.mcpMountingLocation = value;
    } */

    /* const handleSetmcpPSU_LocationChange = (event)=> {
        const value = event.target.value;
        setmcpPSU_Location(value);
        mcp.psu_location = value;
    } */

    /* const handleSetmcpPSU_DTChange = (event)=> {
        const value = event.target.value;
        setmcpPSU_DT(value);
        mcp.psu_location_dt = value;
    } */

    /* const handleSetlethPort2TargetCableLengthChange = (event)=> {
        const value = event.target.value;
        setlethPort2TargetCableLength(value);
        mcp.Gigabit_Port2_CableLength = value;
    } */

    /* const handleSetlethPort3TargetCableLengthChange = (event)=> {
        const value = event.target.value;
        setlethPort3TargetCableLength(value);
        mcp.Gigabit_Port3_CableLength = value;
    } */

    /* const handleSetlethPort4TargetCableLengthChange = (event)=> {
        const value = event.target.value;
        setlethPort4TargetCableLength(value);
        mcp.Gigabit_Port4_CableLength = value;
    } */

    const cableLengthOptions = [
        { value: "NULL", label: "NULL" },
        { value: "1.5 m", label: "1.5 m" },
        { value: "3 m", label: "3 m" },
        { value: "5 m", label: "5 m" },
        { value: "10 m", label: "10 m" },
        { value: "15 m", label: "15 m" },
        { value: "20 m", label: "20 m" },
      ];

      const lethNumberOfPortOptions = [
        { value: "0", label: "0" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
      ];
    
    useEffect(() => {
        const newPlcID = '${Line}-${Location}-PLC01'; // need help with this to display the actual values of Line and Location
        handleSetplcIDChange({ target: { value: newPlcID }});
    }, [Line, Location, handleSetplcIDChange]);

    /* const [expanded, setExpanded] = useState(true);
    const [expandedMenu2, setExpandedMenu2] = useState(true);
    const [expandedMenu3, setExpandedMenu3] = useState(true);
    const [expandedMenu4, setExpandedMenu4] = useState(true);
    const [expandedMenu5, setExpandedMenu5] = useState(true);
    const [expandedMenu6, setExpandedMenu6] = useState(true);
    
    const handleToggleClick = async () => {
        if (!expanded) {
          setExpanded(true);
          
        } else {
          setExpanded(false);
        }
      };

    const handleToggleClick2 = async () => {
    if (!expandedMenu2) {
        setExpandedMenu2(true);
        
    } else {
        setExpandedMenu2(false);
    }
    };

    const handleToggleClick3 = async () => {
        if (!expandedMenu3) {
            setExpandedMenu3(true);
            
        } else {
            setExpandedMenu3(false);
        }
        };

    const handleToggleClick4 = async () => {
        if (!expandedMenu4) {
            setExpandedMenu4(true);
            
        } else {
            setExpandedMenu4(false);
        }
        };

    const handleToggleClick5 = async () => {
        if (!expandedMenu5) {
            setExpandedMenu5(true);
            
        } else {
            setExpandedMenu5(false);
        }
        };

    const handleToggleClick6 = async () => {
        if (!expandedMenu6) {
            setExpandedMenu6(true);
            
        } else {
            setExpandedMenu6(false);
        }
        }; */

    const [expandedStates, setExpandedStates] = useState({
        menu1: true,
        menu2: true,
        menu3: true,
        menu4: true,
        menu5: true,
        menu6: true,
        menu7: true, // submenu for menu 3
        menu8: true, // submenu for menu 4
        menu9: true, // submenu for menu 5
        menu10: true, // submenu for menu 6
    });

    const createToggleHandler = (menuKey) => () => {
        setExpandedStates(prev => ({
            ...prev,
            [menuKey]: !prev[menuKey]
        }));
    };

    const handleToggleClick1 = createToggleHandler('menu1');
    const handleToggleClick2 = createToggleHandler('menu2');
    const handleToggleClick3 = createToggleHandler('menu3');
    const handleToggleClick4 = createToggleHandler('menu4');
    const handleToggleClick5 = createToggleHandler('menu5');
    const handleToggleClick6 = createToggleHandler('menu6');
    const handleToggleClick7 = createToggleHandler('menu7');
    const handleToggleClick8 = createToggleHandler('menu8');
    const handleToggleClick9 = createToggleHandler('menu9');
    const handleToggleClick10 = createToggleHandler('menu10');

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
                    Main Control Panel ++{Line}+{Location} Parameters
                </button>
                {
                    expandedStates.menu1 &&
                    <div>
                    <FormItem className="form-item">
                        <FormLabel className="form-label" htmlFor="context">Plant name</FormLabel>
                        <FormInputText
                        id="context"
                        value={plant}
                        readOnly/>
                    </FormItem> 
                    <FormItem className="form-item">
                        <FormLabel className="form-label" htmlFor="context">Shop name</FormLabel>
                        <FormInputText
                        id="context"
                        value={shop}
                        readOnly/>
                    </FormItem> 
                    <FormItem className="form-item">
                        <FormLabel className="form-label" htmlFor="context">Manufacturing Line name (e.g., UBM1, DOR1)</FormLabel>
                        <FormInputText
                        id="context"
                        value={Line}
                        onChange={handleSetLineChange}/>
                    </FormItem>   
                    <FormItem className="form-item">
                        <FormLabel className="form-label" htmlFor="context">Location designation (e.g., MCP01, MCP02)</FormLabel>
                        <FormInputText
                        id="context"
                        value={Location}
                        onChange={handleSetLocationChange}/>
                    </FormItem>  
                
                    {/* Panel monuting location and options */}
                    <div className="div-inline">
                        <IconContext.Provider value={{ color:"black", size:20 }}>
                        {
                            expandedStates.menu2?<IoIosArrowDown/>:<IoIosArrowForward/>
                        }
                        </IconContext.Provider>
                        <button style={{fontSize:16, fontWeight:"bolder", marginBottom:"10px"}} 
                            onClick={handleToggleClick2}>
                            Panel Mounting Location and Options
                        </button>
                        {
                            expandedStates.menu2 &&
                            <div>
                                <FormItem className="form-item">
                                    <FormLabel className="form-label" htmlFor="context">MCP mounted in Station number (e.g., 00010)</FormLabel>
                                    <FormInputText
                                    id="context"
                                    value={mcpMountingLocation}
                                    onChange={handleSetmcpMountingLocationChange}/>
                                </FormItem>    
                                <FormItem className="form-item">
                                    <FormLabel className="form-label" htmlFor="context">MCP power source is from what location (i.e., Station number) (e.g., 00010)</FormLabel>
                                    <FormInputText
                                    id="context"
                                    value={mcpPSU_Location}
                                    onChange={handleSetmcpPSU_LocationChange}/>
                                </FormItem>   
                                <FormItem className="form-item">
                                    <FormLabel className="form-label" htmlFor="context">MCP power source is from what device (e.g., PSU01)</FormLabel>
                                    <FormInputText
                                    id="context"
                                    value={mcpPSU_DT}
                                    onChange={handleSetmcpPSU_DTChange}/>
                                </FormItem>  
                                <FormItem className="form-item">
                                    <FormLabel className="form-label" htmlFor="context">UPS01 Local IP Address (e.g., 192.168.1.x)</FormLabel>
                                    <FormInputText
                                    id="context"
                                    value={mcpUpsIp}
                                    onChange={handleSetmcpUpsIpChange}/>
                                </FormItem> 
                                {/*Check box for PLC-to-PLC Ethernet switch requirement */}
                                <FormItem className="form-item">
                                <FormInputCheckbox
                                    id="context"
                                    checked={plcNetworkSwitchRequired}
                                    label="PLC-to-PLC Ethernet switch required?"
                                    onChange={handleSetplcNetworkSwitchRequiredChange}/>
                                </FormItem>
                            </div>
                        }

                        {/* PLC01 Configuration parameters */}
                        <div className="div-inline">
                            <IconContext.Provider value={{ color:"black", size:20 }}>
                            {
                                expandedStates.menu3?<IoIosArrowDown/>:<IoIosArrowForward/>
                            }
                            </IconContext.Provider>
                            <button style={{fontSize:16, fontWeight:"bolder", marginBottom:"10px"}} 
                                onClick={handleToggleClick3}>
                                PLC01 Configuration parameters
                            </button>
                            {
                                expandedStates.menu3 &&
                                <div>
                                    <FormItem className="form-item">
                                        <FormLabel className="form-label" htmlFor="context">Plant IP Address (e.g., 10.x.x.x)</FormLabel>
                                        <FormInputText
                                        id="context"
                                        value={plcPlantIp}
                                        onChange={handleSetplcPlantIpChange}/>
                                    </FormItem> 
                                    <FormItem className="form-item">
                                        <FormLabel className="form-label" htmlFor="context">PLC-to-PLC IP Address (e.g., 192.168.136.x)</FormLabel>
                                        <FormInputText
                                        id="context"
                                        value={plcToPlcIp}
                                        onChange={handleSetplcToPlcIpChange}/>
                                    </FormItem>
                                    <FormItem className="form-item">
                                        <FormLabel className="form-label" htmlFor="context">Local IP Address (e.g., 192.168..x)</FormLabel>
                                        <FormInputText
                                        id="context"
                                        value={plcLocalIp}
                                        pattern="[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+" // need help to verify if this will keep the input to an actual IP address
                                        onChange={handleSetplcLocalIpChange}/>
                                    </FormItem>
                                    <FormItem className="form-item">
                                        <FormLabel className="form-label" htmlFor="context">Secondary Local IP Address (e.g., 192.168.x.x)</FormLabel>
                                        <FormInputText
                                        id="context"
                                        value={plcLocalIpSecondary}
                                        readOnly
                                        //onChange={handleSetplcLocalIpSecondaryChange}
                                        />
                                    </FormItem>
                                    <FormItem className="form-item">
                                        <FormLabel className="form-label" htmlFor="context">PLC ID (used to identify all devices controlled by this PLC)</FormLabel>
                                        <FormInputText
                                        id="context"
                                        value={plcID} // need help in changing the display output to values to 'Line-Location-PLC01'
                                        pattern="[A-Za-z0-9]+-[A-Za-z0-9]+-PLC01"
                                        onChange={handleSetplcIDChange}/>
                                    </FormItem>

                                    {/* PLC01 - Port configuration parameters */}
                                    <div className="div-inline">
                                        <IconContext.Provider value={{ color:"black", size:20 }}>
                                        {
                                            expandedStates.menu7?<IoIosArrowDown/>:<IoIosArrowForward/>
                                        }
                                        </IconContext.Provider>
                                        <button style={{fontSize:16, fontWeight:"bolder", marginBottom:"10px"}} 
                                            onClick={handleToggleClick7}>
                                            PLC01 - Port configuration parameters
                                        </button>
                                        {
                                            expandedStates.menu7 &&
                                            <div>
                                                <FormItem className="form-item">
                                                    <FormLabel className="form-label" htmlFor="context">Port X1:P2R - Target location (i.e., Station number) (e.g., 00010)</FormLabel>
                                                    <FormInputText
                                                    id="context"
                                                    value={plcPortX1P2RTargetLocation}
                                                    readOnly
                                                    //onChange={handleSetplcPortX1P2RTargetLocationChange}
                                                    />
                                                </FormItem>
                                                <FormItem className="form-item">
                                                    <FormLabel className="form-label" htmlFor="context">Port X1:P2R - Target device (e.g., MIO01)</FormLabel>
                                                    <FormInputText
                                                    id="context"
                                                    value={plcPortX1P2RTargetDT}
                                                    readOnly
                                                    //onChange={handleSetplcPortX1P2RTargetDTChange}
                                                    />
                                                </FormItem>
                                            </div>
                                    }
                                    </div>
                                </div>
                            }

                            {/* KED - Plant switch configuration parameters */}
                            <div className="div-inline">
                                <IconContext.Provider value={{ color:"black", size:20 }}>
                                {
                                    expandedStates.menu4?<IoIosArrowDown/>:<IoIosArrowForward/>
                                }
                                </IconContext.Provider>
                                <button style={{fontSize:16, fontWeight:"bolder", marginBottom:"10px"}} 
                                    onClick={handleToggleClick4}>
                                    KED - Plant switch configuration parameters
                                </button>
                                {
                                    expandedStates.menu4 &&
                                    <div>
                                        <FormItem className="form-item">
                                            <FormLabel className="form-label" htmlFor="context">Plant IP Address (e.g., 10.x.x.x)</FormLabel>
                                            <FormInputText
                                            id="context"
                                            value={kedPlantIp}
                                            onChange={handleSetkedPlantIpChange}/>
                                        </FormItem> 
                                        <FormItem className="form-item">
                                            <FormLabel className="form-label" htmlFor="context">PLC-to-PLC IP Address (e.g., 192.168.136.x)</FormLabel>
                                            <FormInputText
                                            id="context"
                                            value={kedPlcToPlcIp}
                                            onChange={handleSetkedPlcToPlcIpChange}/>
                                        </FormItem>
                                        <FormItem className="form-item">
                                            <FormLabel className="form-label" htmlFor="context">Local IP Address (e.g., 192.168..x)</FormLabel>
                                            <FormInputText
                                            id="context"
                                            value={kedLocalIp}
                                            onChange={handleSetkedLocalIpChange}/>
                                        </FormItem>
                                        <FormItem className="form-item">
                                            <FormLabel className="form-label" htmlFor="context">Secondary Local IP Address (e.g., 192.168.x.x)</FormLabel>
                                            <FormInputText
                                            id="context"
                                            value={kedLocalIpSecondary}
                                            readOnly
                                            //onChange={handleSetkedLocalIpSecondaryChange}
                                            />
                                        </FormItem>

                                        {/* KED - Port configuration parameters */}
                                        <div className="div-inline">
                                            <IconContext.Provider value={{ color:"black", size:20 }}>
                                            {
                                                expandedStates.menu8?<IoIosArrowDown/>:<IoIosArrowForward/>
                                            }
                                            </IconContext.Provider>
                                            <button style={{fontSize:16, fontWeight:"bolder", marginBottom:"10px"}} 
                                                onClick={handleToggleClick8}>
                                                KED - Port configuration parameters
                                            </button>
                                            {
                                                expandedStates.menu8 &&
                                                <div>
                                                    <FormItem className="form-item">
                                                        <FormLabel className="form-label" htmlFor="context">Port 4 - Target location (e.g., 00010)</FormLabel>
                                                        <FormInputText
                                                        id="context"
                                                        value={kedPort4TargetLocation}
                                                        readOnly
                                                        //onChange={handleSetkedPort4TargetLocationChange}
                                                        />
                                                    </FormItem>
                                                    <FormItem className="form-item">
                                                        <FormLabel className="form-label" htmlFor="context">Port 4 - Target device (e.g., MIO01)</FormLabel>
                                                        <FormInputText
                                                        id="context"
                                                        value={kedPort4TargetDT}
                                                        readOnly
                                                        //onChange={handleSetkedPort4TargetDTChange}
                                                        />
                                                    </FormItem> 
                                                    <FormItem className="form-item">
                                                        <FormLabel className="form-label" htmlFor="context">Port 5  - Target location (e.g., 00010)</FormLabel>
                                                        <FormInputText
                                                        id="context"
                                                        value={kedPort5TargetLocation}
                                                        readOnly
                                                        //onChange={handleSetkedPort5TargetLocationChange}
                                                        />
                                                    </FormItem>
                                                    <FormItem className="form-item">
                                                        <FormLabel className="form-label" htmlFor="context">Port 5  - Target device (e.g., MIO01)</FormLabel>
                                                        <FormInputText
                                                        id="context"
                                                        value={kedPort5TargetDT}
                                                        readOnly
                                                        //onChange={handleSetkedPort5TargetDTChange}
                                                        />
                                                    </FormItem>
                                                </div>
                                            }
                                            </div>
                                    </div>
                                }
                            
                            {/* LETH - Configuration parameters */}
                            <div className="div-inline">
                                <IconContext.Provider value={{ color:"black", size:20 }}>
                                {
                                    expandedStates.menu5?<IoIosArrowDown/>:<IoIosArrowForward/>
                                }
                                </IconContext.Provider>
                                <button style={{fontSize:16, fontWeight:"bolder", marginBottom:"10px"}} 
                                    onClick={handleToggleClick5}>
                                    LETH - Configuration parameters
                                </button>
                                {
                                    expandedStates.menu5 &&
                                    <div>
                                        <FormItem className="form-item">
                                            <FormLabel className="form-label" htmlFor="context">Plant IP Address (e.g., 10.x.x.x)</FormLabel>
                                            <FormInputText
                                            id="context"
                                            value={lethPlantIp}
                                            onChange={handleSetlethPlantIpChange}/>
                                        </FormItem> 
                                        <FormItem className="form-item">
                                            <FormLabel className="form-label" htmlFor="context">PLC-to-PLC IP Address (e.g., 192.168.136.x)</FormLabel>
                                            <FormInputText
                                            id="context"
                                            value={lethPlcToPlcIp}
                                            readOnly
                                            //onChange={handleSetlethPlcToPlcIpChange}
                                            />
                                        </FormItem>
                                        <FormItem className="form-item">
                                            <FormLabel className="form-label" htmlFor="context">Local IP Address (e.g., 192.168..x)</FormLabel>
                                            <FormInputText
                                            id="context"
                                            value={lethLocalIp}
                                            onChange={handleSetlethLocalIpChange}/>
                                        </FormItem>
                                        <FormItem className="form-item">
                                            <FormLabel className="form-label" htmlFor="context">Secondary Local IP Address (e.g., 192.168.x.x)</FormLabel>
                                            <FormInputText
                                            id="context"
                                            value={lethLocalIpSecondary}
                                            onChange={handleSetlethLocalIpSecondaryChange}/>
                                        </FormItem>

                                        {/* LETH - Port configuration parameters */}
                                        <div className="div-inline">
                                            <IconContext.Provider value={{ color:"black", size:20 }}>
                                            {
                                                expandedStates.menu9?<IoIosArrowDown/>:<IoIosArrowForward/>
                                            }
                                            </IconContext.Provider>
                                            <button style={{fontSize:16, fontWeight:"bolder", marginBottom:"10px"}} 
                                                onClick={handleToggleClick9}>
                                                LETH - Port configuration parameters
                                            </button>
                                            {
                                                expandedStates.menu9 &&
                                                <div>
                                                    <div>
                                                        <h7>Port 2</h7>
                                                    </div>  
                                                    <FormItem className="form-item">
                                                        <FormLabel className="form-label" htmlFor="context">Target location (e.g., 00010)</FormLabel>
                                                        <FormInputText
                                                        id="context"
                                                        value={lethPort2TargetLocation}
                                                        onChange={handleSetlethPort2TargetLocationChange}/>
                                                    </FormItem>
                                                    <FormItem className="form-item">
                                                        <FormLabel className="form-label" htmlFor="context">Target device (e.g., LETH01)</FormLabel>
                                                        <FormInputText
                                                        id="context"
                                                        value={lethPort2TargetDT}
                                                        onChange={handleSetlethPort2TargetDTChange}/>
                                                    </FormItem> 
                                                    <FormItem className="form-item">
                                                        <FormLabel className="form-label" htmlFor="context">Target port ID (e.g., P1)</FormLabel>
                                                        <FormInputText
                                                        id="context"
                                                        value={lethPort2TargetPort}
                                                        onChange={handleSetlethPort2TargetPortChange}/>
                                                    </FormItem> 
                                                    <FormItem className="form-item">
                                                        <FormLabel className="form-label" htmlFor="context">Cable length selection</FormLabel>
                                                        <FormInputText
                                                        id="context"
                                                        options={cableLengthOptions}
                                                        value={lethPort2TargetCableLength}
                                                        onChange={handleSetlethPort2TargetCableLengthChange}/>
                                                    </FormItem> 
                                                    <div>
                                                        <h7>Port 3</h7>
                                                    </div>
                                                    <FormItem className="form-item">
                                                        <FormLabel className="form-label" htmlFor="context">Target location (e.g., 00010)</FormLabel>
                                                        <FormInputText
                                                        id="context"
                                                        value={lethPort3TargetLocation}
                                                        onChange={handleSetlethPort3TargetLocationChange}/>
                                                    </FormItem>
                                                    <FormItem className="form-item">
                                                        <FormLabel className="form-label" htmlFor="context">Target device (e.g., LETH01)</FormLabel>
                                                        <FormInputText
                                                        id="context"
                                                        value={lethPort3TargetDT}
                                                        onChange={handleSetlethPort3TargetDTChange}/>
                                                    </FormItem>
                                                    <FormItem className="form-item">
                                                        <FormLabel className="form-label" htmlFor="context">Target port ID (e.g., P1)</FormLabel>
                                                        <FormInputText
                                                        id="context"
                                                        value={lethPort3TargetPort}
                                                        onChange={handleSetlethPort3TargetPortChange}/>
                                                    </FormItem> 
                                                    <FormItem className="form-item">
                                                        <FormLabel className="form-label" htmlFor="context">Cable length selection</FormLabel>
                                                        <FormInputText
                                                        id="context"
                                                        options={cableLengthOptions}
                                                        value={lethPort3TargetCableLength}
                                                        onChange={handleSetlethPort3TargetCableLengthChange}/>
                                                    </FormItem> 
                                                    <div>
                                                        <h7>Port 4</h7>
                                                    </div>
                                                    <FormItem className="form-item">
                                                        <FormLabel className="form-label" htmlFor="context">Target location (e.g., 00010)</FormLabel>
                                                        <FormInputText
                                                        id="context"
                                                        value={lethPort4TargetLocation}
                                                        onChange={handleSetlethPort4TargetLocationChange}/>
                                                    </FormItem>
                                                    <FormItem className="form-item">
                                                        <FormLabel className="form-label" htmlFor="context">Target device (e.g., LETH01)</FormLabel>
                                                        <FormInputText
                                                        id="context"
                                                        value={lethPort4TargetDT}
                                                        onChange={handleSetlethPort4TargetDTChange}/>
                                                    </FormItem>
                                                    <FormItem className="form-item">
                                                        <FormLabel className="form-label" htmlFor="context">Target port ID (e.g., P1)</FormLabel>
                                                        <FormInputText
                                                        id="context"
                                                        value={lethPort4TargetPort}
                                                        onChange={handleSetlethPort4TargetPortChange}/>
                                                    </FormItem> 
                                                    <FormItem className="form-item">
                                                        <FormLabel className="form-label" htmlFor="context">Cable length selection</FormLabel>
                                                        <FormInputText
                                                        id="context"
                                                        options={cableLengthOptions}
                                                        value={lethPort4TargetCableLength}
                                                        onChange={handleSetlethPort4TargetCableLengthChange}/>
                                                    </FormItem>

                                                </div>
                                            }
                                            </div>

                                    </div>
                                }
                                <div>
                                    <h7>----</h7>
                                </div>
                                <FormItem className="form-item">
                                    <FormLabel className="form-label" htmlFor="context">Enter the number of device connections required for this line (i.e., Total number of devices)</FormLabel>
                                    <FormInputDropdown
                                    id="context"
                                    options={lethNumberOfPortOptions}
                                    value={lethNumberOfPorts}
                                    onChange={handleSetlethNumberOfPortsChange}/>
                                </FormItem>
                                <div>
                                    <h7>----</h7>
                                </div>
                                {/* Need to insert the remaining 0-9 port inputs based on the number of ports selected in the previous question*/}

                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>       
    {plcNetworkSwitchRequired && (
        <>
            {/* PLC to PLC Ethernet switch configuration parameters */}
            <div className="div-inline">
                <IconContext.Provider value={{ color:"black", size:20 }}>
                {
                    expandedStates.menu6?<IoIosArrowDown/>:<IoIosArrowForward/>
                }
                </IconContext.Provider>
                <button style={{fontSize:16, fontWeight:"bolder", marginBottom:"10px"}} 
                    onClick={handleToggleClick6}>
                    ETH - Configuration parameters
                </button>
                {
                    expandedStates.menu6 &&
                    <div>
                        <FormItem className="form-item">
                            <FormLabel className="form-label" htmlFor="context">Plant IP Address (e.g., 10.x.x.x)</FormLabel>
                            <FormInputText
                            id="context"
                            value={ethPlantIp}
                            readOnly
                            //onChange={handleSetlethPlantIpChange}
                            />
                        </FormItem> 
                        <FormItem className="form-item">
                            <FormLabel className="form-label" htmlFor="context">PLC-to-PLC IP Address (e.g., 192.168.136.x)</FormLabel>
                            <FormInputText
                            id="context"
                            value={ethPlcToPlcIp}
                            onChange={handleSetethPlcToPlcIpChange}
                            />
                        </FormItem>
                        <FormItem className="form-item">
                            <FormLabel className="form-label" htmlFor="context">Local IP Address (e.g., 192.168..x)</FormLabel>
                            <FormInputText
                            id="context"
                            value={ethLocalIp}
                            readOnly
                            //onChange={handleSetethLocalIpChange}
                            />
                        </FormItem>
                        <FormItem className="form-item">
                            <FormLabel className="form-label" htmlFor="context">Secondary Local IP Address (e.g., 192.168.x.x)</FormLabel>
                            <FormInputText
                            id="context"
                            value={ethLocalIpSecondary}
                            readOnly
                            //onChange={handleSetethLocalIpSecondaryChange}
                            />
                        </FormItem>

                        {/* ETH - Port configuration parameters */}
                        <div className="div-inline">
                            <IconContext.Provider value={{ color:"black", size:20 }}>
                            {
                                expandedStates.menu10?<IoIosArrowDown/>:<IoIosArrowForward/>
                            }
                            </IconContext.Provider>
                            <button style={{fontSize:16, fontWeight:"bolder", marginBottom:"10px"}} 
                                onClick={handleToggleClick10}>
                                ETH - Port configuration parameters
                            </button>
                            {
                                expandedStates.menu10 &&
                                <div>
                                    <div>
                                        <h7>Port 1 (Ring topology - In)</h7>
                                    </div>  
                                    <FormItem className="form-item">
                                        <FormLabel className="form-label" htmlFor="context">Target location (e.g., MCP01, MCP02)</FormLabel>
                                        <FormInputText
                                        id="context"
                                        value={ethPort1TargetLocation}
                                        onChange={handleSetethPort1TargetLocationChange}/>
                                    </FormItem>
                                    <div>
                                        <h7>Port 2 (Ring topology - Out)</h7>
                                    </div>
                                    <FormItem className="form-item">
                                        <FormLabel className="form-label" htmlFor="context">Target location (e.g., MCP01, MCP02)</FormLabel>
                                        <FormInputText
                                        id="context"
                                        value={ethPort2TargetLocation}
                                        onChange={handleSetethPort2TargetLocationChange}/>
                                    </FormItem>
                                </div>
                            }
                            </div>
                    </div>
                }
                </div>   
        </>
    )}
    </div>  
    );
};
export default McpConfiguration;