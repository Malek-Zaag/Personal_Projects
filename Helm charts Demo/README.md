# Helm and Microservices

In this article we are going to discuss about microservices and how can we use Helm charts to deploy a demo application that is based on this type of architecture .

## Microservices :

Microservices is an architectural style where software is broken down into small, independent services that work together to build complex applications. Each service is designed to perform a specific function, making it easier to develop, test, and maintain.

## Helm :

Helm, on the other hand, is a package manager for Kubernetes - an open-source container orchestration platform. It allows developers to define, install, and manage Kubernetes applications as packages called charts.

Helm charts allow developers to package their microservices into reusable components, which can be easily deployed and managed within Kubernetes clusters. This enables teams to more easily manage their applications' lifecycle, from development to production.

## Steps :

For the sake of this demo we are going to use GCP microservices application demo :

https://github.com/GoogleCloudPlatform/microservices-demo

We start by clearing boilerplate code :

![](https://lh3.googleusercontent.com/R7rZVMgkvORqAxSsn0Z6Ux5H8IGZZ2Lv9f5qzTu2Ne7J8jp2xsXXon6TmWtJy7AgbDjqLS0PhVWeg3rSyCmDPpN7YrnQA9LByRWcMX-DAg4eLwpMINlbBzWNgsmesJt3UGYcbBB05srfOXegzFBX-vs)

We add our template code now for Deployment as well as for Service :

![](https://lh6.googleusercontent.com/37Mp94PLgHbGY2J0TtcdNa3S37Hy3Tw6erQMhjBkEo3KX3mFRXd6LkQf30JYDIW7A6QFxJ_c_RbgEdupt1Q223NcgmwPxD_BhZEG35YRgAFLrfiGmO8wun3clYxGgd2TN-utODL1uDEHFcBARCuiIcw)

![](https://lh3.googleusercontent.com/Q63CgPENOMsq2FAAwi-g4tnz7eJmEycfDmAZOSPIIftCpWLIP3EgWu2o1L8tyZ5eVz73LlzDUnpqNSVBPzHp1407zyQ6pnNb7hERfGquBp7nNWYLwWpd_qJpxKI2HKmrweaKGKXaSalLZCkMiOsI62w)

## Values Object :

In helm charts we pass our variables dynamically so we need to use something called Values Object which is built-in object in helm and it is empty by default .

We can pass variables to this object by 3 methods :

- The values.yaml file in the chart
- User-supplied file passed with teh -f flag
- Parameter passed with –set flag

In our demo we are going to use the first approach .

### Variables naming conventions :

Variable names should start with lowercase letter and separated with camelcase.

## Templates

Template for the deployment :

![](https://lh5.googleusercontent.com/RmOzgYnFzqpzq-egRH24zJEbR_-JnCt-pke5BSI1Za-tCQbUkeBRyGFHvsb1qkz6nDOtfRablb9vTGhEudRZmNhuCyj0wwdIw-yPp1zCfn9KVErE5jm3jr41x11CtqTXHNbmLO01ULgpepdVdW9ceoE)

Template for the service :

![](https://lh6.googleusercontent.com/t4vBwnIcDmwJ6X90xn9iMhf-ydBnDFjKDqd0_PCxP6QcEUjGwBBOENjl5i-x-DA4paemRAlKRxz_OmvNQKkS-FzroUWtY-cT-uHzUVgEMHSov87QfN5qtUFKA9NfGVmkPcNXa1ZD9H1eJHjW0vnh3CI)

## Creating Applications

We now create our application (or microservice) :

![](https://i.imgur.com/7LMm2L2.png)

Our pods are running :

![](https://i.imgur.com/YBChWJJ.png)

And our service is running :

![](https://i.imgur.com/D7pA93V.png)

We continue writing our variable files and installing the microservices in our kubernetes cluster .

## Conclusion :

By combining microservices with Helm charts, developers can build scalable, modular applications that are easy to deploy and manage.
