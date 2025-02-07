import useDeviceStore from "../../../../store/deviceStore";
import React, { useState, useEffect } from "react";
import { Link, DataTable, DataTH,TBody, Loader } from "@tesla/design-system-react";
import DownloadButton from "../../hardwarePage/DownloadButton";



const DocumentationTab = ({id}) => {
    const [isLoading, setIsLoading] = useState(false);
    const fetchHardwaresGuidesPerPLC = useDeviceStore((state) => state.fetchHardwaresGuidesPerPLC);
    const fetchHardwaresLinksPerPLC = useDeviceStore((state) => state.fetchHardwaresLinksPerPLC);
    const guides = useDeviceStore((state) => state.guides);
    const links = useDeviceStore((state) => state.links);
   
    useEffect(()=>{
        const fetchData = async (id) =>{
            setIsLoading(true);
            await fetchHardwaresGuidesPerPLC(id);
            await fetchHardwaresLinksPerPLC(id);
            setIsLoading(false);
        }

        fetchData(id);
    }, []);

return (
        <>
            <DataTable border={4} style={{width:"2000px"}}> 
                <Loader show={isLoading} contained={true}/>
                <thead>
                    <tr>
                        <DataTH sortable={true} key="Name" >Name</DataTH>
                        <DataTH sortable={true} key="Path" >Documents</DataTH>
                    </tr>
                </thead>
                
                <TBody>
                { 
                    guides?.map( (guide, key) =>{
                    return(
                        <tr>
                            <td>{guide.name}</td>
                            <td><DownloadButton label={guide.guide} id={guide.guide}/></td>
                        </tr>
                        
                    )})
                    
                }
                { 
                    links?.map( (link, key) =>{
                    return(
                        <tr>
                            <td>{link.name}</td>
                            <td><Link href={link.link} target="_blank" rel="noopener noreferrer">{link.link}</Link></td>
                        </tr>
                    )})
                    
                }
                </TBody>
            </DataTable>
        </>
    )
}

export default DocumentationTab;