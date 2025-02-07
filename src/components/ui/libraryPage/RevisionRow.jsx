import React , {useState, useEffect } from 'react';
import ModalImage from './ModalImage';
import { MdOutlineFileDownload } from "react-icons/md"
import {IconContext} from "react-icons";
import BlockDataService from '../../../services/blockDataService';
import useImageStore from '../../../store/imageStore';
import { Loader } from "@tesla/design-system-react";

const RevisionRow = ({block}) => {
    const revisions = useImageStore((state) => state.revisions);
    const fetchImages = useImageStore((state) => state.fetchImages);
    const clearImages = useImageStore((state) => state.clearImages);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            if(block.Revisions.length > 0)
            {
                await fetchImages(block.Name,block.Revisions, block.ProjectName);    
            }
            setIsLoading(false);
        };

        fetchData();
        return () => {
            clearImages();
          };
    }, []);

    const handleDownloadXMLClick = async (event, revision)=> {
        //console.log(id);
        console.log(revision);
        const id = revision.Revision.Image;
        const fileName = id.substring(0, id.lastIndexOf(".")) + ".xml";
        let url = await BlockDataService.getRevisionXML(block.Name, id);
        let a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}`;
        a.click();
    }

    return (
        <>
            <tr>
                <td colSpan={6}>
                    <tr>
                    <Loader show={isLoading} contained={true}/>
                        {
                            revisions.map((revision)=>{
                                return ( 
                                <>
                                    <tr className='tr-revision'>
                                            <button onClick={(event) => handleDownloadXMLClick(event, revision)}>
                                                <IconContext.Provider value={{ color:"black", size:20 }}>
                                                    {
                                                        <MdOutlineFileDownload/>
                                                    }
                                                </IconContext.Provider>
                                            </button>
                                        <td className='td-revision'>Project: {revision.Revision.Project}</td>
                                        <td className='td-revision'>Version: {revision.Revision.Version}</td>
                                        <td className='td-revision'>
                                            <lable>
                                                Type:  
                                            </lable>
                                            <label className={`label-${revision.Revision.Type.toLowerCase()}`}>
                                                {revision.Revision.Type.toUpperCase()}
                                            </label>
                                            </td>
                                        <td className='td-revision'>ModifiedDate: {revision.Revision.ModifiedDate}</td>
                                        <td className='td-revision'>ModifiedBy: {revision.Revision.ModifiedBy}</td>
                                    </tr>
                                    <tr className='tr-revision'>
                                    <td colSpan={5}>Comment:{revision.Revision.Comment}</td>
                                    </tr>
                                    <tr className='tr-revision'>
                                        <ModalImage image={revision.Image}/>
                                    </tr>
                                </>
                                )
                            })
                        }
                    </tr>
                </td>
            </tr>
        </>
    );
}

export default RevisionRow;