import { useState, useEffect } from 'react';
import CreateableDropdownItem from '../Util/CreateableDropdownItem';
import "../../Eec.css";
import { lineStore } from '../../Store/lineStore';
import { projectStore } from '../../Store/projectStore';
import InputTextItem from '../Util/InputTextItem';

const LineLocationSelection = ({
    item, index, setModelValue, 
    lineTitle = "Manufacturing Line name (e.g., UBM1, DOR1)", 
    locationTitle ="Location designation (e.g., MPDP01, WPDP01)", 
    hideLocation,
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
            <CreateableDropdownItem title={lineTitle} placeHolder={item.line} options={lines}  setModelValue={setModelValue} index={index} property={"line"}/>
            {
                !hideLocation &&
                <CreateableDropdownItem title={locationTitle} placeHolder={item.location} options={locationOptions} setModelValue={setModelValue} index={index} property={"location"}/>
            }
        </div>
    );
};
export default LineLocationSelection;