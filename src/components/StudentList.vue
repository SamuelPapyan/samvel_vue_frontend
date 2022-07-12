<template>
  <div id="students-list-body">
    <h1>Students List</h1>
    <SearchField/>
    <StudentTable :data=this.data :connected=connected :dataUpdated=dataUpdated :updateCallback=updateCallback />
      <router-link to="/create" class="btn btn-primary">Create</router-link>
  </div>
</template>

<script>
import SearchField from "@/components/SearchField";
import StudentTable from "@/components/StudentTable";
import {getAllStudents} from "@/api/students.js";

export default {
  name: 'StudentList',
  components: {StudentTable, SearchField},
  mounted() {
    document.title = "Students List";
    getAllStudents().then(res=>{
      this.updateCallback(false);
      if(res.success){
        this.setData(res.data)
      }
    }).catch(()=>{
        this.setConnected(false);
    });
  },
  data(){
    return {
      data:null,
      connected:true,
      dataUpdated:true
    }
  },
  methods:{
    setData(data){
      this.data = data;
    },
    updateCallback(update){
      this.dataUpdated = update;
    },
    setConnected(isConnected){
      this.connected = isConnected;
    }
  }
}
</script>