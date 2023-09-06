import React, { Component } from 'react';
import { Stepper } from 'react-form-stepper';
import '../App.css';

const Networking = ({ handleChange }) => {
  return (
      <div className='form'>
        <form>

          <Stepper
            steps={[{ label: 'Basics' }, { label: 'Disks' }, { label: 'Networking' },{ label: 'Monitoring' },{ label: 'Summary' }]}
            activeStep={2}
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
              <label htmlFor='vnet_name' className='form-group__label'>
              Virtual Network name
              </label>
              <input type='text' name='vnet_name'  className='form-group__input' onChange={handleChange}/>
              
            </div>

            <div className='form-group__element'>
              <label htmlFor='subnet_name' className='form-group__label'>
              Subnet name
              </label>
              <input type='text' name='subnet_name'  className='form-group__input'onChange={handleChange} />
              
            </div>
          </div>
        </form>
      </div>
    )
  }


export default Networking;