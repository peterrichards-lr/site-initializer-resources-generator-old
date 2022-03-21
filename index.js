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
    for (index = 0; index < sites.data.length; index++) {
        var choice = sites.data[index].groupKey;
        SitesMap.push({
            key: char,
            groupId: sites.data[index].groupId,
            value: sites.data[index].groupKey
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
        start.start();
    });
}
async function setup() {
    inquirer.prompt([
        {
            name: 'host',
            message: 'What is your DB host?',
            default: '127.0.0.1'
        },
        {
            name: 'user',
            message: 'What is your DB user?',
            default: 'root'
        }, {
            name: 'password',
            message: 'What is your DB password?',
            default: 'SQLAdmin'
        }, {
            name: 'database',
            message: 'What is your DB name?',
            default: 'newlr_insurance_74'
        }, {
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
        config.setup(answers.host, answers.user, answers.password, answers.database,
            answers.LRHost, answers.LRUser, answers.LRPassword);
        selectSite();
    });

}
setup();




