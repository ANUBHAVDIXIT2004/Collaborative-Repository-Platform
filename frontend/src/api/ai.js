import axios from "axios";

const API = axios.create({

    baseURL: import.meta.env.VITE_API_URL,

    withCredentials: true

});

export const generateCommitMessage = async (changes) => {

    const res = await API.post("/api/ai/commit-message", {

        changes

    });

    return res.data;

};
export const reviewCode=async(

code,

language

)=>{

const res=await API.post(

"/api/ai/review",

{

code,

language

}

);

return res.data;

}