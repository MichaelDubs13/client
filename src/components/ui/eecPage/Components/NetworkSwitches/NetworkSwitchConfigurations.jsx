import {  useState } from "react";
import { FormLabel, FormItem, Button, FormInputText, Heading, } from '@tesla/design-system-react';
import { networkSwitchStore } from "../../Store/networkSwitchStore";
import NetworkSwitchConfiguration from "./NetworkSwitchConfiguration";
import HeadingItem from "../Util/HeadingItem";
import { projectStore } from "../../Store/projectStore";
import "../../Eec.css";
import DeleteButton from "../Util/DeleteButton";
import DuplicateButton from "../Util/DuplicateButton";

const NetworkSwitchConfigurations = () => {
    // this is the data being used in the UI for the network switch
    const line = projectStore((state) => state.line);
    const networkSwitches = networkSwitchStore((state) => state.networkSwitches);
    const addNetworkSwitches =  networkSwitchStore((state) => state.addNetworkSwitches);
    const deleteNetworkSwitch =  networkSwitchStore((state) => state.deleteNetworkSwitch);
    const duplicateNetworkSwitch =  networkSwitchStore((state) => state.duplicateNetworkSwitch);
    const [numberOfNetworkSwitches, setNumberOfNetworkSwitches] = useState(networkSwitches.length);

    const handleSumbit = (event) => {
        event.preventDefault(); 
        addNetworkSwitches(numberOfNetworkSwitches); 
    }
    
    const handleValueChange = (event)=> {
        setNumberOfNetworkSwitches(event.target.value);
    }    

    const handleDeleteItem = (index) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deleteNetworkSwitch(index)
        }
    }

    const handleDuplicateItem = (index)=>{
        if (window.confirm("Are you sure you want to duplicate this item?")) {
            duplicateNetworkSwitch(index)
        }
    }

    return (
        <>
             <div>
                <Heading is="h4">Network Switch Configuration</Heading>
                <FormItem className="form-set-item">
                    <FormLabel className="form-set-label" htmlFor="context">Enter the number of Network Switches required for this line:</FormLabel>
                    <FormInputText
                        id="context"
                        className="form-set-input"
                        value={numberOfNetworkSwitches}
                        placeholder={networkSwitches.length}
                        onChange={handleValueChange}/>
                    <Button variant='secondary' style={{marginLeft:"10px", marginTop:'10px'}} onClick={handleSumbit}>Set</Button>
                </FormItem>                        
                
                {   
                    networkSwitches.map((networkSwitch, index) => {
                        return <HeadingItem label={`${index+1}:Network Switch ++${line}+${networkSwitch.location} Parameters`} 
                                size={18} margin={"20px"} open={false}
                                headerIcon={"/panel.png"}
                                children={<NetworkSwitchConfiguration networkSwitch={networkSwitch} index={index}/>}
                                buttons={[<DeleteButton onClick={() => handleDeleteItem(index)} />,
                                    <DuplicateButton onClick={()=>handleDuplicateItem(index)}/>,
                                ]}/>
                    })
                }
            </div>
        </>
    )
}

export default NetworkSwitchConfigurations;