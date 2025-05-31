import {  Heading, } from '@tesla/design-system-react';
import { networkSwitchStore } from "../../Store/networkSwitchStore";
import NetworkSwitchConfiguration from "./NetworkSwitchConfiguration";
import HeadingItem from "../Util/HeadingItem";
import { projectStore } from "../../Store/projectStore";
import DeleteButton from "../Util/DeleteButton";
import DuplicateButton from "../Util/DuplicateButton";
import SetItemsNumberInputBox from '../Common/SetItemsNumberInputBox';
import "../../Eec.css";

const NetworkSwitchConfigurations = () => {
    const line = projectStore((state) => state.line);
    const networkSwitches = networkSwitchStore((state) => state.networkSwitches);
    const addNetworkSwitches =  networkSwitchStore((state) => state.addNetworkSwitches);
    const deleteNetworkSwitch =  networkSwitchStore((state) => state.deleteNetworkSwitch);
    const duplicateNetworkSwitch =  networkSwitchStore((state) => state.duplicateNetworkSwitch);

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
                <SetItemsNumberInputBox title={"Enter the number of Network Switches required for this line:"} items={networkSwitches} addItems={addNetworkSwitches}/>                   
                {   
                    networkSwitches.map((networkSwitch, index) => {
                        return <HeadingItem label={`${index+1}:Network Switch ++${networkSwitch.line}+${networkSwitch.location}-${networkSwitch.deviceTag}`} 
                                size={18} margin={"20px"} open={false}
                                headerIcon={networkSwitch.UI.icon}
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