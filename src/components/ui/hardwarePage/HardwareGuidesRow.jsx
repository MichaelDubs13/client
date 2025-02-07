import React, { useState, useEffect } from "react";
import useDeviceStore from "../../../store/deviceStore";
import { FormItem,  FormItemFileUpload } from "@tesla/design-system-react";
import DownloadButton from "./DownloadButton";
import ModalAddHardwareLinkForm from "./ModalAddHardwareLinkForm";
import HardwareLinkRow from "./HardwareLinkRow";

const HardwareGuidesRow = ({hardware}) => {
    const [path, setPath] = useState('');
    const [file, setFile] = useState(null);
    const [guides, setGuides] = useState([]);
    const [links, setLinks] = useState([]);
    const uploadManual = useDeviceStore((state) => state.uploadManual);
    const fetchGuidesByGSDs = useDeviceStore((state) => state.fetchGuidesByGSDs);
    const fetchLinksByGSDs = useDeviceStore((state) => state.fetchLinksByGSDs);
    useEffect(()=>{
        const fetchData = async () => {
            var guides = await fetchGuidesByGSDs(hardware.parsedName);
            setGuides(guides);

            var links = await fetchLinksByGSDs(hardware.parsedName);
            setLinks(links);
          }
        
          fetchData();
          return () => {
            setGuides([]);
            setLinks([]);
          };
    }, []);

    const handleFileChange = async (event) => {
        if(event.target.files){
            setPath(event.target.value);
            setFile(event.target.files[0]);

            const formData = new FormData();
            formData.set("file", event.target.files[0]);
            formData.set("data", hardware.parsedName)
            await uploadManual(hardware.id, formData);
            var guides = await fetchGuidesByGSDs(hardware.parsedName);
            setGuides(guides);
        }
      }
    const handleLinkChange = async () => {
        var links = await fetchLinksByGSDs(hardware.parsedName);
        setLinks(links);
    }

return (
        <>
           <tr>
            <div style={{display:'flex'}}>
                    <FormItem style={{display:'flex'}}>
                        <FormItemFileUpload
                            id="manualPath"
                            accept=".*"
                            multiple = {false}
                            label="Upload File"
                            placeholder="Upload Manuals"
                            value={path}
                            variant="secondary"
                            style={{ marginBottom: "5px"}}
                            onChange={handleFileChange}/>
                        <ModalAddHardwareLinkForm gsd_id={hardware.id} gsd_name={hardware.parsedName} onSumbit={handleLinkChange}/>
                    </FormItem>
                </div>
                <div style={{display:'flex', flexDirection:'column'}}>
                    { 
                        guides?.map( (guide, key) =>{
                        return(
                            <DownloadButton label={guide.name} id={guide.name}/>
                        )})
                        
                    }
                    { 
                        links?.map( (link, key) =>{
                        return(
                            <HardwareLinkRow hardware={link}/>
                        )})
                        
                    }
                </div>
            </tr>
        </>
    )
}

export default HardwareGuidesRow;