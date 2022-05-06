import React, { useState, useContext, useRef } from 'react'
import { Store } from './StoreProvider';

const Form = () => {
  const formRef = useRef(null)

  const onAdd = async (event) => {
    event.preventDefault();
    if (title && message) {
      const noteFromForm = {
        title,
        done: false
      }

      let noteSavedPromise = await fetch(`http://localhost:8081/api/save/category`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(noteFromForm)
      })

      let noteSaved = await noteSavedPromise.json();
      console.log(noteSaved);

      dispatch({
        type: 'add-note',
        payload: noteSaved
      })

      formRef.current.reset();
    }
  }

  const { state, dispatch } = useContext(Store)

  const [title, setTitle] = useState('');

  const addingTitle = (e) => {
    setTitle(e.target.value)
  }


  return (
    <form ref={formRef}>
      <label className="form-label">Title: </label>
      <input onChange={addingTitle} type="text" name="title" />
      <button type="submit" className="btn btn-primary" onClick={onAdd}>Add note</button>
    </form>
  )
}

export default Form