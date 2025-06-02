import { lpdStore } from "../../Store/lpdStore";
import { Heading} from '@tesla/design-system-react';
import LpdConfiguration from "./LpdConfiguration";
import HeadingItem from "../Util/HeadingItem";
import DeleteButton from "../Util/DeleteButton";
import DuplicateButton from "../Util/DuplicateButton";
import SetItemsNumberInputBox from "../Common/SetItemsNumberInputBox";
import "../../Eec.css";

const LpdConfigurations = () => {
    const lpds = lpdStore((state) => state.lpds);
    const addLpd =  lpdStore((state) => state.addLpd);
    const deleteLpd =  lpdStore((state) => state.deleteLpd);
    const duplicateLpd = lpdStore((state) => state.duplicateLpd);

    const handleDeleteItem = (index) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deleteLpd(index)
        }
    }
    const handleDuplicateItem = (index)=>{
        if (window.confirm("Are you sure you want to duplicate this item?")) {
            duplicateLpd(index)
        }
    }

    return (
        <>
            <div>
                <Heading is="h4">24VDC Power Distribution Configuration</Heading>
                <SetItemsNumberInputBox title={"Consider cascading 24VDC power supplies as a group. Enter the number of cascading groups required for this project:"} 
                    items={lpds} addItems={addLpd}/>                         
                {   
                    lpds.map((lpd, index) => {
                        return <HeadingItem label={`24V Field mounted Power Supply Unit (PSU) Configuration, Group ${lpd.getIndex() + 1}`} 
                            size={18} margin={"20px"} open={false} 
                            component={lpd}
                            headerIcon={lpd.UI.icon}
                            children={<LpdConfiguration lpd={lpd} lpdIndex={index}/>}
                            buttons={[<DeleteButton onClick={() => handleDeleteItem(index)} />,
                                <DuplicateButton onClick={()=>handleDuplicateItem(index)}/>,
                            ]}/>
                        
                })}
            </div>
        </>
    )
}
    
export default LpdConfigurations;