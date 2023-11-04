terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.79.0"
    }
  }
}

provider "azurerm" {
  features {

  }
  subscription_id = "cc7b3e92-7412-47e3-abe0-b6f5315d0d09"
  tenant_id       = "91a00a7b-3710-4fe0-ab16-22c122307049"
}

