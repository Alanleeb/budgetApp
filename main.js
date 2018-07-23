//Action creators
const ADD_ENTRY = 'ADD_ENTRY'
const REMOVE_ENTRY = 'REMOVE_ENTRY'

//Actions
const addEntry = (entry) => {
  return { type: ADD_ENTRY, entry }
}

const removeEntry = (index) => {
  return { type: REMOVE_ENTRY, index }
}

const ledger = ( state = [], action ) => {
  switch (action.type) {
    case ADD_ENTRY:
      return [...state, action.entry]
    case REMOVE_ENTRY:
      return state.filter( (_, i) => i !== action.index )
    default:
      return state
  }
}

// store config
const { createStore, combineReducers, compose } = Redux

const rootReducer = combineReducers({
  ledger,
})

const store = createStore(
  rootReducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

//functions
const updateHistory = () => {
  const list = document.getElementById('history')
  const entries = store.getState().ledger
  list.innerHTML = null
  entries.forEach( (entry, index) => {
    const item = document.createElement('li')
    const span = document.createElement('span')
    const button = document.createElement('button')
    span.innerHTML = `$${entry.amt} - ${entry.description}`
    button.addEventListener('click', () => store.dispatch(removeEntry(index)) )
    button.innerText = 'Remove'
    span.appendChild(button)
    item.appendChild(span)
    item.className = entry.type
    list.append(item)
  })
}

const handleSubmit = (e) => {
  e.preventDefault()
  const form = e.target
  let obj = {}
  for( let el of form.elements ) {
    if (el.name)
      obj[el.name] = encodeURIComponent(el.value)
  }

  store.dispatch(addEntry(obj))
  form.reset()
}

const log = () => {
  console.log(store.getState().ledger)
}

const sumEntries = () => {
  let h1 = document.getElementById('total')
  h1.innerHTML = null
  const { ledger } = store.getState()
  let total = ledger.reduce( (total, entry) => {
    const amt = parseFloat(entry.amt)
    if (entry.type === 'Credit')
      return total + amt
    return total - amt
  }, 0)

  h1.innerHTML = `$${total}`
}


//Listners
document.getElementById('add_entry').addEventListener('submit', handleSubmit)


//Code that has no other place
store.subscribe(updateHistory)
store.subscribe(log)
store.subscribe(sumEntries)