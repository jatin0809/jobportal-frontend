import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchJobById } from "../../services/job";
import { isEditable } from "../../helper";
export default function JobDetail() {
  const params = useParams();
  const [job, setJob] = useState(null);
  const canEdit = job === null ? false : isEditable(job?.creator);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetchJobById(params.id).then(res => {
        setJob(res.data);
    }).catch(()=>{
      setIsError(true);
    }).finally(() => {
        setIsLoading(false);
    })
}, [params.id])
  const navigateToEditPage = () =>{
    navigate(`/editjob/${params.id}`);
  }
  return (
    <div>
      <p>Job Detail</p>
      {isLoading ? <p>Loading... </p> : isError? <p>Something went Wrong</p> : <p>{job.name}</p>}
      {canEdit ? <button onClick={navigateToEditPage}>Edit</button> : null}
      {/* {isEditable(job.creator) ? <button>Edit</button> : null} */}

    </div>
  )
}
