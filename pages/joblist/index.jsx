import { useState } from "react"
import { getAllJobs } from "../../services/job"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isEditable } from "../../helper";
import Navbar from "../../components/navbar";
export default function JobList() {

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    getAllJobs().then(res => {
      setJobs(res.data);
      setIsLoading(false)
    })
  }, [])

  const routeToJobDetail = (id) =>{
    navigate(`/list/${id}`);
  }

  return (
    <div>
      <Navbar />
      <p>Job List</p>
      { 
        isLoading ? <p>Loading...</p> : jobs.map((job, index) => <p key={index}>{job.name}
          <span>{job.salary}</span>
          {job._id ? <button onClick={()=> routeToJobDetail(job._id)}>View Details</button> : null}
          {job ? isEditable(job.creator) ? <button>Edit</button> : null : null}
        </p>)
      }
    </div>
  )
}
