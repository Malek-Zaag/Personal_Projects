
# How to configure monitoring for Azure Kubernetes Service

In this article, I am going to demonstrate how we can configure monitoring service for our Azure Kubernetes cluster and how we manage to receive alert notifications (Email and Mobile App notification) when it is under heavy load .

## Installing Kubernetes

Since I am fond of IaC, i decided to provision my Infrastructure using code, so i wrote the following terraform file :
```terraform

    terraform {
      required_providers {
        azurerm = {
          source  = "hashicorp/azurerm"
          version = "3.74.0"
        }
      }
    }
    
    provider "azurerm" {
      features {
    
      }
      subscription_id = var.subscription_id
    }
    
    resource "azurerm_resource_group" "example" {
      name     = "AKS-rg"
      location = "West Europe"
    }
    
    resource "random_id" "workspace" {
      keepers = {
        # Generate a new id each time we switch to a new resource group
        group_name = azurerm_resource_group.example.name
      }
    
      byte_length = 8
    }
    
    resource "azurerm_log_analytics_workspace" "example" {
      name                = "k8s-workspace-${random_id.workspace.hex}"
      location            = azurerm_resource_group.example.location
      resource_group_name = azurerm_resource_group.example.name
      sku                 = "PerGB2018"
    }
    
    resource "azurerm_log_analytics_solution" "example" {
      solution_name         = "ContainerInsights"
      location              = azurerm_resource_group.example.location
      resource_group_name   = azurerm_resource_group.example.name
      workspace_resource_id = azurerm_log_analytics_workspace.example.id
      workspace_name        = azurerm_log_analytics_workspace.example.name
    
      plan {
        publisher = "Microsoft"
        product   = "OMSGallery/ContainerInsights"
      }
    }
    
    
    resource "azurerm_kubernetes_cluster" "example" {
      name                = "example-aks1"
      location            = azurerm_resource_group.example.location
      resource_group_name = azurerm_resource_group.example.name
      dns_prefix          = "my-cluster"
      sku_tier            = "Standard"
    
      default_node_pool {
        name       = "default"
        node_count = 2
        vm_size    = "Standard_A2_v2"
      }
    
      identity {
        type = "SystemAssigned"
      }
    
      tags = {
        Environment = "Test"
      }
    
      automatic_channel_upgrade        = "stable"
      http_application_routing_enabled = true
    
      oms_agent {
        log_analytics_workspace_id = azurerm_log_analytics_workspace.example.id
      }
    
    }
```
    

In the previous file, i provisionned the kubernetes cluster, a log analytics solution which is ContainerInsights and the log analytics workspace to edit and run log queries from data collected if needed .

## Creating Azure logic App

Setting the logic app is pretty easy and you can customize the settings as you need :

![logic app](https://cdn-images-1.medium.com/max/2000/1*k8qtq8cq3-vg8p4niLODsA.png)*logic app*

Now we set our trigger (HTTP request) and the action (send Email to me on trigger) :

![Setting up trigger and action](https://cdn-images-1.medium.com/max/2620/1*0P3XuGrK6nW_DotGKQwkfw.png)*Setting up trigger and action*

### Testing the Email :

![logic app designer](https://cdn-images-1.medium.com/max/2490/1*IAgpR2MpTLrLyztsElwlgA.png)*logic app designer*

I tested the app using the button and it worked fine :

![email received](https://cdn-images-1.medium.com/max/2000/1*JfZNU9c-8pqDfLo7IqIceQ.png)*email received*

## Creating alert

Alert on Azure need a trigger to run (generally triggers are related to metrics), and after the trigger is launched some actions are invoked in order to notify the administrator or the user, or simply to do some actions :

![Alert explanation](https://cdn-images-1.medium.com/max/2400/0*41tBGnJ9OuD4ntXz)*Alert explanation*

In this tutorial, i am going to create the alert, the action group and the alert processing to rule :

![alert creation](https://cdn-images-1.medium.com/max/2000/1*Lc2BQlMF1AU31A5WNIn2kw.png)*alert creation*

Alert created with a severity of critical and it is triggered when node CPU usage average exceeds 70% :

![](https://cdn-images-1.medium.com/max/3340/1*TTVtV5u0hxhll6ckZDXWBg.png)

### Creating an action group

I created the action group :

![](https://cdn-images-1.medium.com/max/2036/1*pezccRh7sq0ECY_yn8ZWdg.png)

Then i configured actions so that i can receive mobile app notification on my phone and trigger logic app by a HTTP request :

![](https://cdn-images-1.medium.com/max/3322/1*Lb92F_j_QG9dS-WgQygNgQ.png)

Adding Logic App to action group:

![](https://cdn-images-1.medium.com/max/3324/1*ATkZrAFVH3aBDL1opxk0Eg.png)

### Creating alert processing Rule and assigning action group

![alert processing rule](https://cdn-images-1.medium.com/max/3258/1*aGhVIYrmyQORr6pAV1idvA.png)*alert processing rule*

## Load and stress Testing for Kubernetes

Now everything in place we need to start loading the cluster:

* [**Load test](https://www.techtarget.com/searchsoftwarequality/definition/load-testing).** How the system responds to a sudden increase in requests.

* [**Endurance test](https://www.techtarget.com/searchsoftwarequality/definition/Soak-testing).** How the system survives a constant, moderate load for longer duration of times. It can also be referred to as a *soak test*, referring to the long time the software spends under test.

* [**Stress test](https://www.techtarget.com/searchsoftwarequality/definition/stress-testing).** How the system responds under a heavy load, with an intent to find out the point at which system is stressed and ceases functioning.

## Add load to the application

We go by stress test in order to provoke CPU usage so i deployed a pod running PHP application .

Once the PHP web application is running in the cluster and we have set up an autoscaling deployment, introduce load on the web application. This tutorial uses a [BusyBox](https://hub.docker.com/_/busybox) image in a container and infinite web requests running from BusyBox to the PHP web application.

BusyBox is a lightweight image of many common UNIX utilities, such as GNU Wget. Another tool that enables load testing is the open source [Hey](https://github.com/rakyll/hey), which creates concurrent processes to send requests to an endpoint.

    $ kubectl apply -f .\php-apache.yaml
    deployment.apps/php-apache created
    service/php-apache created

    $ kubectl apply -f .\stress-test.yaml
    deployment.apps/infinite-calls created

    $ kubectl get pods
    NAME                              READY   STATUS    RESTARTS   AGE
    infinite-calls-5cffd59c59-4xnpx   1/1     Running   0          29s
    php-apache-7495ff8f5b-nqctr       1/1     Running   0          2m42s

In order to spice up things i decided to scale out the BusyBox pods in order to have more requests and throttle the CPU :

    kubectl scale deployment/infinite-calls --replicas 4

![](https://cdn-images-1.medium.com/max/2000/1*bBLeMWswu2xAjoMzw2vd0Q.png)

Finally Scaling to 40 replicas :

    kubectl scale deployment/infinite-calls --replicas 40

![](https://cdn-images-1.medium.com/max/2000/1*UoYweF4r1Xu0ZNtm9I4jjg.png)

But still my CPU isnÔÇÖt going as higher as i want so i did a lot of digging and find the following github Repo :
[**GitHub - giantswarm/kube-stresscheck: Script to check Kubernetes nodes on stress (CPU/RAM)ÔÇª**
*Script to check Kubernetes nodes on stress (CPU/RAM) resistance. - GitHub - giantswarm/kube-stresscheck: Script toÔÇª*github.com](https://github.com/giantswarm/kube-stresscheck)

It is simply a script written in Go to check Kubernetes nodes on stress (CPU/RAM) resistance.

i deployed the yaml file in the repo and Voila ! The cluster CPU is going up and after 1 minute i got an alert on both my phone and Email :

![](https://cdn-images-1.medium.com/max/2000/0*cDpsNH9pjKfB2Bbl)

![](https://cdn-images-1.medium.com/max/2000/1*TPGs5cudh8QTtAK2y4D99Q.png)

## Conclusion

Azure Kubernetes monitoring seem to be difficult but using the managed Azure metrics and ContainerInsgihts is it very easy and helpful when it comes to alerting and Incident response .

ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö ÔÇö

Was this helpful? Confusing? 
If you have any questions, feel free to comment below! Make sure to follow on Linkedin : https://www.linkedin.com/in/malekzaag/ and github: https://github.com/Malek-Zaag if youÔÇÖre interested in similar content and want to keep learning alongside me!
