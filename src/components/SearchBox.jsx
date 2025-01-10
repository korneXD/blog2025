import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const SearchBox=({items})=>{
  // note: the id field is mandatory

  const navigate = useNavigate()

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    navigate('/detail/'+item.id)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            styling={{backgroundColor:'#1f1f1f', color:'white',border:'#0f0f0f',lineColor:'#0f0f0f', hoverBackgroundColor:'#0f0f0f'}}
          />
        </div>
      </header>
    </div>
  )
}

export default SearchBox