import SetItemsNumberInputBox from '../Common/SetItemsNumberInputBox';
import { Heading, } from '@tesla/design-system-react';
import { ioModuleStore } from '../../Store/ioModuleStore';
import IO_ModuleCollectionInstance from './IO_ModuleCollectionInstance';
import HeadingItem from "../Util/HeadingItem";
import { projectStore } from "../../Store/projectStore";
import "../../Eec.css";
import DeleteButton from "../Util/DeleteButton";
import DuplicateButton from "../Util/DuplicateButton";

const IO_ModuleCascadingCollection = () => {
    // this is the data being used in the UI for the safety gate switches
    const line = projectStore((state) => state.line);
    const ioModuleGroups = ioModuleStore((state) => state.ioModuleGroups);
    const addIOModuleGroups =  ioModuleStore((state) => state.addIOModuleGroups);
    const deleteIOModuleGroup =  ioModuleStore((state) => state.deleteIOModuleGroup);
    const duplicateIOModuleGroup =  ioModuleStore((state) => state.duplicateIOModuleGroup);

    const handleDeleteItem = (index) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deleteIOModuleGroup(index)
        }
    }

    const handleDuplicateItem = (index)=>{
        if (window.confirm("Are you sure you want to duplicate this item?")) {
            duplicateIOModuleGroup(index)
        }
    }

    return (
        <>
             <div>
                <Heading is="h4">I/O Module Configurations</Heading>
                <SetItemsNumberInputBox title={"Consider cascading I/O modules as a group. Enter the number of cascading groups required for this line:"} 
                    items={ioModuleGroups} addItems={addIOModuleGroups}/>                                     
                
                {   
                    ioModuleGroups.map((ioModuleGroup, index) => {
                        return <HeadingItem label={`${index+1}:I/O Modules in: ++${ioModuleGroup.line}+${ioModuleGroup.location}`} 
                                size={18} margin={"20px"} open={false}
                                headerIcon={ioModuleGroup.UI.icon}
                                children={<IO_ModuleCollectionInstance ioModuleGroup={ioModuleGroup} index={index}/>}
                                buttons={[<DeleteButton onClick={() => handleDeleteItem(index)} />,
                                    <DuplicateButton onClick={()=>handleDuplicateItem(index)}/>,
                                ]}/>
                    })
                }
            </div>
        </>
    )
}

export default IO_ModuleCascadingCollection;