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
      <el-pagination background layout="prev, pager, next" :total="1000"/>
    </div>

  </div>
</template>

<script setup>

import {reactive} from "vue";
import {Search} from "@element-plus/icons-vue";

const data = reactive({
  name: '',
  tableData: [
    {id: '1', name: "大学英语", no: "ABC11",descr: '六级过不了怎么办',times:3,teacher:"tom"},
    {id: '1', name: "大学英语", no: "ABC11",descr: '六级过不了怎么办',times:3,teacher:"tom"},
    {id: '1', name: "大学英语", no: "ABC11",descr: '六级过不了怎么办',times:3,teacher:"tom"},
    {id: '1', name: "大学英语", no: "ABC11",descr: '六级过不了怎么办',times:3,teacher:"tom"},
    {id: '1', name: "大学英语", no: "ABC11",descr: '六级过不了怎么办',times:3,teacher:"tom"},
    {id: '1', name: "大学英语", no: "ABC11",descr: '六级过不了怎么办',times:3,teacher:"tom"},
    {id: '1', name: "大学英语", no: "ABC11",descr: '六级过不了怎么办',times:3,teacher:"tom"},
    {id: '1', name: "大学英语", no: "ABC11",descr: '六级过不了怎么办',times:3,teacher:"tom"},
    {id: '1', name: "大学英语", no: "ABC11",descr: '六级过不了怎么办',times:3,teacher:"tom"},

  ]
})
</script>