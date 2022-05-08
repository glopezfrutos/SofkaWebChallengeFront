import React, { useState, useContext, useRef } from 'react'
import { Store } from './StoreProvider';

const FormForCategories = () => {
  const formRef = useRef(null)

  const onAdd = async (event) => {
    event.preventDefault();
    if (category) {
      const categoryFromForm = { category }

      let categorySavedPromise = await fetch(`http://localhost:8081/api/save/category`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(categoryFromForm)
      })

      let categorySaved = await categorySavedPromise.json();

      dispatch({
        type: 'add-category',
        payload: categorySaved
      })

      formRef.current.reset();
    }
  }

  const { state, dispatch } = useContext(Store)

  const [category, setCategory] = useState('');

  const addingCategory = (e) => {
    setCategory(e.target.value)
  }

  return (
    <div className='container'>
      <form ref={formRef}>
        <div className="row p-3">
        <label className=" col-sm-2 form-label">New categoy: </label>
          <div className="col-sm-5">
            <input onChange={addingCategory} className='form-control' type="text" name="category" id="category" required />
          </div>
          <button type="submit" className="col-sm-5 btn btn-primary" onClick={onAdd}>Add category list</button>
        </div>
      </form>
    </div>
  )
}

export default FormForCategories