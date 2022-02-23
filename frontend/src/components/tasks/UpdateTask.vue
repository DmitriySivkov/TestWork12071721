<template>
  <q-page class="column q-mt-xl">
    <div class="row justify-center">
      <div class="col-xs-12 col-md-6 col-lg-3">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="title"
            :value="task.title"
            label="Title *"
            hint="Fill the title"
            lazy-rules
            :rules="[
              val => val && val.length > 0 || 'The title cannot be empty',
              val => val.length < 255 || 'The title is too long'
            ]"
          />

          <q-input
            filled
            type="textarea"
            v-model="description"
            :value="task.description"
            label="Description *"
            hint="Fill the description"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'The description cannot be empty']"
          />

          <div>
            <q-btn label="Confirm" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useStore } from "vuex"
import {computed, ref} from "vue"
import { useRouter } from "vue-router"
import {Notify} from "quasar";
export default {
  setup() {
    const $store = useStore()
    const $router = useRouter()

    const task = computed(
      () => $store.state.task.data.find(
        (task) => task.id == $router.currentRoute.value.params.id
      ))

    const title = ref(task.value.title)
    const description = ref(task.value.description)

    return {
      task,
      title,
      description,

      onSubmit() {
        $store.dispatch("task/updateTask", {
          id: task.value.id,
          title: title.value,
          description: description.value,
        }).then(() => {
          Notify.create({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "The task is successfully updated"
          })
          $router.push("/")
        })
      },

      onReset () {
        title.value = task.value.title
        description.value = task.value.description
      },
    }
  }
}
</script>
