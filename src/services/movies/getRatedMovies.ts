import httpInstance from "../httpInstance";


export const getRatedMovies = async () => {
    let res: any;
    const enpoint = `top_rated?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`;
    
    await httpInstance
        .get(enpoint)
        .then((response) => {
            res = response.data;
        })
        .catch((err) => {
            res = err.response;
        });
    return res;

}