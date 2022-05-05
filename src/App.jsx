import './App.css'
import ListOfToDo from './components/ListOfToDo'
import StoreProvider from './components/StoreProvider'
import Form from './components/Form'

function App() {

  return (
    
      <StoreProvider>
        <h1>Hello from my app</h1>
        <Form />
        <ListOfToDo />
      </StoreProvider>
    
  )
}

export default App
