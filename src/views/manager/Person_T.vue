<template>
  <div>
    <div class="card" style="width: 50%; padding: 40px 40px">
      <el-form ref="formRef" :model="data.form" label-width="100px" label-position="right"
               style="padding-right: 40px">
        <el-form-item label="教师头像">
          <el-upload class="avatar-uploader" action="http://localhost:9090/files/upload" :show-file-list="false"
                     :on-success="handleImgUploadSuccess">
            <img v-if="data.form.awatar" :src="data.form.awatar" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="教师账号" prop="username">
          <el-input v-model="data.form.username" autocomplete="off" disabled/>
        </el-form-item>
        <el-form-item label="教师密码" prop="password">
          <el-input show-password v-model="data.form.password" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="教师名称">
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
        <el-form-item>
          <el-button type="primary" @click="update">保 存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import request from "@/utils/request";
import {ElMessage} from "element-plus";
import router from "@/router";
import {Plus} from "@element-plus/icons-vue";

const data = reactive({
  form: JSON.parse(localStorage.getItem('user') || "{}")
})

const handleImgUploadSuccess = (res) => {
  data.form.awatar = res.data
}

const update = () => {
  request.put('/teacher/update', data.form).then(res => {
    if (res.code === '200') {
      ElMessage.success("操作成功")
      router.push("/login")
      data.formVisible = false
    } else {
      ElMessage.error(res.msg)
    }
  })
}


</script>


<style scoped>
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>