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
    <div>
      <div className="modal-header">
        <h5 className="modal-title">Edit note: {actualNote.note}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form ref={formRef}>
          <label className="form-label">New note name: </label>
          <div className='row'>
            <div className="col-8">
              <input onChange={changingNote} className='col-8 form-control' type="text" name="note" />
            </div>
            <button type="submit" className="col-4 btn btn-primary" onClick={onAdd} data-bs-dismiss="modal"><i className="fa-solid fa-check"></i></button>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  )
}

export default FormTaskEdition