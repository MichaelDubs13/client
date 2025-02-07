import useJobStore from "../../../store/jobStore";
import React, { useState, useEffect } from 'react';
import { FormItem, FormLabel, FormInputText, Button} from '@tesla/design-system-react';
import useAuthStore from '../../../store/authStore.js';
import CommentBox from '../util/CommentBox.jsx';

const ReleaseLibraryForm = ({onSubmit, endRev, startRev, totalErrors}) => {
    const {user, isAuthenticated} = useAuthStore()
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const createJob =  useJobStore((state) => state.createJob);
   
    useEffect(() => {
        if (isAuthenticated === true) {
          setUserEmail(user.email);
          setUserName(`${user.first_name} ${user.last_name}`);
        }
      }, [user]);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        const payload = createPayload();
        formData.set("data", JSON.stringify(payload));
        var response = await createJob(formData);
        onSubmit(response);
      };
    
    const getParam = () =>{
        //define application param
        var applicationPath = "C:\\CodeGen\\ProjectChangeLog.exe";
        var arg1 = `--CreateGlobalLib`;
        var arg2 = userEmail;
        var arg3 = "";
        var arg4 = "";
        var arg5 = "";
        var arg6 = "";
        var args = [arg1, arg2, arg3, arg4, arg5, arg6]
        
        return {applicationPath, args}
    }
    const createPayload = () => {
        var currentdate = new Date();
        var datetime = (currentdate.getMonth()+1) + "/"
                    + currentdate.getDate()  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
        const param = getParam();
        const payload = {
          "job_name": "CreateGlobalLib",
          "job_description" : "CreateGlobalLib",
          "created_at": datetime,
          "last_updated": datetime,
          "job_image" :  "",
          "user_id": 0,
          "job_id" : 0,
          "job_pid" : 0,
          "job_length": 1000,
          "job_status": 0,
          "job_progress": 0,
          "record": "",
          "user_name": userName,
          "email": userEmail,
          "applicationPath": param.applicationPath,
          "args": param.args,
        };

        return payload;
    }

    const handleUserEmailChange = async (event) => {
        setUserEmail(event.target.value);
      }

    return (
    
        <>
        <div style={{display: "flex", flexDirection: "column"}}></div>
          <h2 style={{ marginBottom: "10px"}}>Release Global Library</h2>
          {
             (endRev != 0 && startRev != 0)  ? 
             <div>
                <div style={{display:'flex'}}>
                            <span>{`Revision from ${startRev} to ${endRev}`}</span>
                    </div>
                    <div style={{display:'flex'}}>
                        <span>{`Number Of Errors: ${totalErrors}`}</span>
                    </div>
                    <FormItem>
                        <FormLabel htmlFor="userEmail">User Email</FormLabel>
                        <FormInputText
                        id="userEmail"
                        placeholder="Enter User Email"
                        value={userEmail}
                        onChange={handleUserEmailChange}
                        />
                    </FormItem>
                    <CommentBox 
                          commentValue={""}
                          handleCommentValue={() => {}}
                          enterCommentLine={() => {}}
                        />
                    <Button 
                    onClick={handleSubmit}
                    style={{marginTop: "10px"}}
                    >Release</Button>
             </div> : 
             <div>
                    <span>No Pending Changes from last library release</span>    
             </div>
          }
        </>
      );
}

export default ReleaseLibraryForm