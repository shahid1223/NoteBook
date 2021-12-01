import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext'
const Addnote = () => {
    const context = useContext(noteContext)
    const {addNote} = context;
    const [note, setNote] = useState({title: "", describtion:"", tag:""})
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title ,note.describtion, note.tag);
        setNote({title: "", describtion:"", tag:""})
    }
    const onchange = (e) => {
        setNote({...note , [e.target.name]: e.target.value})
    }
  
    return (
        <div className="container">
            <h1>Add Your note</h1>
            <form className="container">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Note Titile</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onchange} monLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="describtion" className="form-label">Your Note Discription</label>
                    <input type="text" className="form-control" id="describtion" name="describtion" value={note.describtion} onChange={onchange} monLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Your Note tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange}/>
                </div>
                <button disabled={note.title.length<5 || note.describtion.length<5 } type="button" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default Addnote
