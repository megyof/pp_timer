
/** ProjectPlace API */
export interface ProjectPlaceAPI {
    getUser: () => Promise<Response>,
}

/** Create ProjectPlace API with base URL and API key */
export const createProjectPlaceApi = (baseURL: string, appKey: string, appSecret, accessTokenKey: string,
                                      accessTokenSecret: string): ProjectPlaceAPI => {

    const fetchPP = async (path: string, method = 'GET', body = undefined) => {
        const response = await fetch(baseURL.concat(path), {
            method,
            body,
            headers: {
                'X-Redmine-API-Key': apiKey,
                ...(body && { 'Content-Type': 'application/json' })
            }
        });
        if (response.ok) return response;
        if (response.status === 422) { // 422 Unprocessable Entity
            const { errors } = await response.json(); // API: https://www.redmine.org/projects/redmine/wiki/Rest_api#Validation-errors
            throw new Error(errors.join('\r\n'));
        }
        throw new Error(response.statusText);
    };

     const getUser = async () => { // API: https://www.redmine.org/projects/redmine/wiki/Rest_MyAccount
        return await fetchPP('/my/account.json'); // {"user":{ "id":1, ... }}
    }

    return {
        getUser
    };
};
