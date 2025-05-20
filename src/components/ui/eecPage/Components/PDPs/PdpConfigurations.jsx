import { Heading, } from '@tesla/design-system-react';
import { pdpStore } from "../../Store/pdpStore";
import PdpConfiguration from "./PdpConfiguration";
import HeadingItem from "../Util/HeadingItem";
import { projectStore } from "../../Store/projectStore";
import DeleteButton from "../Util/DeleteButton";
import DuplicateButton from "../Util/DuplicateButton";
import SetItemsNumberInputBox from "../Common/SetItemsNumberInputBox";
import "../../Eec.css";

const PdpConfigurations = () => {
    const line = projectStore((state) => state.line);
    const pdps = pdpStore((state) => state.pdps);
    const addPdps =  pdpStore((state) => state.addPdps);
    const deletePdp =  pdpStore((state) => state.deletePdp);
    const duplicatePdp =  pdpStore((state) => state.duplicatePdp);

    const handleDeleteItem = (index) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deletePdp(index)
        }
    }

    const handleDuplicateItem = (index)=>{
        if (window.confirm("Are you sure you want to duplicate this item?")) {
            duplicatePdp(index)
        }
    }

    return (
        <>
             <div>
                <Heading is="h4">Power Distribution Panel Configuration</Heading>
                <SetItemsNumberInputBox title={"Enter the number of Power Distribution Panels required for this line:"} items={pdps} addItems={addPdps}/>                
                {   
                    pdps.map((pdp, index) => {
                        return <HeadingItem label={`${index+1}:Power Distribution Panel ++${pdp.line}+${pdp.location} Parameters`} 
                                size={18} margin={"20px"} open={false}
                                headerIcon={pdp.UI.icon}
                                children={<PdpConfiguration pdp={pdp} index={index}/>}
                                buttons={[<DeleteButton onClick={() => handleDeleteItem(index)} />,
                                    <DuplicateButton onClick={()=>handleDuplicateItem(index)}/>,
                                ]}/>
                    })
                }
            </div>
        </>
    )
}

export default PdpConfigurations;