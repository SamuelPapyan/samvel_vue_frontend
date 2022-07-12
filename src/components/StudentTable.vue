<template>
  <div id="student-table">
    <table class="table">
      <TableHeader/>
      <tbody>
        <tr v-for="item in content" :key="item._id" >
          <StudentRow :data="item"/>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TableHeader from "@/components/TableHeader";
import StudentRow from "@/components/StudentRow";
export default {
  name: "StudentTable",
  components: {TableHeader, StudentRow},
  props:{
    data:[Object,String],
    connected:Boolean,
    dataUpdated: Boolean,
    updateCallback: Function
  },
  updated() {
    if(!this.connected && !this.hasData){
      this.setContentAndHasData([{_id: "xxx", firstName:"Connection Lost. Try Again", noData:true}], true)
    }
    if(this.data && (!this.hasData || !this.dataUpdated)) {
      let myContent;
      if(this.data.length > 0)
        myContent = this.data;
      else
        myContent = [{_id:"xxx", firstName: "There is no students yet", noData:true}]
      this.setContentAndHasData(myContent, true);
      this.updateCallback(true);
    }
  },
  data(){
    return {
      content: [{_id: "...", firstName:"Loading...", noData:true}],
      hasData: false
    }
  },
  methods:{
    setContentAndHasData(content, hasData){
      this.content = content;
      this.hasData = hasData;
    }
  }
}
</script>