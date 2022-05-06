function reducer(state, action) {
    switch (action.type) {
        case 'get-categories':
            const stateWithAllCategories = {
                ...state,
                listOfCategories: action.payload
            }
            return stateWithAllCategories

        case 'add-category':
            const newCategory = action.payload;
            const newListOfCategories = [...state.listOfCategories, newCategory]
            return { ...state, listOfCategories: newListOfCategories }

        case 'remove-category':
            const newListOfCategoriesOneDeleted = state.listOfCategories.filter(
                category => category.id !== action.payload.id
            )
            return { ...state, listOfCategories: newListOfCategoriesOneDeleted }

        case 'update-category':
            const newListOfCategoriesUpdated = state.listOfCategories.map(
                category => {
                    if (category.id == action.payload.id) {
                        return action.payload
                    }
                    return category
                })
            return { ...state, listOfCategories: newListOfCategoriesUpdated }


        case 'add-note':
            /* Doesn't work 
            const newCategory = action.payload;
            const newListOfCategories = [...state.listOfCategories, newCategory]
            return { ...state, listOfCategories: newListOfCategories }
            
            */

            const newNote = action.payload
            const newListOfNotesAddedOne = state.listOfCategories.map(category => {
                if (category.id == newNote.fkCategoryId) {
                    let subList = { ...category.notes, newNote }
                    return { ...category, notes: subList }
                }
                return { ...category }
            })
            console.log({...state, listOfCategories: newListOfNotesAddedOne })
            console.log(newListOfNotesAddedOne)
            return { ...state, listOfCategories: newListOfNotesAddedOne }


        case 'remove-note':
            const newListOfNotesWithoutPayloadNote = state.listOfCategories.map(category => {
                const newSubListDelete = category.notes.filter(note => note.id !== action.payload.id)
                return { ...category, notes: newSubListDelete }
            })
            return { ...state, listOfCategories: newListOfNotesWithoutPayloadNote }

        case 'update-note':
            const newListOfNotes = state.listOfCategories.map(category => {
                const subList = category.notes.map(note => {
                    if (note.id == action.payload.id) {
                        return action.payload
                    }
                    return note
                })
                return { ...category, notes: subList }
            })
            return { ...state, listOfCategories: newListOfNotes }
    }
}

export default reducer