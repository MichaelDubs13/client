import { Button} from "@tesla/design-system-react";
import { pdpStore } from "./Store/pdpStore";
import { xpdpStore } from "./Store/xpdpStore";
import { mcpStore } from "./Store/mcpStore";
import { lpdStore } from "./Store/lpdStore";
import { projectStore } from "./Store/projectStore";


const SaveButton = () => {
  const getConfig =  projectStore((state) => state.getConfig);
  const pdps =  pdpStore((state) => state.pdps);
  const xpdps =  xpdpStore((state) => state.xpdps);
  const mcps =  mcpStore((state) => state.mcps);
  const lpds =  lpdStore((state) => state.lpds);
  
  

  
  const getCircularReplacer=() =>{
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
}


  const saveObjectAsJson = (obj) => {
    const json = JSON.stringify(obj, getCircularReplacer(), 2);
    const blob = new Blob([json], { type: 'application/json' }); 
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "EEC_Lithium";
    link.href = url;
    link.click();
  };


  const handleSave = ()=>{
    const objectToBeSaved = {
      pdps:pdps,
      xpdps:xpdps,
      mcps:mcps,
      lpds:lpds,
      config:getConfig(),
    }

    saveObjectAsJson(objectToBeSaved);
  }

  return (
    <>
      <Button variant="secondary" onClick={handleSave} style={{marginTop:'5px'}}>Save</Button>
    </>
  );
};

export default SaveButton;
