import React, { useState, useContext, useRef } from 'react'
import { Store } from './StoreProvider';

const FormTaskEdition = ({ actualNote }) => {
  const formRef = useRef(null)

  const onAdd = async (event) => {
    event.preventDefault();
    if (note) {
      const noteFromForm = {
        id: actualNote.id,
        note: note,
        done: actualNote.done,
        fkCategoryId: actualNote.fkCategoryId
      }

      let noteSavedPromise = await fetch(`http://localhost:8081/api/update/note`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(noteFromForm)
      })

      let noteSaved = await noteSavedPromise.json();

      dispatch({
        type: 'update-note',
        payload: noteSaved
      })

      formRef.current.reset();
    }
  }

  const { state, dispatch } = useContext(Store)

  const [note, setNote] = useState('');

  const changingNote = (e) => {
    setNote(e.target.value)
  }


  return (
    <div className='card p-2'>
      <div className='card-title'>
        <h5>Edit note: {actualNote.note}</h5>
      </div>
      <form className="card-body" ref={formRef}>
        <div className="row">
          <div className="col-8">
            <input onChange={changingNote} className='form-control' type="text" name="note" />
          </div>
          <button type="submit" className="col-4 btn btn-primary" onClick={onAdd}><i className="fa-solid fa-check"></i></button>
        </div>
      </form>
    </div>
  )
}

export default FormTaskEdition