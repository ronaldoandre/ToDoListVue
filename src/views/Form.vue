<template>
  <div class="container mt-2">
    <b-form>
      <b-form-group label="Titulo" label-for="Titulo">
        <b-form-input
        id="Titulo"
        v-model="form.Titulo"
        type="text"
        placeholder="Ex: lavar carro"
        required
        autocomplete="off"></b-form-input>

        <b-form-group label="Data a ser realizada" label-for="DataTarefa">
        <b-input-group class="mb-3">
          <b-form-input
            id="Data"
            v-model="form.Data"
            type="text"
            placeholder="YYYY-MM-DD"
            autocomplete="off"
            required
          ></b-form-input>
          <b-input-group-append>
            <b-form-datepicker
              v-model="form.Data"
              button-only
              right
              locale="pt-BR"
              aria-controls="Data"
              required
            ></b-form-datepicker>
            </b-input-group-append>

            <b-form-input
            id="Hora"
            v-model="form.Hora"
            type="text"
            placeholder="HH:mm"
            autocomplete="off"
            required
            ></b-form-input>
            <b-input-group-append>
            <b-form-timepicker
              v-model="form.Hora"
              button-only
              right
              locale="pt-BR"
              aria-controls="Hora"
              required
            ></b-form-timepicker>
          </b-input-group-append>

        </b-input-group>

        <b-form-group label="Descrição" label-for="Descricao">
        <b-form-textarea
        id="Descricao"
        v-model="form.Descricao"
        type="text"
        placeholder="Ex: preciso levar o carro para lavar."
        required
        autocomplete="off"></b-form-textarea>
      </b-form-group>
      <b-button type="button" variant="outline-primary" @click="Create"> Salvar </b-button>
      </b-form-group>
      </b-form-group>
    </b-form>

  </div>
</template>

<script>
import api from '../models/api'
export default{
  name: "Form",
  data(){
      return{
        key: localStorage.getItem('token'),
        form:{
          Titulo:"",
          Descricao:"",
          Data:"",
          Hora:"",
        }
      }
  },
  methods: {
    Create(){
        api.post('ToDos/create',this.form,{headers: {Authorization: "Bearer " + this.key}})
        .then(res => res)
        .catch(err => {console.log(err)})
        this.$router.push({ path: 'list' })
    }
  }
}
</script>