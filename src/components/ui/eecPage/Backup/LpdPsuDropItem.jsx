import {
    FormLabel,
    FormInputText,
    FormItem,
    FormInputDropdown,
    FormInputCheckbox
  } from '@tesla/design-system-react';
  import { useState, useEffect } from "react";
  import "./Eec.css";
  
   const LpdPsuDropItem = ({ 
    psuSelection,
    index,
    numberOf24V_Drops,
    absIndex,
    line,
    initialValues,
    onSettingsChange,
  }) => {
    const [lpdPsuDropSettings, setLpdPsuDropSettings] = useState({
      psuSelection: initialValues.psuSelection ||"",
      outputPort: initialValues.outputPort || "",
      Line: line,
      Location: initialValues.Location || "",
      deviceTag: initialValues.deviceTag || "",
      description: initialValues.description || "",
      fla: initialValues.fla || "",
    });
    /* const [psuSelection, setPsuSelection] = useState("psuSelection");
    const [outputPort, setOutputPort] = useState("");
    const [Line, setLine] = useState(line);
    const [Location, setLocation] = useState("");
    const [deviceTag, setDeviceTag] = useState("");
    const [description, setDescription] = useState("");
    const [fla, setFLA] = useState(0); */
    
        
    /* const handlePsuSelectionChange = (event) => {
        const value = event.target.value;
        setPsuSelection(value);
    }

    const handleOutputPortChange = (event) => {
        const value = event.target.value;
        setOutputPort(value);
        //lpd.outputPort = value; //need to look into this as it is not in the parser file, may need to be added to the model.
    }

    const handleSetLineChange = (event)=> {
        const value = event.target.value;
        setLine(value);
        //lpd.line = value; //need to look into this as it is not in the parser file, may need to be added to the model.
    }

    const handleSetLocationChange = (event)=> {
        const value = event.target.value;
        setLocation(value);
        // lpd.location = value; //need to look into this as it is not in the parser file, may need to be added to the model.
    }

    const handleSetDeviceTagChange = (event)=> {
        const value = event.target.value;
        setDeviceTag(value);
        //lpd.deviceTag = value; //need to look into this as it is not in the parser file, may need to be added to the model.
    }

    const handleSetDescriptionChange = (event)=> {
        const value = event.target.value;
        setDescription(value);
        //lpd.description = value; //need to look into this as it is not in the parser file, may need to be added to the model.
    }

    const handleSetFLAChange = (event)=> {
        const value = event.target.value;
        setFLA(value);
        //lpd.fla = value; //need to look into this as it is not in the parser file, may need to be added to the model.
    } */
  
    const handleChange = (field, value) => {
      const newSettings = {
        ...lpdPsuDropSettings,
        [field]: value
      };
      setLpdPsuDropSettings(newSettings);
      onSettingsChange?.(index, newSettings);
    };
    
  

    return (
      <div className="lpd-psu-drop-item">
        <div className="lpd-psu-drop-header">
          <h7>24VDC field power drop {absIndex}</h7>
        </div>
  
        <div className="lpd-psu-drop-settings">
        {psuSelection === 'Turck' || psuSelection === 'Puls' || psuSelection === 'Balluff-BAE0133' && (
            <>
                {/* PSU output port */}
                <FormItem className="form-item">
                  <FormLabel htmlFor={`output-port-${index}`}>
                    Select the output port of the PSU:
                  </FormLabel>
                  <FormInputText
                    id="context"
                    value={lpdPsuDropSettings.outputPort}
                    options={
                      psuSelection === 'Balluff-BAE0133' ?
                      [
                          {value: "X3", label: "X3"},
                          {value: "X4", label: "X4"},
                          {value: "X5", label: "X5"},
                      ] : psuSelection === 'Puls' ?
                      [
                          {value: "X3", label: "X3"},
                          {value: "X4", label: "X4"},
                          {value: "X5", label: "X5"},
                      ] : psuSelection === 'Turck' ?
                      [
                          {value: "XD2", label: "XD2"},
                          {value: "XD3", label: "XD3"},
                      ] : []
                  }
                    //onChange={handlePsuSelectionChange}
                    onChange={(e) => handleChange('outputPort', e.target.value)}
                  />
                </FormItem>
                </>
          )}

          {/* Drop: Target Line */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`Line-${index}`}>
              Manufacturing Line name (e.g., UBM1, DOR1)
            </FormLabel>
            <FormInputText
              id="context"
              value={lpdPsuDropSettings.Line}
              //onChange={handleSetLineChange}
              onChange={(e) => handleChange('Line', e.target.value)}
            />
          </FormItem>
          {/* Drop: Target Location */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`location-${index}`}>
              Location designation (i.e., Station number) (e.g., 00010)
            </FormLabel>
            <FormInputText
              id="context"
              value={lpdPsuDropSettings.Location}
              //onChange={handleSetLocationChange}
              onChange={(e) => handleChange('Location', e.target.value)}
            />
          </FormItem>
          {/* Drop: Target DT */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`device-tag-${index}`}>
              Device Tag (e.g., MIO01)
            </FormLabel>
            <FormInputText
              id="context"
              value={lpdPsuDropSettings.deviceTag}
              //onChange={handleSetDeviceTagChange}
              onChange={(e) => handleChange('deviceTag', e.target.value)}
            />
          </FormItem>
          {/* Drop: Description */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`description-${index}`}>
              Enter the description of the target device
            </FormLabel>
            <FormInputText
              id="context"
              value={lpdPsuDropSettings.description}
              //onChange={handleSetDescriptionChange}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </FormItem>
          {/* Drop: FLA */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`fla-${index}`}>
              FLA
            </FormLabel>
            <FormInputText
              id="context"
              value={lpdPsuDropSettings.fla}
              //onChange={handleSetFLAChange}
              onChange={(e) => handleChange('fla', e.target.value)}
            />
          </FormItem>

          
        </div>
      </div>
    );
  };
  
  export default LpdPsuDropItem;