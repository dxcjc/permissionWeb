<template>
  <div>
    <div v-auth="'boss:table'">
      boss看的表
    </div>
    <div v-auth="'ceo:table'">
      ceo看的表
    </div>
    <div  v-auth="'cfo:table'">
      财务表
    </div>
    <div  v-auth="'hrd:table'">
      hrd看的表
    </div>
    <div v-auth="'cso:table'">
      销售总监看的表
    </div>
    <div  v-auth="'cto:table'">
      技术总监看的表
    </div>
  </div>


</template>

<script>
export default {
  name: "Table"
}
</script>

<style scoped>

</style>
