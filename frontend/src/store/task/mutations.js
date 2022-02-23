export const SET_TASKS = (state, payload) => {
  state.data = payload
}

export const ADD_TASK = (state, payload) => {
  state.data.unshift(payload)
}

export const UPDATE_TASK = (state, payload) => {
  let taskIndex = state.data.findIndex((task) => task.id == payload.id)
  state.data[taskIndex] = payload
}

export const DELETE_TASK = (state, id) => {
  state.data = state.data.filter((task) => task.id != id)
}
