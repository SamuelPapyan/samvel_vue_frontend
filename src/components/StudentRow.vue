<template>
    <td>{{firstName}}</td>
    <td>{{lastName}}</td>
    <td>{{username}}</td>
    <td>{{password}}</td>
    <td>{{email}}</td>
    <td>
      <router-link v-if="!noData" :to="'/edit/'+studentId" class="btn btn-primary">Edit</router-link>
    </td>
    <td>
      <button v-if="!noData" class="btn btn-danger" @click="removeStudent">
        Delete
      </button>
    </td>
</template>

<script>
import {deleteStudent} from "@/api/students.js";

export default {
  name: "StudentRow",
  props:{
    data:[Object, String]
  },
  data(){
    return {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      studentId:"",
      noData:true
    }
  },
  methods:{
    setRowData(data){
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.username = data.username;
      this.password = data.password;
      this.email = data.email;
      this.studentId = data._id;
      this.noData = data.noData;
    },
    removeStudent(){
      deleteStudent(this.studentId).then(res=>{
        if(res.success)
          window.location.reload()
      }).catch(()=>{
        this.$router.push('/error')
      })
    }
  },
  mounted(){
    this.setRowData(this.data);
  }
}
</script>