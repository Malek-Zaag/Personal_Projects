import React, { Component } from 'react';
import { Stepper } from 'react-form-stepper';
import '../App.css';

const Summary = ({ formData }) => {
  return (
      <div className='form'>
        <form>

          <Stepper
            steps={[{ label: 'Basics' }, { label: 'Disks' }, { label: 'Networking' },{ label: 'Monitoring' },{ label: 'Summary' }]}
            activeStep={4}
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
            <p className='form-group__label'>
              Username: {formData.username}
              </p>
              <p className='form-group__label'>
              VM_Name: {formData.vm_name}
              </p>
              <p className='form-group__label'>
              Ressource group name : {formData.region}
              </p>
              <p className='form-group__label'>
              Availability Zone : {formData.availabilityzone}
              </p>
              <p className='form-group__label'>
              OS Image : {formData.osimage}
              </p>
              <p className='form-group__label'>
              Source image : {formData.srcimage}
              </p>
              <p className='form-group__label'>
              VM Size : {formData.vmsize}
              </p>
            </div>

            <div className='form-group__element'>
            <p className='form-group__label'>
              OS Disk Name : {formData.disk_name}
              </p>
              <p className='form-group__label'>
              OS Disk Type : {formData.disktype}
              </p>
              <p className='form-group__label'>
              OS Caching: {formData.caching}
              </p>
            </div>
            <div className='form-group__element'>
            <p className='form-group__label'>
            Virtual Network name: {formData.vnet_name}
              </p>
              <p className='form-group__label'>
              Subnet name: {formData.subnet_name}
              </p>
              
            </div>
          </div>
        </form>
      </div>
    )
  }


export default Summary;