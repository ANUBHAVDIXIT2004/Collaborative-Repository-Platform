import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateRepository() {

    const navigate = useNavigate();

    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [visibility,setVisibility]=useState(true);

    async function createRepo(e){

        e.preventDefault();

        const owner=localStorage.getItem("userId");

        const response=await fetch("http://localhost:3002/repo/create",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                owner,
                name,
                description,
                visibility,
                issues:[],
                content:[]
            })

        });

        const data=await response.json();

        if(response.ok){

            alert("Repository Created");

            navigate("/");

        }else{

            alert(data.error);
        }

    }

    return(

        <div>

            <h1>Create Repository</h1>

            <form onSubmit={createRepo}>

                <input
                placeholder="Repository Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />

                <br/><br/>

                <textarea
                placeholder="Description"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                />

                <br/><br/>

                <label>

                    Public

                    <input
                    type="checkbox"
                    checked={visibility}
                    onChange={()=>setVisibility(!visibility)}
                    />

                </label>

                <br/><br/>

                <button>Create Repository</button>

            </form>

        </div>

    );

}

export default CreateRepository;