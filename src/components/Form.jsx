import React, { useState, useContext, useRef } from 'react'
import { Store } from './StoreProvider';

const Form = ({ categoryId }) => {
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
    <form ref={formRef}>
      <input onChange={addingNote} className='col-4' type="text" name="note" />
      <button type="submit" className="col-2 btn btn-primary" onClick={onAdd}>Add note</button>
    </form>
  )
}

export default Form