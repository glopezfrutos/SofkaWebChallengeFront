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

        case 'update-category', 'add-note':
            const newListOfCategoriesUpdated = state.listOfCategories.map(
                category => {
                    if (category.id == action.payload.id) {
                        return action.payload
                    }
                    return category
                })
            return { ...state, listOfCategories: newListOfCategoriesUpdated }


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