const _global = require('./global');
const inquirer = require('inquirer');
const config = require('./config');
const start = require('./jobs/start');
const docs = require('./jobs/documents');

const applications = require('./services/applications');
var fs = require('fs');


async function selectSite() {
    var SitesMap = [];
    var sites = await applications.getSites();
    var _choices = [];
    var char = 'A';
    for (index = 0; index < sites.length; index++) {
        var choice = sites[index].key;
        SitesMap.push({
            key: char,
            groupId: sites[index].id,
            value: sites[index].key,
            friendlyUrlPath:sites[index].friendlyUrlPath
        });
        _choices.push(choice);
        char = String.fromCharCode(char.charCodeAt(char.length - 1) + 1);
    }
    inquirer.prompt([
        {
            type: 'list',
            name: 'groupId',
            message: 'Which site you are trying to export?',
            choices: _choices,
        },
    ]).then(respo => {
        var site = SitesMap.filter(site => site.value === respo.groupId)[0];
        config.setSiteId(site.groupId);
        config.setFriendlyUrlPath(site.friendlyUrlPath);
        start.start();
    });
}
async function setup() {
    inquirer.prompt([
        {
            name: 'LRHost',
            message: 'What is your Liferay Portal URL?',
            default: 'http://localhost:8080'
        }, {
            name: 'LRUser',
            message: 'What is your Liferay Portal admin user?',
            default: 'admin@lifeinsurances.com'
        }, {
            name: 'LRPassword',
            message: 'What is your Liferay Portal admin password?',
            default: 'L1feray$'
        }
    ]).then(answers => {
        config.setup(answers.LRHost, answers.LRUser, answers.LRPassword);
        selectSite();
    });

}
setup();




