<template>
  <q-page class="column q-mt-xl">
    <div class="row justify-center items-end">
      <div class="col-xs-12 col-md-6 text-right">
        <q-btn
          label="New task"
          size="sm"
          color="secondary"
          :to="{ name: 'createTask' }"
        />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-xs-12 col-md-6">
        <q-markup-table
          dark
          class="bg-indigo-8 table_fixed"
        >
          <thead>
            <tr>
              <td class="text-center" style="width:5%">№</td>
              <td class="text-center" style="width:15%">Title</td>
              <td class="text-center">Description</td>
              <td class="text-center" style="width:25%">Action</td>
            </tr>
          </thead>
          <tbody>
          <tr
            v-for="(task, index) in tasks"
            :key="index"
          >
            <td class="text-center">{{ task.id }}</td>
            <td class="td_break-word text-center">{{ task.title }}</td>
            <td class="td_break-word">{{ task.description }}</td>
            <td class="text-center">
              <div class="q-gutter-sm">
                <q-btn
                  label="Update"
                  size="sm"
                  color="info"
                  :to="{ name: 'updateTask', params: { id: task.id } }"
                />
                <q-btn
                  label="Delete"
                  size="sm"
                  color="negative"
                  @click="confirmDelete(task.id)"
                />
              </div>
            </td>
          </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"
import { useQuasar } from "quasar"
export default {
  setup() {
    const $store = useStore()
    const tasks = computed(() => $store.state.task.data)
    const $q = useQuasar()

    if (tasks.value.length < 1)
      $store.dispatch("task/getList")

    return {
      tasks,

      confirmDelete(taskId) {
        $q.dialog({
          title: 'Confirm',
          message: 'Are you sure you want to delete the task ?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          $store.dispatch("task/deleteTask", {
            id: taskId
          }).then(() => {
            $q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "The task is successfully deleted"
            })
          })
        })
      }
    }
  }
};
</script>
