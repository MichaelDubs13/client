import SetItemsNumberInputBox from '../Common/SetItemsNumberInputBox';
import { Heading, } from '@tesla/design-system-react';
import { safetyGateStore } from "../../Store/safetyGateStore";
import SafetyGateInstances from "./SafetyGateInstances";
import HeadingItem from "../Util/HeadingItem";
import "../../Eec.css";
import DeleteButton from "../Util/DeleteButton";
import DuplicateButton from "../Util/DuplicateButton";

const SafetyGateLocationCount = () => {
    const safetyGates = safetyGateStore((state) => state.safetyGates);
    const addSafetyGates =  safetyGateStore((state) => state.addSafetyGates);
    const deleteSafetyGate =  safetyGateStore((state) => state.deleteSafetyGate);
    const duplicateSafetyGate =  safetyGateStore((state) => state.duplicateSafetyGate);

    const handleDeleteItem = (index) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deleteSafetyGate(index)
        }
    }

    const handleDuplicateItem = (index)=>{
        if (window.confirm("Are you sure you want to duplicate this item?")) {
            duplicateSafetyGate(index)
        }
    }

    return (
        <>
             <div>
                <Heading is="h4">Safety Gate Switch Configuration</Heading>
                <SetItemsNumberInputBox title={"Enter the number of LOCATIONs (i.e., Station numbers) in which Safety Gate Switches are required for this LINE:"} 
                    items={safetyGates} addItems={addSafetyGates}/>                                     
                
                {   
                    safetyGates.map((safetyGate, index) => {
                        return <HeadingItem label={`${index+1}:Safety Gate Switches in: ++${safetyGate.line}+${safetyGate.location}`} 
                                size={18} margin={"20px"} open={false}
                                headerIcon={safetyGate.UI.icon}
                                children={<SafetyGateInstances safetyGate={safetyGate} index={index}/>}
                                buttons={[<DeleteButton onClick={() => handleDeleteItem(index)} />,
                                    <DuplicateButton onClick={()=>handleDuplicateItem(index)}/>,
                                ]}/>
                    })
                }
            </div>
        </>
    )
}

export default SafetyGateLocationCount;