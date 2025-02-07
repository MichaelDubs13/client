import ListGroup from "./ListGroup";
import pdpStore from "../../../store/eec/pdpStore";
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import { FormLabel, FormInputText, Button, FormItem } from '@tesla/design-system-react';
import { useState } from "react";
import "./Eec.css";
import PowerDropItem from "./PowerDropItem";

const M_W_PdpConfiguration = () => {
    
    const [numberOfPowerDrops_10A, setNumberOfPowerDrops_10A] = useState(0);
    const [numberOfPowerDrops_20A, setNumberOfPowerDrops_20A] = useState(0);
    const [numberOfPowerDrops_30A, setNumberOfPowerDrops_30A] = useState(0);
    const [numberOfPowerDrops_40A, setNumberOfPowerDrops_40A] = useState(0);
    const [numberOfPowerDrops_60A, setNumberOfPowerDrops_60A] = useState(0);
    const [numberOfPowerDrops_70A, setNumberOfPowerDrops_70A] = useState(0);
    const [numberOfPowerDrops_100A, setNumberOfPowerDrops_100A] = useState(0);
    const [numberOfPowerDrops_250A, setNumberOfPowerDrops_250A] = useState(0);
    const [numberOfPowerDrops, setNumberOfPowerDrops] = useState(0);
      
    const handleSetNumberOfPowerDrops_10AChange = (event)=> {
        const numberOfDrops10A = event.target.value;
        setNumberOfPowerDrops_10A(numberOfDrops10A);
        const totalDrops = calculateTotalDrops(numberOfDrops10A, numberOfPowerDrops_20A, numberOfPowerDrops_30A, numberOfPowerDrops_40A, numberOfPowerDrops_60A, numberOfPowerDrops_70A, numberOfPowerDrops_100A, numberOfPowerDrops_250A);
        setNumberOfPowerDrops(totalDrops);
    }
    const handleSetNumberOfPowerDrops_20AChange = (event)=> {
        const numberOfDrops20A = event.target.value;
        setNumberOfPowerDrops_20A(numberOfDrops20A);
        const totalDrops = calculateTotalDrops(numberOfPowerDrops_10A, numberOfDrops20A, numberOfPowerDrops_30A, numberOfPowerDrops_40A, numberOfPowerDrops_60A, numberOfPowerDrops_70A, numberOfPowerDrops_100A, numberOfPowerDrops_250A);
        setNumberOfPowerDrops(totalDrops);
    }
    const handleSetNumberOfPowerDrops_30AChange = (event)=> {
        const numberOfDrops30A = event.target.value;
        setNumberOfPowerDrops_30A(numberOfDrops30A);
        const totalDrops = calculateTotalDrops(numberOfPowerDrops_10A, numberOfPowerDrops_20A, numberOfDrops30A, numberOfPowerDrops_40A, numberOfPowerDrops_60A, numberOfPowerDrops_70A, numberOfPowerDrops_100A, numberOfPowerDrops_250A);
        setNumberOfPowerDrops(totalDrops);
    }
    const handleSetNumberOfPowerDrops_40AChange = (event)=> {
        const numberOfDrops40A = event.target.value;
        setNumberOfPowerDrops_40A(numberOfDrops40A);
        const totalDrops = calculateTotalDrops(numberOfPowerDrops_10A, numberOfPowerDrops_20A, numberOfPowerDrops_30A, numberOfDrops40A, numberOfPowerDrops_60A, numberOfPowerDrops_70A, numberOfPowerDrops_100A, numberOfPowerDrops_250A);
        setNumberOfPowerDrops(totalDrops);
    }
    const handleSetNumberOfPowerDrops_60AChange = (event)=> {
        const numberOfDrops60A = event.target.value;
        setNumberOfPowerDrops_60A(numberOfDrops60A);
        const totalDrops = calculateTotalDrops(numberOfPowerDrops_10A, numberOfPowerDrops_20A, numberOfPowerDrops_30A, numberOfPowerDrops_40A, numberOfDrops60A, numberOfPowerDrops_70A, numberOfPowerDrops_100A, numberOfPowerDrops_250A);
        setNumberOfPowerDrops(totalDrops);
    }
    const handleSetNumberOfPowerDrops_70AChange = (event)=> {
        const numberOfDrops70A = event.target.value;
        setNumberOfPowerDrops_70A(numberOfDrops70A);
        const totalDrops = calculateTotalDrops(numberOfPowerDrops_10A, numberOfPowerDrops_20A, numberOfPowerDrops_30A, numberOfPowerDrops_40A, numberOfPowerDrops_60A, numberOfDrops70A, numberOfPowerDrops_100A, numberOfPowerDrops_250A);
        setNumberOfPowerDrops(totalDrops);
    }
    const handleSetNumberOfPowerDrops_100AChange = (event)=> {
        const numberOfDrops100A = event.target.value;
        setNumberOfPowerDrops_100A(numberOfDrops100A);
        const totalDrops = calculateTotalDrops(numberOfPowerDrops_10A, numberOfPowerDrops_20A, numberOfPowerDrops_30A, numberOfPowerDrops_40A, numberOfPowerDrops_60A, numberOfPowerDrops_70A, numberOfDrops100A, numberOfPowerDrops_250A);
        setNumberOfPowerDrops(totalDrops);
    }
    const handleSetNumberOfPowerDrops_250AChange = (event)=> {
        const numberOfDrops250A = event.target.value;
        setNumberOfPowerDrops_250A(numberOfDrops250A);
        const totalDrops = calculateTotalDrops(numberOfPowerDrops_10A, numberOfPowerDrops_20A, numberOfPowerDrops_30A, numberOfPowerDrops_40A, numberOfPowerDrops_60A, numberOfPowerDrops_70A, numberOfPowerDrops_100A, numberOfDrops250A);
        setNumberOfPowerDrops(totalDrops);
    }

    const calculateTotalDrops=(numberOfDrops10A, numberOfDrops20A, numberOfDrops30A, numberOfDrops40A, numberOfDrops60A, numberOfDrops70A, numberOfDrops100A, numberOfDrops250A)=>{
        const total = parseInt(numberOfDrops10A) + parseInt(numberOfDrops20A) + parseInt(numberOfDrops30A) + parseInt(numberOfDrops40A)
                       + parseInt(numberOfDrops60A) + parseInt(numberOfDrops70A) + parseInt(numberOfDrops100A) + parseInt(numberOfDrops250A);
        return total; 
    }

    const calculateUsedBusbarLength=(numberOfDrops10A, numberOfDrops20A, numberOfDrops30A, numberOfDrops40A, numberOfDrops60A, numberOfDrops70A, numberOfDrops100A, numberOfDrops250A)=>{
        const total = (parseInt(numberOfDrops10A)*45) + (parseInt(numberOfDrops20A)*45) + (parseInt(numberOfDrops30A)*72) + 
                        (parseInt(numberOfDrops40A)*72) + (parseInt(numberOfDrops60A)*72) + (parseInt(numberOfDrops70A)*72) + 
                        (parseInt(numberOfDrops100A)*76) + (parseInt(numberOfDrops250A)*105);
        return total;
    }

    return (
        <>
            
            <div>
                    <div>
                        <FormItem className="form-item">
                            <FormLabel className="form-label" htmlFor="context">NumberOfPowerDrops_10A</FormLabel>
                            <FormInputText
                            id="context"
                            value={numberOfPowerDrops_10A}
                            onChange={handleSetNumberOfPowerDrops_10AChange}/>
                        </FormItem>   
                        <FormItem className="form-item">
                            <FormLabel className="form-label" htmlFor="context">NumberOfPowerDrops_20A</FormLabel>
                            <FormInputText
                            id="context"
                            value={numberOfPowerDrops_20A}
                            onChange={handleSetNumberOfPowerDrops_20AChange}/>
                        </FormItem>   
                        <FormItem className="form-item">
                            <FormLabel className="form-label" htmlFor="context">NumberOfPowerDrops_30A</FormLabel>
                            <FormInputText
                            id="context"
                            value={numberOfPowerDrops_30A}
                            onChange={handleSetNumberOfPowerDrops_30AChange}/>
                        </FormItem>   
                        <FormItem className="form-item">
                            <FormLabel className="form-label" htmlFor="context">NumberOfPowerDrops_40A</FormLabel>
                            <FormInputText
                            id="context"
                            value={numberOfPowerDrops_40A}
                            onChange={handleSetNumberOfPowerDrops_40AChange}/>
                        </FormItem>   
                        <FormItem className="form-item">
                            <FormLabel className="form-label" htmlFor="context">NumberOfPowerDrops_60A</FormLabel>
                            <FormInputText
                            id="context"
                            value={numberOfPowerDrops_60A}
                            onChange={handleSetNumberOfPowerDrops_60AChange}/>
                        </FormItem>   
                        <FormItem className="form-item">
                            <FormLabel className="form-label" htmlFor="context">NumberOfPowerDrops_70A</FormLabel>
                            <FormInputText
                            id="context"
                            value={numberOfPowerDrops_70A}
                            onChange={handleSetNumberOfPowerDrops_70AChange}/>
                        </FormItem>   
                        <FormItem className="form-item">
                            <FormLabel className="form-label" htmlFor="context">NumberOfPowerDrops_100A</FormLabel>
                            <FormInputText
                            id="context"
                            value={numberOfPowerDrops_100A}
                            onChange={handleSetNumberOfPowerDrops_100AChange}/>
                        </FormItem>   
                        <FormItem className="form-item">
                            <FormLabel className="form-label" htmlFor="context">NumberOfPowerDrops_250A</FormLabel>
                            <FormInputText
                            id="context"
                            value={numberOfPowerDrops_250A}
                            onChange={handleSetNumberOfPowerDrops_250AChange}/>
                        </FormItem>
                        <FormItem className="form-item">
                            <FormLabel className="form-label" htmlFor="context">NumberOfPowerDrops</FormLabel>
                            <FormInputText
                            id="context"
                            value={numberOfPowerDrops}/>
                        </FormItem>   
                    </div>
                <div>
                    {Array.from({ length: numberOfPowerDrops }).map((_, index) => (
                        <PowerDropItem
                        key={index}
                        index={index}
                        type="Type"
                        amps={0}
                        />
                    ))}
                </div>
            </div>
                    
        </>
    )
  };


export default M_W_PdpConfiguration;