import { getInput, setFailed, info, warning } from '@actions/core';
import { startDeployment } from './ucStartDeploymentApi';

async function run() {
    try {
        const projectAlias = getInput('project-alias');
        const apiKey = getInput('api-key');
        const deploymentId = getInput('deployment-id');

        const url = `https://api-internal.umbraco.io/projects/${projectAlias}/deployments/${deploymentId}`

        const deployment = await startDeployment(url, apiKey);
        info("Deployment accepted and queued to start shortly");

    } catch (error) {    
        warning(`Error: ${error}`);

        setFailed("Got an error while trying to start a deployment")
    }
}

run();