import React, { createContext, useReducer } from 'react'
import reducer from './Reducer'

const initialState = {
    category: {
        id: "",
        category: "",
        notes: [{
            id: "",
            note: "",
            done: "",
            fkCategoryId: ""
        }]
    },
    listOfCategories: []
}

const Store = createContext(initialState)

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <Store.Provider value={{ state, dispatch }}>
            {children}
        </Store.Provider>
    )
}

export default StoreProvider
export { Store, initialState }