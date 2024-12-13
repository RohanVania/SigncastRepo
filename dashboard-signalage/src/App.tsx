import { Link } from 'react-router-dom'
import './App.css'

function App() {



  return (
    <>
      <div className='text-3xl font-bold underline '>
        Home Page
        <button>
          <Link to={'/dashboard'}>
              Dashboard
          </Link>
        </button>
      </div>
    
    </>
  )
}

export default App
