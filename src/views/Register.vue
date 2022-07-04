<template>
  <b-row class="vh-100 vw-100 row-login">
    <b-col
      sm="7"
      class="side-login d-flex justify-content-center align-items-center"
    >
      <img src="../assets/images/register.svg" class="img-register" />
    </b-col>
    <b-col
      sm="5"
      class="d-flex justify-content-center align-items-center right-register"
    >
      <div class="col-8">
        <h2 class="text-center mb-5 title-login">Faça o seu cadastro</h2>
        <b-form>
          <b-form-group label="Nome Completo" label-for="name">
            <b-form-input
              id="name"
              type="text"
              placeholder="João Silva"
              autocomplete="off"
              v-model="form.FullName"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="E-mail" label-for="email">
            <b-form-input
              id="email"
              type="email"
              placeholder="joaosilva@email.com"
              autocomplete="off"
              v-model="form.Email"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Senha" label-for="password">
            <b-form-input
              id="password"
              type="password"
              placeholder="Digite aqui a sua senha"
              v-model="form.Password"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Confirme sua senha" label-for="confirmPassword">
            <b-form-input
              id="confirmPassword"
              type="password"
              placeholder="Confirme sua senha"
              v-model="form.ConfirmPassword"
            ></b-form-input>
          </b-form-group>
          <p/>

          <b-button class="col-12" type="button" variant="primary" block @click="register"
            ><i class="fas fa-sign-in-alt"></i> Cadastrar</b-button
          >

          <hr />

          <b-button
          class="col-12"
            type="button"
            variant="outline-secondary"
            block
            @click="goToLogin"
            ><i class="fas fa-arrow-left"></i> Voltar</b-button
          >
        </b-form>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import api from '../models/api'
export default{

  data() {
    return {
      form: {
        Email: "",
        Password: "",
        FullName: "",
        ConfirmPassword: ""
      }
    }
  },
    methods: {
        login(){
            
        },
        register(){
          if(this.form.Password == this.form.ConfirmPassword){
            api.post('Users/register',this.form)
            .then(res => {
                  localStorage.setItem('token',res.data.accessToken)
                  this.$router.push({ path: 'list' })
            }).catch(err => {console.log(err)})
            console.log(this.form)
          }else{
            alert("As senhas estão diferentes")
          }
        },
        goToLogin(){
          this.$router.push({ path: 'login' })
        }
      }
}
    
</script>

<style>
*,
*:after,
*:before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

.row-login {
  margin-left: 0 !important;
}

.img-register {
  width: 600px;
  height: 600px;
}

.right-register {
  background-color: #f2f2f2;
}

.title-login {
  font-weight: bold;
}
</style>