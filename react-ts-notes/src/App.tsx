
import { useState } from "react";
import { useEffect } from "react";
type Note ={
  text:string;
  id:number;
}

function Notes(){
  const[text,setText] = useState("")
  const[notes,setNotes] = useState<Note[]>([])
  function handlechange(e:React.ChangeEvent<HTMLInputElement>){
    setText(e.target.value)

  }
useEffect(()=>{
  const saved = localStorage.getItem("key");
  if(saved){
    setNotes(JSON.parse(saved) as Note[])
  }

},[]);

  function submitform(e:React.FormEvent){
    e.preventDefault();
    const trimmed = text.trim();
    if(trimmed ==="") return;
    const storage = ([...notes ,{id:Date.now() ,text:trimmed}])
    setNotes(storage);
    localStorage.setItem("key",JSON.stringify(storage))
    setText("");

  }
  function delehandle(id:number){
    const storage=(notes.filter((note)=>
    note.id !==id))
    setNotes(storage);
      localStorage.setItem("key",JSON.stringify(storage))

  }
  return(
    <>
    <h1>Notes app</h1>
    <form onSubmit={submitform}>
      <input type="text" value={text} placeholder="write notes" onChange={handlechange} />
      <button type="submit">Add</button>
    </form>
    <ul>
      {notes.map((note)=>
    <NoteItem key = {note.id} note = {note} onDelete = {delehandle}/>)}
    </ul>
    </>
  )
}
type NoteItemProps ={
  note:Note;
  onDelete: (id:number) =>void;
}
function NoteItem({note,onDelete} :NoteItemProps){
  return(
    <li>
    {note.text}
    <button type="button" onClick={() =>onDelete(note.id)}>delete </button>
    </li>
  )
}
export default Notes;