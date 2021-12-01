import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:3001/"
  const notesinitial = []
  const [notes, setNote] = useState(notesinitial)

  //getallNote
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjM0Nzg1NjkzfQ.CoiaW6yLsW8NBFgdJjwitgw89Aw6I-bET4xD3vG2K80'
        },
      });
      const json = await response.json();
      setNote(json)
    } catch (error) {
      alert("try again latter")
    }
  }

  //Add a Note
  const addNote = async (title, describtion, tag) => {
    const response = await fetch(`${host}api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjM0Nzg1NjkzfQ.CoiaW6yLsW8NBFgdJjwitgw89Aw6I-bET4xD3vG2K80'
      },
      body: JSON.stringify({ title, describtion, tag })
    });
    const note = await response.json();
    setNote(notes.concat(note))
  }

  //Delete a Note
  const DeleteNote = async (id) => {

    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjM0Nzg1NjkzfQ.CoiaW6yLsW8NBFgdJjwitgw89Aw6I-bET4xD3vG2K80'
      },
    });
    const json = response.json();
    console.log(json)
    console.log("Hello I am delete" + id)
    const newNote = notes.filter((note) => { return note._id !== id })
    setNote(newNote)
  }

  //Edite a Note
  const EditeNote = async (id, title, describtion, tag) => {
    //API call
    try {

      const response = await fetch(`${host}api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjM0Nzg1NjkzfQ.CoiaW6yLsW8NBFgdJjwitgw89Aw6I-bET4xD3vG2K80'
        },
        body: JSON.stringify({ title, describtion, tag })
      });
      const json = await response.json();
      console.log(json)

      //
      let newNotes = JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].describtion = describtion;
          newNotes[index].tag = tag
        }
        break;
      }
      setNote(newNotes)

    } catch (error) {
      alert("Try again later")
    }
  }


  return (
    <NoteContext.Provider value={{ notes, setNote, addNote, DeleteNote, EditeNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState