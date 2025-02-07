import {List, ListItem  } from '@tesla/design-system-react';
import {useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import FormInputTextSetting from '../util/FormInputTextSetting';
import FormInputPasswordSetting from '../util/FormInputPasswordSetting';



const HmiGroupRow = ({group,index}) => {    
    const [expanded, setExpanded] = useState(false)
    const handleListClick = async () => {
        if(expanded){
            setExpanded(false);
        }else {
            setExpanded(true);
        }
    }

    return (
        <>
        <ListItem key={index} className="li-device" onClick={handleListClick}>
            <span className='tree-node-4th' style={{fontSize:20}}>
            <IconContext.Provider value={{ color:"black", size:20 }}>
            {
                expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
            }
            </IconContext.Provider>
            {group.Name._text}
            </span>                        
        </ListItem>
        
        <List>
                {
                    expanded && 
                    <div>
                        <FormInputTextSetting topic={"Name"} group={group.Name._text} originalValue={group.Name._text} isNew={group.IsNew} />
                        <FormInputTextSetting topic={"UserName"} group={group.Name._text} originalValue={group.UserName._text} isNew={group.IsNew}/>
                        <FormInputPasswordSetting topic={"Password"} group={group.Name._text} originalValue={group.Pwd._text} isNew={group.IsNew}/>
                        <FormInputTextSetting topic={"Priority"} group={group.Name._text} originalValue={group.Priority._text} isNew={group.IsNew}/>
                    </div>
                }
        </List>
        
        </>
    )
}

export default HmiGroupRow