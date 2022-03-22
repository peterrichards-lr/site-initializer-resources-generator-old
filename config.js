
function setup(host,user,password,database,LRHost,LRUser,LRPassword)
{
    global._config.db.database=database;
    global._config.db.host=host;
    global._config.db.password=password;
    global._config.db.user=user;
    global._config.liferay.host=LRHost;
    global._config.liferay.user=LRUser;
    global._config.liferay.password=LRPassword;
    global._config.siteId = 0;
    global._config.site = "guest";
}

function setSiteId(siteId)
{
    global._config.siteId = siteId;
}
function setSite(site)
{
    global._config.site = site;
}
function config()
{
    return global._config;
}
module.exports = {
    config,
    setup,
    setSiteId,
    setSite
};