import React, { useState, useEffect } from "react";
import { Card } from "@tesla/design-system-react";
import { ButtonDeleteJob } from "./ButtonDeleteJob.jsx";
import { ProgressBar } from '@tesla/design-system-react';
import { NavLink } from "react-router-dom";
import {socket} from "../../../services/socketioService.js";

const JobCard = ({ job, setJob }) => {

  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(()=>{
    const interval = setInterval(()=>{
      if(job.data.job_status === 1 && progress < job.data.job_length) setProgress(prev => prev+=1)
    }, 1000);
    if(isDone) setProgress(job.data.job_length)
    return () => clearInterval(interval);
  }, [isDone, isStarted])

  useEffect(()=>{
    function onCompleted(data) {
      setIsDone(true);
    }
    function onStarted(data) {
      setIsStarted(true);
      console.log(data['message']);
      setJob(data['message']);
    }
    socket.on(`${job._id}_completed`, (data) => onCompleted(data));
    socket.on(`${job._id}_started`, (data) => onStarted(data));
  }, [socket, isDone])
  
  return (
    <NavLink to={`/jobs/${job._id}`}>
      <Card
        key={job._id}
        variant="outline"
        style={{ marginTop: "15px", marginRight: "15px", height: "250px", width: "550px", flex: "1" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ display: "flex", flexDirection: "horizontal", gap: "10px" }}>
          <div style={{ flex: 3 }}>
            <h4>
              {job.data.job_name}{" "}
            </h4>
            <p>{job.data.job_description}</p>

            <p>
              <small>Id:{job._id}</small>
              <small>Created: {(job.data.created_at)}</small>
              <small>Status: {(job.data.job_status)}</small>
              <small>
                Created By <strong>{job.data.user_name}</strong> {job.data.email}
              </small>
            </p>
            <ProgressBar 
              max={job.data.job_length}
              value={progress}
            ></ProgressBar>
            {isHovered && <ButtonDeleteJob job={job} />}
          </div>
        </div>
      </Card>
      </NavLink>
    
  );
};

export default JobCard;
