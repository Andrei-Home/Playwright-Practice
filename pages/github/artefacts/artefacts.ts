import { ApiClient } from "../../../utils/apiClient";


class ArtefactsPage {
    readonly apiClient: ApiClient;
    readonly repoToken: string;
    readonly repoOwner: string;
    readonly repoName: string;
    readonly baseUrl: string = "https://api.github.com";
    readonly artefactsEndpoint: string = "/repos/${repoOwner}/${repoName}/actions/artifacts";
    readonly headers: any


    constructor(
        apiClient: ApiClient,
        repoToken: string,
        repoOwner: string,
        repoName: string,
    ) {
        this.apiClient = apiClient;
        this.repoToken = repoToken;
        this.repoOwner = repoOwner;
        this.repoName = repoName;
        this.headers = {};
        this.headers.Authorization = { "Bearer ${repoToken}" };
    }

    getArtifacts() {
        return this.apiClient.get(`${this.baseUrl}${this.artefactsEndpoint}`);
    }



}