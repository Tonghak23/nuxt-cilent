import axios from "axios";


export const useUsers = () => {
    const findAll = async (limit, skip) => {
        let find = await axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
        return find;
    };

    return { findAll };
};