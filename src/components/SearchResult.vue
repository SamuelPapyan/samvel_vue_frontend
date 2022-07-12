<template>
  <div id="students-list-body">
    <h1>Search Result</h1>
    <SearchField :search=this.search />
    <StudentTable :data=result :dataUpdated=dataUpdated :updateCallback=updateCallback  :connected=connected />
    <router-link to="/create" class="btn btn-primary">Create</router-link>
  </div>
</template>

<script>
import SearchField from "@/components/SearchField";
import StudentTable from "@/components/StudentTable";
import {searchStudents} from "@/api/students";
export default {
  name: "SearchResult",
  components:{SearchField, StudentTable},
  mounted() {
    document.title = "Search Result";
    this.search(this.$route.query.q);
  },
  data(){
    return {
      result:null,
      connected:true,
      dataUpdated:true
    }
  },
  methods:{
    setData(data){
      this.result = data;
    },
    setConnected(isConnected){
      this.connected = isConnected;
    },
    updateCallback(updated){
      this.dataUpdated = updated;
    },
    search(query){
      searchStudents(query).then(res=>{
        this.updateCallback(false);
        if(res.success){
          this.setData(res.data);
        }
      }).catch(()=>{
        this.setConnected(false);
      });
    }
  }
}
</script>