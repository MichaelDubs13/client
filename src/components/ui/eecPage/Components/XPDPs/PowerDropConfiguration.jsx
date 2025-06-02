import { xpdpStore } from '../../Store/xpdpStore';
import { FormLabel,  FormItem,  } from '@tesla/design-system-react';
import { useEffect, useState } from "react";
import "../../Eec.css";
import PowerDropItem from '../PDPs/PowerDropItem';
import HeadingItem from "../Util/HeadingItem";
import SetItemsNumberInputBox from '../Common/SetItemsNumberInputBox';
import { isNumberLessThanValidation } from '../Util/Validations';

const PowerDropConfiguration = ({xpdp, index}) => {
    const setNumberOfPowerDrps = xpdpStore((state) => state.setNumberOfPowerDrps);
    const setBranchCircuitValue =  xpdpStore((state) => state.setBranchCircuitValue);
    const numberOf1phDrops = xpdp.branchCircuit["8A 1ph"].length + xpdp.branchCircuit["15A 1ph"].length + xpdp.branchCircuit["20A 1ph"].length;
    
    const renderPowerDrops = (amperage) => {
        var powerDropItems = []
        var branchCircuit = xpdp.branchCircuit[amperage];

        for(let i=0;i<branchCircuit.length;i++){
            powerDropItems.push(
                <HeadingItem label={`${amperage} Branch circuit power drop ${i+1}: ${branchCircuit[i].deviceDT}`}
                    size={18} margin={"20px"} open={false}
                    component={branchCircuit[i]}
                    headerIcon={branchCircuit[i].UI.icon}
                    children={<PowerDropItem 
                    key={`${amperage}-${i+1}`}
                    amperage={(amperage)} 
                    setBranchCircuitValue={setBranchCircuitValue}
                    pdpIndex={index}
                    branchCircuitIndex={i}
                    branchCircuit={branchCircuit[i]}/>}
            />)
        }
        return powerDropItems;
    };

    const renderAllPowerDrops = () => {
        var numberOfPwrDrop20A3p = renderPowerDrops("20A 3ph");
        var numberOfPwrDrop20A1p = renderPowerDrops("20A 1ph");
        var numberOfPwrDrop15A = renderPowerDrops("15A 1ph");
        var numberOfPwrDrop8A = renderPowerDrops("8A 1ph");
        return [...numberOfPwrDrop20A3p,...numberOfPwrDrop20A1p, ...numberOfPwrDrop15A, ...numberOfPwrDrop8A]
    }

    return (
        
        <div>
            {/* Input fields for each amperage */}
            {Object.keys(xpdp.branchCircuit).reverse().map(amperage => (
                <SetItemsNumberInputBox title={`Number of ${amperage} power drops:`} 
                items={xpdp.branchCircuit[amperage]} addItems={setNumberOfPowerDrps} index={index} property={amperage}
                validation={amperage === '20A 3ph' ? (value)=>{return isNumberLessThanValidation(2,value)} : null}/>   
            ))}
            
             {/* Read-only field for total number of drops */}
             <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor="context">Total number of 1ph power drops (not to exceed 24): {numberOf1phDrops}</FormLabel>
            </FormItem> 

            {
                renderAllPowerDrops()
            }
        </div>
    );
};
export default PowerDropConfiguration;