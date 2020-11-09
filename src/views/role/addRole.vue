<template>
  <el-form ref="form"  :model="role" label-width="30%" v-auth="'addRole:roleForm'">
    <el-form-item label="角色名">
      <el-input v-model="role.rname"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addRole" v-auth="'addRole:add'">立即添加</el-button>
    </el-form-item>




    </el-form>
</template>

<script>
import { addRole } from '@/api/role'
export default {
  name: "addRole",
  data() {
    return {
      role:{}
    }
  },
  methods: {
    async addRole() {
      let rname = this.role.rname
      let {code} = await addRole({rname})
      if (code === 0) {
        confirm('添加成功')
        this.$router.push('/role/roleInfo')
      }if(code === 500) {
        confirm('添加失败')
      }
    }

  }
}
</script>

<style scoped>

</style>
