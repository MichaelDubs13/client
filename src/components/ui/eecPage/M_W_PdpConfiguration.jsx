import ListGroup from "./ListGroup";
import pdpStore from "../../../store/eec/pdpStore";
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import { FormLabel, FormInputText, Button, FormItem, FormInputCheckbox, FormInputDropdown } from '@tesla/design-system-react';
import { useState } from "react";
import "./Eec.css";
import PowerDropItem from "./PowerDropItem";
import HotPowerDropItem from "./HotPowerDropItem";
import ItemStore from "../../../store/eec/ItemStore";

const M_W_PdpConfiguration = () => {

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

    /* // State for form inputs
    const [pdpSettings, setpdpSettings] = useState({
        Line: "",
        Location: "MPDP01",
        Amperage: "400A",
        EnclosureSize: "1000(W) x 1800(H) x 500(D)",
        PwrMonitorEnable: false,
        Opt_SurgeProtectionDevice: false,
        Opt_HotPwrEnable: false,
        ...initialValues
    }); */

    const [Line, setLine] = useState(line);
    const [Location, setLocation] = useState(0);
    const [Amperage, setAmperage] = useState(0);
    const [EnclosureSize, setEnclosureSize] = useState(0);
    const [PwrMonitorEnable, setPwrMonitorEnable] = useState(0);
    const [Opt_SurgeProtectionDevice, setOpt_SurgeProtectionDevice] = useState(0);
    const [Opt_HotPwrEnable, setOpt_HotPwrEnable] = useState(0);
    
    //Values to be passed to Parser.js
    /* const result = {
        Line: Line,
        Location: Location,
        Amperage: Amperage,
        EnclosureSize: EnclosureSize,
        PwrMonitorEnable: PwrMonitorEnable,
        Opt_SurgeProtectionDevice: Opt_SurgeProtectionDevice,
        Opt_HotPwrEnable: Opt_HotPwrEnable,
        numberOf10APwrDrps: powerDrops[10],
        numberOf20APwrDrps: powerDrops[20],
        numberOf30APwrDrps: powerDrops[30],
        numberOf40APwrDrps: powerDrops[40],
        numberOf60APwrDrps: powerDrops[60],
        numberOf70APwrDrps: powerDrops[70],
        numberOf100APwrDrps: powerDrops[100],
        numberOf250APwrDrps: powerDrops[250]
    } */
 
    const handleSetLineChange = (event)=> {
        const Linevalue = event.target.value;
        setLine(Linevalue);
    }

    const handleSetLocationChange = (event)=> {
        const Locationvalue = event.target.value;
        setLocation(Locationvalue);
    }

    const handleSetAmperageChange = (event)=> {
        const Amperagevalue = event.target.value;
        setAmperage(Amperagevalue);
    }

    const handleSetEnclosureSizeChange = (event)=> {
        const EnclosureSizevalue = event.target.value;
        setEnclosureSize(EnclosureSizevalue);
    }

    const handleSetPwrMonitorEnableChange = (event)=> {
        setPwrMonitorEnable(!PwrMonitorEnable)
    }

    const handleSetOpt_SurgeProtectionChange = (event)=> {
        setOpt_SurgeProtectionDevice(!Opt_SurgeProtectionDevice)
    }

    const handleSetOpt_HotPwrChange = (event)=> {
        setOpt_HotPwrEnable(!Opt_HotPwrEnable)
    }

    const AmperageOptions = [
        { value: "200A", label: "200A" },
        { value: "400A", label: "400A" },
        { value: "600A", label: "600A" }
      ];
    
    const EnclosureSizeOptions = [
        { value: "800x1400x500(WHD)", label: "800(W) x 1400(H) x 500(D)" },
        { value: "1000x1800x500(WHD)", label: "1000(W) x 1800(H) x 500(D)" }
      ];

    // State for each hot power drop
    const [hotPowerDrops, setHotPowerDrops] = useState({
        5: 3
    });

    // Create array of hot power drop items
    const renderHotPowerDrops = () => {
        var i = 0;
        return Object.entries(hotPowerDrops).flatMap(([hotPowerDrop, count]) =>
            Array.from({ length: count }).map((_, index) => {
                i=i+1;
                return <HotPowerDropItem
                key={`${hotPowerDrop}-${index}`}
                hotPowerDrop={hotPowerDrop}
                index={index}
                absIndex={i}
            />})
        );
    };

    // State for each amperage type
    const [powerDrops, setPowerDrops] = useState({
        10: 0,
        20: 0,
        30: 0,
        40: 0,
        60: 0,
        70: 0,
        100: 0,
        250: 0
    });

    // Create array of power drop items for each amperage
    const renderPowerDrops = () => {
        var i = 0;
        return Object.entries(powerDrops).reverse().flatMap(([amperage, count]) => 
            Array.from({ length: count }).map((_, index) => {
                i=i+1;
                return <PowerDropItem 
                key={`${amperage}-${index}`}
                amperage={parseInt(amperage)}
                index={index}
                absIndex={i}
            />})   
        );
    };

    return (
        
        <div>
            <div>
                <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor="context">Plant name</FormLabel>
                    <FormInputText
                    id="context"
                    value={plant}/>
                </FormItem> 
                <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor="context">Shop name</FormLabel>
                    <FormInputText
                    id="context"
                    value={shop}/>
                </FormItem> 
                <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor="context">Manufacturing Line name (e.g., UBM1, DOR1)</FormLabel>
                    <FormInputText
                    id="context"
                    value={Line}
                    onChange={handleSetLineChange}/>
                </FormItem>   
                <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor="context">Location designation (e.g., MPDP01, WPDP01)</FormLabel>
                    <FormInputText
                    id="context"
                    value={Location}
                    onChange={handleSetLocationChange}/>
                </FormItem>   
                {/* Dropdown for Amperage */}
                <FormItem className="form-item">
                <FormLabel htmlFor="context">Main disconnect amperage</FormLabel>
                <FormInputDropdown
                    id="context"
                    options={AmperageOptions}
                    value={Amperage}
                    onChange={handleSetAmperageChange}/>
                </FormItem>
                {/* Dropdown for Enclosure size */}
                <FormItem className="form-item">
                <FormLabel htmlFor="context">Enclosure size</FormLabel>
                <FormInputDropdown
                    id="context"
                    options={EnclosureSizeOptions}
                    value={EnclosureSize}
                    onChange={handleSetEnclosureSizeChange}/>
                </FormItem>
                {/* Checkbox for Power monitor */}
                <FormItem className="form-item">
                <FormInputCheckbox
                    id="context"
                    checked={PwrMonitorEnable}
                    label="Power monitor enable"
                    onChange={handleSetPwrMonitorEnableChange}/>
                </FormItem>
                {/* Checkbox for Surge Protection */}
                <FormItem className="form-item">
                <FormInputCheckbox
                    id="context"
                    checked={Opt_SurgeProtectionDevice}
                    label="Surge protection enable"
                    onChange={handleSetOpt_SurgeProtectionChange}/>
                </FormItem>
                {/* Checkbox for Hot Power */}
                <FormItem className="form-item">
                <FormInputCheckbox
                    id="context"
                    checked={Opt_HotPwrEnable}
                    label="Hot Power enable"
                    onChange={handleSetOpt_HotPwrChange} />
                </FormItem>
            </div>  
            {/* Input fields for each hot power drop */}
           {/*  {Object.keys(hotPowerDrops).map(hotPowerDrop => (
                <FormItem key={hotPowerDrop}>
                    <FormLabel>{hotPowerDrop}A Hot Power Drops</FormLabel>
                    <FormInputText
                        id="context"
                        value={hotPowerDrops[hotPowerDrop]}
                        onChange={(e) => setHotPowerDrops(prev => ({
                            ...prev,
                            [hotPowerDrop]: e.target.value
                        }))}
                    />
                </FormItem>
            ))} */}

            {/* Render all hot power drops */}
            {Opt_HotPwrEnable && (
                <>
                    {renderHotPowerDrops()}
                </>
            )}

            {/* Input fields for each amperage */}
            {Object.keys(powerDrops).reverse().map(amperage => (
                <FormItem key={amperage}>
                    <FormLabel>{amperage}A Power Drops</FormLabel>
                    <FormInputText
                        type="number"
                        value={powerDrops[amperage]}
                        onChange={(e) => setPowerDrops(prev => ({
                            ...prev,
                            [amperage]: parseInt(e.target.value) || 0
                        }))}
                    />
                </FormItem>
            ))}

            {/* Render all power drops */}
            {renderPowerDrops()}
        </div>
    );
};
export default M_W_PdpConfiguration;