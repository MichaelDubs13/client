import PrivateRoute from "../../auth/privateRoute";
import {socket} from "../../../services/socketioService";
import { useEffect, useState } from "react";
import useJobStore from "../../../store/jobStore";
import { useParams } from "react-router-dom";


const JobPage = () => {
    const [message, setMessage] = useState("");
    const fetchJob = useJobStore((state) => state.fetchJob);
    const job = useJobStore((state)=>state.job)
    const { id } = useParams();
    useEffect(()=>{
      fetchJob(id);
    },[])
    useEffect(()=>{
      if(job) {
        setMessage(job.data.record);
      }
        
    },[job])

    useEffect(() => {
        function onConnect() {
          console.log("socket io connected");
        }
    
        function onDisconnect() {          
          console.log("socket io disconnected");
        }

        socket.connect();
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
        };
      }, []);
      
    useEffect(()=>{
      function onMessageReceived(data) {
        setMessage(data.message)
      }
      socket.on(`${id}`, (data) => onMessageReceived(data));
    }, [socket, message])
    
    
    return (
   
        <>
        <PrivateRoute>
          <h2>{job?job.name:""}</h2>
          <div style={{ "overflowY": "scroll", "maxHeight": "1200vh", "display": "flex" , "flexWrap": "wrap", "whiteSpace": "pre-wrap"}}>
              {message}
          </div>
        </PrivateRoute>
        </>
    )
    
}

export default JobPage