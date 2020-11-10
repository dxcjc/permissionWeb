<template>
  <div class="app-container">
    <el-table :data="list" fit highlight-current-row style="width: 100%" v-auth="'user:userInfo'">
      <el-table-column
        type="index">
      </el-table-column>

      <el-table-column align="center" label="ID" prop="uid">
        <template slot-scope="{row}">
        <span>
          {{row.id}}
        </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="username" prop="username"/>

      <el-table-column align="center" label="Actions">
        <template slot-scope="{row}">
          <el-button
            type="success"
            size="small"
            icon="el-icon-edit"
            @click="getInfoByUid(row.id)"
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
          >delete
          </el-button>

        </template>
      </el-table-column>

    </el-table>

    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
    >
      <el-tree ref="tree"
               :data="rolesList"
               show-checkbox
               node-key="id"
               check-strictly
               :default-expanded-keys="checkedKeys"
               :default-checked-keys="checkedKeys"
               :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit()">确 定</el-button>
      </span>
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
      checkedKeys: [],
      dialogVisible: false,
      currentUid:0,
      defaultProps: {
        children: 'children',
        label: 'rname'
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
    },
    async getInfoByUid(uid) {
      this.dialogVisible = true
      //1：获取所有的角色树
      //2:获取当前用户角色id
      this.currentUid=uid
      let {data} = await getInfoByUid(uid)
      this.checkedKeys = data.info
      this.rolesList = data.roles

    },
    async edit() {

      let list = this.$refs.tree.getCheckedKeys()
      let uid = this.currentUid
      console.log(uid, list,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      await edit({uid, list})
      // await this.getList()
      this.dialogVisible = false
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
