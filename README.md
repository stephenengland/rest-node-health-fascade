# rest-node-health-fascade
A REST endpoint to check on the implementing node application

## Getting Started

```
require('rest-node-health-fascade')();
```

### Customize your Health Check

```
var startHealthCheckEndpoint = require('rest-node-health-fascade');

startMetaHealthCheckEndpoint(function(callback) {
  var everythingIsOK = false;
  callback(everythingIsOK, {
    "message": "Bad stuff went down! Service is not operational"
  });
});

```

## Configuration

The configuration is entirely driven by the package.json. It gives the version number, description, and number of the application via the package.json file.

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

You may use your own types, but realize the Health Monitoring UI has plans to support reading types. If you do not make the type 'generic' enough, it won't be a useful field..
