export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SET_FILTER = 'SET_FILTER'
export const SET_THEME= 'SET_THEME'

const initialState = {
  isLoading: false,
  filter: { keyword: '' },
  appTheme: 'light'
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case SET_FILTER:
      return { ...state, filter: action.filter }
    default: return state
    case SET_THEME:
      return { ...state, appTheme: action.theme }
  }
}
