import {HttpClient, MediaTypes, Headers} from '@actions/http-client';

export interface DeploymentResponse {
    "deploymentState": string,
}

export async function startDeployment(callUrl: string, apiKey: string): Promise<DeploymentResponse>
{
    const headers = {
        [Headers.ContentType]: MediaTypes.ApplicationJson,
        "Umbraco-Api-Key": apiKey
    };

    const client = new HttpClient();
    var response = await client.patchJson<DeploymentResponse>(callUrl, "", headers);

    if (response.statusCode === 202 && response.result !== null && response.result.deploymentState === 'Queued')
    {
        return Promise.resolve(response.result!);
    }

    throw new Error(`Unexpected response coming from server. ${response.statusCode} - ${response.result} `);
}
