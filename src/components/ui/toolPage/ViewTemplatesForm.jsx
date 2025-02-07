import React, { } from "react";
import DownloadButton from "../libraryPage/DownloadButton";


const ViewTemplatesForm = () => {
  
    
return (
        <>
            <DownloadButton label="Download Software Design Layout" filePath="Templates/SoftwareDesignLayout.pptx"/>
            <DownloadButton label="Download IP List" filePath="Templates/IpList.xlsm"/>
            <DownloadButton label="Download Coating IP List" filePath="Templates/IpList_Coating.xlsm"/>
            <DownloadButton label="Download Software Matrix" filePath="Templates/SoftwareMatrix.xlsx"/>
            <DownloadButton label="Download Coating Software Matrix" filePath="Templates/SoftwareMatrix_Coating.xlsx"/>
            <DownloadButton label="Download Skid Manager Configuration" filePath="Templates/TS-0015866 Template Tesla Skidmanager Transaction List.xlsm"/>
            <DownloadButton label="Download FX Configuration" filePath="Templates/TS-0022752 Template_Production Data Configuration.xlsx"/>
        </>
    )
}

export default ViewTemplatesForm;