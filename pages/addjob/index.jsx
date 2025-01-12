import { useState } from "react";
import Form from "../../components/form";

export default function AddJob() {

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    position: "",
    salary: "",
    jobType: "",  // drop down
    remote: false,
    location: "",
    description: "",
    about: "",
    information: "",
    skills: ""
  });
  const ChosenSkills = () => {
    return <div>
        {formData.skills.split(",").map((skill, idx) => <p key={idx}>{skill}</p>)}
    </div>
}

  const formFields = [
    {
        name: "name",
        type: "text",
        placeholder: "Enter job name",
        value: formData.name,
        onChange: (e) => {
            setFormData({ ...formData, name: e.target.value })
        }
    },
    {
        name: "logo",
        type: "text",
        placeholder: "Enter job logo",
        value: formData.logo,
        onChange: (e) => {
            setFormData({ ...formData, logo: e.target.value })
        }
    },
    {
        name: "position",
        type: "text",
        placeholder: "Enter job position",
        value: formData.position,
        onChange: (e) => {
            setFormData({ ...formData, position: e.target.value })
        }
    },
    {
        name: "salary",
        type: "number",
        placeholder: "Enter job salary",
        value: formData.salary,
        onChange: (e) => {
            setFormData({ ...formData, salary: parseInt(e.target.value, 10) })
        }
    },
    {
        name: "jobType",
        type: "dropdown",
        label: "Job Type",
        values: ["full-time", "part-time", "contract", "internship"],
        placeholder: "Enter job type",
        value: formData.jobType,
        onChange: (e) => {
            setFormData({ ...formData, jobType: e.target.value })
        }
    },
    {
        name: "remote",
        type: "checkbox",
        label: "Remote",
        value: formData.remote,
        onChange: (e) => {
            setFormData({ ...formData, remote: e.target.checked })
        }
    },
    {
        name: "location",
        type: "text",
        placeholder: "Enter job location",
        value: formData.location,
        onChange: (e) => {
            setFormData({ ...formData, location: e.target.value })
        }
    },
    {
        name: "description",
        type: "textarea",
        placeholder: "Enter job description",
        value: formData.description,
        onChange: (e) => {
            setFormData({ ...formData, description: e.target.value })
        }
    },
    {
        name: "about",
        type: "textarea",
        placeholder: "Enter job about",
        value: formData.about,
        onChange: (e) => {
            setFormData({ ...formData, about: e.target.value })
        }
    },
    {
        name: "information",
        type: "textarea",
        placeholder: "Enter job information",
        value: formData.information,
        onChange: (e) => {
            setFormData({ ...formData, information: e.target.value })
        }
    },
    {
        name: "skills",
        type: "textarea",
        chosen: <ChosenSkills />,
        placeholder: "Enter job skills (add comma for separate skills)",
        value: formData.skills,
        onChange: (e) => {
            setFormData({ ...formData, skills: e.target.value })
        }
    },
]

  const [error, setError] = useState({
    name: false,
    logo: false,
    position: false,
    salary: false,
    jobType: false,
    remote: false,
    location: false,
    description: false,
    about: false,
    information: false,
    skills: false,
  });

    const errMessages = {
      name: {
          message: "Name is required",
          isValid: formData.name.length > 0,
          onError: () => {
              setError((error) => ({ ...error, name: true }))
          }
      },
      logo: {
          message: "Logo is required",
          isValid: formData.logo.length > 0,
          onError: () => {
              setError((error) => ({ ...error, logo: true }))
          }
      },
      position: {
          message: "Position is required",
          isValid: formData.position.length > 0,
          onError: () => {
              setError((error) => ({ ...error, position: true }))
          }
      },
      salary: {
          message: "Salary is required and should be a number",
          isValid: typeof formData.salary === "number",
          onError: () => {
              setError((error) => ({ ...error, salary: true }))
          }
      },
      jobType: {
          message: "Job type is required",
          isValid: formData.jobType.length > 0,
          onError: () => {
              setError((error) => ({ ...error, jobType: true }))
          }
      },
      remote: {
          message: "Remote is required",
          isValid: true,
          onError: () => {
              setError((error) => ({ ...error, remote: true }))
          }
      },
      location: {
          message: "Location is required",
          isValid: formData.location.length > 0,
          onError: () => {
              setError((error) => ({ ...error, location: true }))
          }
      },
      description: {
          message: "Description is required",
          isValid: formData.description.length > 0,
          onError: () => {
              setError((error) => ({ ...error, description: true }))
          }
      },
      about: {
          message: "About is required",
          isValid: formData.about.length > 0,
          onError: () => {
              setError((error) => ({ ...error, about: true }))
          }
      },
      information: {
          message: "Information is required",
          isValid: formData.information.length > 0,
          onError: () => {
              setError((error) => ({ ...error, information: true }))
          }
      },
  }


    const handleSubmit = async (e) => {
        e.preventDefault();
        let isError = false;
        Object.keys(errorMessages).forEach(key => {
            if (!errorMessages[key].isValid) {
                isError = true;
                errorMessages[key].onError();
            }
        })
      }


  return (
    <div>
      <p>Add Job</p>
      <Form formFeilds={formFields} onSubmit={handleSubmit} errMessages={errMessages} error={error} />
    </div>
  )
}
