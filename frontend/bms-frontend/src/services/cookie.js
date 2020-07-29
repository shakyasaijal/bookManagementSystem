/**
 * Set Cookie
 * For: refresh token, access token
 * data => an array of objects
 * Eg: {
 *  "name": "",
 *  "value": "",
 *  "expiry": ...
 * }
 */
export const setCookie = (data) => {
    for (let i = 0; i < data.length; i++) {
        let date = new Date();
        if (data[i].name == "access_token") {
            date.setTime(date.getTime() + (data[i].expiry * 3600 * 1000));
        } else {
            date.setTime(date.getTime() + (data[i].expiry * 24 * 60 * 60 * 1000));
        }
        document.cookie = data[i].name + "=" + data[i].value + "; expires=" + date.toGMTString() + ";path=/"
    }
}


export const getCookie = () => {
    let cookies = document.cookie.split(';');
    let data = {}
    for (let i = 0; i < cookies.length; i++) {
        let trimmed_cookie = cookies[i].trim()
        let strip_cookie = trimmed_cookie.split('=')
        data[strip_cookie[0]] = strip_cookie[1]
    }
    return data;
}