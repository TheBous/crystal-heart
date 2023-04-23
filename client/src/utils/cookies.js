export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
};

export const setCookie = (name, value, options = {}) => {
    let cookie = name + '=' + value;
    if (options.expires) {
        const expires = options.expires.toUTCString();
        cookie += '; expires=' + expires;
    }
    if (options.path) {
        cookie += '; path=' + options.path;
    }
    if (options.domain) {
        cookie += '; domain=' + options.domain;
    }
    if (options.secure) {
        cookie += '; secure';
    }
    document.cookie = cookie;
};

export const deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};