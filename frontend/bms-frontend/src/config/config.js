export const getEnv = () => {
    return process.env.REACT_APP_ENV || 'local';
};

export const isProduction = () => {
    const env = getEnv().toLowerCase();

    return env === 'prod' || env === 'production';
};

export const getEndPoint = () => {
    return process.env.REACT_APP_API_URL + "/v1/api";
};



export const getImageBasePath = (fileName) => {
    return process.env.REACT_APP_API_URL + fileName;
};
