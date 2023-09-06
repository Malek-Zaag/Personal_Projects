terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0.0"
    }
  }
  required_version = ">= 0.14.9"
}

provider "azurerm" {
  # Configuration options
  features {}
  subscription_id = var.subscription_id
}

resource "azurerm_resource_group" "notes-api-azure-resource-group" {
  name     = "my-notes-api-rg"
  location = "West Europe"
}

resource "azurerm_virtual_network" "notes-api-virtual-network" {
  name                = "my-virtual-network"
  location            = azurerm_resource_group.notes-api-azure-resource-group.location
  address_space       = ["10.0.0.0/16"]
  resource_group_name = azurerm_resource_group.notes-api-azure-resource-group.name
}

# public ip for azure loadbalancer
resource "azurerm_public_ip" "notes-api-public-ip" {
  name                = "my-public-ip"
  resource_group_name = azurerm_resource_group.notes-api-azure-resource-group.name
  location            = azurerm_resource_group.notes-api-azure-resource-group.location
  allocation_method   = "Static"
}

# the loadbalancer itself
resource "azurerm_lb" "notes-api-loadbalancer" {
  name                = "my-azure-loadbalancer"
  resource_group_name = azurerm_resource_group.notes-api-azure-resource-group.name
  location            = azurerm_resource_group.notes-api-azure-resource-group.location
  frontend_ip_configuration {
    name                 = "publicIPAddress"
    public_ip_address_id = azurerm_public_ip.notes-api-public-ip.id
  }
}

resource "azurerm_lb_backend_address_pool" "notes-api-lb-backend-address-pool" {
  loadbalancer_id = azurerm_lb.notes-api-loadbalancer.id
  name            = "BackEndAddressPool"
}

# for 1st vm
resource "azurerm_lb_backend_address_pool_address" "notes-api-lb-backend-address-pool-address1" {
  name                    = "BackEndAddressPoolAddress"
  backend_address_pool_id = azurerm_lb_backend_address_pool.notes-api-lb-backend-address-pool.id
  virtual_network_id      = azurerm_virtual_network.notes-api-virtual-network.id
  ip_address              = "10.0.1.4"

}

# for 2nd vm
resource "azurerm_lb_backend_address_pool_address" "notes-api-lb-backend-address-pool-address2" {
  name                    = "BackEndAddressPoolAddress"
  backend_address_pool_id = azurerm_lb_backend_address_pool.notes-api-lb-backend-address-pool.id
  virtual_network_id      = azurerm_virtual_network.notes-api-virtual-network.id
  ip_address              = "10.0.1.5"

}

resource "azurerm_subnet" "notes-api-subnet" {
  name                 = "my-subnet"
  resource_group_name  = azurerm_resource_group.notes-api-azure-resource-group.name
  virtual_network_name = azurerm_virtual_network.notes-api-virtual-network.name
  address_prefixes     = ["10.0.1.0/24"]
}


resource "azurerm_network_interface" "notes-api-network-interface" {
  count               = 2
  name                = "acctni${count.index}"
  resource_group_name = azurerm_resource_group.notes-api-azure-resource-group.name
  location            = azurerm_resource_group.notes-api-azure-resource-group.location
  ip_configuration {
    name                          = "testConfiguration"
    subnet_id                     = azurerm_subnet.notes-api-subnet.id
    private_ip_address_allocation = "Dynamic"
  }
}

resource "azurerm_availability_set" "notes-api-aset" {
  name                         = "my-availability-set"
  location                     = azurerm_resource_group.notes-api-azure-resource-group.location
  resource_group_name          = azurerm_resource_group.notes-api-azure-resource-group.name
  platform_fault_domain_count  = 2
  platform_update_domain_count = 2
  managed                      = true
}

resource "azurerm_linux_virtual_machine" "notes-api-vm" {
  count                 = 2
  name                  = "acctvm${count.index}"
  location              = azurerm_resource_group.notes-api-azure-resource-group.location
  availability_set_id   = azurerm_availability_set.notes-api-aset.id
  resource_group_name   = azurerm_resource_group.notes-api-azure-resource-group.name
  network_interface_ids = [element(azurerm_network_interface.notes-api-network-interface.*.id, count.index)]
  size                  = "Standard_B1s"

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }
  admin_ssh_key {
    username   = "azureuser"
    public_key = file(var.public_key_file)
  }

  os_disk {
    name                 = "os_disk_${count.index}"
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  computer_name                   = "myvm${count.index}"
  admin_username                  = "azureuser"
  disable_password_authentication = true

  provisioner "remote-exec" {
    inline = [
      "export PORT=${var.PORT}",
      "export DB_URI=${var.DB_URI}",
      "sudo apt update",
      "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash",
      "chmod +x ~/.nvm/nvm.sh",
      "source ~/.bashrc",
      "nvm install 16",
      "node -v",
      "sudo apt install npm -y",
      "sudo apt install git -y",
      "mkdir /app",
      "cd app ",
      "git clone ${var.repo_url}",
      "cd notes-api",
      "npm i ",
      "npm run start:dev",
    ]
    connection {
      type        = "ssh"
      user        = "azureuser"
      port        = 22
      host        = azurerm_public_ip.notes-api-public-ip.ip_address
      private_key = file(var.private_key_file)
    }

  }

  tags = {
    environment = "production :D"
  }
}

