import { pdpStore } from '../../Store/pdpStore';
import InputTextItemBasic from '../Util/InputTextItemBasic';
import PowerDropItem from './PowerDropItem';
import HeadingItem from '../Util/HeadingItem';
import "../../Eec.css";

const PowerDropConfiguration = ({pdp, index}) => {
    const setNumberOfPowerDrps = pdpStore((state) => state.setNumberOfPowerDrps);
    
    const handlePowerDropChange = (amperage) => (value) =>{
        const reportedValue = parseInt(value) || 0
        setNumberOfPowerDrps(index, amperage, reportedValue);
    }

    // Create array of power drop items for each amperage
    const renderPowerDrops = (amperage) => {
        var powerDropItems = []
        var branchCircuit = pdp.branchCircuit[amperage];

        for(let i=0;i<branchCircuit.length;i++){
            powerDropItems.push(
                <HeadingItem label={`${amperage} Branch circuit power drop ${i}: ${branchCircuit[i].UI.CB_DT}`}
                    size={18} margin={"20px"} open={false}
                    headerIcon={branchCircuit[i].UI.icon}
                    children={<PowerDropItem 
                    key={`${amperage}-${i+1}`}
                    amperage={amperage} 
                    pdpIndex={index}
                    branchCircuitIndex={i}
                    branchCircuit={branchCircuit[i]}/>}
            />)
        }
        return powerDropItems;
    };

    const renderAllPowerDrops = () => {
        var powerDrops250A = renderPowerDrops("250A");
        var powerDrops100A = renderPowerDrops("100A");
        var powerDrops70A = renderPowerDrops("70A");
        var powerDrops60A = renderPowerDrops("60A");
        var powerDrops40A = renderPowerDrops("40A");
        var powerDrops30A = renderPowerDrops("30A");
        var powerDrops20A = renderPowerDrops("20A"); 
        var powerDrops10A = renderPowerDrops("10A");
        return [...powerDrops250A, ...powerDrops100A, ...powerDrops70A, ...powerDrops60A, ...powerDrops40A, ...powerDrops30A, ...powerDrops20A, ...powerDrops10A]
    }

    return (
        
        <div>
            {/* Input fields for each amperage */}
            {Object.keys(pdp.branchCircuit).reverse().map(amperage => (
                <InputTextItemBasic title={`${amperage} Power Drops`} data={pdp.branchCircuit[amperage].length} 
                onTypingFinished={handlePowerDropChange(amperage)}/>
            ))}

            {
                renderAllPowerDrops()
            }
        </div>
    );
};
export default PowerDropConfiguration;