import { pdpStore } from '../../Store/pdpStore';
import SetItemsNumberInputBox from '../Common/SetItemsNumberInputBox';
import PowerDropItem from './PowerDropItem';
import HeadingItem from '../Util/HeadingItem';
import "../../Eec.css";
import { formatToTwoDigits } from '../../Store/util';

const PowerDropConfiguration = ({pdp, index}) => {
    const setNumberOfPowerDrps = pdpStore((state) => state.setNumberOfPowerDrps);
 
    // Create array of power drop items for each amperage
    const renderPowerDrops = (amperage) => {
        var powerDropItems = []        
        var branchCircuit = pdp.branchCircuit[amperage].sort()

        for(let i=0;i<branchCircuit.length;i++){
            powerDropItems.push(
                <HeadingItem label={`${amperage} Branch circuit power drop ${i+1}: ${branchCircuit[i].deviceDT}`}
                    size={18} margin={"20px"} open={false}
                    component={branchCircuit[i]}
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
        var powerMonitorDrops = [] 
        if(pdp.PwrMonitorEnable){
            for(let i=0;i<2;i++){
                powerMonitorDrops.push(<HeadingItem label={`Branch circuit for Power Monitor CB${formatToTwoDigits(i+1)}`} 
                size={18} margin={"20px"}
                headerIcon="/powerdrop.png" />)    
            }
        }
        var powerDrops250A = renderPowerDrops("250A");
        var powerDrops100A = renderPowerDrops("100A");
        var powerDrops70A = renderPowerDrops("70A");
        var powerDrops60A = renderPowerDrops("60A");
        var powerDrops40A = renderPowerDrops("40A");
        var powerDrops30A = renderPowerDrops("30A");
        var powerDrops20A = renderPowerDrops("20A"); 
        var powerDrops10A = renderPowerDrops("10A");
        return [...powerMonitorDrops,...powerDrops250A, ...powerDrops100A, ...powerDrops70A, ...powerDrops60A, ...powerDrops40A, ...powerDrops30A, ...powerDrops20A, ...powerDrops10A]
    }

    const handleBranchCircuitChange = () => {
        pdp.setCBNumber();
    }


    return (
        
        <div>
            {/* Input fields for each amperage */}
            {Object.keys(pdp.branchCircuit).reverse().map(amperage => (
                <SetItemsNumberInputBox title={`${amperage} Power Drops`} 
                    items={pdp.branchCircuit[amperage]} addItems={setNumberOfPowerDrps} index={index} property={amperage} onSubmit={handleBranchCircuitChange}/>   
            ))}

            {
                renderAllPowerDrops()
            }
        </div>
    );
};
export default PowerDropConfiguration;