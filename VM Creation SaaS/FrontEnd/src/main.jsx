import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import SignIn from './Auth/SignIn.jsx';
import Signup from './Auth/SignUp.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import CreateVm from './CreateVM/CreateVM.jsx';
import PipelineStatus from './PipelineStatus.jsx';
import VMdetails from './Dashboard/VMdetails.jsx';
import Monitoring from './Monitoring/Monitoring.jsx';
import AnsiblePipelineStatus from './AnsiblePipelineStatus.jsx';
//import TerminalSSH from './SSH/TerminalSSH.jsx';
const loggedIn = localStorage.getItem('id') !== null;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "SignIn",
    element: <SignIn />
  },
  {
    path: "/CreateVM",
    element: loggedIn ? <CreateVm />:<SignIn></SignIn>,
    
  },
  {
    path: "SignUp",
    element: <Signup />
  },
  {
    path: "Dashboard",
    element: loggedIn ? <Dashboard /> :<SignIn></SignIn>
  },
  {
    path: "PipelineStatus",
    element:loggedIn ? <PipelineStatus /> :<SignIn></SignIn>
  },
  {
    path: "/vms/:vmName",
    element:loggedIn? <VMdetails />:<SignIn></SignIn>
  },
  {
    path: "Monitoring",
    element: loggedIn? <Monitoring />:<SignIn></SignIn>
  },
  {
    path: "AnsiblePipeline",
    element: loggedIn?<AnsiblePipelineStatus />:<SignIn></SignIn>
  },
  /*{
    path: "SSH",
    element: <TerminalSSH />
  }*/
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)