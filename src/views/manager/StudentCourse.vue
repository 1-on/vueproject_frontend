<template>
  <div>
    <div class="card" style="margin-bottom: 10px">
      <el-input style="width: 200px; margin-right: 10px" v-model="data.name" placeholder="请输入课程名称查询"
                :prefix-icon="Search"/>
      <el-input style="width: 200px; margin-right: 10px" v-model="data.no" placeholder="请输入课程编号查询"
                :prefix-icon="Search"/>
      <el-button style="margin-left: 10px" type="primary" @click="load">查询</el-button>
      <el-button type="info" @click="reset">重置</el-button>
    </div>

    <div class="card" style="margin-bottom: 10px">

      <div>
        <el-table :data="data.tableData" style="width: 100%">
          <el-table-column prop="id" label="序号" width="100"/>
          <el-table-column prop="name" label="课程名称"/>
          <el-table-column prop="no" label="课程编号"/>
          <el-table-column prop="studentName" label="学生名称"/>
          <el-table-column label="操作" width="180px">
            <template #default="scope">
              <el-button type="primary" @click="del(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="card">
      <el-pagination v-model:current-page="data.pageNum" v-model:page-size="data.pageSize" background
                     @current-change="handeCurrentChange"
                     layout="prev, pager, next" :total="data.total"/>
    </div>


  </div>
</template>

<script setup>

import {reactive} from "vue";
import {Search} from "@element-plus/icons-vue";
import request from "@/utils/request";
import {ElMessage, ElMessageBox} from "element-plus";

const data = reactive({
  name: '',
  tableData: [],
  total: 0,
  pageNum: 1,  // 当前页面
  pageSize: 5,  // 每页个数
  no: '',
  user: JSON.parse(localStorage.getItem("student-user") || "{}"),
})


const load = () => {
  let params = {
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    name: data.name,
    no: data.no,
  }
  if (data.user.role === 'STUDENT') {  // 学生登录 查询自己的选课记录
    params.studentId = data.user.id
  }
  request.get('/studentCourse/selectPage', {
    params: params
  }).then(res => {
    data.tableData = res.data?.list || []
    data.total = res.data?.total || 0
  })
}
const handeCurrentChange = (pageNum) => {
  load()
}
const reset = () => {
  data.name = ''
  data.no = ''
  load()
}

const del = (id) => {
  ElMessageBox.confirm("删除数据后无法恢复，确认删除？", "确认删除", {type: 'warning'}).then(res => {
    request.delete('/studentCourse/delete/' + id).then(res => {
      if (res.code === '200') {
        load()  // 重新获取数据
        ElMessage.success("请求成功")
      } else {
        ElMessage.error(res.msg)
      }
    }).catch(res => {
    })
  })
}

load()
</script>