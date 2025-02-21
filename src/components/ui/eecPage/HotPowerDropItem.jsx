import {
    FormLabel,
    FormInputText,
    FormItem,
    FormInputDropdown,
    FormInputCheckbox
  } from '@tesla/design-system-react';
  import { useState, useEffect } from "react";
  import "./Eec.css";
  
   const HotPowerDropItem = ({ 
    index,
    amperage,
    initialValues,
    onSettingsChange, 
    absIndex,
  }) => {
    const [hotPowerDropSettings, setHotPowerDropSettings] = useState({
      //HotPwrDrop_Spare: true,
      HotPwrDropType: "Spare",
      HotPwrDrp_Target_Location: "",
      HotPwrDrp_Target_DT: "",
      HotPwrDrp_Target_Desc: "",
      //HotPwrDrp_Target_FLA: 0,
      //HotPwrDrp_StrBox_FLA: 0,
      ...initialValues
    });
  
    const hotpwrdropTypeOptions = [
      { value: "Spare", label: "Spare" },
      { value: "Device", label: "Device" }
    ];
  
    const handleChange = (field, value) => {
      const newSettings = {
        ...hotPowerDropSettings,
        [field]: value
      };
      
      setHotPowerDropSettings(newSettings);
      onSettingsChange?.(index, newSettings);
    };

    return (
      <div className="hot-power-drop-item">
        <div className="hot-power-drop-header">
          <h3>5A Hot Power Branch circuit power drop {index + 1}: CB{absIndex}</h3>
        </div>
  
        <div className="hot-power-drop-settings">
          {/* Checkbox for Spare */}
          {/* <FormItem className="form-item">
            <FormInputCheckbox
              id={`hot-pwr-drop-spare-${index}`}
              checked={hotPowerDropSettings.HotPwrDrop_Spare}
              label="Spare hot power drop"
              onChange={(e) => handleChange('HotPwrDrop_Spare', e.target.checked)}
            />
          </FormItem> */}

    
          {/* Dropdown for Hot Power Drop Type */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`hot-pwr-drop-type-${index}`}>
              Hot power drop type
            </FormLabel>
            <FormInputDropdown
              id={`hot-pwr-drop-type-${index}`}
              options={hotpwrdropTypeOptions}
              value={hotPowerDropSettings.HotPwrDropType}
              selected={hotPowerDropSettings.HotPwrDropType}
              onOptionSelect={(e) => handleChange('HotPwrDropType', e.value)}
              // onChange={(value) => handleChange('HotPwrDropType', value)}
            />
          </FormItem>

      {hotPowerDropSettings.HotPwrDropType ==="Device" && (
        <>
          {/* Target device location */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`hot-pwr-drp-target-location-${index}`}>
              Hot power drop target location (i.e., Station number) (e.g., 00010)
            </FormLabel>
            <FormInputText
              id={`hot-pwr-drp-target-location-${index}`}
              value={hotPowerDropSettings.HotPwrDrp_Target_Location}
              onChange={(e) => handleChange('HotPwrDrp_Target_Location', e.target.value)} />
          </FormItem>
  
          {/* Target Device DT */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`hot-pwr-target-dt-${index}`}>
              Hot power drop target device tag (e.g., PSU01)
            </FormLabel>
            <FormInputText
              id={`hot-pwr-target-dt-${index}`}
              value={hotPowerDropSettings.HotPwrDrp_Target_DT}
              onChange={(e) => handleChange('HotPwrDrp_Target_DT', e.target.value)} />
          </FormItem>

          {/* Description Text */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`hot-pwr-target-desc-${index}`}>
              Hot power target device description (i.e., function text)
            </FormLabel>
            <FormInputText
              id={`hot-pwr-target-desc-${index}`}
              value={hotPowerDropSettings.HotPwrDrp_Target_Desc}
              onChange={(e) => handleChange('HotPwrDrp_Target_Desc', e.target.value)} />
          </FormItem>
        </>
        )}
        </div>
      </div>
    );
  };
  
  export default HotPowerDropItem;