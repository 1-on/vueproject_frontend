<template>
  <div>
    <div class="card" style="margin-bottom: 10px">
      <el-input style="width: 200px; margin-right: 10px" v-model="data.username" placeholder="请输入账号查询"
                :prefix-icon="Search"/>
      <el-input style="width: 200px; margin-right: 10px" v-model="data.name" placeholder="请输入名称查询"
                :prefix-icon="Search"/>
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
          <el-table-column prop="username" label="学生账号"/>
          <el-table-column prop="name" label="学生名称"/>
          <el-table-column prop="sex" label="性别"/>
          <el-table-column prop="phone" label="手机号"/>
          <el-table-column prop="email" label="邮箱"/>
          <el-table-column prop="birth" label="生日"/>
          <el-table-column prop="awatar" label="头像">
            <template #default="scope">
              <el-image v-if="scope.row.awatar" :src="scope.row.awatar" :preview-src-list="[scope.row.awatar]"
                        style="width: 40px;height: 40px;border-radius: 5px "></el-image>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180px">
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

    <el-dialog width="35%" v-model="data.formVisible" title="学生信息" destroy-on-close>
      <el-form :rules="rules" ref="formRef" :model="data.form" label-width="100px" label-position="right"
               style="padding-right: 40px">
        <el-form-item label="学生账号" prop="username">
          <el-input v-model="data.form.username" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="学生密码" prop="password">
          <el-input show-password v-model="data.form.password" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="学生名称">
          <el-input v-model="data.form.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="data.form.phone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="data.form.email" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="data.form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker style="width: 100%" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                          v-model="data.form.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="学生头像">
          <el-upload action="http://localhost:9090/files/upload" list-type="picture"
                     :on-success="handleImgUploadSuccess">
            <el-button>上传头像</el-button>
          </el-upload>
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

import {reactive, ref} from "vue";
import {Search} from "@element-plus/icons-vue";
import request from "@/utils/request";
import {ElMessage, ElMessageBox} from "element-plus";

const baseUrl = '/student'

const data = reactive({
  username: '',
  tableData: [],
  total: 0,
  pageNum: 1,  // 当前页面
  pageSize: 5,  // 每页个数
  name: '',
  formVisible: false,
  form: {}
})

const handleImgUploadSuccess = (res) => {
  data.form.awatar = res.data
}

const handleDelete = (id) => {
  ElMessageBox.confirm("删除数据后无法恢复，确认删除？", "确认删除", {type: 'warning'}).then(res => {
    request.delete(baseUrl + '/delete/' + id).then(res => {
      if (res.code === '200') {
        load()
        ElMessage.success("请求成功")
      } else {
        ElMessage.error(res.msg)
      }
    }).catch(res => {
    })
  })

}
const handleEdit = (row) => {
  data.form = JSON.parse(JSON.stringify(row))
  data.formVisible = true;
}

// 保存信息到后台
const save = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      request.request(
          {
            url: data.form.id ? baseUrl + '/update' : '/student/add',
            method: data.form.id ? 'PUT' : 'POST',
            data: data.form
          }
      ).then(res => {
        if (res.code === '200') {
          ElMessage.success("操作成功")
          load()
          data.formVisible = false
        } else {
          ElMessage.error(res.msg)
        }
      })
    }
  })
}

const load = () => {
  request.get(baseUrl + '/selectPage', {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      username: data.username,
      name: data.name,
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
  data.username = ''
  data.name = ''
  load()
}

const rules = reactive({
  username: [
    {required: true, message: '请输入账号', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ],
})

const formRef = ref()
const handleAdd = () => {
  data.form = {}
  data.formVisible = true
}

load()
</script>