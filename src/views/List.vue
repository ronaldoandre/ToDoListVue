<template>
  <div class="container mt-2">
    <template v-if="isTasksEmpty"> 
      <div class="empty-data mt-2">
        <img src="../assets/images/empty-data.svg" class="empty-data-image">
        <b-button 
          variant="outline-primary" 
          class="mt-2" 
          size="lg"
          to="/form"
        > Criar tarefa </b-button>
      </div>  
    </template>
    <template v-else>
      <div v-for="(task,id) in tasks" :key="id">
        <b-card :title="task.titulo" class="mb-2">
          <b-card-text>{{ task.descricao }}</b-card-text>

          <b-button
            variant="outline-secondary"
            class="mr-2"
            @click="edit(id)"
          >
            Editar
          </b-button>
          <b-button
            variant="outline-danger"
            class="mr-2"
            @click="remove(task,id)"
          >
            Excluir
          </b-button>
        </b-card>
      </div>
    </template>

    <b-modal ref="modalRemove" hide-footer title="Exclusão de tarefa">
      <div class="d-block text-center">
        Deseja realmente excluir essa tarefa? {{ taskSelected.titulo }}
      </div>
      <div class="mt-3 d-flex justify-content-end">
        <b-button variant="outline-secondary" class="mr-2" @click="hideModal">
          Cancelar
        </b-button>
        <b-button
          variant="outline-danger"
          class="mr-2"
          @click="confirmRemoveTask"
        >
          Excluir
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import api from '../models/api'
export default {
  name: "List",
  data() {
    return {
      key: localStorage.getItem('token'),
      tasks: [],
      taskSelected: [],
      idTask: null
    };
  },
  mounted() {
  },

  created() {
    var tarefas = [];
    api.get('ToDos/User',{headers: {Authorization: "Bearer " + this.key}}).then(res => 
     tarefas.push(...res.data))
      .catch(err => {console.log(err)})
    this.tasks = tarefas;
  },


  methods: {
    edit(toDoId) {
      this.$router.push({ name: "form", params: { toDoId } });
    },

    remove(task,id) {
      this.taskSelected = task;
      this.taskSelected.toDoId = task.toDoId;
      this.idTask = id
      this.$refs.modalRemove.show();
    },

    hideModal() {
      this.$refs.modalRemove.hide();
    },

    confirmRemoveTask() {
      this.tasks.splice(this.idTask,1);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      api.delete(`ToDos/Delete/${this.taskSelected.toDoId}`,{headers:{Authorization: "Bearer " + this.key}});
      this.hideModal();
    },
  },

  computed: {
    isTasksEmpty() {
      return this.tasks.length === 0;
    },
  },
};
</script>

<style scoped>
.empty-data {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.empty-data-image {
  width: 300px;
  height: 300px;
}
</style>