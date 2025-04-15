import { iconChevron90, iconChevron180} from '@tesla/design-system-icons';
import { Icon, TD } from '@tesla/design-system-react'
import { Children, useState } from "react";
import "../../Eec.css";
import PropTypes from 'prop-types';

const HeadingItem = ({headerIcon, label, size, open, margin, children, buttons}) => {
    const [expanded, setExpanded] = useState(open);

    const handleToggleClick = async () => {
        if (!expanded) {
          setExpanded(true);
          
        } else {
          setExpanded(false);
        }
      };

    return (
        
        <div style={{marginTop:'20px', marginLeft:margin}}>
             <tr className={`heading-tr`}
                    onClick={handleToggleClick}>
                    <TD style={{alignContent:'center'}}>
                        
                        {
                            headerIcon ? 
                            <img src={headerIcon} style={{transform: 'scale(0.5)', verticalAlign:'top'}}/> :
                            expanded?<Icon data={iconChevron180} size='small'/>:<Icon data={iconChevron90} size='small'/>
                            
                        }  
                    </TD>
                    <TD className='heading-td' style={{fontSize:size, fontWeight:"bolder", alignContent:'center'}}>{label}</TD>
                    {
                        buttons?.map(button => {
                            return <TD style={{alignContent:'center'}}>{button}</TD>
                        })
                    }
            </tr>
            {
                expanded &&
                <div>
                    {children}     
                </div>
            }
        </div>           
    );
};

HeadingItem.prototype = {
    headerIcon:PropTypes.string,
    label:PropTypes.string,
    size:PropTypes.number,
    open:PropTypes.bool,
    margin:PropTypes.string,
    Children:PropTypes.element,
    buttons:PropTypes.arrayOf(PropTypes.element),
}
export default HeadingItem;