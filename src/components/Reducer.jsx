function reducer(state, action){
    switch(action.type){
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
            const newStateWithNoteDeleted2 = {...state, listOfCategories: newListOfNotesWithoutPayloadNote2}
            return newStateWithNoteDeleted2
        case 'update-category':
            const newListOfNotes2 = state.listOfCategories.map(note => {
                if(note.id == action.payload.id){
                    return action.payload
                }
                return note
                })
            const newStateModifiedCheckbox2 = {...state, listOfCategories: newListOfNotes2}
            return newStateModifiedCheckbox2
        
            case 'get-notes':
                const stateWithAllTheNotes = {
                    ...state,
                    listOfNotes: action.payload
                }
                return stateWithAllTheNotes
            case 'add-note':
                console.log(action.payload)
                const newNote = action.payload;
                const newListOfNotesAddedOne = [...state.listOfNotes, newNote]
                const newStateAddedNote = {
                    ...state, listOfNotes: newListOfNotesAddedOne
                }
                return newStateAddedNote
            case 'remove-note':
                const newListOfNotesWithoutPayloadNote = state.listOfNotes.filter(note => note.id !== action.payload.id)
                const newStateWithNoteDeleted = {...state, listOfNotes: newListOfNotesWithoutPayloadNote}
                return newStateWithNoteDeleted
            case 'update-note':
                const newListOfNotes = state.listOfNotes.map(note => {
                    if(note.id == action.payload.id){
                        return action.payload
                    }
                    return note
                    })
                const newStateModifiedCheckbox = {...state, listOfNotes: newListOfNotes}
                return newStateModifiedCheckbox
    }
}

export default reducer