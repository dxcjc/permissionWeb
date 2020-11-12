<template>
  <el-form ref="form" :model="role" label-width="30%" v-auth="'addRole:roleForm'">
    <el-form-item label="角色名">
      <el-input v-model="role.rname"></el-input>
    </el-form-item>
    <el-form-item label="上级领导">
      <el-select v-model="role.fid" filterable  placeholder="请选择">
        <el-option
          v-for="item in rolesList"
          :key="item.id"
          :label="item.rname"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addRole" v-auth="'addRole:add'">立即添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {addRole} from '@/api/role'
import {getRoles} from "@/api/router";

export default {
  name: "addRole",
  data() {
    return {
      role: {},
      rolesList: {}
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoles()
  },
  methods: {
    async getRoles() {
      let roles = this.$store.getters.roles
      const res = await getRoles({roles})
      this.rolesList = res.data
    },
    async addRole() {
      let {code} = await addRole({role: this.role})
      if (code === 0) {
        confirm('添加成功')
        this.$router.push('/role/roleInfo')
      }
      if (code === 500) {
        confirm('添加失败')
      }
    }

  }
}
</script>

<style scoped>

</style>
