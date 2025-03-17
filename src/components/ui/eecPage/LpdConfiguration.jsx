import ListGroup from "./ListGroup";
import lpdStore from "../../../store/eec/lpdStore";
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import { FormLabel, FormInputText, Button, FormItem, FormInputCheckbox, FormInputDropdown } from '@tesla/design-system-react';
import { useEffect, useState } from "react";
import "./Eec.css";
// change this import to ethernet drops
//import PowerDropItem from "./PowerDropItem";
import ItemStore from "../../../store/eec/ItemStore";
//import LpdLethPorts from "./LpdLethPorts";

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
    const [mcpMountingLocation, handleSetmcpMountingLocationChange] = useLpdState(0, 'mcpMountingLocation');
    const [mcpPSU_Location, handleSetmcpPSU_LocationChange] = useLpdState(0, 'psu_location');
    const [mcpPSU_DT, handleSetmcpPSU_DTChange] = useLpdState(0, 'psu_location_dt');
    const [mcpUpsIp, handleSetmcpUpsIpChange] = useLpdState(0, 'ups_ip');
    const [plcPlantIp, handleSetplcPlantIpChange] = useLpdState(0, 'plc_plant_ip');
    const [plcToPlcIp, handleSetplcToPlcIpChange] = useLpdState(0, 'plc_to_plc_ip');
    const [plcLocalIp, handleSetplcLocalIpChange] = useLpdState(0, 'plc_local_ip');
    const [plcLocalIpSecondary, handleSetplcLocalIpSecondaryChange] = useLpdState(0, 'plc_local_ip_secondary');
    const [plcID, handleSetplcIDChange] = useLpdState(0, 'plc_id');
    const [plcPortX1P2RTargetLocation, handleSetplcPortX1P2RTargetLocationChange] = useLpdState(0, 'plc_port_x1p2r_target_location');
    const [plcPortX1P2RTargetDT, handleSetplcPortX1P2RTargetDTChange] = useLpdState(0, 'plc_port_x1p2r_target_dt');
    const [kedPlantIp, handleSetkedPlantIpChange] = useLpdState(0, 'ked_plant_ip');
    const [kedPlcToPlcIp, handleSetkedPlcToPlcIpChange] = useLpdState(0, 'ked_plc_to_plc_ip');
    const [kedLocalIp, handleSetkedLocalIpChange] = useLpdState(0, 'ked_local_ip');
    const [kedLocalIpSecondary, handleSetkedLocalIpSecondaryChange] = useLpdState(0, 'ked_local_ip_secondary');
    const [kedPort4TargetLocation, handleSetkedPort4TargetLocationChange] = useLpdState(0, 'ked_port4_target_location');
    const [kedPort4TargetDT, handleSetkedPort4TargetDTChange] = useLpdState(0, 'ked_port4_target_dt');
    const [kedPort5TargetLocation, handleSetkedPort5TargetLocationChange] = useLpdState(0, 'ked_port5_target_location');
    const [kedPort5TargetDT, handleSetkedPort5TargetDTChange] = useLpdState(0, 'ked_port5_target_dt');
    const [lethPlantIp, handleSetlethPlantIpChange] = useLpdState(0, 'leth_plant_ip');
    const [lethPlcToPlcIp, handleSetlethPlcToPlcIpChange] = useLpdState(0, 'leth_plc_to_plc_ip');
    const [lethLocalIp, handleSetlethLocalIpChange] = useLpdState(0, 'leth_local_ip');
    const [lethLocalIpSecondary, handleSetlethLocalIpSecondaryChange] = useLpdState(0, 'leth_local_ip_secondary');
    const [lethPort2TargetLocation, handleSetlethPort2TargetLocationChange] = useLpdState(0, 'leth_port2_target_location');
    const [lethPort2TargetDT, handleSetlethPort2TargetDTChange] = useLpdState(0, 'leth_port2_target_dt');
    const [lethPort2TargetPort, handleSetlethPort2TargetPortChange] = useLpdState(0, 'leth_port2_target_port');
    const [lethPort2TargetCableLength, handleSetlethPort2TargetCableLengthChange] = useLpdState(0, 'leth_port2_target_cable_length');
    const [lethPort3TargetLocation, handleSetlethPort3TargetLocationChange] = useLpdState(0, 'leth_port3_target_location');
    const [lethPort3TargetDT, handleSetlethPort3TargetDTChange] = useLpdState(0, 'leth_port3_target_dt');
    const [lethPort3TargetPort, handleSetlethPort3TargetPortChange] = useLpdState(0, 'leth_port3_target_port');
    const [lethPort3TargetCableLength, handleSetlethPort3TargetCableLengthChange] = useLpdState(0, 'leth_port3_target_cable_length');
    const [lethPort4TargetLocation, handleSetlethPort4TargetLocationChange] = useLpdState(0, 'leth_port4_target_location');
    const [lethPort4TargetDT, handleSetlethPort4TargetDTChange] = useLpdState(0, 'leth_port4_target_dt');
    const [lethPort4TargetPort, handleSetlethPort4TargetPortChange] = useLpdState(0, 'leth_port4_target_port');
    const [lethPort4TargetCableLength, handleSetlethPort4TargetCableLengthChange] = useLpdState(0, 'leth_port4_target_cable_length');
    const [lethNumberOfPorts, handleSetlethNumberOfPortsChange] = useLpdState(0, 'leth_number_of_ports');
    const [ethPlantIp, handleSetethPlantIpChange] = useLpdState(0, 'eth_plant_ip');
    const [ethPlcToPlcIp, handleSetethPlcToPlcIpChange] = useLpdState(0, 'eth_plc_to_plc_ip');
    const [ethLocalIp, handleSetethLocalIpChange] = useLpdState(0, 'eth_local_ip');
    const [ethLocalIpSecondary, handleSetethLocalIpSecondaryChange] = useLpdState(0, 'eth_local_ip_secondary');
    const [ethPort1TargetLocation, handleSetethPort1TargetLocationChange] = useLpdState(0, 'eth_port1_target_location');
    const [ethPort2TargetLocation, handleSetethPort2TargetLocationChange] = useLpdState(0, 'eth_port2_target_location');

    const [plcNetworkSwitchRequired, setplcNetworkSwitchRequired] = useState(false);
    
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
export default LpdConfiguration;