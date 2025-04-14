import "../../Eec.css";
import HeadingItem from "../Util/HeadingItem";
import ManufacturingLineNameAndLocation from "./ManufacturingLineNameAndLocation";
import { Heading } from "@tesla/design-system-react";
import { iconCompany } from '@tesla/design-system-icons';
import { Icon } from '@tesla/design-system-react';


const ManufacturingLineConfiguration = () => {
   

    return (
        
        <div>
            {/* <div style={{display:'flex'}}>
                <Icon data={iconCompany} />
                
            </div> */}
            <Heading is="h2">Manufacturing Line Requirements</Heading>
            <HeadingItem label={"Manufacturing Line Name and Location"} size={22} children={<ManufacturingLineNameAndLocation/>}/>
           
        </div>           
    );
};
export default ManufacturingLineConfiguration;