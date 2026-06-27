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
export const generateReadme = async (repoId, userId) => {

    const res = await API.post(
        "/api/ai/generate-readme",
        {
            repoId,
            userId
        }
    );

    return res.data;

};
export const askRepoAssistant = async (repoId, question) => {
  const response = await fetch('http://localhost:3002/ai/repo-assistant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ repoId, question })
  });
  return response.json();
};