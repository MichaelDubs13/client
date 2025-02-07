import InputItem from "./InputItem";
import DropdownItem from "./DropdownItem";
import CheckboxItem from "./CheckboxItem";

const Item = ({item, index, group}) =>{
    const DependencyCheck = () =>{
        //need to check if this item has dependency
        //if it does NOT have dependency then display it
        //if it HAS dependency then check to see if dependency parameter and value conditions are met
        //then display
        if (item.dependency){
            const dependentItem = group.find((conditionName)=>conditionName?.dependency?.parameter==item.dependency.parameter)
            if (dependentItem){
                if (dependentItem.value==item.dependency.value){
                    return true
                }
                else {
                    return false
                }
            }
            else {
                return false
            }
        }
        return true
    }
    return (
        <>
            {     
            DependencyCheck() &&           
                {
                    'checkbox':<CheckboxItem item={item} index={index}/>,
                    'text': <InputItem item={item} index={index}/>,
                    'dropdown':<DropdownItem item={item} index={index}/>
                } [item.type]
            }
                
            
            
        </>
    );
}

export default Item;