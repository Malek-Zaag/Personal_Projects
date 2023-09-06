import React, { Component } from 'react';
import { Stepper } from 'react-form-stepper';


const Disks = ({ handleChange }) => {
  return (
      <div className='form'>
        <form>

          <Stepper
            steps={[{ label: 'Basics' }, { label: 'Disks' }, { label: 'Networking' },{ label: 'Monitoring' },{ label: 'Summary' }]}
            activeStep={1}
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
              <label htmlFor='disk_name' className='form-group__label'>
              OS Disk name
              </label>
              <input type='text' name='disk_name'  className='form-group__input' onChange={handleChange}/>
              
            </div>
            <div className='form-group__element'>
              <label htmlFor='last name' className='form-group__label'>
              Storage Account Type 
              </label>
              <select class=" form-group__input" name='disktype' onChange={handleChange} >
                <option selected>Select the Disk Type</option>
                <option >Standard_LRS</option>
                <option >StandardSSD_LRS</option>
                <option >Premium_LRS</option>
                <option >StandardSSD_ZRS</option>
                <option >Premium_ZRS</option>
              </select>  
            </div>

           

            <div className='form-group__element'>
              <label htmlFor='phone' className='form-group__label'>
              Caching
              </label>
              <select class=" form-group__input" aria-label="Default select example" name='caching' onChange={handleChange}>
                <option selected>Select Host Caching</option>
                <option >ReadOnly</option>
                <option >ReadWrite</option>
                
              </select>
            </div>
           
          </div>
            
        

        </form>
      </div>
    )
  }


export default Disks;