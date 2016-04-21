const LOAD = 'devops/cmdb/LOAD';
const LOAD_SUCCESS = 'devops/cmdb/LOAD_SUCCESS';
const LOAD_FAIL = 'devops/cmdb/LOAD_FAIL';
const EDIT_START = 'devops/cmdb/EDIT_START';
const EDIT_STOP = 'devops/cmdb/EDIT_STOP';
const SAVE = 'devops/cmdb/SAVE';
const SAVE_SUCCESS = 'devops/cmdb/SAVE_SUCCESS';
const SAVE_FAIL = 'devops/cmdb/SAVE_FAIL';

const initialState = {
  loaded: false,
  editing: {},
  saveError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.results,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error.detail
      };
    case EDIT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case EDIT_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      const data = [...state.data];
      data[action.result.id - 1] = action.result;
      return {
        ...state,
        data: data,
        editing: {
          ...state.editing,
          [action.id]: false
        },
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.cmdb && globalState.cmdb.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api_assets/App_Assets_Servers/') // params not used, just shown as demonstration
  };
}

export function save(cmdb) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: cmdb.id,
    promise: (client) => client.post('/api_assets/update/', {
      data: cmdb
    })
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
