import { createGlobalState } from 'react-hooks-global-state'

export let{ getGlobalState, setGlobalState } = createGlobalState({
  auth: {},
  loading: false
})
