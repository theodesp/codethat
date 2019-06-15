---
author: "Theo"
date: 2019-06-15
title: "Using Terraform remote state for collaboration"
summary: "How Terraform remote state can be used in teams for collaboration"
weight: -40
tags: [
    "terraform",
]
categories: [
   "development",
]
levels: "basic"
---

[Read the original article](https://sweetcode.io/terraform-remote-state-collaboration/)

Terraform is the de facto tool in a DevOps arsenal, and it helps with the enablement of infrastructure-as-code deployments. It can manage and provision software resources or providers through a combination of human-machine-friendly definition files and plugins that extend the platform to allow different providers to activate their API.

This infrastructure configuration is managed by Terraform in a state file, which is the key source of truth about any sort of IT service topology or cloud architecture.

One particular feature that Terraform supports and promotes is [collaboration](https://www.hashicorp.com/blog/terraform-collaboration-for-everyone). Terraform supports team-based workflows with a feature known as remote backends. Backends are places where we can store this Terraform state file (or `tfstate` for short) in a remote but shared space so any member of the team can use it to manage infrastructure.

In this article, we will see how we can enable this useful functionality and use it to allow teams to collaborate with each other in order to deliver reliable infrastructure that meets business needs.

{{< header title="Enabling remote state">}}

To collaborate smoothly, each team member needs to have access to the same Terraform state file in a shared location.

Enabling this is easy. You need to have a suitable backend that supports locking the state file. The most convenient right now is the S3 backend, but you can also use HTTP, etcd or consul backends. Here is the global configuration, assuming that we have configured an S3 bucket policy:

{{< code-block terraform >}}
terraform {
  backend “s3” {
    encrypt = true
    bucket = "terraform-remote-state-storage"
    region = “us-east-1”
    key = terraform/state
    dynamo_table = “terraform-state-lock”
  }
}
{{< /code-block >}}
Where:

* **bucket**: is the name of the S3 bucket
* **key**: the name of the tfstate file
* **encrypt**: encrypts the data
* **dynamo_table**: the DynamoDB table for state locking

To enable locking with S3, you need to combine this with a DynamoDB table that will be used to lock the state file. The reason we need this is to prevent running Terraform at the same time, leading to conflicts. Assuming that you have set up DynamoDB policies, you need to add the following resource:

{{< code-block terraform >}}
resource "aws_dynamodb_table" "dynamodb-terraform-state-locking" {
 name = "terraform-state-lock"
 hash_key = "LockID"
 read_capacity = 10
 write_capacity = 10
 attribute {
   name = "LockID"
   type = "S"
 }
 tags {
   Name = "DynamoDB Terraform State Locking"
 }
}
{{< /code-block >}}

The name of the table must match the one on the S3 backend.

{{< header title="Using remote state" >}}

Enabling remote state is only half a job done. To actually enable it in a practical example, you need to use it as a data source. For example, when you have Infrastructure teams that are working with a particular domain (setting up networking, availability zones, VPCs or DNS), it makes sense to have them as separate states.

For example, when we expose the VPC IDs in an output variable:

{{< code-block terraform >}}
output "vpc_id" {
 value = "${aws_vpc.main.id}"
}
{{< /code-block >}}

With remote state backends, another team can just do this:

{{< code-block terraform >}}
data "terraform_remote_state" "vpc" {
 backend     = "s3"
 config {
   bucket = "terraform-remote-state-storage"
   key    = "terraform/state"
   region = "eu-east-1"
 }
}
module "app" {
 source  = "./child"
 name    = "app"
 vpc_id  = "${data.terraform_remote_state.vpc.vpc_id}"
}
{{< /code-block >}}

Another team might provision databases and application storage credentials:

{{< code-block terraform >}}
output "address" {
  value = "${aws_db_instance.mysql.address}"
}
output "port" {
  value = "${aws_db_instance.mysql.port}"
}
{{< /code-block >}}

Then another team can consume it like this:

{{< code-block terraform >}}
data "terraform_remote_state" "db" {
  backend = "s3"
  config {
    bucket = “terraform-remote-state-storage”
    key    = “terraform/state/mysql”
    region = "us-east-1"
  }
}
module "app" {
 source  = "./child"
 name    = "app"
 mysql_address  = "${data.terraform_remote_state.db.address}"
 mysql_port  = "${data.terraform_remote_state.db.port}"
}
{{< /code-block >}}

The advantages of this approach are numerous; we want to have a clean, reusable codebase that maps to infrastructure and can be shared between environments.

{{< header title="Time for DevOps collaboration" >}}

The moment infrastructure is defined in terms of code that is shared between teams, it can become an artifact that needs to be maintained.

Regardless of the type of codebase, teams should define guidelines and the code quality reviews to follow. The ultimate aim is to make deployment to production easy and as frictionless as possible. Development and Operations teams can work together in creative ways that reduce operational delays and improve communication.