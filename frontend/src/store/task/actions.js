import { api } from "boot/axios"

export const getList = async ({commit}) => {
  await api.get("tasks").then((response) => {
    commit("SET_TASKS", response.data)
  })
}

export const addTask = async ({commit}, payload) => {
  await api.post("tasks", { ...payload }).then((response) => {
    commit("ADD_TASK", response.data)
  })
}

export const updateTask = async ({commit}, payload) => {
  await api.put("tasks/" + payload.id, { ...payload }).then((response) => {
    commit("UPDATE_TASK", response.data)
  })
}

export const deleteTask = async ({commit}, payload) => {
  await api.delete("tasks/" + payload.id).then(() => {
    commit("DELETE_TASK", payload.id)
  })
}
