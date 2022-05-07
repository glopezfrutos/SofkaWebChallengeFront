import React, { useContext, useState } from 'react'
import FormTaskEdition from './FormTaskEdition'
import { Store } from './StoreProvider'

const ListOfToDo = ({ notes }) => {

    const { state, dispatch } = useContext(Store)

    const onCheckbox = async (event, note) => {
        const checked = event.currentTarget.checked;

        let noteWithCheckboxInformation = {
            ...note,
            done: checked
        }

        let noteUpdatedPromise = await fetch(`http://localhost:8081/api/update/note`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(noteWithCheckboxInformation)
            })

        let noteUpdated = await noteUpdatedPromise.json()
        dispatch({
            type: 'update-note',
            payload: noteUpdated
        })
    }


    const onDelete = async (note) => {
        let response = await fetch(`http://localhost:8081/api/delete/note/${note.id}`,
            {
                method: 'DELETE'
            })
        if (response.status === 200) {
            dispatch({
                type: 'remove-note',
                payload: note
            })
        }
    }

    const [hidden, setHidden] = useState(true);
    const [actualNote, setactualNote] = useState(true);

    return (
        <div className='container'>
            {notes.map(note => {
                return <div className="row p-1" key={note.id}>
                    <div className="col-2"><input onChange={(event) => onCheckbox(event, note)} type="checkbox" checked={note.done} /></div>
                    <div className="col-6" style={note.done ? { textDecoration: 'line-through' } : {}}>{note.note} </div>
                    <div className="col-4">
                        <div className="row">
                            <button className="col btn btn-primary" onClick={() => {
                                setHidden(s => !s);
                                setactualNote(note);
                            }
                            }><i className="fa-solid fa-pen-to-square"></i> </button>
                            <button className="col btn btn-danger" onClick={() => onDelete(note)}><i className="fa-solid fa-trash"></i> </button>
                        </div>
                    </div>
                </div>
            })}
            {!hidden ? <FormTaskEdition actualNote={actualNote} /> : null}
        </div>
    )
}

export default ListOfToDo