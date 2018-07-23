//Action Creators
const ADD_ENTRY = 'ADD_ENTRY'


//Actions
const addEntry = (entry) => {
    return { type: ADD_ENTRY, entry }
}

const ledger = ( state = [], action ) => {
    switch (action.type) {
        case ADD_ENTRY: 
            return [...state, action.entry]
        default:
            return state
    }
}

//Store Config
const { createStore, combineReducers, compose } = Redux

const rootReducer = combineReducers({
    ledger,
})

const store = createStore(
    rootReducer,
    {},
    window.__Redux_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION()
)

//functions
const updateHistory = () => {
    const list = document.getElementById('history')
    const entries = store.getState().ledger
    list.innerHTML = null 
    entries.forEach( (entry) => {
        const item = createElement('li')
        item.innerHTML = `${entry.amt} - ${entry.description}`
        item.className = entry.typelist.append(item)
 })
}

const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    let obj = {}
    for( let el of form.elements ) {
        if (el.name)
        obj[el.name] = encodeURIComponet(el.value)
    }

    store.dispatch(addEntry(obj))
    form.reset()
}

//Listeners
document.getElementById('add_entry').addEventListener('submit', handleSubmit)

//Code that has no place
store.subscribe(updateHistory)