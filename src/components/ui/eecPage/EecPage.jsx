import LineConfiguration from "./Components/LineConfiguration";
import { Link} from '@tesla/design-system-react';
import LoadButton from "./LoadButton";
import SaveButton from "./SaveButton";
import UploadButton from "./UploadButton";
import { useState } from "react";
import ClearButton from "./ClearButton";
import GenerateButton from "./GenerateButton";
import PrivateRoute from "../../auth/privateRoute";


const EecPage = () => {
    const [loadCount, setLoadCount]=useState(0);

    const handleLoad = () =>{
      var count = loadCount+1;
      setLoadCount(count)
    }

    return (
   
        <>
          <div style={{marginLeft:'50px'}}>
            <div>
              <p style={{fontSize:'18px', fontWeight:'bold'}}>Report any issues to JIRA Service Desk / designTech Support / EEC Issue <Link variant="vertical" href={`https://issues.teslamotors.com/servicedesk/customer/portal/3/create/969`} rel="noopener noreferrer" target="_blank">(click here)</Link></p>
            </div>
            <PrivateRoute message={"access Tools"}>
              <h2>
                  Tools  
              </h2>
              <div style={{display: "flex", justifyContent: "left", gap: "15px", alignContent:'center', alignItems:'center', marginBottom:'50px'}}>
                <GenerateButton/>
                <UploadButton/>
                <SaveButton/>
                <LoadButton onLoad={handleLoad}/>
                <ClearButton/>
              </div>
            </PrivateRoute>
            <LineConfiguration loadCount={loadCount}/>
          </div>
        </>
    )
    
}

export default EecPage