import React, { useContext, useEffect } from 'react'
import { Store } from './StoreProvider'

const ListOfToDo = ({ notes }) => {

    /* const { state, dispatch } = useContext(Store)

    const fetchAllNotes = async () => {
        let response = await fetch(`http://localhost:8081/api/get/notes`)
        let data = await response.json()
        return data
    }

    useEffect(() => {
        let listOfNotes = fetchAllNotes().then(
            notes => {
                let action = {
                    type: 'get-notes',
                    payload: notes
                }
                dispatch(action)
            }
        )

    }, [])

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
        if(response.status === 200){
            dispatch({
                type: 'remove-note',
                payload: note
            })
        }
    } */

    return (
        <div className='container'>
            {notes.map(note => {
                return <div className="row" style={note.done ? { textDecoration: 'line-through' } : {}} key={note.id}>
                    <div className="col-1"><input onChange={(event) => onCheckbox(event, note)} type="checkbox" checked={note.done} /></div>
                    <div className="col-5">{note.note} </div>
                    <div className="col-6">
                        <button className="btn btn-primary" onClick={() => onEdit(element)}><i className="fa-solid fa-pen-to-square"></i> </button>
                        <button className="btn btn-danger" onClick={() => onDelete(element)}><i className="fa-solid fa-trash"></i> </button>
                    </div>
                </div>
            })}
        </div>
    )
}

export default ListOfToDo