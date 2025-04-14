import { useState } from "react";
import { lpdStore } from "../../Store/lpdStore";
import { FormLabel, FormItem, Button, FormInputText, Heading} from '@tesla/design-system-react';
import LpdConfiguration from "./LpdConfiguration";
import HeadingItem from "../Util/HeadingItem";
import DeleteButton from "../Util/DeleteButton";
import "../../Eec.css";

const LpdConfigurations = () => {
    const lpds = lpdStore((state) => state.lpds);
    const addLpd =  lpdStore((state) => state.addLpd);
    const deleteLpd =  lpdStore((state) => state.deleteLpd);
    const [numberOfLcps, setNumberOfLcps] = useState(lpds.length);
    let absIndex = 0;

    const handleSumbit = (event) => {
        event.preventDefault();    
        addLpd(numberOfLcps);
    }
    const handleValueChange = (event)=> {
        setNumberOfLcps(event.target.value)
    }
    const handleDeleteItem = (index) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deleteLpd(index)
        }
    }


    return (
        <>
            <div>
                <Heading is="h4">24VDC Power Distribution Configuration</Heading>
                <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor="context">Consider cascading 24VDC power supplies as a group. Enter the number of cascading groups required for this project:</FormLabel>
                    <FormInputText
                    id="context"
                    value={numberOfLcps}
                    onChange={handleValueChange}/>
                    <Button style={{marginLeft:"10px"}} onClick={handleSumbit}>Set</Button>
                </FormItem>                        
                {   
                    lpds.map((lpd, index) => {
                        absIndex++;
                        return <HeadingItem label={`24V Field mounted Power Supply Unit (PSU) Configuration, Group ${absIndex}`} 
                            size={18} margin={"20px"} open={false} 
                            headerIcon={"/psuGroup.png"}
                            children={<LpdConfiguration lpd={lpd} lpdIndex={index}/>}
                            buttons={[<DeleteButton onClick={() => handleDeleteItem(index)} />]}/>
                        
                })}
            </div>
        </>
    )
}
    
export default LpdConfigurations;