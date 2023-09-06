import React, { useState, useEffect } from 'react';
import './PipelineStatus.css';

import NavbarAfterlogin from './NavbarAfterlogin';
function PipelineStatus() {
 const [pipelineStatus, setPipelineStatus] = useState(0);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:4000/pipelinestatus',options)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPipelineStatus(data.status);
        console.log(pipelineStatus)

      })
      .catch(error => {
        console.error(error);
      });
    }, 2000);
  },[]);
  return (
    
    <div className="PipelineStatus">
      <NavbarAfterlogin></NavbarAfterlogin>
      <div className="PipelineResult">
  {pipelineStatus === null && <p>Loading...</p>}
  {pipelineStatus !== null  && (
    <p>
      Pipeline status: {pipelineStatus}
    </p>
  )}
  {pipelineStatus === 'success' &&(
  <a href='/'>   <button type="button" class="btn btn-outline-secondary">Home Page</button></a>
  )}
</div>
    </div>
  );
}
export default PipelineStatus;
