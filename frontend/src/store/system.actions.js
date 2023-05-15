import { store } from "./store"
import { SET_FILTER, SET_THEME } from "./system.reducer"

export async function setFilter(filter) {
    try {
        store.dispatch({
            type: SET_FILTER,
            filter
        })
    } catch (err) {
        console.log('Cannot set filter', err)
        throw err
    }
}

export async function setAppTheme(theme) {
    try {
        store.dispatch({
            type: SET_THEME,
            theme
        })
    } catch (err) {
        console.log('Cannot set theme', err)
        throw err
    }
}