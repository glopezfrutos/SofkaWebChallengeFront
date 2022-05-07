import React, { useState, useContext, useRef } from 'react'
import { Store } from './StoreProvider';

const FormForTasks = ({ categoryId }) => {
  const formRef = useRef(null)

  const onAdd = async (event) => {
    event.preventDefault();
    if (note) {
      const noteFromForm = {
        note,
        done: false,
        fkCategoryId: categoryId
      }

      let noteSavedPromise = await fetch(`http://localhost:8081/api/save/note`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(noteFromForm)
      })

      let noteSaved = await noteSavedPromise.json();

      dispatch({
        type: 'add-note',
        payload: noteSaved
      })

      formRef.current.reset();
    }
  }

  const { state, dispatch } = useContext(Store)

  const [note, setNote] = useState('');

  const addingNote = (e) => {
    setNote(e.target.value)
  }


  return (
    <div className='container'>
      <form ref={formRef}>
        <div className="row p-1">
          <div className="col-6 offset-2">
            <input onChange={addingNote} className='form-control' type="text" name="note" />
          </div>
          <button type="submit" className="col-4 btn btn-primary" onClick={onAdd}>Add note</button>
        </div>
      </form>
    </div>
  )
}

export default FormForTasks