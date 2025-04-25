import {  useState } from "react";
import { Heading, } from '@tesla/design-system-react';
import SetItemsNumberInputBox from "../Common/SetItemsNumberInputBox";
import { hmiStore } from "../../Store/hmiStore";
import HmiConfiguration from "./HmiConfiguration";
import HeadingItem from "../Util/HeadingItem";
import DeleteButton from "../Util/DeleteButton";
import DuplicateButton from "../Util/DuplicateButton";
import "../../Eec.css";

const HmiInstances = () => {
    // this is the data being used in the UI for the HMI
    const hmis = hmiStore((state) => state.hmis);
    const addHmis =  hmiStore((state) => state.addHmis);
    const deleteHmi =  hmiStore((state) => state.deleteHmi);
    const duplicateHmi =  hmiStore((state) => state.duplicateHmi);

    const handleDeleteItem = (index) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deleteHmi(index)
        }
    }

    const handleDuplicateItem = (index)=>{
        if (window.confirm("Are you sure you want to duplicate this item?")) {
            duplicateHmi(index)
        }
    }

    return (
        <>
             <div>
                <Heading is="h4">HMI Configuration</Heading>                       
                <SetItemsNumberInputBox title={"Enter the number of HMIs required for this line:"} 
                    items={hmis} addItems={addHmis}/> 
                {   
                    hmis.map((hmi, index) => {
                        return <HeadingItem label={`${index+1}:HMI ++${hmi.line}+${hmi.location}-${hmi.hmiDT} Parameters`} 
                                size={18} margin={"20px"} open={false}
                                headerIcon={"/panel.png"}
                                children={<HmiConfiguration hmi={hmi} index={index}/>}
                                buttons={[<DeleteButton onClick={() => handleDeleteItem(index)} />,
                                    <DuplicateButton onClick={()=>handleDuplicateItem(index)}/>,
                                ]}/>
                    })
                }
            </div>
        </>
    )
}

export default HmiInstances;