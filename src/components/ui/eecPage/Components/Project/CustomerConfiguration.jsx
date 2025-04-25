import "../../Eec.css";
import CustomerProperty from "./CustomerProperty";
import { IconTrigger } from '@tesla/design-system-react';
import { useState } from "react";


const CustomerConfiguration = () => {
   const [pressed, setPressed] = useState(false);

    return (
        
        <div>
        
             <IconTrigger
             style={{marginTop:'10px'}}
                label="Project Property"
                onClick={() => setPressed(!pressed)}
                pressed={pressed}
                invertColors
                rotate
                />
            {
                pressed && <CustomerProperty/>
                
            }
           
        </div>           
    );
};
export default CustomerConfiguration;