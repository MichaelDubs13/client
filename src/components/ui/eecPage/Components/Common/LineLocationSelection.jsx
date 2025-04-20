import { useState, useEffect } from 'react';
import CreateableDropdownItem from '../Util/CreateableDropdownItem';
import { lineStore } from '../../Store/lineStore';
import { projectStore } from '../../Store/projectStore';
import InputTextItem from '../Util/InputTextItem';
import "../../Eec.css";

const LineLocationSelection = ({
    item, index,
    lineTitle = "Manufacturing Line name (e.g., UBM1, DOR1)", 
    locationTitle ="Location designation (e.g., MPDP01, WPDP01)", 
    onLocationChange,
    onLineChange,
    showPlantShop
}) => {
    const plant = projectStore((state) => state.plant);
    const shop = projectStore((state) => state.shop);
    const getLineOptions = lineStore((state) => state.getLineOptions)     
    const getLocationOptions = lineStore((state) => state.getLocationOptions) 
    const lines = lineStore((state) => state.lines)   
    const [locationOptions, setLocationOptions] = useState([]);
    

    useEffect(() => {
        getLineOptions();
        var locations = getLocationOptions(item.line);
        setLocationOptions(locations);
    }, [item.line]);
    

    

    return (
        
        <div>
            {
                showPlantShop && <div>
                    <InputTextItem title={"Plant name"} placeHolder={plant} readOnly={true} />
                    <InputTextItem title={"Shop name"} placeHolder={shop} readOnly={true} />
                </div>
            }
            <CreateableDropdownItem title={lineTitle} item={item} options={lines} index={index} property={"line"} onChange={onLineChange}/>
            <CreateableDropdownItem title={locationTitle} item={item} options={locationOptions} index={index} property={"location"} onChange={onLocationChange}/>
        </div>
    );
};
export default LineLocationSelection;