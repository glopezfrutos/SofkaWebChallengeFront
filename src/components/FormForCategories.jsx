import React, { useState, useContext, useRef } from 'react'
import { Store } from './StoreProvider';

const FormForCategories = () => {
  const formRef = useRef(null)

  const onAdd = async (event) => {
    event.preventDefault();
    if (category) {
      const categoryFromForm = {category}

      let categorySavedPromise = await fetch(`http://localhost:8081/api/save/category`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(categoryFromForm)
      })

      let categorySaved = await categorySavedPromise.json();
      console.log(categorySaved)

      dispatch({
        type: 'add-category',
        payload: categorySaved
      })
      
      formRef.current.reset();
    }
  }

  const{state, dispatch} = useContext(Store)

  const [category, setCategory] = useState('');

  const addingCategory = (e) => {
    setCategory(e.target.value)
  }

  return (
    <form ref={formRef}>
        <label className="form-label"></label>
        <input onChange={addingCategory} type="text" name="category" id="category" required />
        <button type="submit" className="btn btn-primary" onClick={onAdd}>New List</button>
    </form>
  )
}

export default FormForCategories