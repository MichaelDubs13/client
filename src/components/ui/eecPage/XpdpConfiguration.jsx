import ListGroup from "./ListGroup";
import {xpdpStore} from "../../../store/eec/xpdpStore";
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import { FormLabel, FormInputText, Button, FormItem, FormInputCheckbox, FormInputDropdown } from '@tesla/design-system-react';
import { useState } from "react";
import "./Eec.css";
import PowerDropItem from "./PowerDropItem";
import ItemStore from "../../../store/eec/ItemStore";
import { useEffect } from "react";

const XpdpConfiguration = ({xpdp}) => {

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

    const addBranchCircuit = xpdpStore((state) => state.addBranchCircuit);
    const [Line, setLine] = useState(line);
    const [Location, setLocation] = useState(0);
    const [xfmrLocation, setxfmrLocation] = useState(0);
    const [xfmrToPdpCableLength, setxfmrToPdpCableLength] = useState(0);
    const [xfmrSize, setxfmrSize] = useState(0);
    const [enclosureNameplateFLA, setEnclosureNameplateFLA] = useState(0);
    const [numberOfDrops, setnumberOfDrops] = useState(0);

        
    const handleSetLineChange = (event)=> {
        const value = event.target.value;
        setLine(value);
        //xpdp.line = value; //need to look into this as it is not in the parser file, may need to be added to the model.
    }

    const handleSetLocationChange = (event)=> {
        const value = event.target.value;
        setLocation(value);
        //xpdp.location = value; //not needed because it is automatically determined in EEC
    }

    const handleSetxfmrLocationChange = (event)=> {
        const value = event.target.value;
        setxfmrLocation(value);
        xpdp.location = value;
    }

    const handleSetxfmrToPdpCableLengthChange = (event)=> {
        const value = event.target.value;
        setxfmrToPdpCableLength(value);
        xpdp.xf_cable_length = value;
    }

    const handleSetxfmrSizeChange = (event)=> {
        const value = event.target.value;
        setxfmrSize(value)
        xpdp.xf_size = value;
    }

    const handleSetenclosureNameplateFLAChange = (event)=> {
        const value = event.target.value;
        setEnclosureNameplateFLA(value);
        xpdp.amp = value;
    }

    const handleSetnumberOfDropsChange = (event)=> {
        const value = event.target.value;
        setnumberOfDrops(value)
    }


    const xfmrSizeOptions = [
        { value: "30kVA Transformer", label: "30kVA Transformer" },
        { value: "NULL", label: "NULL" }
      ];
    
    
    // State for each amperage type
    const [powerDrops, setPowerDrops] = useState({
        "8A 1ph": 0,
        "15A 1ph": 0,
        "20A 1ph": 0,
        "20A 3ph": 0
    });
    const handlePowerDropChange = (amperage) => (e)=>{
        const value = parseInt(e.target.value) || 0;
        if (amperage === "20A 3ph" && value > 2) {
            return;
        }
        const data = {...powerDrops, [amperage]: parseInt(e.target.value) || 0}
        setPowerDrops(data);
        xpdp.numberOfPwrDrop8A = data["8A 1ph"]
        xpdp.numberOfPwrDrop15A = data["15A 1ph"]
        xpdp.numberOfPwrDrop20A1p = data["20A 1ph"]
        xpdp.numberOfPwrDrop20A3p = data["20A 3ph"]
        xpdp.branchCircuit["8A 1ph"] = createBranchCircuit(xpdp.numberOfPwrDrop8A);
        xpdp.branchCircuit["15A 1ph"] = createBranchCircuit(xpdp.numberOfPwrDrop15A);
        xpdp.branchCircuit["20A 1ph"] = createBranchCircuit(xpdp.numberOfPwrDrop20A1p);
        xpdp.branchCircuit["20A 3ph"] = createBranchCircuit(xpdp.numberOfPwrDrop20A3p);
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
        var branchCircuit = xpdp.branchCircuit[amperage];
        var index = 1;

        for (let i=0; i<powerDrops[amperage]; i++) {
            //var index = i+1;
            powerDropItems.push(
                <PowerDropItem
                    key={`${amperage}-${index}`}
                    amperage={(amperage)}
                    index={index++}
                    absIndex={absIndexCounter++}
                    branchCircuit={branchCircuit[i]}
                />)
        }
        return powerDropItems;
    };

    const renderAllPowerDrops = () => {
        var numberOfPwrDrop8A = renderPowerDrops("8A 1ph");
        var numberOfPwrDrop15A = renderPowerDrops("15A 1ph");
        var numberOfPwrDrop20A1p = renderPowerDrops("20A 1ph");
        var numberOfPwrDrop20A3p = renderPowerDrops("20A 3ph");
        return [...numberOfPwrDrop8A, ...numberOfPwrDrop15A, ...numberOfPwrDrop20A1p, ...numberOfPwrDrop20A3p]
    }
    /* const renderPowerDrops = () => {
        var i = 0;
        
        return Object.entries(powerDrops).reverse().flatMap(([amperage, count]) => 
            Array.from({ length: count }).map((_, index) => {
                i=i+1;
                return <PowerDropItem 
                key={`${amperage}-${index}`}
                amperage={(amperage)} //{parseInt(amperage)}
                index={index}
                absIndex={i}
            />})   
        );
    }; */

    // Calculate total number of drops minus 20A 3ph
    useEffect(() => {
        const totalDrops = Object.values(powerDrops).reduce((acc, count) => acc + count, 0);
        const drops20A3ph = powerDrops["20A 3ph"];
        const calculatedNumberOfDrops = totalDrops - drops20A3ph;
        setnumberOfDrops(calculatedNumberOfDrops);
    }, [powerDrops]);


    return (
        
        <div>
            <div>
                <h4>120/208VAC Power Distribution Panel ++{Line}+{Location} Parameters</h4>
            </div>
            <div>
                <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor="context">Plant name</FormLabel>
                    <FormInputText
                    id="context"
                    value={plant}
                    readOnly />
                </FormItem> 
                <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor="context">Shop name</FormLabel>
                    <FormInputText
                    id="context"
                    value={shop}
                    readOnly />
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
                <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor="context">Location designation in which the Transformer is physically located: (i.e., Station number) (e.g., 00010)</FormLabel>
                    <FormInputText
                    id="context"
                    value={xfmrLocation}
                    onChange={handleSetxfmrLocationChange}/>
                </FormItem>     
                <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor="context">Enter the cable length from the Transformer to the XPDP maind disconnect (m):</FormLabel>
                    <FormInputText
                    id="context"
                    value={xfmrToPdpCableLength}
                    onChange={handleSetxfmrToPdpCableLengthChange}/>
                </FormItem> 
                {/* Dropdown for transformer size */}
                <FormItem className="form-item">
                <FormLabel htmlFor="context">Transformer size:</FormLabel>
                <FormInputDropdown
                    id="context"
                    options={xfmrSizeOptions}
                    value={xfmrSize}
                    onChange={handleSetxfmrSizeChange}/>
                </FormItem>
                {/* Input field for enclosure nameplate FLA */}
                <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor="context">Enter the FLA of the Enclosure (A): (This value will be shown on the Enclosure Nameplate)</FormLabel>
                    <FormInputText
                    id="context"
                    value={enclosureNameplateFLA}
                    onChange={handleSetenclosureNameplateFLAChange}/>
                </FormItem>
            </div>  

            {/* Input fields for each amperage */}
            {Object.keys(powerDrops).reverse().map(amperage => (
                <FormItem key={amperage}>
                    <FormLabel>Number of {amperage} power drops:</FormLabel>
                    <FormInputText
                        type="number"
                        value={powerDrops[amperage]}
                        onChange={handlePowerDropChange(amperage)}
                    />
                </FormItem>
                
            ))}

            {/* Read-only field for total number of drops */}
            <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor="context">Total number of 1ph power drops (not to exceed 24):</FormLabel>
                    <FormInputText
                    id="context"
                    value={numberOfDrops}
                    readOnly
                    />
                </FormItem> 

            {/* Render all power drops */}
            {renderAllPowerDrops()}
        </div>
    );
};
export default XpdpConfiguration;