import React, { useState } from "react";
import { iconChevron90, iconChevron180} from '@tesla/design-system-icons';
import { Icon, Chip } from '@tesla/design-system-react'
import useImageStore from "../../../store/imageStore";
import HardwareGuidesRow from "./HardwareGuidesRow";
import {  TabList} from "@tesla/design-system-react";
import GsdRow from "./GsdRow";
import ReferenceRow from "./ReferenceRow";
import SoftwareReferenceRow from "./SoftwareReferenceRow";

const HardwareGroupRow = ({group, name}) => {
    const [expanded, setExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState('tab-1');
    const fetchHardwareImage = useImageStore((state) => state.fetchHardwareImage);
    const clearImage = useImageStore((state) => state.clearImage);
    const image = useImageStore((state) => state.image);
    const hardware = group[0];
    const type = hardware.name.toUpperCase().startsWith("GSD") ? "gsd" : "siemens"
    const isGSD = type === "gsd";
    const tabs = [
        {
          id: 'tab-1',
          label: 'Documentation',
          style:{fontSize:"18px"}
        },
        {
          id: 'tab-2',
          label: 'GSDs',
          style:{fontSize:"18px"}
        },
        {
            id: 'tab-3',
            label: 'Project Reference',
            style:{fontSize:"18px"}
          },
          {
            id: 'tab-4',
            label: 'Software Reference',
            style:{fontSize:"18px"}
          },
      ];
    const handleToggleClick = async () => {
        if (!expanded) {
          setExpanded(true);  
          await fetchHardwareImage(`${hardware.image}`);
        } else {
          setExpanded(false);
          clearImage();
        }
      };
    const setChipColor = () => {
        switch(type) {
            case 'type':
                return "green";
            case 'siemens':
                return "blue"
            default:
                return "green";
                
        }
    }
    const renderSwitch = (param) => {
    switch(param) {
        case 'tab-1':
            return <HardwareGuidesRow hardware={hardware}/>
        case 'tab-2':
            return isGSD && <GsdRow group={group}/>
        case 'tab-3':
            return <ReferenceRow group={group} hardware={hardware}/>
        case 'tab-4':
            return <SoftwareReferenceRow group={group} hardware={hardware}/>
        default:
            return <HardwareGuidesRow hardware={hardware}/>
    }
    }

return (
        <>
           <tr className={`tr-block`} //"tds--highlighted" 
                    onClick={handleToggleClick}>
                    <td>
                        {
                            expanded?<Icon data={iconChevron180}/>:<Icon data={iconChevron90}/>
                        }
                            
                    </td>
                    <td className='td-block'>{name}</td>
                    <td className='td-block'>{hardware.infotext?.substring(0,70)}</td>
                    <td className='td-block'>{hardware.family}</td>
                    <td className='td-block'><Chip text={type}  statusColor={setChipColor()} /></td>
            </tr>
                            
            {expanded && (
                <tr>
                    <td></td>
                    <td colSpan={7} className='td-revision'>
                            <tr className='tr-revision'>
                                <img width="300%"src={image} alt="" />
                            </tr>
                        <TabList
                                animated
                                onTabChange={(e) => setActiveTab(e.currentTarget.id)}
                                selected={activeTab}
                                tabs={tabs}
                                variant="underline"
                                />
                        {
                            renderSwitch(activeTab)
                        }
                    </td>
                </tr>
            )}
        </>
    )
}

export default HardwareGroupRow;