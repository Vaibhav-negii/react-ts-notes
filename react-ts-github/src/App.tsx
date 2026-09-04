import React from "react";
import { useState } from "react";

type GithubUser ={
  name:string | null;
  login: string;
  avatar_url: string;
  public_repos: number;
  bio: string | null;
  followers : number;
}
function Github(){
  const [username,setUsername] = useState("");
  const [user,setUser] = useState<GithubUser | null>(null);
  const [status,setStatus] = useState("");
  function Inputhandler(e:React.ChangeEvent<HTMLInputElement>){
    setUsername(e.target.value);

  }
 async  function submitform(e:React.FormEvent){
    e.preventDefault();
     setStatus("loading");
     try{
      const respond = await fetch(`https://api.github.com/users/${username}`)
      if(!respond.ok){
        throw new Error("Server not responding");
    

      }
          const data = await respond.json();
        setUser(data);
        setStatus("running");
    }catch{
      setStatus("error")

    }


  }
  return(
    <>
    <h1>Github lookup</h1>
    <form onSubmit={submitform}>
    <input type="text" value={username} placeholder="search github username" onChange={Inputhandler}/>

    <button type="submit">Submit</button>
    {status ==="loading" && <p>Loading...</p>}
    {status ==="error" && <p>user not found</p>}
    {user &&(
      <div>
      <img src={user.avatar_url} alt={user.login} width={100}/>
      <p>Followers:{user.followers} | repo: {user.public_repos}</p>
      <h1>{user.name || user.login}</h1>
      <p>{user.bio ||null}</p>

      </div>
    )}
    </form>


    </>
  )
 
}
export default Github;
