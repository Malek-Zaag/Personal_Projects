import React, { Component } from 'react';
import { Stepper } from 'react-form-stepper';
import '../App.css';

const Monitoring = ({ handleChange }) => {
  return (
      <div className='form'>
        <form>

          <Stepper
            steps={[{ label: 'Basics' }, { label: 'Disks' }, { label: 'Networking' },{ label: 'Monitoring' },{ label: 'Summary' }]}
            activeStep={3}
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
            
           

            
           
           
          </div>
            
        

        </form>
      </div>
    )
  }


export default Monitoring;