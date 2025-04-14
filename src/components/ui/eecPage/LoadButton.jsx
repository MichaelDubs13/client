import { FormItemFileUpload, ToastContainer, useToastContainerState,} from "@tesla/design-system-react";
import { pdpStore } from "./Store/pdpStore";
import { xpdpStore } from "./Store/xpdpStore";
import { mcpStore } from "./Store/mcpStore";
import { lpdStore } from "./Store/lpdStore";
import { projectStore } from "./Store/projectStore";


const LoadButton = () => {
  const setConfig =  projectStore((state) => state.setConfig);
  const setPdps =  pdpStore((state) => state.setPdps);
  const setXpdps =  xpdpStore((state) => state.setXpdps);
  const setMcps =  mcpStore((state) => state.setMcps);
  const setLpds =  lpdStore((state) => state.setLpds);
  const { toasts, addToast } = useToastContainerState();
  

  const handleLoad = async (event) => {
      event.preventDefault();
      if(event.target.files){
        var file = event.target.files[0];
        const result = await load(file);
        addToast({
          title: 'EEC Data updated',
          dismissible: true,
          caption: 'EEC UI forms updated',
          variant: 'status',
          statusType: 'info',
        })
      }
    }
    
    const load = async (file) =>{
      var reader = new FileReader();
      reader.onload = (e) => {
        try {
          var data = e.target.result;
          const jsonObject = JSON.parse(data);
          setConfig(jsonObject.config);
          setPdps(jsonObject.pdps);
          setXpdps(jsonObject.xpdps);
          setMcps(jsonObject.mcps);
          setLpds(jsonObject.lpds);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Invalid JSON file");
        }
      };

      reader.readAsText(file);
    }

  return (
    <>
      
      <FormItemFileUpload
              id="eec"
              accept=".json"
              multiple = {false}
              label="Load"
              variant='secondary'
              onChange={handleLoad}/>
      <ToastContainer toasts={toasts} />
    </>
  );
};

export default LoadButton;
