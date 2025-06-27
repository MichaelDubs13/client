import { lineConfiguration } from '../../Store/lineStore';
import { networkSwitchConfiguration } from '../../Store/networkSwitchStore';
import "../../Eec.css";
import DropdownItem from '../Util/DropdownItem';
import { useState, useEffect } from 'react';
import CreateableDropdownItem from '../Util/CreateableDropdownItem';
import { ioModuleGroupConfiguration } from '../../Store/ioModuleStore';



const DevicePortSelection = ({item, title, index, property, targetDT, targetLocation, targetLine, portType,createNew, isCreatable, update, onChange}) => {
    const [portOptions, setPortOptions] = useState([]);
    const itemIndex = createNew ? {} : index;
    useEffect(() => {
        var ports = []
        var foundItem = lineConfiguration.getDeviceByNameGlobal(targetDT, targetLocation, targetLine);
        if(!foundItem){
             setPortOptions(ports);
             return;
        }
        if(foundItem.data.type ==='networkSwitch'){
            if(portType === 'network'){
                ports = networkSwitchConfiguration.getEthernetNetworkPortOptions(foundItem.ports.length, foundItem.networkType, foundItem.switchType);
            } else if(portType ==='power') {
                ports = networkSwitchConfiguration.getEthernetPowerPortOptions(foundItem.networkType, foundItem.switchType, foundItem.switchSpeed);
            }
        } else if(foundItem.data.type ==='ioModule'){
            if(portType ==='ioModule'){
                ports = ioModuleGroupConfiguration.getIoModulePortOptions(foundItem.ports.length);
            }
        }
        setPortOptions(ports);
    }, [targetDT, targetLocation, targetLine, update]);

    return (
        <div>
             {((targetDT?.startsWith(lineConfiguration.networkSwitchIndicator) && (portType === 'network' || portType === 'power') )|| 
                (targetDT?.startsWith(lineConfiguration.ioModuleIndicator) && portType === 'ioModule')) && (
                    <>
                        {
                           isCreatable ? 
                           <CreateableDropdownItem title={title} item={item} index={itemIndex} property={property} options={portOptions} onChange={onChange}/>:
                           <DropdownItem title={title} item={item} index={itemIndex} property={property} options={portOptions} onChange={onChange}/>
                        }
                        
                    </>
             )
            }
        </div>
    );
};
export default DevicePortSelection;