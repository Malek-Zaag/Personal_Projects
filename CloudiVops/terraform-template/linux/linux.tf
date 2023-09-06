terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.54.0"
    }
  }
  required_version = ">= 0.14.9"
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

resource "azurerm_resource_group" "resource-group" {
  name     = "${var.virtual_machine_name}-resource-group"
  location = var.resource_group_location
}

resource "azurerm_network_security_group" "network-security-group" {
  name                = "default-security-group"
  location            = var.resource_group_location
  resource_group_name = azurerm_resource_group.resource-group.name
}

resource "azurerm_network_security_rule" "nsr-1" {
  name                        = "Ssh"
  priority                    = 100
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "*"
  source_port_range           = "*"
  destination_port_range      = "22"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.resource-group.name
  network_security_group_name = azurerm_network_security_group.network-security-group.name
}

resource "azurerm_network_security_rule" "nsr-2" {
  name                        = "Ping"
  priority                    = 200
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Icmp"
  source_port_range           = "*"
  destination_port_range      = "*"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.resource-group.name
  network_security_group_name = azurerm_network_security_group.network-security-group.name
}

resource "azurerm_network_security_rule" "nsr-3" {
  name                        = "connexion"
  priority                    = 300
  direction                   = "Outbound"
  access                      = "Allow"
  protocol                    = "*"
  source_port_range           = "*"
  destination_port_range      = "*"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.resource-group.name
  network_security_group_name = azurerm_network_security_group.network-security-group.name
}


resource "azurerm_virtual_network" "virtual-network" {
  name                = var.virtual_network_name
  location            = var.resource_group_location
  resource_group_name = azurerm_resource_group.resource-group.name
  address_space       = ["10.0.0.0/16"]
}

resource "azurerm_subnet" "subnet" {
  name                 = var.subnet_name
  resource_group_name  = azurerm_resource_group.resource-group.name
  virtual_network_name = azurerm_virtual_network.virtual-network.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_subnet_network_security_group_association" "name" {
  subnet_id                 = azurerm_subnet.subnet.id
  network_security_group_id = azurerm_network_security_group.network-security-group.id
}

resource "azurerm_public_ip" "public_ip" {
  name                = "${var.virtual_machine_name}-public-ip"
  resource_group_name = azurerm_resource_group.resource-group.name
  location            = var.resource_group_location
  allocation_method   = "Dynamic"
}

resource "azurerm_network_interface" "network-interface" {
  name                = "${var.virtual_machine_name}-nic"
  location            = var.resource_group_location
  resource_group_name = azurerm_resource_group.resource-group.name
  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.public_ip.id
  }
}

#virtual machine name and settings 
resource "azurerm_linux_virtual_machine" "linux-virtual-machine" {
  name                            = var.virtual_machine_name
  resource_group_name             = azurerm_resource_group.resource-group.name
  location                        = var.resource_group_location
  size                            = var.virtual_machine_size #Standard_B2s Standard_F2s Standard_D2s
  computer_name                   = var.virtual_machine_name
  admin_username                  = var.virtual_machine_admin_username
  admin_password                  = var.virtual_machine_admin_password
  disable_password_authentication = false
  network_interface_ids = [
    azurerm_network_interface.network-interface.id,
  ]
  connection {
    type     = "ssh"
    user     = var.virtual_machine_admin_username
    password = var.virtual_machine_admin_password
    host     = azurerm_linux_virtual_machine.linux-virtual-machine.public_ip_address

  }

  #install python on remote machine through script
  provisioner "remote-exec" {
    inline = [
      "echo ${var.virtual_machine_admin_password} | sudo -S apt update",
      "echo ${var.virtual_machine_admin_password} | sudo -S apt install python3 -y",
      "python3 --version"
    ]
  }
  os_disk {
    name                 = var.virtual_machine_os_disk_name                 #"myOsDisk"
    caching              = var.virtual_machine_os_disk_caching              #"ReadWrite"
    storage_account_type = var.virtual_machine_os_disk_storage_account_type #"Standard_LRS" #Standard_LRS, StandardSSD_LRS, Premium_LRS, StandardSSD_ZRS Premium_ZRS
  }

  source_image_reference {
    # user defined image
    publisher = "Canonical"             #RedHat
    offer     = "UbuntuServer"          #RHEL
    sku       = var.virtual_machine_sku #"18.04-LTS"    # or "16.04 20.04 22.04LTS"  "7-LVM"
    version   = "latest"
  }
}

#monitoring
// workspace 
resource "azurerm_log_analytics_workspace" "example" {
  name                = "${var.virtual_machine_name}-log-analytics-workspace"
  location            = var.resource_group_location
  resource_group_name = azurerm_resource_group.resource-group.name
  sku                 = "PerGB2018" #Free #Standard
  retention_in_days   = 30
}

#extension install on remote machine to gather metrics AzureMonitorLinuxAgent
resource "azurerm_virtual_machine_extension" "example" {
  name                       = "${var.virtual_machine_name}-ama"
  virtual_machine_id         = azurerm_linux_virtual_machine.linux-virtual-machine.id
  publisher                  = "Microsoft.Azure.Monitor"
  type                       = "AzureMonitorLinuxAgent"
  type_handler_version       = "1.0"
  auto_upgrade_minor_version = "true"
  depends_on                 = [azurerm_linux_virtual_machine.linux-virtual-machine, azurerm_log_analytics_workspace.example]
}


#data collection rule to extract data and send it to azure workspace analytics
resource "azurerm_monitor_data_collection_rule" "example" {
  name                = "${var.virtual_machine_name}-data-collection-rule"
  location            = var.resource_group_location
  resource_group_name = azurerm_resource_group.resource-group.name
  depends_on          = [azurerm_virtual_machine_extension.example]
  # where to store the data
  destinations {
    log_analytics {
      workspace_resource_id = azurerm_log_analytics_workspace.example.id
      name                  = "${var.virtual_machine_name}-test-destination-log"
    }
    azure_monitor_metrics {
      name = "${var.virtual_machine_name}-test-destination-metrics"
    }
  }

  #how to collect the data 
  data_flow {
    streams      = ["Microsoft-InsightsMetrics"]
    destinations = ["${var.virtual_machine_name}-test-destination-log"]
  }

  # where to get the data
  data_sources {
    performance_counter {
      streams                       = ["Microsoft-InsightsMetrics"]
      sampling_frequency_in_seconds = 60
      counter_specifiers            = ["\\VmInsights\\DetailedMetrics"]
      name                          = "${var.virtual_machine_name}-VMInsightsPerfCounters"
    }
  }
}

# data collection rule association

resource "azurerm_monitor_data_collection_rule_association" "example" {
  name                    = "${var.virtual_machine_name}-data-collection-rule-association"
  target_resource_id      = azurerm_linux_virtual_machine.linux-virtual-machine.id
  data_collection_rule_id = azurerm_monitor_data_collection_rule.example.id
}
