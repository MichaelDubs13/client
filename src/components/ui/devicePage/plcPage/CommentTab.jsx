import useDeviceStore from "../../../../store/deviceStore";
import React, { useState,  useEffect } from "react";
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import useAuthStore from "../../../../store/authStore";
import commentDataService from "../../../../services/commentDataService";

const CommentTab = ({id})=> {
    const {user, isAuthenticated} = useAuthStore();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [currentData, setCurrentData] = useState([])
    const [currentUser, setCurrentUser] = useState({
        currentUserId: '',
        currentUserImg: `https://ui-avatars.com/api/name=&background=random`,
        currentUserProfile:'',
        currentUserFullName: ''
        })
    
    useEffect(() => {
        if (isAuthenticated === true) {
          setUserEmail(user.email);
          const name =`${user.first_name} ${user.last_name}`; 
          setUserName(name);
          const newUser = {
            currentUserId: user.email,
            currentUserImg: `https://ui-avatars.com/api/name=${name}&background=random`,
            currentUserProfile:'',
            currentUserFullName: name
            }
          setCurrentUser(newUser)
        }
      }, [user]);

    useEffect(()=>{
        const fetchData = async (id) =>{
            var data = await commentDataService.getComments(id);
            data = data.map(item => item = {...item, avatarUrl: `https://ui-avatars.com/api/name=${item.fullName}&background=random`})    
            setCurrentData(data);
        }

        fetchData(id);
    }, []);
   
    
    const Submit = (data) =>{
        if(data.text){
            var currentdate = new Date();
            const comment = {...data, plc_id:id, fullName: userName, timestamp:currentdate}
            const formData = new FormData();
            formData.set("data", JSON.stringify(comment));
            commentDataService.createComment(formData);
        }
    }


    return (
    <>
        <CommentSection
            currentUser={isAuthenticated && currentUser}
            logIn={{
            onLogin: ()=>alert("Call login function"),
            signupLink: 'http://localhost:3001/'
            }}
            commentData={currentData}
            placeholder={"Write a comment..."}
            onSubmitAction={Submit}
        />

    </>
    )
}

export default CommentTab;