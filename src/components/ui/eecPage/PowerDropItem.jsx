import { FormLabel, FormInputText, Button, FormItem } from '@tesla/design-system-react';
import { useState } from "react";
import "./Eec.css";

const PowerDropItem = ({ index, type, amps }) => {
    const [powerDropSettings, setPowerDropSettings] = useState({
        type: type || "default",
        amps: amps || 0,
        enabled: true
    });

    return (
        <div className="power-drop-item">
            <div className="power-drop-header">
                <h3>Power Drop {index + 1}</h3>
                {/* Add header actions here if needed */}
            </div>
            
            <div className="power-drop-settings">
                <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor={`power-drop-type-${index}`}>
                        Type
                    </FormLabel>
                    <FormInputText
                        id={`power-drop-type-${index}`}
                        value={powerDropSettings.type}
                        onChange={(e) => setPowerDropSettings({...powerDropSettings, type: e.target.value})}
                    />
                </FormItem>
                
                <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor={`power-drop-amps-${index}`}>
                        Amps
                    </FormLabel>
                    <FormInputText
                        id={`power-drop-amps-${index}`}
                        value={powerDropSettings.amps}
                        onChange={(e) => setPowerDropSettings({...powerDropSettings, amps: e.target.value})}
                    />
                </FormItem>
                
                <FormItem className="form-item">
                    <FormLabel className="form-label" htmlFor={`power-drop-enabled-${index}`}>
                        Enabled
                    </FormLabel>
                    <FormInputText
                        id={`power-drop-enabled-${index}`}
                        value={powerDropSettings.enabled ? "Yes" : "No"}
                        readOnly
                    />
                </FormItem>
            </div>
        </div>
    );
};

export default PowerDropItem;