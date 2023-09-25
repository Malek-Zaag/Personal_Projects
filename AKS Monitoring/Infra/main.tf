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

resource "azurerm_virtual_network" "example" {
  name                = "AKS-vnet"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  address_space       = ["10.0.0.0/16"]
}


