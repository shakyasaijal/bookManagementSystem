import { capitalize } from '../../../constants/constants';

export const addValidation = data => {
    let error = [];

    for (const [key, value] of Object.entries(data)) {
        if (key === "subject") {
            if (Object.keys(value).length <= 0) {
                error.push({ "error": key, "errorValue": `${capitalize(key)} is required.` })
                console.log(error)
            }
        }
        if(key !== 'author' && key !== "subject"){
            if(value.length < 1){
                error.push({ "error": key, "errorValue": `${capitalize(key)} is required.` })
            }
        }
    }
    return error;
}