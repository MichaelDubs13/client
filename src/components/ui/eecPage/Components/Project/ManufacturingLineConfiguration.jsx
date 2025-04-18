import "../../Eec.css";
import ManufacturingLineNameAndLocation from "./ManufacturingLineNameAndLocation";
import { IconTrigger } from '@tesla/design-system-react';
import { useState } from "react";


const ManufacturingLineConfiguration = () => {
   const [pressed, setPressed] = useState(false);

    return (
        
        <div>
        
             <IconTrigger
             style={{marginTop:'50px'}}
                label="Manufacturing Line Configurations"
                onClick={() => setPressed(!pressed)}
                pressed={pressed}
                invertColors
                rotate
                />
            {
                pressed && <ManufacturingLineNameAndLocation/>
                
            }
           
        </div>           
    );
};
export default ManufacturingLineConfiguration;