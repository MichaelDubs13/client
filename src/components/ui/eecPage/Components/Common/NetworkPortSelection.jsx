import { lineConfiguration } from '../../Store/lineStore';
import { networkSwitchConfiguration } from '../../Store/networkSwitchStore';
import "../../Eec.css";
import DropdownItem from '../Util/DropdownItem';
import { useState, useEffect } from 'react';
import CreateableDropdownItem from '../Util/CreateableDropdownItem';



const NetworkPortSelection = ({item, title, index, property, targetDT, targetLocation, targetLine, portType,createNew, isCreatable, update}) => {
    const [portOptions, setPortOptions] = useState([]);
    const itemIndex = createNew ? {} : index;
    useEffect(() => {
        var ports = []
        var foundItem = lineConfiguration.getDeviceByNameGlobal(targetDT, targetLocation, targetLine);
        if(foundItem && foundItem.data.type ==='networkSwitch'){
            if(portType === 'network'){
                ports = networkSwitchConfiguration.getEthernetNetworkPortOptions(foundItem.ports.length, foundItem.networkType, foundItem.switchType);
            } else if(portType ==='power') {
                ports = networkSwitchConfiguration.getEthernetPowerPortOptions(foundItem.networkType, foundItem.switchType, foundItem.switchSpeed);
            }
        }
        setPortOptions(ports);
    }, [targetDT, targetLocation, targetLine, update]);

    return (
        <div>
             {targetDT?.startsWith(lineConfiguration.networkSwitchIndicator) && (
                    <>
                        {
                           isCreatable ? 
                           <CreateableDropdownItem title={title} item={item} index={itemIndex} property={property} options={portOptions}/>:
                           <DropdownItem title={title} item={item} index={itemIndex} property={property} options={portOptions}/>
                        }
                        
                    </>
             )
            }
        </div>
    );
};
export default NetworkPortSelection;