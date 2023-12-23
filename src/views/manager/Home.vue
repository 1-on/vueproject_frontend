<template>
  <div>

    <div class="card" style="line-height: 30px">
      <div><span style="color: dodgerblue">{{ user.name }}</span> 欢迎来到学生成绩管理系统！</div>
    </div>


    <div v-if="user.role==='ADMIN' || user.role==='TEACHER' " class="card" id="echarts-container"
         style="height: 350px;margin-top: 30px"></div>

    <div v-if="user.role==='STUDENT'" class="card" id="echarts-container-student"
         style="height: 350px;margin-top: 30px"></div>


  </div>
</template>

<script setup>
import request from "@/utils/request";

const user = JSON.parse(localStorage.getItem('user') || '{}')
import * as echarts from 'echarts';
import {onMounted} from "vue";

const loadCourse = async () => {   // 加载课程信息
  try {
    let response = null
    if (user.role === 'TEACHER') {
      response = await request.get('course/selectCourseNum', {params: {id: user.id}});
    } else {
      response = await request.get('course/selectCourseNum');
    }

    const courseData = response.data;

    updateECharts(courseData);
  } catch (error) {
    console.error('Error fetching course data', error);
  }
}

const loadGrade = async () => {   // 加载成绩信息
  try {
    const response = await request.get('grade/selectAll', {params: {id: user.id}});

    const gradeData = response.data;

    updateStudentECharts(gradeData);
  } catch (error) {
    console.error('Error fetching course data', error);
  }
}

const updateECharts = (courseData) => {
  const chartDom = document.getElementById('echarts-container');
  const myChart = echarts.init(chartDom);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {type: 'cross'}
    },
    legend: {},
    xAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      data: courseData.map(course => course.name),
    },
    yAxis: [
      {
        type: 'value',
        name: '选课人数',
        position: 'left',
        axisLabel: {
          formatter: '{value} 人'
        }
      },
      {
        type: 'value',
        name: '及格率',
        min: 0,
        max: 100,
        position: 'right',
        axisLabel: {
          formatter: '{value} %'
        }
      }
    ],
    series: [
      {
        name: '选课人数',
        type: 'bar',
        yAxisIndex: 0,
        data: courseData.map(course => course.number),
        label: {
          show: true,
          position: 'top', // 显示在柱形的顶部
          formatter: '{c}', // 显示数据及单位
        },
      },
      {
        name: '及格率',
        type: 'line',
        yAxisIndex: 1,
        data: courseData.map(course => course.passRate),
      }

    ]
  };
  myChart.setOption(option);
}

const updateStudentECharts = (gradeData) => {
  const chartDom = document.getElementById('echarts-container-student');
  const myChart = echarts.init(chartDom);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {type: 'cross'}
    },
    legend: {},
    xAxis: {
      type: 'category',
      name:'课程',
      axisTick: {
        alignWithLabel: true
      },
      data: gradeData.map(grade => grade.course.name),
    },
    yAxis: [
      {
        type: 'value',
        name: '成绩',
        position: 'left',
        axisLabel: {
          formatter: '{value} 分'
        }
      },
    ],
    series: [
      {
        name: '成绩',
        type: 'bar',
        yAxisIndex: 0,
        min:0,
        max:100,
        data: gradeData.map(grade => grade.score),
        label: {
          show: true,
          position: 'top', // 显示在柱形的顶部
          formatter: '{c}', // 显示数据及单位
        },
      },

    ]
  };
  myChart.setOption(option);
}


loadCourse()
loadGrade()
</script>