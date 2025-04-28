import { lineStore } from '../../Store/lineStore';
import { mcpStore } from '../../Store/mcpStore';
import "../../Eec.css";
import DropdownItem from '../Util/DropdownItem';
import { useEffect } from 'react';

const PlcIDSelection = ({item, title, index}) => {
    const mcps = mcpStore((state)=>state.mcps)
    const getPlcOptions = lineStore((state)=> state.getPlcOptions)
    const plcs = lineStore((state)=> state.plcs)
    useEffect(() => {
        getPlcOptions();
        if(mcps.length === 1){
            item.setValue(index, "plcID", mcps[0].getPlc())
        }
    }, [mcps]);
    return (
        
        <div>
            <DropdownItem title={title} item={item} 
                options={plcs} property={"plcID"} index={index}/>
        </div>
    );
};
export default PlcIDSelection;