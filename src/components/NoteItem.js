import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'
const NoteItem = (props) => {
    const context = useContext(noteContext)
    const {DeleteNote} = context;
    const { note,updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">Title: {note.title}</h5>
                    <p className="card-text">Discription: {note.describtion}</p>
                    <p className="card-text">Tag: {note.tag}</p>
                    <i className="fas fa-trash mx-2" onClick={()=>DeleteNote(note._id)}></i>
                    <i className="fas fa-edit mx-2" onClick={()=>updateNote(note)}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
