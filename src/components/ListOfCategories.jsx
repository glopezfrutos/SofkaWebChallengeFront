import React, { useContext, useEffect } from 'react'
import { Store } from './StoreProvider'
import ListOfToDo from './ListOfToDo'
import Form from './Form'

const ListOfCategories = () => {

    const { state, dispatch } = useContext(Store)

    const fetchAllNotes = async () => {
        let response = await fetch(`http://localhost:8081/api/get`)
        let data = await response.json()
        return data
    }

    useEffect(() => {
        let listOfCategories = fetchAllNotes().then(
            notes => {
                let action = {
                    type: 'get-categories',
                    payload: notes
                }
                dispatch(action)
            }
        )

    }, [])

    const onEdit = async (event, note) => {
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
            type: 'update-category',
            payload: noteUpdated
        })
    }

    const onDelete = async (category) => {
        let response = await fetch(`http://localhost:8081/api/delete/category/${category.id}`,
            {
                method: 'DELETE'
            })
        if (response.status === 200) {
            dispatch({
                type: 'remove-category',
                payload: category
            })
        }
    }

    return (
        <div>
            {state.listOfCategories.map(element => {
                return <div className="card" key={element.id}>
                    <h3 className="card-title">{element.category}
                        <button className="btn btn-primary" onClick={() => onEdit(element)}><i className="fa-solid fa-pen-to-square"></i></button>
                        <button className="btn btn-danger" onClick={() => onDelete(element)}><i className="fa-solid fa-trash"></i></button>
                    </h3>
                    <div className="card-body">
                        {/* <Form /> */}
                        <ListOfToDo notes={element.notes} />
                    </div>
                </div>
            })}
        </div>
    )
}

export default ListOfCategories