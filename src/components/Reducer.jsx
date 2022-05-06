function reducer(state, action) {
    switch (action.type) {
        case 'get-categories':
            const stateWithAllTheNotes2 = {
                ...state,
                listOfCategories: action.payload
            }
            return stateWithAllTheNotes2
        case 'add-category':
            const newCat = action.payload;
            const newListOfCategoriesAddedOne = [...state.listOfCategories, newCat]
            const newStateAddedCategory = {
                ...state, listOfCategories: newListOfCategoriesAddedOne
            }
            return newStateAddedCategory
        case 'remove-category':
            const newListOfNotesWithoutPayloadNote2 = state.listOfCategories.filter(note => note.id !== action.payload.id)
            const newStateWithNoteDeleted2 = { ...state, listOfCategories: newListOfNotesWithoutPayloadNote2 }
            return newStateWithNoteDeleted2
        case 'update-category':
            const newListOfNotes2 = state.listOfCategories.map(note => {
                if (note.id == action.payload.id) {
                    return action.payload
                }
                return note
            })
            const newStateModifiedCheckbox2 = { ...state, listOfCategories: newListOfNotes2 }
            return newStateModifiedCheckbox2

        case 'add-note':
            /* Doesn't work */

            const newNote = action.payload
            const newListOfNotesAddedOne = state.listOfCategories.map(category => {
                if (category.id == newNote.fkCategoryId) {
                    let subList = {...category.notes, newNote}
                    return {...category, notes: subList}
                }
                return {...category}
            })
            console.log(newListOfNotesAddedOne);
            console.log(state.listOfCategories);
            return { ...state, listOfCategories: newListOfNotesAddedOne }


        case 'remove-note':
            const newListOfNotesWithoutPayloadNote = state.listOfCategories.map(category => {
                const newSubListDelete = category.notes.filter(note => note.id !== action.payload.id)
                return {...category, notes: newSubListDelete }
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