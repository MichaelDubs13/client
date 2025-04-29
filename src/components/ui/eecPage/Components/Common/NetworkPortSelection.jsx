import { lineConfiguration } from '../../Store/lineStore';
import { networkSwitchConfiguration } from '../../Store/networkSwitchStore';
import "../../Eec.css";
import DropdownItem from '../Util/DropdownItem';
import { useState, useEffect } from 'react';



const NetworkPortSelection = ({item, title, index, property, targetDT, targetLocation, targetLine, portSelect='network'}) => {
    const [portOptions, setPortOptions] = useState([]);

    useEffect(() => {
        var ports = []
        var foundItem = lineConfiguration.getDeviceByNameGlobal(targetDT, targetLocation, targetLine);
        if(foundItem && foundItem.data.type ==='networkSwitch'){
            if(portSelect === 'network'){
                ports = networkSwitchConfiguration.getEthernetNetworkPortOptions(foundItem.ports.length, foundItem.networkType, foundItem.switchType);
            } else if(portSelect ==='power') {
                ports = networkSwitchConfiguration.getEthernetPowerPortOptions(foundItem.networkType, foundItem.switchType, foundItem.switchSpeed);
            }
        }
        setPortOptions(ports);
    }, [targetDT, targetLocation, targetLine]);






    return (
        <div>
             {targetDT?.startsWith(lineConfiguration.networkSwitchIndicator) && (
                    <>
                        <DropdownItem title={title} item={item} index={index} property={property} options={portOptions}/>
                    </>
             )
            }
        </div>
    );
};
export default NetworkPortSelection;