import React, { useState,  useEffect } from "react";
import DownloadButton from "../libraryPage/DownloadButton";


const ViewInstructionsForm = () => {
  
    
return (
        <>
            <DownloadButton label="Download HowTo_FillSoftwareMatrix(PWT)" filePath="Instructions/HowTo_FillSoftwareMatrix.pptx"/>
            <DownloadButton label="Download HowTo_CreateComponentMastercopy" filePath="Instructions/HowTo_CreateComponentMasterCopy.pptx"/>
            <DownloadButton label="Download HowTo_CreateMastercopies(MFE)" filePath="Instructions/HowTo_CreateMastercopy.pptx"/>
            <DownloadButton label="Download Generated HMI Guide" filePath="Instructions/GeneratedHmiGuide.pptx"/>
        </>
    )
}

export default ViewInstructionsForm;