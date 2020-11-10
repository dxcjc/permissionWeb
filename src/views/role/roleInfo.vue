<template>
  <div class="app-container">
    <el-table
      :data="rolesList"
      style="width: 100%"
      v-auth="'roleInfo:roleInfo'">
      <el-table-column
        prop="id"
        label="角色id">
      </el-table-column>
      <el-table-column
        prop="rname"
        label="角色名">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button type="primary" icon="el-icon-edit" @click="edit(row.id)" v-auth="'roleInfo:edit'"></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteRole(row.id)" v-auth="'roleInfo:delete'"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="添加权限"
      :visible.sync="dialogVisible"
    >
      <el-tree ref="tree"
               :data="routes"
               show-checkbox
               node-key="id"
               :default-expanded-keys="checkedKeys"
               :default-checked-keys="checkedKeys"
               :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePermission()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

import {edit, getRoles, getAllRoute, deleteRoute, updatePermission} from '@/api/router'
import {deleteRoleOnUser, deleteRoleOnPermission, deleteRoleByRid} from '@/api/role'

export default {
  data() {
    return {
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      checkedKeys: [],
      currentRoleId: 0,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {},
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

    async edit(id) {
      this.dialogVisible = true
      this.currentRoleId = id
      let {data} = await edit({id,roles:this.$store.getters.roles})
      this.checkedKeys = data.info
      this.routes = data.routes
      console.log(this.checkedKeys);
    },

    async updatePermission() {
      let list = this.$refs.tree.getCheckedKeys()
      list = list.concat(this.$refs.tree.getHalfCheckedKeys())
      console.log(list);
      await updatePermission({rid: this.currentRoleId, list})
      this.dialogVisible = false
    },

    async deleteRole(rid) {
      let {data} = await deleteRoleByRid(rid)
      await this.getRoles()
      console.log(rid);
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }

  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
