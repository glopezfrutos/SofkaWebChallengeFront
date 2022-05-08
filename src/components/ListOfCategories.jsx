import React, { useContext, useEffect } from 'react'
import { Store } from './StoreProvider'
import ListOfToDo from './ListOfToDo'
import FormForTasks from './FormForTasks'

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
            {state.listOfCategories.map(category => {
                return <div className="card p-3" key={category.id}>
                    <div className="container">
                        <h3 className="card-title p-2">
                            <div className="row">
                                <div className="col-8">{category.category}</div>
                                <button className="col-4 btn btn-danger" onClick={() => onDelete(category)}><i className="fa-solid fa-trash"></i></button>
                            </div>
                        </h3>
                    </div>
                    <div className="card-body">
                        <ListOfToDo notes={category.notes} />
                        <FormForTasks categoryId={category.id} />
                    </div>
                </div>
            })}
        </div>
    )
}

export default ListOfCategories