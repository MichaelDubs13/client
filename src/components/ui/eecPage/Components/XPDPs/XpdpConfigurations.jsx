import { xpdpStore } from '../../Store/xpdpStore';
import { Heading } from '@tesla/design-system-react';
import XpdpConfiguration from "./XpdpConfiguration";
import { projectStore } from "../../Store/projectStore";
import HeadingItem from "../Util/HeadingItem";
import DeleteButton from '../Util/DeleteButton';
import DuplicateButton from '../Util/DuplicateButton';
import SetItemsNumberInputBox from '../Common/SetItemsNumberInputBox';
import "../../Eec.css";


const XpdpConfigurations = () => {
    const line = projectStore((state) => state.line);
    const xpdps = xpdpStore((state) => state.xpdps);
    const addXpdp =  xpdpStore((state) => state.addXpdp);
    const deleteXpdp =  xpdpStore((state) => state.deleteXpdp);
    const duplicateXpdp = xpdpStore((state) => state.duplicateXpdp);    

    const handleDeleteItem = (index) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deleteXpdp(index)
        }
    }
    const handleDuplicateItem = (index)=>{
        if (window.confirm("Are you sure you want to duplicate this item?")) {
            duplicateXpdp(index)
        }
    }

    return (
        
        <div>
            <Heading is="h4">120/208VAC Power Distribution Panel Configuration</Heading>
            <SetItemsNumberInputBox title={"Enter the number of 120/208VAC Power Distribution Panels required for this line:"} items={xpdps} addItems={addXpdp}/>                                     
            {   
                xpdps.map((xpdp, index) => {
                    return <HeadingItem label={`120/208VAC Power Distribution Panel ++${line}+${xpdp.location} Parameters`}
                    size={18} margin={"20px"} open={false}
                    headerIcon={xpdp.UI.icon}
                    children={<XpdpConfiguration xpdp={xpdp} xpdpIndex={index}/>} 
                    buttons={[<DeleteButton onClick={() => handleDeleteItem(index)}/>,
                        <DuplicateButton onClick={()=>handleDuplicateItem(index)}/>,
                    ]}/>
                    
                })
            }
        </div>
    );
};
export default XpdpConfigurations;