<template>
  <el-form>
    <el-form-item label="旧密码">
      <el-input type="password" v-model.trim="inputOldPassword" />
    </el-form-item>
    <el-form-item label="新密码">
      <el-input type="password" v-model.trim="inputPassword" />
    </el-form-item>
     <el-form-item label="确认密码">
      <el-input type="password" v-model.trim="inputPassword_again" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {changePwd} from '@/api/user'
import Verify from '@/utils/verify'
import md5 from 'md5'

export default {
  data() {
    return{
        inputOldPassword:'',
        inputPassword:'',
        inputPassword_again:''
    }
   
  },
  methods: {
    verifyPassword() {
      if(this.inputOldPassword === '' || this.inputPassword === '' || this.inputPassword_again === ''){
       this.$message({message: '密码不能为空',})
      }else if(Verify.checkPassWord(this.inputPassword)){
        this.$message({message: '密码格式不正确',})
      
      }else if(this.inputPassword != this.inputPassword_again){
         this.$message({message:"两次密码不一致"})
      }else {
        return true
      }
      return false
    },
    
    async submit() {
      // 校验密码是否一致
      if(this.verifyPassword()){
      let name = this.$store.getters.name
      let resData =  await changePwd({
        name,
        oldPassword:md5(this.inputOldPassword),
        password: md5(this.inputPassword_again)
      })
      }
    }
  }
}
</script>
