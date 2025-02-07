import React , {useState } from 'react';
import { iconChevron90, iconChevron180} from '@tesla/design-system-icons';
import { Icon } from '@tesla/design-system-react'
import RevisionRow from './RevisionRow';
import DocumentationRow from './DocumentationRow';
import ImageRow from './ImageRow';
import InterfaceRow from './InterfaceRow';
import ReferenceRow from './ReferenceRow';
import HardwareRow from './HardwareRow';
import { Chip, TabList} from "@tesla/design-system-react";

const BlockRow = ({block, parentPath}) => {
    const [expanded, setExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState('tab-1');
    const removePath = () => {
        const pathArray = parentPath.split('/');
        let slicedPathArray = [];
        if(pathArray.length > 1) {
            slicedPathArray = pathArray.slice(0, 2);
        } else {
            slicedPathArray = pathArray.slice(0, 0);
        }
        
        return slicedPathArray.join('/') + "/";
    }

    const setChipColor = () => {
        switch(block.Type) {
            case 'FC':
                return "green";
            case 'FB':
                return "blue"
            case 'FFB':
                return "yellow"
            case 'FFC':
                return "yellow"
            default:
                return "green";
                
        }
    }
    const tabs = [
        {
          id: 'tab-1',
          label: 'Documentation',
          style:{fontSize:"18px"}
        },
        {
          id: 'tab-2',
          label: 'Image',
          style:{fontSize:"18px"}
        },
        {
          id: 'tab-3',
          label: 'Interface',
          style:{fontSize:"18px"}
        },
        {
            id: 'tab-4',
            label: 'Revision',
            style:{fontSize:"18px"}
        },
        {
            id: 'tab-5',
            label: 'Project Reference',
            style:{fontSize:"18px"}
        },
        {
            id: 'tab-6',
            label: 'Hardware Reference',
            style:{fontSize:"18px"}
        },
      ];
    const handleToggleClick = async () => {
      if (!expanded) {
        setExpanded(true);
        console.log(removePath())
      } else {
        setExpanded(false);
      }
    };

    const renderSwitch = (param) => {
        switch(param) {
            case 'tab-1':
                return <DocumentationRow block={block}/>
            case 'tab-2':
                return <ImageRow block={block}/>
            case 'tab-3':
                return <InterfaceRow block={block}/>
            case 'tab-4':
                return <RevisionRow block={block}/>
            case 'tab-5':
                return <ReferenceRow block={block}/>
            case 'tab-6':
                return <HardwareRow block={block}/>
            default:
                return <DocumentationRow block={block}/>
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
                    <td className='td-block'>{block.Name}</td>
                    <td className='td-block'>{block.Path?.replace(`${removePath()}`, '')}</td>
                    <td className='td-block'><Chip text={block.Type}  statusColor={setChipColor()} /></td>
                    <td className='td-block'>{block.Revisions?.length}</td>
                </tr>
                                
                {expanded && (
                    <tr>
                        <td></td>
                        <td colSpan={7}>
                            <td className='td-revision'>Jira: <a href={block.Jira} target="_blank">{block.Jira}</a></td>
                            
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
                )
                } 
        </>
    );
}

export default BlockRow;