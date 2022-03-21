const webcontent = require('./webcontent');
const documents = require('./documents');




function start()
{
    webcontent.start();
    documents.start();
}

module.exports = {
    start
}