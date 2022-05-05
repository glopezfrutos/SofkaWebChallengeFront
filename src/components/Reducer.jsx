function reducer(state, action){
    switch(action.type){
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