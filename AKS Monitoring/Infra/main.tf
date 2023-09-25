terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.74.0"
    }
  }
}

provider "azurerm" {
  subscription_id = var.subscription_id
}

resource "azurerm_resource_group" "example" {
  name     = "AKS-rg"
  location = "West Europe"
}

resource "azurerm_kubernetes_cluster" "example" {
  name                = "example-aks1"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  dns_prefix          = "my_cluster"
  sku_tier            = "Paid"

  default_node_pool {
    name       = "default"
    node_count = 3
    vm_size    = "Standard_D2_v2"
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    Environment = "Test"
  }

  automatic_channel_upgrade        = "stable"
  http_application_routing_enabled = true
  monitor_metrics {
    default = true
  }

}

