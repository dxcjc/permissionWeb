<template>
  <div class="app-container">
    <el-table :data="list" fit highlight-current-row style="width: 100%"  v-auth="'user:userInfo'">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column align="center" label="ID" prop="uid">
        <template slot-scope="{row}">
        <span>
          {{row.uid}}
        </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="username" prop="username"/>


      <el-table-column label="角色">
        <template slot-scope="{row}">
        <span
          v-for="(role ,index) in row.roles"
          :key="index"> {{role.rname}}
        </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions">
        <template slot-scope="{row}">
          <el-button
            type="success"
            size="small"
            icon="el-icon-edit"
            @click="getInfoByUid(row.uid)"
            v-auth="'user:edit'"
          >
            edit
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-delete"
            @click="deleteUser(row.uid)"
            v-auth="'user:delete'"
          >
            dele
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色">
          <el-checkbox-group v-model="form.roles" true-label>
            <el-checkbox v-for="(role,index) in rolesList" :label="role.rid" :key="index">{{role.rname}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit(form.uid,form.roles)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {fetchList, getInfoByUid, edit, deleteByUid, deleteUser} from '@/api/article'
import {getAllRoles} from '@/api/router'
import store from "@/store";
import router from "@/router";

export default {
  name: 'Info',
  data() {
    return {
      list: [],
      rolesList: [],

      dialogFormVisible: false,
      form: {
        uid: '',
        username: '',
        roles: [],
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      let {data} = await fetchList()
      this.list = data
      data = await getAllRoles()
      this.rolesList = data.data
    },
    async getInfoByUid(uid) {
      this.dialogFormVisible = true
      const data = await getInfoByUid(uid)
      if (data.code === 0 && data.data !== []) {
        this.form.uid = data.data[0].uid
        this.form.username = data.data[0].username
        this.form.roles = data.data[0].roles.map(item => {return item['rid']})
      }
    },
    async edit(uid, roleList) {
      await edit({uid, roleList})
      await this.getList()
      this.dialogFormVisible = false
      // location.reload()
    },
    async deleteUser(uid) {
      await deleteUser(uid)
      await this.getList()

    }


  }
}
</script>

<style scoped>
@import "index.less";
</style>
