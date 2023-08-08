import { getInput, setFailed, info, warning } from '@actions/core';
import { ApiClient } from '@jam-test-umbraco/umbraco-cloud-deployment-apiclient';

async function run() {
    try {
        const apiBaseUrl = getInput('api-base-url', {required: true });
        const projectAlias = getInput('project-alias', { required: true});
        const apiKey = getInput('api-key', { required: true});
        const deploymentId = getInput('deployment-id', { required: true});
        
        const client = new ApiClient(apiBaseUrl, projectAlias, apiKey);

        const deployment = await client.startDeployment(deploymentId);
        info("Deployment accepted and queued to start shortly");

    } catch (error) {    
        warning(`Error: ${error}`);

        setFailed("Got an error while trying to start a deployment")
    }
}

run();