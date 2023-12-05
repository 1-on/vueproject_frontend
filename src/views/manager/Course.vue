<template>
  <div>
    <div class="card" style="margin-bottom: 10px">
      <el-input style="width: 200px; margin-right: 10px" v-model="data.name" placeholder="请输入课程名称查询"
                :prefix-icon="Search"/>
      <el-input style="width: 200px; margin-right: 10px" v-model="data.no" placeholder="请输入课程编号查询"
                :prefix-icon="Search"/>
      <el-input style="width: 200px;" v-model="data.teacher" placeholder="请输入任课老师查询" :prefix-icon="Search"/>
      <el-button style="margin-left: 10px" type="primary" @click="load">查询</el-button>
      <el-button type="info" @click="reset">重置</el-button>
    </div>

    <div class="card" style="margin-bottom: 10px">
      <div style="margin-bottom: 10px">
        <el-button type="primary" @click="handleAdd">新增</el-button>
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
              <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
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

    <el-dialog width="35%" v-model="data.formVisible" title="课程信息">
      <el-form :model="data.form" label-width="100px" label-position="right" style="padding-right: 40px">
        <el-form-item label="课程名称">
          <el-input v-model="data.form.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="课程编号">
          <el-input v-model="data.form.no" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="课程描述">
          <el-input v-model="data.form.descr" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="课时">
          <el-input v-model="data.form.times" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="课程老师">
          <el-input v-model="data.form.teacher" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="data.formVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </span>
      </template>
    </el-dialog>

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
  teacher: '',
  formVisible: false,
  form: {}
})

const handleDelete = (id) => {
  ElMessageBox.confirm("删除数据后无法恢复，确认删除？", "确认删除", {type: 'warning'}).then(res => {
    request.delete('/course/delete/' + id).then(res => {
      if (res.code === '200') {
        load()
        ElMessage.success("请求成功")
      } else {
        ElMessage.error(res.msg)
      }
    }).catch(res => {})
  })

}
const handleEdit = (row) => {
  data.form = JSON.parse(JSON.stringify(row))
  data.formVisible = true;
}

// 保存信息到后台
const save = () => {
  request.request(
      {
        url: data.form.id ? '/course/update' : '/course/add',
        method: data.form.id ? 'PUT' : 'POST',
        data: data.form
      }
  ).then(res => {
    if (res.code === '200') {
      ElMessage.success("操作成功")
      load()
      data.formVisible = false
    } else {
      ElMessage.error(res.meg)
    }
  })
}

const load = () => {
  request.get('/course/selectPage', {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      name: data.name,
      no: data.no,
      teacher: data.teacher,
    }
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
  data.teacher = ''
  load()
}
const handleAdd = () => {
  data.form = {}
  data.formVisible = true
}

load()
</script>