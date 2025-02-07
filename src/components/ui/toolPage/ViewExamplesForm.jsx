import React, { useState,  useEffect } from "react";
import DownloadButton from "../libraryPage/DownloadButton";


const ViewExamplesForm = () => {
  
    
return (
        <>
            <DownloadButton label="Stator_Example_IpList" filePath="Stator_Example_IpList.xlsm"/>
            <DownloadButton label="BodyShop_Example_IpList" filePath="BodyShop_Example_IpList.xlsm"/>
            <DownloadButton label="SoftwareMatrix_BodyShop" filePath="SoftwareMatrix_BodyShop.xlsx"/>
            <DownloadButton label="SoftwareMatrix_Rotor" filePath="SoftwareMatrix_Rotor.xlsx"/>
            <DownloadButton label="SoftwareMatrix_Template" filePath="SoftwareMatrix_Template.xlsx"/>
        </>
    )
}

export default ViewExamplesForm;