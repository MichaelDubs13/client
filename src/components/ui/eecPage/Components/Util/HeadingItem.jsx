import { iconChevron90, iconChevron180} from '@tesla/design-system-icons';
import { Icon, TD } from '@tesla/design-system-react'
import { Children, useState } from "react";
import "../../Eec.css";
import PropTypes from 'prop-types';
import { settingStore } from '../../Store/settingStore';
/**
 * This is a collapsible heading component with optional actions buttons and heading icons
 * @param {string} headerIcon - path to the headerIcon, if no value is given then an arrow is used for collpasible state
 * @param {string} label - label to be displayed on the heading component
 * @param {number} size - size of the label to be displayed on the heading component
 * @param {boolean} open - default state of the heading component, true = default show children component, false = default collapsed
 * @param {string} margin - margin to the left
 * @param {JSX.Element} children - child component, shown only if the heading component is in uncollapsed state
 * @param {arrayOf(JSX.Element)} buttons - an array of action buttons trailing the heading component
 * @returns 
 */
const HeadingItem = ({headerIcon, label, size, open, margin, children, component, buttons}) => {
    const [expanded, setExpanded] = useState(open);
    const isOpened = component ? component.UI.expanded : expanded;
    const options = settingStore((state)=>state.options);
    const selected = settingStore((state) => state.selected);
    const getParents = (component, parents) =>{
        if(!component) return;
        if(!component.data) return;
        var parent = component.data.parent;
        if(parent){
            parents.push(parent);
            getParents(parent, parents);
        }
    }

    const getVisible = () => {
        if(!options.displayOnlySelected) return true;
        if(!component) return true;
        if(!selected.element) return true;
        var compareList = [selected.element,];
        getParents(selected.element, compareList);
        for(let i=0;i<compareList.length;i++){
            var item = compareList[i];
            if(item.data.type === component.data.type && item.data.id === component.data.id){
                return true;
            }
        }
        
        return false;
    }

    const visible = getVisible();

    const handleToggleClick = async () => {
        if (!isOpened) {
            component ? component.setExpanded(true) : setExpanded(true) 
        } else {
           component ?component.setExpanded(false): setExpanded(false) 
        }
      };

    return (
        <>
        {
            visible && 
              <div style={{marginTop:'20px', marginLeft:margin, overflow:'visible'}}>
                <tr className={`heading-tr`}
                        onClick={handleToggleClick}>
                        <TD style={{alignContent:'center'}}>
                            
                            {
                                headerIcon ? 
                                <img src={headerIcon} style={{transform: 'scale(0.5)', verticalAlign:'top'}}/> :
                                isOpened?<Icon data={iconChevron180} size='small'/>:<Icon data={iconChevron90} size='small'/>
                                
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
                    isOpened &&
                    <div>
                        {children}     
                    </div>
                }
            </div>    
        }
        </>       
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