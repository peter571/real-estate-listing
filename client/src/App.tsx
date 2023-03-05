import React from 'react'
import NavigationBar from './components/NavigationBar/NavigationBar'
import SearchBar from './components/SearchBar/SearchBar'
import Home from './pages/Home'

function App() {

  return (
    <div className='h-screen px-10'>
      <div className='h-[20%]'>
      <NavigationBar />
      <SearchBar />
      </div>
      <Home />
    </div>
  )
}

export default App
