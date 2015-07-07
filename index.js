var os = require("os"),
    express = require('express');

module.exports = function (healthCheckCallback) {
  var app = express(),
      host = os.hostname(),
      packageJson = {};
  try {
    packageJson = require('../../package');
  }
  catch (e) {
    packageJson = {};
  }

  var respondHealthy = function (res, data) {
    if (!data) {
      data = {};
    }

    data.host = host;
    data.type = (packageJson && packageJson.config && packageJson.config.healthCheckType) || "Service";

    res.status(200).jsonp(data).end();
  };

  var respondUnhealthy = function (res, data) {
    if (!data) {
      data = {};
    }

    data.host = host;
    data.type = (packageJson && packageJson.config && packageJson.config.healthCheckType) || "Service";

    res.status(500).jsonp(data).end();
  };

  app.get("/info", function (req, res) {
    res.jsonp({
      "name": packageJson && packageJson.name,
      "description": packageJson && packageJson.description,
      "version": packageJson && packageJson.version,
      "repository": packageJson && packageJson.repository && packageJson.repositoryUrl,
      "homepage": packageJson && packageJson.homepage
    });

    res.end();
  });

  app.get('/', function (req, res) {
    if (healthCheckCallback) {
      healthCheckCallback(function(isHealthy, data) {
        if (isHealthy) {
          respondHealthy(res, data);
        }
        else {
          respondUnhealthy(res, data);
        }
      });
    }
    else {
      respondHealthy(res);
    }
  });

  app.listen((packageJson && packageJson.config && packageJson.config.healthCheckPort) || 9092);
};