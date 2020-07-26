import { capitalize, emailRegex } from '../../../constants/constants';


export const signIn = data => {
    let error = [];
    for (const [key, value] of Object.entries(data)) {
        if (key === "email") {
            if (value.length < 1) {
                error.push({ "error": "email", "errorValue": `Email is required.` })
            }
            else if (!emailRegex.test(value)) {
                error.push({ "error": "email", "errorValue": "Email is invalid." })
            }
        }
        else {
            if (value.length < 1) {
                error.push({ "error": "password", "errorValue": "Password is required." })
            }
        }
    }
    return error;
}


export const signUp = data => {
    let error = [];
    for (const [key, value] of Object.entries(data)) {
        if (key === "email") {
            if (value.length < 1) {
                error.push({ "error": "email", "errorValue": `Email is required.` })
            }
            else if (!emailRegex.test(value)) {
                error.push({ "error": "email", "errorValue": "Email is invalid." })
            }
        }
        else if(key === "password"){
            if (value.length < 1) {
                error.push({ "error": "password", "errorValue": `Password is required.` })
            }
            else if (value.length < 5) {
                error.push({ "error": "password", "errorValue": "Password must be atleast 5 character long." })
            }
        }
        else {
            if (value.length < 1) {
                error.push({ "error": key, "errorValue": `${capitalize(key).split('_').join(' ')} is required.` })
            }
        }
    }
    return error;
}