import React , {useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import { ListItem } from "@tesla/design-system-react";
import DetailedChangeOverviewRow from "./DetailedChangeOverviewRow";
import ErrorOverViewRow from "./ErrorOverViewRow";
import GroupedChangeOverviewRow from "./GroupedChangeOverviewRow";
import RevisionOverviewRow from "./RevisionOverviewRow";



const UnreleasedChangeOverviewRow = ({revisions, groupedChangeSets}) => {

    const [expanded, setExpanded] = useState(false);
    
    const handleToggleClick = async () => {
      if (!expanded) {
        setExpanded(true);
        
      } else {
        setExpanded(false);
      }
    };

    return (
        <>
                <ListItem onClick={handleToggleClick} style={{listStyle:"none", marginTop:"20px"}}>
                    <span style={{fontSize:30, verticalAlign:'middle'}}>
                    <IconContext.Provider value={{ color:"black", size:30 }}>
                    {
                        expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                    }
                    </IconContext.Provider>
                    Unreleased Changes
                    </span>                        
                </ListItem>
                                
                {expanded && (
                    <div>
                        <DetailedChangeOverviewRow/>
                        <GroupedChangeOverviewRow changeSets={groupedChangeSets}/>
                        <RevisionOverviewRow revisions={revisions}/>
                        <ErrorOverViewRow/>
                    </div>
                )} 
        </>
    );
}

export default UnreleasedChangeOverviewRow;