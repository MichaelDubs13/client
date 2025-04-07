import ListGroup from "./ListGroup";
import {pdpStore} from "../../../store/eec/pdpStore";
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import { FormLabel, FormInputText, Button, FormItem, FormInputCheckbox, FormInputDropdown } from '@tesla/design-system-react';
import { useState } from "react";
import "./Eec.css";
import PowerDropItem from "./PowerDropItem";
import HotPowerDropItem from "./HotPowerDropItem";
import ItemStore from "../../../store/eec/ItemStore";
import { create } from "zustand";

const M_W_PdpConfiguration = ({pdp}) => {

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

    const addBranchCircuit = pdpStore((state) => state.addBranchCircuit);
    const addHotPowerBranchCircuit = pdpStore((state) => state.addHotPowerBranchCircuit);
    const [Line, setLine] = useState(line);
    const [Location, setLocation] = useState(0);
    const [Amperage, setAmperage] = useState(0);
    const [EnclosureSize, setEnclosureSize] = useState(0);
    const [enclosureNameplateFLA, setEnclosureNameplateFLA] = useState(0);
    const [PwrMonitorEnable, setPwrMonitorEnable] = useState(false);
    const [Opt_SurgeProtectionDevice, setOpt_SurgeProtectionDevice] = useState(false);
    const [Opt_HotPwrEnable, setOpt_HotPwrEnable] = useState(false);
    
    const handleSetLineChange = (event)=> {
        const value = event.target.value;
        setLine(value);
        pdp.line = value;
    }

    const handleSetLocationChange = (event)=> {
        const value = event.target.value;
        setLocation(value);
        pdp.location = value;
    }

    const handleSetAmperageChange = (event)=> {
        const value = event.target.value;
        setAmperage(value);
        pdp.amp = value;
    }

    const handleSetEnclosureSizeChange = (event)=> {
        const value = event.target.value;
        setEnclosureSize(value);
        pdp.enclosureSize = value;
    }

    const handleSetEnclosureNameplateFLAChange = (event)=> {
        const value = event.target.value;
        setEnclosureNameplateFLA(value);
        pdp.FLA = value;
    }

    const handleSetPwrMonitorEnableChange = (event)=> {
        const value = !PwrMonitorEnable;
        setPwrMonitorEnable(value)
        pdp.PwrMonitorEnable = value;
    }

    const handleSetOpt_SurgeProtectionChange = (event)=> {
        const value = !Opt_SurgeProtectionDevice;
        setOpt_SurgeProtectionDevice(value)
        pdp.Opt_SurgeProtectionDevice = value;
    }

    const handleSetOpt_HotPwrChange = (event)=> {
        const value = !Opt_HotPwrEnable;
        setOpt_HotPwrEnable(!Opt_HotPwrEnable)
        pdp.Opt_HotPwrEnable = value;
        var hotPowerDrops = createHotPowerBranchCircuit();
        console.log(hotPowerDrops);
        setHotPowerDrops(hotPowerDrops);
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
    const [hotPowerDrops, setHotPowerDrops] = useState([]);

    // Create array of hot power drop items
    const renderHotPowerDrops = () => {
        var i = 0;
        /* return Object.entries(hotPowerDrops).flatMap(([hotPowerDrop, count]) =>
            Array.from({ length: count }).map((_, index) => {
                i=i+1;
                return <HotPowerDropItem
                key={`${hotPowerDrop}-${index}`}
                hotPowerDrop={hotPowerDrop}
                index={index}
                absIndex={i}
            />})
        ); */
        return hotPowerDrops.map((hotPowerDrop, index) => {
            i=i+1;
            console.log(hotPowerDrop);
            return <HotPowerDropItem
                key={`${hotPowerDrop}-${index}`}
                hotPowerDrop={hotPowerDrop}
                index={index}
                absIndex={i}
            />})
    };

    const createHotPowerBranchCircuit = () => {
        var newPwrDrops = []
        for(let i=0; i<3; i++){
            var newPwrDrop = addHotPowerBranchCircuit();
            newPwrDrops.push(newPwrDrop);
        }
        return newPwrDrops;
    }

    // State for each amperage type
    const [powerDrops, setPowerDrops] = useState({
        "10A": 0,
        "20A": 0,
        "30A": 0,
        "40A": 0,
        "60A": 0,
        "70A": 0,
        "100A": 0,
        "250A": 0
    });

    const handlePowerDropChange = (amperage) => (e) =>{
            const data = {...powerDrops, [amperage]: parseInt(e.target.value) || 0}
            setPowerDrops(data);

            pdp.numberOf10APwrDrps = data["10A"]
            pdp.numberOf20APwrDrps = data["20A"]
            pdp.numberOf30APwrDrps = data["30A"]
            pdp.numberOf40APwrDrps = data["40A"]
            pdp.numberOf60APwrDrps = data["60A"]
            pdp.numberOf70APwrDrps = data["70A"]
            pdp.numberOf100APwrDrps = data["100A"]
            pdp.numberOf250APwrDrps = data["250A"] 
            pdp.branchCircuit["10A"] = createBranchCircuit(pdp.numberOf10APwrDrps);
            pdp.branchCircuit["20A"] = createBranchCircuit(pdp.numberOf20APwrDrps);
            pdp.branchCircuit["30A"] = createBranchCircuit(pdp.numberOf30APwrDrps);
            pdp.branchCircuit["40A"] = createBranchCircuit(pdp.numberOf40APwrDrps);
            pdp.branchCircuit["60A"] = createBranchCircuit(pdp.numberOf60APwrDrps);
            pdp.branchCircuit["70A"] = createBranchCircuit(pdp.numberOf70APwrDrps);
            pdp.branchCircuit["100A"] = createBranchCircuit(pdp.numberOf100APwrDrps);
            pdp.branchCircuit["250A"] = createBranchCircuit(pdp.numberOf250APwrDrps);
    }

    const createBranchCircuit = (numberOfDrps) => {
        var newPwrDrops = []
        for(let i=0; i<numberOfDrps; i++){
            var newPwrDrop = addBranchCircuit();
            newPwrDrops.push(newPwrDrop);
        }
        return newPwrDrops;
    }

    // Calculate the total number of power drops
    const totalPowerDrops = Object.values(powerDrops).reduce((acc, count) => acc + count, 0);

    // Variable to keep track of absIndex across all power drops
    let absIndexCounter = 1; 

    // Create array of power drop items for each amperage
    const renderPowerDrops = (amperage) => {
        var i = 0;
        var powerDropItems = []
        var branchCircuit = pdp.branchCircuit[amperage];

        for(i=0;i<powerDrops[amperage];i++){
            var index = i+1;
            powerDropItems.push(
            <PowerDropItem 
                key={`${amperage}-${index}`}
                amperage={(amperage)} 
                index={index}
                absIndex={absIndexCounter++}
                branchCircuit={branchCircuit[i]}
            />)
        }
        return powerDropItems;
    };

    const renderAllPowerDrops = () => {
        var powerDrops250A = renderPowerDrops("250A");
        var powerDrops100A = renderPowerDrops("100A");
        var powerDrops70A = renderPowerDrops("70A");
        var powerDrops60A = renderPowerDrops("60A");
        var powerDrops40A = renderPowerDrops("40A");
        var powerDrops30A = renderPowerDrops("30A");
        var powerDrops20A = renderPowerDrops("20A"); 
        var powerDrops10A = renderPowerDrops("10A");
        return [...powerDrops250A, ...powerDrops100A, ...powerDrops70A, ...powerDrops60A, ...powerDrops40A, ...powerDrops30A, ...powerDrops20A, ...powerDrops10A]
        
    }

    return (
        
        <div>
            <div>
                <h4>Power Distribution Panel ++{Line}+{Location} Parameters</h4>
            </div>
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
                {/* Input for Enclosure nameplate FLA */}
                <FormItem className="form-item">
                <FormLabel className="form-label" htmlFor="context">Enclosure nameplate FLA</FormLabel>
                <FormInputText
                    id="context"
                    value={enclosureNameplateFLA}
                    onChange={handleSetEnclosureNameplateFLAChange}/>
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
            {/* Render all hot power drops */}
            {Opt_HotPwrEnable && (
                <>
                    {renderHotPowerDrops()}
                </>
            )}

            {/* Input fields for each amperage */}
            {Object.keys(powerDrops).reverse().map(amperage => (
                <FormItem key={amperage}>
                    <FormLabel>{amperage} Power Drops</FormLabel>
                    <FormInputText
                        type="number"
                        value={powerDrops[amperage]}
                        onChange={handlePowerDropChange(amperage)}
                    />
                </FormItem>
            ))}

            {/* Render all power drops */}
            {
                renderAllPowerDrops()
            }
        </div>
    );
};
export default M_W_PdpConfiguration;