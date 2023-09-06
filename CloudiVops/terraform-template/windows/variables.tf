variable "subscription_id" {}

variable "resource_group_name" {
  default = "pfa"
}

variable "resource_group_location" {}

variable "virtual_network_name" {}

variable "subnet_name" {}

variable "virtual_machine_name" {}

variable "virtual_machine_size" {}

variable "virtual_machine_admin_username" {}

variable "virtual_machine_admin_password" {}

variable "virtual_machine_os_disk_name" {}

variable "virtual_machine_os_disk_caching" {}

variable "virtual_machine_os_disk_storage_account_type" {}

variable "virtual_machine_sku" {}
