import React, { useState, useEffect } from 'react';
import JobCard from './JobCard.jsx';
import useJobStore from '../../../store/jobStore.js'; 
import {socket} from "../../../services/socketioService.js";
import { Icon, Tooltip, TooltipWrapper, useTooltipState } from '@tesla/design-system-react';
import { iconInfo } from '@tesla/design-system-icons';

const JobCards = () => {

  const jobs = useJobStore((state) => state.jobs);
  const fetchJobs = useJobStore((state) => state.fetchJobs);
  const setJob = useJobStore((state) => state.setJob);
  const {
    open: openJob,
    handlers: handlersJob,
    wrapperRef: wrapperRefJob,
  } = useTooltipState({ initialOpen: false });
  useEffect(()=>{
  // Fetch jobs when the component mounts
    fetchJobs();
    //clearJobs();
  }, []);

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
  }, []);
  
  return (
    <>
    
    <h2>
      Existing Jobs
      <TooltipWrapper
        {...handlersJob}
        wrapperRef={wrapperRefJob}
        inline
        className="tds-text--regular tds-text--contrast-medium tds-density--dense"
        >
        <button>
            <Icon size="large" data={iconInfo} inline align="text-middle" />
        </button>

        <Tooltip open={openJob} align="start">
            <p>Active Jobs</p>
            <p>Click on job card to see progress on the running job</p>
            <p>Only one job can be running at a time</p>
        </Tooltip>
      </TooltipWrapper>
    </h2>
    <div className="project-cards-container" style={{ "overflowY": "scroll", "maxHeight": "80vh", "display": "flex" , "flexWrap": "wrap"}}>
      { jobs.map( (job, key) =>  {
          return(
            <JobCard job={job} setJob={setJob} key={key} />
        )})
      }
    </div>
    </>
  );
};

export default JobCards;
