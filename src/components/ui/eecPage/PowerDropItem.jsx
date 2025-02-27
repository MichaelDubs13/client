import {
    FormLabel,
    FormInputText,
    FormItem,
    FormInputDropdown,
    FormInputCheckbox
  } from '@tesla/design-system-react';
  import { useState, useEffect } from "react";
  import "./Eec.css";
  
   const PowerDropItem = ({ 
    index,
    amperage,
    initialValues,
    onSettingsChange, 
    absIndex,
    branchCircuit,
  }) => {
    const [powerDropSettings, setPowerDropSettings] = useState({
      PwrDrop_Spare: false,
      DropType: "A-external",
      PwrDrop_DescTxt: "",
      dbl_Cable_Length: 0,
      StrBox_DT: "",
      TargetDevice_DT: "",
      TargetDevice_FLA: 0,
      StrBox_DT_FLA: 0,
      ...initialValues
    });
  
    const dropTypeOptions = [
      { value: "A-external", label: "A - External" },
      { value: "B-internal", label: "B - Internal" },
      { value: "C-spare", label: "C - Spare" }
    ];
  
    const handleChange = (field, value) => {
      const newSettings = {
        ...powerDropSettings,
        [field]: value
      };
      setPowerDropSettings(newSettings);
      onSettingsChange?.(index, newSettings);
      //branchCircuit[field] = value;

      if (branchCircuit) {
        branchCircuit[field] = value;
      }
    };
    
  

    return (
      <div className="power-drop-item">
        <div className="power-drop-header">
          <h3>{amperage} Branch circuit power drop {index}: CB{absIndex}</h3>
        </div>
  
        <div className="power-drop-settings">
          {/* Checkbox for Spare */}
          <FormItem className="form-item">
            <FormInputCheckbox
              id={`pwr-drop-spare-${index}`}
              checked={powerDropSettings.PwrDrop_Spare}
              label="Spare power drop"
              onChange={(e) => handleChange('PwrDrop_Spare', e.target.checked)}
              //onChange={(value) => handleChange('PwrDrop_Spare', value)}
            />
          </FormItem>

    {!powerDropSettings.PwrDrop_Spare && (
        <>
          {/* Dropdown for Drop Type */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`drop-type-${index}`}>
              Power drop type
            </FormLabel>
            <FormInputDropdown
              id={`drop-type-${index}`}
              options={dropTypeOptions}
              value={powerDropSettings.DropType}
              onChange={(value) => handleChange('DropType', value)}
            />
          </FormItem>
  
          {/* Description Text */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`desc-text-${index}`}>
              Power drop description (i.e., function text)
            </FormLabel>
            <FormInputText
              id={`desc-text-${index}`}
              value={powerDropSettings.PwrDrop_DescTxt}
              onChange={(e) => handleChange('PwrDrop_DescTxt', e.target.value)}
            />
          </FormItem>
  
          {/* Cable Length */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`cable-length-${index}`}>
              Cable length from PDP to target device (meters)
            </FormLabel>
            <FormInputText
              type="number"
              id={`cable-length-${index}`}
              value={powerDropSettings.dbl_Cable_Length}
              min="0"
              step="0.1"
              onChange={(e) => handleChange('dbl_Cable_Length', parseFloat(e.target.value))}
            />
          </FormItem>
  
          {/* Target device location */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`str-box-dt-${index}`}>
              Target device location (i.e., Station number) (e.g., 00010)
            </FormLabel>
            <FormInputText
              id={`str-box-dt-${index}`}
              value={powerDropSettings.StrBox_DT}
              onChange={(e) => handleChange('StrBox_DT', e.target.value)}
            />
          </FormItem>
  
          {/* Target Device DT */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`target-device-dt-${index}`}>
              Target device tag (e.g., RBC01)
            </FormLabel>
            <FormInputText
              id={`target-device-dt-${index}`}
              value={powerDropSettings.TargetDevice_DT}
              onChange={(e) => handleChange('TargetDevice_DT', e.target.value)}
            />
          </FormItem>
  
          {/* Target Device FLA */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`target-fla-${index}`}>
              Target device FLA (Amps)
            </FormLabel>
            <FormInputText
              type="number"
              id={`target-fla-${index}`}
              value={powerDropSettings.TargetDevice_FLA}
              min="0"
              step="0.1"
              onChange={(e) => handleChange('TargetDevice_FLA', parseFloat(e.target.value))}
            />
          </FormItem>
  
          {/* Complete power drop FLA */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`dt-fla-${index}`}>
              Enter FLA of this power drop (Amps) (i.e., add up all current consuming devices connected to this power drop)
            </FormLabel>
            <FormInputText
              type="number"
              id={`dt-fla-${index}`}
              value={powerDropSettings.StrBox_DT_FLA}
              min="0"
              step="0.1"
              onChange={(e) => handleChange('StrBox_DT_FLA', parseFloat(e.target.value))}
            />
          </FormItem>
        </>
        )}
        </div>
      </div>
    );
  };
  
  export default PowerDropItem;