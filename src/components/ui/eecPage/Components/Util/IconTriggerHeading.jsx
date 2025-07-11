import "../../Eec.css";
import { IconTrigger } from '@tesla/design-system-react';
import { useState } from "react";


const IconTriggerHeading = ({heading, children, defaultState}) => {
   const [pressed, setPressed] = useState(defaultState);

    return (
        
        <div>
        
             <IconTrigger
                label={heading}
                onClick={() => setPressed(!pressed)}
                pressed={pressed}
                invertColors
                rotate
                />
            {
                pressed && 
                <div>
                    {children}     
                </div>
            }
           
        </div>           
    );
};
export default IconTriggerHeading;