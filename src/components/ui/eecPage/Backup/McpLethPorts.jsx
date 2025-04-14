import {
    FormLabel,
    FormInputText,
    FormItem,
    FormInputDropdown,
    FormInputCheckbox
  } from '@tesla/design-system-react';
  import { useState, useEffect } from "react";
  import "./Eec.css";

  const McpLethPorts = ({ 
    index,
    initialValues,
    onSettingsChange,
    absIndex,
  }) => {
    const [comDropSettings, setComDropSettings] = useState({
      targetLocation: "",
      targetDT: "",
      targetPort: "",
      targetCableLength: "NULL",
      ...initialValues
    });
  
    const cableLengthOptions = [
        { value: "NULL", label: "NULL" },
        { value: "1.5 m", label: "1.5 m" },
        { value: "3 m", label: "3 m" },
        { value: "5 m", label: "5 m" },
        { value: "10 m", label: "10 m" },
        { value: "15 m", label: "15 m" },
        { value: "20 m", label: "20 m" },
      ];
  
    const handleChange = (field, value) => {
      const newSettings = {
        ...comDropSettings,
        [field]: value
      };
      setComDropSettings(newSettings);
      onSettingsChange?.(index, newSettings);
      
      /* if (lethPort) {
        lethPort[field] = value;
      } */
    };

    return (
        <div className="com-drop-item">
          <div className="com-drop-header">
            <h7>Port {index+5}</h7>
          </div>
            {/* Target device location */}
            <FormItem className="form-item">
              <FormLabel htmlFor={`target-location-${index}`}>
                Target device location (e.g., 00010)
              </FormLabel>
              <FormInputText
                id={`target-location-${index}`}
                value={comDropSettings.targetLocation}
                onChange={(e) => handleChange('targetLocation', e.target.value)}
              />
            </FormItem>
    
            {/* Target Device DT */}
            <FormItem className="form-item">
              <FormLabel htmlFor={`target-dt-${index}`}>
                Target device tag (e.g., RBC01)
              </FormLabel>
              <FormInputText
                id={`target-dt-${index}`}
                value={comDropSettings.TargetDT}
                onChange={(e) => handleChange('targetDT', e.target.value)}
              />
            </FormItem>
    
            {/* Target Device Port */}
            <FormItem className="form-item">
              <FormLabel htmlFor={`target-port-${index}`}>
                Target device FLA (Amps)
              </FormLabel>
              <FormInputText
                type="number"
                id={`target-port-${index}`}
                value={comDropSettings.targetPort}
                // need to insert dropdown list for available ports from identified target
                onChange={(e) => handleChange('targetPort', parseFloat(e.target.value))}
              />
            </FormItem>
    
            {/* Dropdown for Cable length */}
            <FormItem className="form-item">
              <FormLabel htmlFor={`target-cable-length-${index}`}>
                Target cable length
              </FormLabel>
              <FormInputDropdown
                id={`target-cable-length-${index}`}
                options={cableLengthOptions}
                value={comDropSettings.targetCableLength}
                onChange={(value) => handleChange('targetCableLength', value)}
              />
            </FormItem>
          </div>
      );
    };
    
    export default McpLethPorts;