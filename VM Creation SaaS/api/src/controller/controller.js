const express = require("express");
require("../config/config");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const fs = require("fs");
//const fetch = require("node-fetch");
const request = require("request");
const path = require('path');
const { exec } = require('child_process');
const { Octokit } = require('@octokit/rest');
module.exports.getDefault = (req, res) => {
  console.log("hello for get request");
  res.send("hello for test request");
};

module.exports.createUser = async (req, res) => {
  const { username, firstname, lastname, email, password, subscription_id } =
    req.body;
  User.findOne({ email })
    .then((response) => {
      if (response == null) {
        User.create({
          username,
          firstname,
          lastname,
          email,
          password,
          subscription_id,
        })
          .then((response) => {
            res.json("User added successfully to database");
            res.status(200);
          })
          .catch((err) => console.log(err));
      } else {
        res.status(400);
        res.json("User is already in the database");
      }
    })
    .catch((err) => console.log(err));
};

//jwt token creation for user
const maxAge = 700 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    var auth;
    if (md5(password) === user.password) auth = true;
    else {
      res.send("Wrong password please retype it again");
      auth = false;
    }
    if (auth) {
      const token = createToken(user._id);
      res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
      console.log(JSON.stringify({ id: user._id.valueOf() }));
      res
        .status(200)
        .send(JSON.stringify({ id: user._id.valueOf(), name: user.firstname ,email: user.email, subscription_id: user.subscription_id}));
    }
  } else {
    res.status(400);
    res.send("Wrong username please retype it again");
  }
};

module.exports.getUserByUsername = async (req, res) => {
  const username = req.body.username;
  const user = await User.findOne({ username });
  if (user) {
    //res.send(user)
    res.send(JSON.stringify(user));
  } else {
    res.send("User not found, please recheck the username");
  }
};

module.exports.triggerPipeline = async (req, res) => {
  const jenkins_url = `http://localhost:5000/job/PFAPIPELINE/buildWithParameters?&OSIMAGE=${req.body.parameter}`;
  const params = req.body;
  console.log(params);
  var name =
    __dirname + "\\..\\..\\..\\terraform-template\\terraform.tfvars.json";
  var m = JSON.parse(fs.readFileSync(name).toString());
  Object.entries(params).map((p) => {
    m[p[0]] = p[1];
  });
  fs.writeFileSync(name, JSON.stringify(m));
  //E:\PFA\backpfa\PFA\PFA\terraform-template\terraform.tfvars.json
  exec("docker cp ../terraform-template/terraform.tfvars.json jenkins:/var/jenkins_home/workspace/PFAPIPELINE/terraform-template", (error, stdout, stderr) => {
    console.log(stdout,stderr,error)
    console.log("success");
  });
   
  var clientServerOptions = {
    uri: jenkins_url,
    body: "",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("louaykharouf:1176ee61d0ecdd02a6a70d57c1b0268177"),
    },
  };
  request(clientServerOptions, function (error, response) {
    console.log(error, response.body);
    return;
  });
  res.send(m);
};

module.exports.installDockerOrMySql = (req, res) => {
  const jenkins_url = `http://localhost:5000/job/PFAAnsible/buildWithParameters?&OSIMAGE=${req.body.parameter}&BUTTON=${req.body.button}`;
  const params = req.body;
  console.log(params);
  var clientServerOptions = {
    uri: jenkins_url,
    body: "",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa("louaykharouf:1176ee61d0ecdd02a6a70d57c1b0268177"),
    },
  };
  request(clientServerOptions, function (error, response) {
    console.log(error, response);
    return;
  });
};


module.exports.getPipelineStatus = async (req,res) => {
  const jenkinsUrl = 'http://localhost:5000'; // replace with your Jenkins URL
const jobName = 'PFAPIPELINE'; // replace with the name of your Jenkins pipeline job
const headers = new Headers({
  Authorization: 'Basic ' + btoa("louaykharouf:1176ee61d0ecdd02a6a70d57c1b0268177"),
});
  try {
    const jobInfoResponse = await fetch("http://localhost:5000/job/PFAPIPELINE/api/json", { headers });
    const jobInfo = await jobInfoResponse.json();
    const lastBuildNumber = jobInfo.lastBuild.number;
    const buildStatusResponse = await fetch(`${jenkinsUrl}/job/${jobName}/${lastBuildNumber}/api/json`, { headers });
    const buildStatus = await buildStatusResponse.json();
    console.log(lastBuildNumber)
    console.log(buildStatus.result)
    if (buildStatus.building) {
      //return { status: 'running' };
      res.send({ status: 'running' });
    } else if (buildStatus.result === 'SUCCESS') {
      //return { status: 'success' };
      res.send({ status: 'success' });
    } else {
      //return { status: 'failure' };
      res.send({ status: 'failure' });
    }

  } catch (err) {
    console.error(err);
    //return { error: 'Failed to get pipeline status' };
    res.send({ error: 'Failed to get pipeline status'});
  }
 
};
module.exports.getPipelineStatusAnsible = async (req,res) => {
  const jenkinsUrl = 'http://localhost:5000'; // replace with your Jenkins URL
const jobName = 'PFAPIPELINE'; // replace with the name of your Jenkins pipeline job
const headers = new Headers({
  Authorization: 'Basic ' + btoa("louaykharouf:1176ee61d0ecdd02a6a70d57c1b0268177"),
});
  try {
    const jobInfoResponse = await fetch("http://localhost:5000/job/PFAAnsible/api/json", { headers });
    const jobInfo = await jobInfoResponse.json();
    const lastBuildNumber = jobInfo.lastBuild.number;
    const buildStatusResponse = await fetch(`${jenkinsUrl}/job/${jobName}/${lastBuildNumber}/api/json`, { headers });
    const buildStatus = await buildStatusResponse.json();
    console.log(lastBuildNumber)
    console.log(buildStatus.result)
    if (buildStatus.building) {
      //return { status: 'running' };
      res.send({ status: 'running' });
    } else if (buildStatus.result === 'SUCCESS') {
      //return { status: 'success' };
      res.send({ status: 'success' });
    } else {
      //return { status: 'failure' };
      res.send({ status: 'failure' });
    }

  } catch (err) {
    console.error(err);
    //return { error: 'Failed to get pipeline status' };
    res.send({ error: 'Failed to get pipeline status'});
  }
 
};



// {
//   "subscription_id": "cc7b3e92-7412-47e3-abe0-b6f5315d0d09",
//   "resource_group_name": "rg-01",
//   "virtual_network_name": "vnet-01",
//   "subnet_name": "subnet-01",
//   "virtual_machine_name": "linux-01",
//   "virtual_machine_size": "Standard_B2s"
// }

