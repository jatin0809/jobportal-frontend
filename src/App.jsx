import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddJob, EditJob, JobDetail, JobList, Login, Register, NotFound } from "../pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobList/>} />
        <Route path="/addjob" element={<AddJob/>} />
        <Route path="/editjob" element={<EditJob/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="*" element={<NotFound/>} />
        <Route path="/list/:id" element={<JobDetail/>} />
        <Route path="/list" element={<JobList/>} >
          <Route index element={<JobList/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

