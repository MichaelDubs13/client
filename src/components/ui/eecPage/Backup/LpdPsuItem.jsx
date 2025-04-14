import {
    FormLabel,
    FormInputText,
    FormItem,
    FormInputDropdown,
    FormInputCheckbox
  } from '@tesla/design-system-react';
  import { useState, useEffect } from "react";
  import "../Eec.css";
  import { lpdStore } from "../Store/lpdStore";
import LpdPsuDropItem from '../Components/LPDs/LpdPsuDropItem';
  
   const LpdPsuItem = ({ 
    index,
    numberOfPsu,
    lpdPsuItem,
    psuLine,
    psuLocation,
    psuDT,
    numberOf24V_Drops: initialNumberOf24V_Drops,
    initialValues,
    onSettingsChange, 
    absIndex,
    lpdbranchCircuit,
    line,
  }) => {
    const [lpdPsuSettings, setLpdPsuSettings] = useState({
      psuSelection: lpdPsuItem,
      psuLine: line,
      psuLocation: "",
      psuDT: "",
      psuToPsuCableLength: "TBD",
      numberOf24V_Drops: initialNumberOf24V_Drops,
      OutputPort: "",
      dropLocation: "",
      dropDT: "",
      dropDescription: "",
      dropFLA: "",
      ...initialValues
    });

    const psuToPsuCableLengthOptions = [
      { value: "TBD", label: "TBD" },
      { value: "0.6m", label: "0.6m" },
      { value: "1m", label: "1m" },
      { value: "2m", label: "2m" },
      { value: "5m", label: "5m" },
      { value: "10m", label: "10m" },
      { value: "15m", label: "15m" },
      { value: "20m", label: "20m" },
      { value: "25m", label: "25m" },
      { value: "30m", label: "30m" },
      { value: "NULL", label: "NULL" },
    ];
  
    const handleChange = (field, value) => {
      const newSettings = {
        ...lpdPsuSettings,
        [field]: value
      };
      setLpdPsuSettings(newSettings);
      onSettingsChange?.(index, newSettings);
      //branchCircuit[field] = value;

      /* if (lpdbranchCircuit) {
        lpdbranchCircuit[field] = value;
      } */
    };

    /* useEffect(() => {
      const InitializePsuDropItems = () => {
      };
      setLpdPsuDropItems(InitializePsuDropItems());
    }, [numberOf24V_Drops]);
    
   // State for each PSU drop item
  const [lpdPsuDropItems, setLpdPsuDropItems] = useState({
    [lpdPsuSettings.psuSelection]: lpdPsuSettings.numberOf24V_drops
  }); */


  // Create array of 24V drop items
  const renderLpdPsuDropItems = () => {
      return Array.from({ length: parseInt(lpdPsuSettings.numberOf24V_Drops) }).map((_, dropIndex) => (
          <LpdPsuDropItem
              key={dropIndex}
              numberOf24V_Drops={parseInt(lpdPsuSettings.numberOf24V_Drops)}
              psuSelection={lpdPsuSettings.lpdPsuItem}
              index={dropIndex}
              absIndex={dropIndex + 1}
              line={lpdPsuSettings.psuLine}
              initialValues={lpdPsuSettings}
              onSettingsChange={handleChange}
          />
      ));
  }; 
  

    return (
      <div className="lpd-psu-item">
        <div className="lpd-psu-header">
          <h5>24VDC Power Supply {absIndex}: ++{lpdPsuSettings.psuLine}+{lpdPsuSettings.psuLocation}-{lpdPsuSettings.psuDT} | {lpdPsuSettings.psuSelection}</h5>
        </div>
  
        <div className="lpd-psu-settings">
          {/* PSU Line */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`Line-${index}`}>
              Manufacturing Line name (e.g., UBM1, DOR1)
            </FormLabel>
            <FormInputText
              id={`Line-${index}`}
              value={lpdPsuSettings.psuLine}
              onChange={(e) => handleChange('psuLine', e.target.value)}
            />
          </FormItem>
          {/* PSU Location */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`psu-location-${index}`}>
              PSU Location (i.e., Station number) (e.g., 00010)
            </FormLabel>
            <FormInputText
              id={`psu-location-${index}`}
              value={lpdPsuSettings.psuLocation}
              onChange={(e) => handleChange('psuLocation', e.target.value)}
            />
          </FormItem>
          {/* PSU DT */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`psu-dt-${index}`}>
              PSU Device Tag (e.g., PSU01)
            </FormLabel>
            <FormInputText
              id={`psu-dt-${index}`}
              value={lpdPsuSettings.psuDT}
              onChange={(e) => handleChange('psuDT', e.target.value)}
            />
          </FormItem>

          {numberOfPsu > 1 && index < numberOfPsu - 1 && (
            <>
                {/* PSU-to-PSU cable length */}
                <FormItem className="form-item">
                  <FormLabel htmlFor={`psu-to-psu-cable-length-${index}`}>
                    Enter the cable length to the next cascaded PSU (m)
                  </FormLabel>
                  <FormInputDropdown
                    id={`psu-to-psu-cable-length-${index}`}
                    value="TBD"
                    options={psuToPsuCableLengthOptions}
                    onChange={(e) => handleChange('psuToPsuCableLength', e.target.value)}
                  />
                </FormItem>
                </>
          )}
          {/* Number of 24V drops */}
          <FormItem className="form-item">
            <FormLabel htmlFor={`number-of-24V-drops-${index}`}>
              Enter the number of devices to be powered by this PSU (i.e., number of 24V drops)
            </FormLabel>
            <FormInputText
              id={`number-of-24V-drops-${index}`}
              value={lpdPsuSettings.numberOf24V_Drops}
              onChange={(e) => handleChange('numberOf24V_Drops', e.target.value)}
            />
          </FormItem>

          {/* Cascading PSUs within this configuration */}
            
              {renderLpdPsuDropItems()}
            
        </div>
      </div>
    );
  };
  
  export default LpdPsuItem;