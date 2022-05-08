import './App.css'
import ListOfCategories from './components/ListOfCategories'
import StoreProvider from './components/StoreProvider'
import FormForCategories from './components/FormForCategories'

function App() {

  return (
    <div className="p-5">
      <h1>To-do List App</h1>
      <StoreProvider>
        <ListOfCategories />
        <FormForCategories />
      </StoreProvider>
    </div>
  )
}

export default App
