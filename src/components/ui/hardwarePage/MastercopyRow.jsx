import React, { useState, forwardRef } from "react";
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import useDeviceStore from "../../../store/deviceStore";
import { FormItem, FormLabel, FormInputText, FormInputDropdown, TBody } from '@tesla/design-system-react';

const MastercopyRow = forwardRef(({hardware}, ref) => {
    const [expanded, setExpanded] = useState(false);
    const [mastercopyName, setMastercopyName] = useState("");
    const gsdFolders = useDeviceStore((state) => state.gsdFolders);
    const [selectedFolder, setSelectedFolder] = useState(""); 
    const mastercopyGsds = useDeviceStore((state) => state.mastercopyGsds);
    const [mastercopies, setMastercopies] = useState([])
    const [selectedMastercopy, setSelectedMastercopy] = useState()
    const [selectedMastercopyName, setSelectedMastercopyName] = useState("")

    const handleToggleClick = async () => {
      if (!expanded) {
        setExpanded(true);  
      } else {
        setExpanded(false);
      }
    };

    const handleNameChange = async (event) => {
        setMastercopyName(event.target.value);
        hardware.mastercopyName = event.target.value;
    };
    const handleFolderSelect = async (event) => {
        setSelectedFolder(event.value);
        hardware.mastercopyFolder = event.value;
        var mastercopies = mastercopyGsds.filter(i => i.folder === event.value);
        setMastercopies(mastercopies);
    }
    const handleMastercopySelect = async (event) => {
        var mastercopy = mastercopies.filter(i => i.mastercopy == event.value)[0]
        setSelectedMastercopy(mastercopy);
        setSelectedMastercopyName(event.value)
        console.log(mastercopy)
    }

return (
        <>
           <tr className={`tr-block`} //"tds--highlighted" 
                    onClick={handleToggleClick}>
                    <td>
                        <IconContext.Provider value={{ color:"black", size:20 }}>
                            {
                                expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                            }
                        </IconContext.Provider>
                            
                        </td>
                    <td className='td-block' style={hardware?.isLatest === true ? {backgroundColor:"lightgreen"} : {}}>{hardware?.parsedName}</td>
                    <td className='td-block'>{hardware?.version}</td>
                    <td className='td-block'>{hardware?.time}</td>
                    <td className='td-block'>{hardware?.revision}</td>
                    <td className='td-block'>{hardware?.name}</td>
                    <td className='td-device'>
                            <input id={hardware.id} ref={ref} type="checkbox" name={hardware.name} style={{transform:"scale(1.5)"}}/>
                    </td>
                </tr>
                            
            {expanded && (
                <tr>
                    <td></td>
                    <td colSpan={6}>
                    <div style={{display: "inline-block"}}>
                            <FormLabel >From Server: {hardware?.server}</FormLabel>
                            <FormLabel >From Project: {hardware?.project}</FormLabel>
                            <FormItem className="hmi-form-item"> 
                                <FormLabel className="hmi-form-label">Mastercopy Name</FormLabel>
                                <FormInputText
                                className='hmi-form-input'
                                id="mastercopyName"
                                placeholder="Enter Mastercopy Name"
                                value={mastercopyName}
                                onChange={handleNameChange}
                                />
                            </FormItem>
                            <FormItem className="hmi-form-item"> 
                                <FormLabel className="hmi-form-label">Mastercopy Folder</FormLabel>
                                <FormInputDropdown
                                    className='hmi-form-input'
                                    id="mastercopyFolder"
                                    label="mastercopyFolder"
                                    onOptionSelect={handleFolderSelect}
                                    options={gsdFolders.map((item) => item.folder)}
                                    placeholder=""
                                    selected={selectedFolder}
                                    style={{ marginBottom: "5px"}}
                                ></FormInputDropdown>
                            </FormItem>
                            <FormItem className="hmi-form-item"> 
                                <FormLabel className="hmi-form-label">Mastercopies</FormLabel>
                                <FormInputDropdown
                                    className='hmi-form-input'
                                    id="mastercopy"
                                    label="mastercopy"
                                    onOptionSelect={handleMastercopySelect}
                                    options={mastercopies.map((item) => item.mastercopy)}
                                    placeholder=""
                                    selected={selectedMastercopyName}
                                    style={{ marginBottom: "5px"}}
                                ></FormInputDropdown>
                            </FormItem>
                            {
                                selectedMastercopy && 
                                <tr className={`tr-block`}>
                                    <td className='td-block'>{selectedMastercopy?.parsedName}</td>
                                    <td className='td-block'>{selectedMastercopy?.version}</td>
                                    <td className='td-block'>{selectedMastercopy?.time}</td>
                                    <td className='td-block'>{selectedMastercopy?.revision}</td>
                                    <td className='td-block'>{selectedMastercopy?.name}</td>
                                </tr>
                            }
                        </div>
                    </td>
                    
                </tr>
            )}
        </>
    )
})

export default MastercopyRow;