
function setup(host,user,password,database)
{
    global._config.db.database=database;
    global._config.db.host=host;
    global._config.db.password=password;
    global._config.db.user=user;
}

function setSiteId(siteId)
{
    global._config.siteId = siteId;
}
function config()
{
    return global._config;
}
module.exports = {
    config,
    setup,
    setSiteId
};