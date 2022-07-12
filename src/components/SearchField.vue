<template>
  <div id="search-field">
    <input type="text" id="search-query" ref="searchQueryElem" />
    <button id="search-button" @click="searchEvent" class="btn btn-primary">Search</button>
  </div>
</template>

<script>
export default {
  name:"SearchField",
  methods:{
    searchEvent(){
      this.$router.push({path: '/search', query:{q: this.$refs.searchQueryElem.value}});
      if (window.location.pathname === '/search') {
        this.search(this.$refs.searchQueryElem.value)
      }
    }
  },
  props:{
    search:Function
  },
  mounted(){
    if(this.$route.query.q)
      this.$refs.searchQueryElem.value = this.$route.query.q;
  }
}
</script>
<style scoped>
  #search-query{
    width:500px;
  }
</style>