<template>
  <div>
    <div style="min-height: 100vh; overflow: hidden; display: flex; align-items: center;justify-content: center">
      <div style="width: 350px">
        <el-form :model="data.form" label-width="120px">
          <el-form-item>
            <el-input prefix-icon="User" v-model="data.form.username"/>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>

</template>

<script setup>
import {reactive} from "vue";

const data = reactive({
  form: {}
})
</script>


<style scoped>

</style>