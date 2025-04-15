import "../../Eec.css";
import HeadingItem from "../Util/HeadingItem";
import ManufacturingLineNameAndLocation from "./ManufacturingLineNameAndLocation";
import { Heading } from "@tesla/design-system-react";
import { IconTrigger } from '@tesla/design-system-react';
import { useState } from "react";


const ManufacturingLineConfiguration = () => {
   const [pressed, setPressed] = useState(false);

    return (
        
        <div>
        
             <IconTrigger
             style={{marginTop:'50px'}}
                label="Manufacturing Line Requirements"
                onClick={() => setPressed(!pressed)}
                pressed={pressed}
                invertColors
                rotate
                />
            {
                pressed && <ManufacturingLineNameAndLocation/>
                
            }
            {/* <Heading is="h2">Manufacturing Line Requirements</Heading>
            <HeadingItem label={"Manufacturing Line Name and Location"} size={22} children={<ManufacturingLineNameAndLocation/>}/> */}
           
        </div>           
    );
};
export default ManufacturingLineConfiguration;