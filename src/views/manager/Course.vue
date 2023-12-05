<template>
  <div>
    <div class="card" style="margin-bottom: 10px">
      <el-input style="width: 300px;" v-model="data.name" class="w-50 m-2" placeholder="请输入课程名称"
                :prefix-icon="Search"/>
      <el-button style="margin-left: 10px" type="primary">查询</el-button>
      <el-button type="info">重置</el-button>
    </div>

    <div class="card" style="margin-bottom: 10px">
      <div style="margin-bottom: 10px">
        <el-button type="primary">新增</el-button>
      </div>

      <div>
        <el-table :data="data.tableData" style="width: 100%">
          <el-table-column prop="id" label="序号" width="100"/>
          <el-table-column prop="name" label="课程名称"/>
          <el-table-column prop="no" label="课程编号"/>
          <el-table-column prop="descr" label="课程描述"/>
          <el-table-column prop="times" label="课时"/>
          <el-table-column prop="teacher" label="任课老师"/>
          <el-table-column>
            <template #default="scope">
              <el-button size="small" type="primary">编辑</el-button>
              <el-button size="small" type="danger">编辑</el-button>
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

const data = reactive({
  name: '',
  tableData: [],
  total: 0,
  pageSize: 1,  // 当前页面
  pageNum: 1   // 每页个数
})

const load = () => {
  request.get('/course/selectPage', {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(res => {
    data.tableData = res.data?.list || []
    data.total = res.data?.total || 0
  })
}
const handeCurrentChange = (pageNum) => {
  load()
}
load()
</script>