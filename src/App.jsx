import './App.css'
import ListOfCategories from './components/ListOfCategories'
import StoreProvider from './components/StoreProvider'
import FormForCategories from './components/FormForCategories'

function App() {

  return (
    <div className="card">
      <StoreProvider>
        <div className="card-body">
          <h1 className="card-title">To-do List App</h1>
          <div>
            <ListOfCategories />
            <FormForCategories />
          </div>
        </div>
      </StoreProvider>
    </div>
  )
}

export default App
