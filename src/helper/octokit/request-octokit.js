const core = require('@actions/core');
const requestRepositoryOctokit = require('../octokit/request-repository');
const verifyCommitsOctokit = require('../octokit/verify-commits');
const requestViewsOctokit = require('../octokit/request-views');
const RequestModel = require('../../model/octokit/RequestModel');
let requestOctokit = (function () {
    let verifyCommits = async function (header, request) {
        let verify =  await verifyCommitsOctokit.verify(header, request.insightsRepository.owner, request.insightsRepository.repository);
        if(verify){
            core.info(`Insight repository '${request.insightsRepository.owner}/${request.insightsRepository.repository}/cache' verified`);
        } else {
            core.info(`Not verified. Found unauthorized commits in '${request.insightsRepository.owner}/${request.insightsRepository.repository}/cache'. ` +
            `Revoke previous unauthorized commits from '${request.insightsRepository.owner}/${request.insightsRepository.repository}/cache'`);
        }
        return verify;
    }
    let requestViews = async function (header, response) {
        let request = new RequestModel('/traffic/views',  response.ownerLogin, response.repositoryName)
        let views = await requestViewsOctokit.requestResponseViews(header, request);
        if(views.status){
            core.info(`Repository views '${response.ownerLogin}/${response.repositoryName}' available`);
        } else {
            core.info(`Repository views not available '${response.ownerLogin}/${response.repositoryName}'. `+
                `This property may not exist for this URL '${response.ownerLogin}/${response.repositoryName}', may not be retrievable ` +
                `${views.response}`);
        }
        return views;
    }
    let requestInsightRepository = async function (header, request) {
        let requestModel = new RequestModel('', request.insightsRepository.owner, request.insightsRepository.repository)
        let insightsRepository =  await requestRepositoryOctokit.request(header, requestModel);
        if(insightsRepository.status){
            core.info(`Insight repository '${request.insightsRepository.owner}/${request.insightsRepository.repository}' available`);
        } else {
            core.info(`Insight repository not available '${request.insightsRepository.owner}/${request.insightsRepository.repository}'. `+
                `This property may not exist for this URL '${request.insightsRepository.owner}/${request.insightsRepository.repository}', ` + 
                `may not be retrievable ${insightsRepository.response}`);
        }
        return insightsRepository;
    }
    let requestRepository = async function (header, request, repositoryName) {
        let requestModel;
        let x = repositoryName.split("/");
        if (x.length == 2) {
            requestModel = new RequestModel('', x[0], x[1]);
        } else {
            requestModel = new RequestModel('', request.insightsRepository.owner, repositoryName);
        }

        let repository = await requestRepositoryOctokit.request(header, requestModel);
        if(repository.status){
            core.info(`Repository '${requestModel.username}/${requestModel.repository}' available`);
        } else {
            core.info(`Repository not available '${requestModel.username}/${requestModel.repository}'. `+
                `This property may not exist for this URL '${requestModel.username}/${requestModel.repository}', may not be retrievable ` +
                `${repository.response}`);
        }
        return repository;
    }
    return {
        verifyCommits: verifyCommits,
        requestViews: requestViews,
        requestInsightRepository: requestInsightRepository,
        requestRepository: requestRepository
    };
})();
module.exports = requestOctokit;