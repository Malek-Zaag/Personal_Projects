import React, { Component } from 'react';
import { Stepper } from 'react-form-stepper';
import { useState } from 'react';
import '../App.css';



const Basics = ({ handleChange }) => {
  const [osType, setOsType] = useState('');
  const [osImage, setOsImage] = useState('');
  function handleOsChange(event) {

    const { name, value } = event.target;
    
    if (name === 'osimage') {
  
      setOsType(value);
      setOsImage('');
    } else if (name === 'srcimage') {
      setOsImage(value);
    }
  }
  return (
      <div className='form'>
        <form>

          <Stepper
            steps={[{ label: 'Basics' }, { label: 'Disks' }, { label: 'Networking' },{ label: 'Monitoring' },{ label: 'Summary' }]}
            activeStep={0}
            styleConfig={{
              activeBgColor: '#2b7cff',
              activeTextColor: '#fff',
              inactiveBgColor: '#fff',
              inactiveTextColor: '#2b7cff',
              completedBgColor: '#fff',
              completedTextColor: '#2b7cff',
              size: '3em'
            }}
            className={'stepper'}
            stepClassName={'stepper__step'}
          />

          <div className='form-group'>
            <div className='form-group__element'>
              <label htmlFor='vm_name' className='form-group__label'>
              VM name
              </label>
              <input type='text' name='vm_name'  className='form-group__input' onChange={handleChange}/>
              
            </div>
            <div className='form-group__element'>
              <label htmlFor='username' className='form-group__label'>
               Enter a new Username 
              </label>
              <input type='text' name='username'  className='form-group__input' onChange={handleChange}/>
              
            </div>
            <div className='form-group__element'>
              <label htmlFor='vm_name' className='form-group__label'>
              Enter a new Password
              </label>
              <input type='text' name='password'  className='form-group__input' onChange={handleChange}/>
              
            </div>
            <div className='form-group__element'>
              <label htmlFor='last name' className='form-group__label'>
              Region 
              </label>
              <select class=" form-group__input" name='region' onChange={handleChange} >
                <option selected>Select the Region</option>
                <option >North Europe</option>
                <option >North Africa</option>
                <option >West Europe</option>
                <option >Central India</option>
              </select>  
            </div>
            <div className='form-group__element'>
              <label htmlFor='phone' className='form-group__label'>
              Image
              </label>
              <select class=" form-group__input" aria-label="Default select example" name='osimage' onChange={(e) => {handleOsChange(e); handleChange(e);}}>
                <option selected>Select the Os image</option>
                <option >linux</option>
                <option >windows</option>
                <option >windows_server</option>
              </select>
            </div>
            <div className='form-group__element'>
              <label htmlFor='phone' className='form-group__label'>
              Source image 
              </label>
              <select class=" form-group__input" aria-label="Default select example" name='srcimage' onChange={(e) => {handleOsChange(e); handleChange(e);}}>
                <option selected>Select the Source image</option>
                {osType === 'linux' && (
            <>
              <option value='18.04-LTS'>Ubuntu-18.04-LTS</option>
              <option value='16.04-LTS'>Ubuntu-16.04-LTS</option>
              <option value='20.04-LTS'>Ubuntu-20.04-LTS</option>
              <option value='22.04-LTS'>Ubuntu-22.04-LTS</option>
            </>
          )}
          {osType === 'windows' && (
            <>
              <option value='win10-21h2-pro'>Windows 10</option>
              
            </>
          )}
          {osType === 'windows_server' && (
            <>
              <option value='2019-Datacenter'>2019-Datacenter</option>
              <option value='2016-Datacenter'>2016-Datacenter</option>
            </>
          )}
              </select>
            </div>
            <div className='form-group__element'>
              <label htmlFor='email' className='form-group__label'>
              VM Size
              </label>
              <select class=" form-group__input" aria-label="Default select example" name='vmsize' onChange={handleChange} >
                <option selected>Select the VM Size</option>
                <option >Standard_B2s</option>
                <option >Standard_F2s</option>
                <option >Standard_D2s</option>
              </select>             </div>
          </div>
            
        

        </form>
      </div>
    )
  }


export default Basics;