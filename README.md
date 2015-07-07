# rest-node-health-fascade
A REST endpoint to check on the implementing node application

## What's the point?

To give you some information about the health of the application and a description of what the application is/does.

It exposes two urls to a port that you configure:

"/" and "/info"

The base route gives some short-term data about your application and responds with a 200 or 500 to indicate the 'health' of the application.

The info route gives a description about your application.

These urls are used in the WebHealthMonitor project.

## Getting Started

```
require('rest-node-health-fascade')();
```

### Customize your Health Check

```
var startHealthCheckEndpoint = require('rest-node-health-fascade');

startHealthCheckEndpoint(function(callback) {
  var everythingIsOK = false;
  callback(everythingIsOK, {
    "message": "Bad stuff went down! Service is not operational"
  });
});

```

## Configuration

The configuration is entirely driven by the package.json. It gives the version number, description, and name of the application via the package.json file.

There are two custom config options used in the package.json file:

```
{
  "config": {
    "healthCheckType": "Website",
    "healthCheckPort": 9092
  }
}
```

healthCheckType should be consistent with standard WebHealthMonitor types:
* Website
* Service
* FTP Server
* FTP Directory
* FTP File

You may use your own types, but realize the Health Monitoring UI has plans to support reading types. If you do not make the type 'generic' enough, it won't be a useful field.
