<template>
  <div id="create-student-body">
    <h1>Edit Student</h1>
    <p>{{connectionErrorMessage}}</p>
    <ul v-for="item in errors" :key="item.key">
      <li>{{item.value.message}}</li>
    </ul>
    <form method="POST" @submit="submitForm">
      <div class="form-group">
        <label for="first-name-field">First Name</label><br/>
        <input class="form-control" id="first-name-field" type="text" name="first-name" ref="firstNameElem" />
      </div>
      <div class="form-group">
        <label for="last-name-field">Last Name</label><br/>
        <input class="form-control" id="last-name-field" type="text" name="last-name" ref="lastNameElem" />
      </div>
      <div class="form-group">
        <label for="username-field">Username</label><br/>
        <input class="form-control" id="username-field" type="text" name="username" ref="userNameElem" />
      </div>
      <div class="form-group">
        <label for="password-field">Password</label><br/>
        <input class="form-control" id="password-field" type="password" name="password" ref="passwordElem" />
      </div>
      <div class="form-group">
        <label for="email-field">Email</label><br/>
        <input class="form-control" id="email-field" type="text" name="email" ref="emailElem" />
      </div>
      <br/>
      <input type="submit" value="Save" class="btn btn-primary"/>
      <router-link to="/" class="btn btn-default">Cancel</router-link>
    </form>
  </div>
</template>

<script>
import {getStudentById} from "@/api/students.js";
import {updateStudent} from "@/api/students.js";

export default {
  name: "EditStudent",
  methods:{
    submitForm(event){
      event.preventDefault();
      const firstName = this.$refs.firstNameElem.value;
      const lastName = this.$refs.lastNameElem.value;
      const username = this.$refs.userNameElem.value;
      const password = this.$refs.passwordElem.value;
      const email = this.$refs.emailElem.value;
      updateStudent(this.$route.params.id, {firstName,lastName,username,password,email}).then(res=>{
        console.log(res);
        if(res.success){
          this.$router.push('/');
        }
        else{
          if(res.validationErrors){
            const listItems = res.validationErrors.map((value, index)=>{
              return {key:index, value: value}
            });
            this.setErrorMessages(listItems);
          }
        }
      }).catch(()=>{
        this.$router.push('/error')
      })
    },
    setErrorMessages(errList){
      this.errors = errList;
    },
    setConnectionErrorMessage(errMessage){
      this.connectionErrorMessage = errMessage;
    }
  },
  mounted() {
    document.title = "Edit Student";
    getStudentById(this.$route.params.id).then(res=>{
      if(res.success){
        this.$refs.firstNameElem.value = res.data.firstName;
        this.$refs.lastNameElem.value = res.data.lastName;
        this.$refs.userNameElem.value = res.data.username;
        this.$refs.passwordElem.value = res.data.password;
        this.$refs.emailElem.value = res.data.email;
      }
    }).catch(()=>{
      this.setConnectionErrorMessage("Connection fault: Try again later.");
    })
  },
  data(){
    return{
      errors:[],
      connectionErrorMessage:""
    }
  }
}
</script>