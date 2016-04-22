const LOAD = 'devops/hosts/LOAD';
const LOAD_SUCCESS = 'devops/hosts/LOAD_SUCCESS';
const LOAD_FAIL = 'devops/hosts/LOAD_FAIL';
const EDIT_START = 'devops/hosts/EDIT_START';
const EDIT_STOP = 'devops/hosts/EDIT_STOP';
const SAVE = 'devops/hosts/SAVE';
const SAVE_SUCCESS = 'devops/hosts/SAVE_SUCCESS';
const SAVE_FAIL = 'devops/hosts/SAVE_FAIL';

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
  return globalState.hosts && globalState.hosts.loaded;
}

export function loadDjangoUsers() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api_hosts/Django__Users/') // params not used, just shown as demonstration
  };
}

export function loadDjangoGroups() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api_hosts/Django__Groups/') // params not used, just shown as demonstration
  };
}

export function loadDjangoHost() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api_hosts/Django__Host/') // params not used, just shown as demonstration
  };
}

export function bindHostToUser() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api_hosts/Bind_Host_To_User/') // params not used, just shown as demonstration
  };
}

export function loadNetworkDevice() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api_hosts/Network_Device/') // params not used, just shown as demonstration
  };
}

export function loadNetworkDeviceGroup() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api_hosts/Network_Device_Group/') // params not used, just shown as demonstration
  };
}

export function bindNetworkToUser() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api_hosts/Bind_Network_To_User/') // params not used, just shown as demonstration
  };
}

export function loadIDC() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api_hosts/IDC/') // params not used, just shown as demonstration
  };
}

export function loadRemoteHostUser() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api_hosts/Remote_Host_User/') // params not used, just shown as demonstration
  };
}

export function loadTaskLog() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api_hosts/Task_Log/') // params not used, just shown as demonstration
  };
}

export function loadTaskLogDetail() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api_hosts/Task_Log_Detail/') // params not used, just shown as demonstration
  };
}

export function save(hosts) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: hosts.id,
    promise: (client) => client.post('/api_assets/update/', {
      data: hosts
    })
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
