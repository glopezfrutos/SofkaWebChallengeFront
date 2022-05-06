import './App.css'
import ListOfToDo from './components/ListOfCategories'
import StoreProvider from './components/StoreProvider'
import Form from './components/Form'
import ListOfCategories from './components/ListOfCategories'

function App() {

  return (
    <div className="card">
      <StoreProvider>
        <div className="card-body">
          <h1 className="card-title">To-do List App</h1>
          <div>
          <Form />
          <ListOfToDo />
          </div>
        </div>
      </StoreProvider>
    </div>
  )
}

export default App
