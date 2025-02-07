import { useState, useEffect } from 'react';
import { ListItem } from "@tesla/design-system-react";
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import {socket} from "../../../services/socketioService.js";


const SocketIoConsole = ({id, expanded, setExpanded}) => {
    const [message, setMessage] = useState("");
    
    
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
        var fullMessage = message + '\n' + data.message;
        setMessage(fullMessage)
      }
      if(id){
        socket.on(id, (data) => onMessageReceived(data));
      }
      
    }, [socket, message, id])

    const handleListClick = async () => {
        if(expanded){
            setExpanded(false);
        }else {
            setExpanded(true);
        }
    }

    return (
        <>
            <ListItem onClick={handleListClick} style={{listStyle:"none", marginBottom:"15px", marginTop:"20px"}}>
                <span style={{fontSize:30, verticalAlign:'middle'}}>
                <IconContext.Provider value={{ color:"black", size:30 }}>
                {
                    expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                }
                </IconContext.Provider>
                Console
                </span>                        
            </ListItem>
            {
                expanded && 
                <div style={{ marginTop:"20px", overflowY: "scroll", height:"500px", width:"1600px", display: "flex" , 
                    flexWrap: "wrap", whiteSpace: "pre-wrap", borderWidth:'2px', borderStyle:"solid", borderColor:"black",
                    fontSize:"25px"}}>
                    {message}
                </div>
            }
        </>
    )
}

export default SocketIoConsole