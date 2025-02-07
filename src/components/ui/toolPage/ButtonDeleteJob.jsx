import { Button } from "@tesla/design-system-react";
// import ProjectDataService from "../../services/ProjectDataService";
import useAuthStore from "../../../store/authStore";
import useJobStore from "../../../store/jobStore";



export const ButtonDeleteJob = ({ job }) => {
    const { user } = useAuthStore();
    
    const deleteJob = useJobStore((state) => state.deleteJob);
    const fetchJobs = useJobStore((state) => state.fetchJobs);
  
    const handleClick = async (event) => {

    event.preventDefault();
    
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (confirmDelete) {
      await deleteJob(job._id);
      fetchJobs();
    }
  };

  return (
    <Button variant="tertiary" onClick={handleClick}>
      Delete Job
    </Button>
  );
};
