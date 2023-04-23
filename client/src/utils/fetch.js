const redirectToLogin = () => {
    window.location.href = "/login";
    return null;
}

const apiCall = async (url, { method = 'GET', body = null, headers = {}, includeCredentials = false, domain }) => {
    try {
        let _domain = process.env.REACT_APP_BACKEND;
        if (domain) _domain = domain;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: body && !!Object.keys(body).length && JSON.stringify(body),
            credentials: includeCredentials ? 'include' : 'same-origin',
        };

        const response = await fetch(`${_domain}/${url}`, options);

        if (response.status === 401) {
            redirectToLogin();
        }

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error while retrieving API fetch: ${`/${url}`} with error: ${error}`);
        throw error;
    }
};


export default apiCall;

