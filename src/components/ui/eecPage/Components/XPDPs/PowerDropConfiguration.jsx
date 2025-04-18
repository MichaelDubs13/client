import { xpdpStore } from '../../Store/xpdpStore';
import { FormLabel, FormInputText,  FormItem,  } from '@tesla/design-system-react';
import { useEffect, useState } from "react";
import "../../Eec.css";
import PowerDropItem from '../PDPs/PowerDropItem';
import HeadingItem from "../Util/HeadingItem";
import InputTextItemBasic from '../Util/InputTextItemBasic';

const PowerDropConfiguration = ({xpdp, index}) => {
    const setNumberOfPowerDrps = xpdpStore((state) => state.setNumberOfPowerDrps);
    const setBranchCircuitValue =  xpdpStore((state) => state.setBranchCircuitValue);
    const [numberOf1phDrops, setnumberOf1phDrops] = useState(0);
    let absIndexCounter = 1; 
    
    useEffect(()=>{
        calculate1phDrops();
    }, [xpdp.branchCircuit]);

    const calculate1phDrops = () => {
        const total1phDrops = xpdp.branchCircuit["8A 1ph"].length + xpdp.branchCircuit["15A 1ph"].length + xpdp.branchCircuit["20A 1ph"].length
        setnumberOf1phDrops(total1phDrops);
    }

    const handlePowerDropChange = (amperage) => (value) =>{
        let reportedValue = parseInt(value) || 0;
        if (amperage === "20A 3ph" && reportedValue > 2) {
            reportedValue = 2;
        }
        setNumberOfPowerDrps(index, amperage, reportedValue);
    }
   
    // Create array of power drop items for each amperage
    const renderPowerDrops = (amperage) => {
        var powerDropItems = []
        var branchCircuit = xpdp.branchCircuit[amperage];

        for(let i=0;i<branchCircuit.length;i++){
            powerDropItems.push(
                <HeadingItem label={`${amperage} Branch circuit power drop ${i}: CB${absIndexCounter}`}
                    size={18} margin={"20px"} open={false}
                    headerIcon={"/powerdrop.png"}
                    children={<PowerDropItem 
                    key={`${amperage}-${i+1}`}
                    amperage={(amperage)} 
                    setBranchCircuitValue={setBranchCircuitValue}
                    pdpIndex={index}
                    branchCircuitIndex={i}
                    branchCircuit={branchCircuit[i]}/>}
            />)
            absIndexCounter++
        }
        return powerDropItems;
    };

    const renderAllPowerDrops = () => {
        var numberOfPwrDrop8A = renderPowerDrops("8A 1ph");
        var numberOfPwrDrop15A = renderPowerDrops("15A 1ph");
        var numberOfPwrDrop20A1p = renderPowerDrops("20A 1ph");
        var numberOfPwrDrop20A3p = renderPowerDrops("20A 3ph");
        return [...numberOfPwrDrop8A, ...numberOfPwrDrop15A, ...numberOfPwrDrop20A1p, ...numberOfPwrDrop20A3p]
    }
  
    return (
        
        <div>
            {/* Input fields for each amperage */}
            {Object.keys(xpdp.branchCircuit).reverse().map(amperage => (
                <InputTextItemBasic title={`Number of ${amperage} power drops:`} data={xpdp.branchCircuit[amperage].length} 
                onTypingFinished={handlePowerDropChange(amperage)}/>
            ))}
            
             {/* Read-only field for total number of drops */}
             <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor="context">Total number of 1ph power drops (not to exceed 24):</FormLabel>
                    <FormInputText
                    id="context"
                    value={numberOf1phDrops}
                    readOnly
                    />
            </FormItem> 

            {
                renderAllPowerDrops()
            }
        </div>
    );
};
export default PowerDropConfiguration;