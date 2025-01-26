terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.16.0"
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

