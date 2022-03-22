const config = require('../config');

var digestRequest = require('request-digest')(config.config().liferay.user
  , config.config().liferay.password);

const helper = require('../helper');
const request = require('request');


async function getContentStructureWebDav(structureId) {
  return new Promise(function (resolve, reject) {
    const DigestFetch = require('digest-fetch')
    const client = new DigestFetch(config.config().liferay.user, config.config().liferay.password, { algorithm: 'MD5' })
    client.fetch(`${config.config().liferay.host}/webdav/${config.config().friendlyUrlPath}/journal/Structures/${structureId}`, {})
    .then(res =>
       res.json()
       ).then(data => 
        resolve(data));
  });
}

async function getContentStructures() {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/headless-delivery/v1.0/sites/${config.config().siteId}/content-structures`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
      }
    };
    request(options, function (error, response) {
      if (error) {
        reject(error)
      };
      resolve((JSON.parse(response.body)).items);
    });
  });
}
async function getSites() {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/headless-admin-user/v1.0/my-user-account/sites`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
      }
    };
    request(options, function (error, response) {
      if (error) {
        reject(error)
      };
      resolve((JSON.parse(response.body)).items);
    });
  });
}

async function getRootDocuments() {
  return new Promise(function (resolve, reject) {
    var options = {
      'method': 'GET',
      'url': `${config.config().liferay.host}/o/headless-delivery/v1.0/sites/${config.config().siteId}/documents?page=0&pageSize=999999`,
      'headers': {
        'Authorization': "Basic " + new Buffer.from(config.config().liferay.user
          + ":" + config.config().liferay.password).toString("base64")
      }
    };
    request(options, function (error, response) {
      if (error) {
        reject(error)
      };
      resolve(JSON.parse(response.body));
    });
  });
}
module.exports = {
  getContentStructures,
  getRootDocuments,
  getSites,
  getContentStructureWebDav
}