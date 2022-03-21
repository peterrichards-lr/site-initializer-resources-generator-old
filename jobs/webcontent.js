var dir = './output/resources/site-initializer/ddm-structures';
const applications = require('../services/applications');
fs = require('fs');
var builder = require('xmlbuilder');
const { XMLParser } = require('fast-xml-parser');
async function getXMLData(element) {
    const parser = new XMLParser();
    let jsonObj = parser.parse(element.name);
    var structureName = jsonObj.root.Name;
    var root = builder.create('root');
    root = root.ele("structure");
    root = root.ele("name").text(structureName);
    root = root.up();
    root = root.ele("description").text(element.description == "" ? "" : element.description);//definition:
    root = root.up();
    root = root.ele("definition").cdata(element.definition);
    root = root.end({ pretty: true });
    await createFile(root, structureName + ".xml");
}
async function createFile(filedata, filename) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFile(`${dir}/${filename}`, filedata, function (err) {
        if (err) return console.error(err);
    });
}
async function start() {
    var rows = await applications.getContentStructures();
    for (let index = 0; index < rows.data.length; index++) {
        const element = rows.data[index];
        getXMLData(element);
    }
}
module.exports = {
    start
}
