import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import Addnote from './Addnote';

const Notes = () => {
    const context = useContext(noteContext)
    const { notes, getNotes , EditeNote} = context;
   
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])

    const [note , setNote] = useState({id:"", etitle:"", edescribtion:"", etag:""})
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title , edescribtion: currentNote.describtion , etag: currentNote.tag})
    }

    const ref = useRef(null)
    const refClose = useRef(null)


    const handleClick = (e) => {
        EditeNote(note.id , note.etitle , note.edescribtion , note.etag)
        refClose.current.click();
    }

    const onchange = (e) => {
        setNote({...note , [e.target.name]: e.target.value})
    }
    return (
        <>
            <Addnote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edite Note</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form className="container">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Note Titile</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onchange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="describtion" className="form-label">Your Note Discription</label>
                                    <input type="text" className="form-control" id="edescribtion" name="edescribtion" value={note.edescribtion} onChange={onchange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Your Note tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange} minLength={5} required/>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button ref={refClose} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescribtion.length<5} type="button" class="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" row my-3">
                <h1>Your Notes</h1>
                <div className="container">
                {notes.length === 0 && "No Notes TO Display"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
