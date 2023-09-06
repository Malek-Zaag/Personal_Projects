import React, { useState } from 'react';
import Basics from './Basics';
import Disks from './Disks';
import Monitoring from './Monitoring';
import Networking from './Networking';
import Summary from './Summary';
import { Navigate, redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const Form = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };
 /* const submitData = e => {
    e.preventDefault();
    alert('Data sent');
  }*/
  const prevStep = () => {
    setStep(step - 1);
  };
  const submitData = async (e) => {
    e.preventDefault();
    
    try {
      const requestBody = {
        virtual_machine_name: formData.vm_name,
        virtual_network_name: formData.vnet_name,
        subnet_name: formData.subnet_name,
        resource_group_name: formData.rg_name,
        virtual_machine_size: formData.vmsize,
        //subscription_id: formData.subscription_id,
        subscription_id:localStorage.getItem("subscription_id"),
        resource_group_location: formData.region,
        virtual_machine_admin_username: formData.username,
        virtual_machine_admin_password: formData.password,
        virtual_machine_os_disk_name:formData.disk_name,
        virtual_machine_os_disk_caching:formData.caching,
        virtual_machine_os_disk_storage_account_type:formData.disktype,
        virtual_machine_sku:formData.srcimage,
        parameter:formData.osimage
      };
      
      // Make API request
      const response = await fetch('http://localhost:4000/triggerPipeline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      //alert('Form submitted successfully!');
      navigate("/PipelineStatus")

    } catch (error) {
      console.error(error);
      alert('Failed to submit form');
    }
  };
  
  return (
    <div>
      {step === 1 && <Basics handleChange={handleChange} />}
      {step === 2 && <Disks handleChange={handleChange} />}
      {step === 3 && <Networking handleChange={handleChange} />}
      {step === 4 && <Monitoring  handleChange={handleChange}/>}
      {step === 5 && <Summary formData={formData}/>}
      <div style={{textAlign: 'center'}}>
        {step > 1 && <button className='buttons__button buttons__button--next' onClick={prevStep}>Back</button>}
        {step < 5 && <button className='buttons__button buttons__button--next' onClick={nextStep}>Next</button>}
        {step === 5 && <button className='buttons__button buttons__button--next'onClick={submitData}>Submit</button>}
      </div>
    </div>
  );
};
export default Form;