import LineStationSelection from '../Common/LineStationSelection';
import { ioModuleGroupOptions, ioModuleStore } from '../../Store/ioModuleStore';
import IO_ModuleConfigurations from './IO_ModuleConfigurations';
import SetItemsNumberInputBox from '../Common/SetItemsNumberInputBox';
import { DataTable } from '@tesla/design-system-react';
import "../../Eec.css";
import DeviceSelection from '../Common/DeviceSelection';
import DropdownItem from '../Util/DropdownItem';
import PlcIDSelection from '../Common/PlcIDSelection';
import { lineConfiguration } from '../../Store/lineStore';

const IO_ModuleCollectionInstance = ({ioModuleGroup, index}) => {
    const setNumberOfIOModules = ioModuleStore((state) => state.setNumberOfIOModules);
    const ioModuleGroupIndex = {ioModuleGroupIndex:index}
    return (
        
        <div>
            <div>
                <DataTable border={4} className='data-table'> 
                     <LineStationSelection 
                        title={"I/O Module LOCATION (e.g., ++LINE+LOCATION)"}  stationProperty={"location"}
                        item={ioModuleGroup} index={ioModuleGroupIndex}/>
                    <PlcIDSelection item={ioModuleGroup} title={"The I/O Modules are controlled by PLC ID:"} index={ioModuleGroupIndex}/>
                    <DeviceSelection
                        item={ioModuleGroup} index={ioModuleGroupIndex} 
                        lineProperty={"powerSourceLine"}
                        stationProperty={"powerSourceLocation"}
                        deviceProperty={"powerSourceDT"}
                        type="powerSource"/>
                    <DeviceSelection
                        item={ioModuleGroup} index={ioModuleGroupIndex} 
                        lineProperty={"ethernetSourceLine"}
                        stationProperty={"ethernetSourceLocation"}
                        deviceProperty={"ethernetSourceDT"}
                        type="networkSource"
                        portConfig ={{
                            title:"Select the network port of the network switch (e.g., 1)",
                            property:"ethernetSourceDevicePort",
                            type:"network",
                            targetDT:ioModuleGroup.ethernetSourceDT,
                            targetLocation:ioModuleGroup.ethernetSourceLocation,
                            targetLine:ioModuleGroup.line,
                        }}/>

                    <SetItemsNumberInputBox title={"Enter the total number of I/O modules within this cascading group:"} 
                        items={ioModuleGroup.ioModules} addItems={setNumberOfIOModules} index={index}/>           
                    {/* Render all IO Modules */}
                    <IO_ModuleConfigurations ioModuleGroup={ioModuleGroup} ioModuleGroupIndex={index}/>
                    
                </DataTable>
            </div>  

           
        </div>
    );
};
export default IO_ModuleCollectionInstance;