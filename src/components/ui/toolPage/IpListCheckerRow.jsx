import React , {useState, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import { FormLabel,  } from '@tesla/design-system-react';
import useDeviceStore from '../../../store/deviceStore';
import IssueReasonRow from './IssueReasonRow';

const IpListCheckerRow = ({rows, setRows}) => {
    const [expanded, setExpanded] = useState(false);
    const fetchMastercopyGSDs = useDeviceStore((state) => state.fetchMastercopyGSDs);
    const fetchGsdFolders = useDeviceStore((state) => state.fetchGsdFolders);
    const mastercopyGsds = useDeviceStore((state) => state.mastercopyGsds);
    const gsdFolders = useDeviceStore((state) => state.gsdFolders);
    const folders = gsdFolders.filter(folder => folder.folder != "ClosedXML.Excel.XLCell").map(folder => folder.folder);
    const gsds = mastercopyGsds.map(gsd => gsd.mastercopy);
    useEffect(()=>{
        const fetchData = async () =>{
          fetchMastercopyGSDs();
          fetchGsdFolders();   
      }

      fetchData();
    }, [])

    const handleToggleClick = async () => {
      if (!expanded) {
        setExpanded(true);
        
      } else {
        setExpanded(false);
      }
    };

    const validate = (row) => {
        const messageHeader = `row number: ${row.__rowNum__ + 1}, ${row.__EMPTY_17}`;
        
        //ignore PLCs
        //mastercopy device type
        if(row?.__EMPTY_13?.toUpperCase() === "PLC"){
            return '';
        }
        if(!row.__EMPTY_13){
            return {issue:`${messageHeader} has No Device Type Assigned`, detail:'this device will not be generated if no device type is assigned, assign device type: ', options: folders};
        } else {
            if(!folders.includes(row.__EMPTY_13)){
                return {issue:`${messageHeader} has wrong device type: ${row.__EMPTY_13} assigned`, detail:`Assign a device types: `, options:folders};
            }
        }

        //mastercopy device
        if(!row.__EMPTY_14){
            return {issue:`${messageHeader} has No Device Assigned`, detail:'this device will not be generated if no device is assigned, assign device: ', options: gsdsFromFolder};
        } else {
            if(!gsds.includes(row.__EMPTY_14)){
                var gsdsFromFolder = mastercopyGsds.filter(gsd => gsd.folder === row.__EMPTY_13).map(gsd => gsd.mastercopy);
                return {issue:`${messageHeader} has wrong device: ${row.__EMPTY_14} assigned`, detail:`Assign a device for ${row.__EMPTY_13}: `, options: gsdsFromFolder};
            }
        }
      
        //opmode column
        if(isNaN(row.__EMPTY_16)){
            return {issue:`${messageHeader} has No Opmode Assigned`, detail:'this device will not be generated if no opmode is assigned, assign opmode: ', values: "assign a opmode number"};
        }
        
        return '';
    }
    
    const filter = (rows) => {
        //filter out rows with no stations assigned
        //skip first row = header
        var results = [];
        rows.slice(1).filter(row => row.__EMPTY_11).forEach(row => {
            const reason = validate(row);
            if(reason){
                results.push(reason);
            }
        });

        return results;
    }
    
    const filteredRows = filter(rows);
    const GetBackGroundColor = () =>{
        if(filteredRows.length > 0 ){
            return "lightyellow"
        } else {
            return "#f4f4f4"
        }
    }
    
    return (
        <>

                <tr style={{display:'flex', justifyContent:'space-between', height:'40px', alignItems:'center', borderRadius:'10px', marginTop:'10px', backgroundColor: GetBackGroundColor() }} //"tds--highlighted" 
                    onClick={handleToggleClick}>
                    <FormLabel htmlFor="ipListErrors" style={{marginLeft:'20px', size:20}}>IpList Issues: {filteredRows.length}</FormLabel>
                    <td>
                        <IconContext.Provider value={{ color:"black", size:20, style:{marginRight:'10px'}}}>
                            {
                                expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                            }
                        </IconContext.Provider>
                    </td>
                </tr>
                    {expanded && (
                    <tr>
                        <td colSpan={6}>
                            <tr>
                                {
                                    filteredRows.map((row)=>{
                                        return(
                                            <IssueReasonRow issue={row.issue} detail={row.detail} options={row.options} values={row.values}/>
                                        )})
                                }
                                
                            </tr>
                        </td>
                    </tr>
                    )} 
        </>
    );
}

export default IpListCheckerRow;