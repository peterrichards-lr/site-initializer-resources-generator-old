const db = require('./db');
const config = require('../config');
const helper = require('../helper');
async function getSites() {
  const rows = await db.query(
    `SELECT * FROM newlr_insurance_74.group_ where site  = 1 and type_ = 1`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {  };
  return {
    data,
    meta
  }
}
async function getContentStructures() {
  const rows = await db.query(
    `SELECT * FROM ddmstructure where classNameId = 20134 and groupid=${config.config().siteId}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {  };
  return {
    data,
    meta
  }
}
module.exports = {
  getContentStructures,
  getSites
}