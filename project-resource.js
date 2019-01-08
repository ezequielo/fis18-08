var urljoin = require('url-join');
var request = require('request-promise-native').defaults({json: true});
var CommandFactory = require('hystrixjs').commandFactory;
var projectsServer = (process.env.PROJECTS_URL || 'http://fis2018-02.herokuapp.com/api/v1');
var projectsKey = (process.env.PROJECTS_APIKEY || '11165da8-c45d-4cb3-95c4-6fa13939f7a5');

var project_id;

function projectResource(url) {
    return urljoin(projectsServer, url, '?apikey='+projectsKey);
}

function getProjectBase() {
    var url = projectResource("/proyects/" + project_id);
    console.log(url);
    return request.get(url);
}

var getProjectCommand = CommandFactory.getOrCreate("Get project")
    .run(getProjectBase)
    .timeout(500)
    .build()

function getProject(id) {
    project_id = id;
    return getProjectCommand.execute();
}

module.exports = {
    getProject
}