<template>
  <div>
<!--    <el-form>-->
<!--      <el-form-item label="页面：">-->
<!--        <el-select v-model="value1" placeholder="请选择">-->
<!--          <el-option-->
<!--            v-for="item in options"-->
<!--            :key="item.value"-->
<!--            :label="item.value"-->
<!--            :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="按钮/权限：">-->
<!--        <el-select v-model="value2" placeholder="请选择" @visible-change="getOperationInfo(value1)">-->
<!--          <el-option-->
<!--            v-for="item in permission"-->
<!--            :key="item.value"-->
<!--            :label="item.description"-->
<!--            :value="item.description">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="活动名称">-->
<!--        描述：-->
<!--      </el-form-item>-->
<!--    </el-form>-->
    <el-tree ref="tree"
             :data="routes"
             show-checkbox
             node-key="pid"
             :default-expanded-keys="checkedKeys"
             :default-checked-keys="checkedKeys"
             :props="defaultProps">
    </el-tree>
  </div>
</template>

<script>
import {getOperation} from "@/api/operation";

export default {
  name: "operation",
  data() {
    return {
      operations: {},
      options: [],
      value1: '',
      permission: [],
      value2:''

    }
  },
  mounted: async function () {
    let {data} = await getOperation()
    this.operations = data
    for (let key in data) {
      this.options.push({value:key})
    }
  },
  methods: {
    getOperationInfo(value) {
      console.log(value);
      if (!value) {
        alert("请先选择页面")
      } else {
        console.log(value);
        this.permission = this.operations[value]
      }
    }
  }
}
</script>

<style scoped>

</style>
