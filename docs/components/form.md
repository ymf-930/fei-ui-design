---
title: 表单 Form
---

<script setup>
import Basic from './demo/Form/Basic.vue'
import Inline from './demo/Form/Inline.vue'
import Aline from './demo/Form/Aline.vue'
import NoLabel from './demo/Form/NoLabel.vue'
import Validator from './demo/Form/Validator.vue'
import CustomValidator from './demo/Form/CustomValidator.vue'
import Add from './demo/Form/Add.vue'
</script>

##### 由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

<card>

## 基础用法

基础的表单使用，表单项，比如输入框、选择器、开关、单选框、多选框等。

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 500px">
    <f-form ref="form" :model="formObj" label-width="100px">
      <f-form-item label="姓名">
        <f-input v-model="formObj.name" placeholder="输入姓名"></f-input>
      </f-form-item>
      <f-form-item label="年龄">
        <f-input-number v-model="formObj.age"></f-input-number>
      </f-form-item>
      <f-form-item label="户籍地">
        <f-select v-model="formObj.region" placeholder="请选择户籍地">
          <f-option label="上海" value="shanghai"></f-option>
          <f-option label="北京" value="beijing"></f-option>
          <f-option label="南京" value="nanjing"></f-option>
          <f-option label="徐州" value="xuzhou"></f-option>
        </f-select>
      </f-form-item>
      <f-form-item label="学历">
        <f-radio-group v-model="formObj.edu">
          <f-radio label="高中"></f-radio>
          <f-radio label="大专"></f-radio>
          <f-radio label="本科"></f-radio>
          <f-radio label="硕士"></f-radio>
        </f-radio-group>
      </f-form-item>
      <f-form-item label="爱好">
        <f-checkbox-group v-model="formObj.hobby">
          <f-checkbox label="打游戏" name="hobby"></f-checkbox>
          <f-checkbox label="看电影" name="hobby"></f-checkbox>
          <f-checkbox label="打篮球/运动" name="hobby"></f-checkbox>
          <f-checkbox label="看书" name="hobby"></f-checkbox>
        </f-checkbox-group>
      </f-form-item>
      <f-form-item label="住址">
        <f-input v-model="formObj.address" type="textarea" placeholder="请输入住址..."></f-input>
      </f-form-item>
      <f-form-item>
        <f-button type="primary" @click="onSubmit">提交</f-button>
        <f-button>取消</f-button>
      </f-form-item>
    </f-form>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const formObj = ref({
    name: '',
    age: null,
    region: '',
    city: '',
    edu: '',
    hobby: [],
    address: ''
  })

  function onSubmit() {
    console.log('submit!', formObj.value)
  }
</script>
```

</template>

</card>

<card>

## 行内表单

表单内容项比较少的情况可以使用行内模式

<template #example>

  <Inline/>
  
</template>

<template #template>

```html
<template>
  <f-form ref="form" :model="formObj" inline class="demo-form-inline">
    <f-form-item label="姓名">
      <f-input v-model="formObj.name" placeholder="输入姓名"></f-input>
    </f-form-item>
    <f-form-item label="户籍地">
      <f-select v-model="formObj.region" placeholder="请选择户籍地">
        <f-option label="上海" value="shanghai"></f-option>
        <f-option label="北京" value="beijing"></f-option>
        <f-option label="南京" value="nanjing"></f-option>
        <f-option label="徐州" value="xuzhou"></f-option>
      </f-select>
    </f-form-item>
    <f-form-item>
      <f-button type="primary" @click="onSubmit">提交</f-button>
    </f-form-item>
  </f-form>
</template>
```

</template>

<template #script>

```html
  <script setup lang="ts">
  import { ref } from 'vue'

  const formObj = ref({
    name: '',
    region: ''
  })

  function onSubmit() {
    console.log('submit!', formObj.value)
  }
</script>
```

</template>

</card>

<card>

## 对齐和尺寸

可以有三种不同的标签对齐方式,纯文字需要包裹label标签

<template #example>

  <Aline/>
  
</template>

<template #template>

```html
<template>
  <div>
    <f-space>
      对齐方式
      <f-radio-group v-model="labelPosition" type="capsule">
        <f-radio label="left">左对齐</f-radio>
        <f-radio label="right">右对齐</f-radio>
        <f-radio label="top">顶部对齐</f-radio>
      </f-radio-group>
      尺寸大小
      <f-radio-group v-model="size" type="capsule">
        <f-radio label="large">large</f-radio>
        <f-radio label="default">default</f-radio>
        <f-radio label="small">small</f-radio>
        <f-radio label="mini">mini</f-radio>
      </f-radio-group>
      文字显示
      <f-switch v-model="onlyText"></f-switch>
    </f-space>
    <div style="width: 500px; margin-top: 20px">
      <f-form :label-position="labelPosition" label-width="100px" :model="formObj" :size="size">
        <f-form-item label="姓名">
          <f-input v-if="!onlyText" v-model="formObj.name" placeholder="输入姓名"></f-input>
          <label v-else>{{ formObj.name }}</label>
        </f-form-item>
        <f-form-item label="年龄">
          <f-input-number v-if="!onlyText" v-model="formObj.age"></f-input-number>
          <label v-else>{{ formObj.age }}</label>
        </f-form-item>
        <f-form-item label="户籍地">
          <f-select v-if="!onlyText" v-model="formObj.city" placeholder="请选择户籍地">
            <f-option label="上海" value="shanghai"></f-option>
            <f-option label="北京" value="beijing"></f-option>
            <f-option label="南京" value="nanjing"></f-option>
            <f-option label="徐州" value="xuzhou"></f-option>
          </f-select>
          <label v-else>{{ formObj.city }}</label>
        </f-form-item>
        <f-form-item label="学历">
          <f-radio-group v-if="!onlyText" v-model="formObj.edu">
            <f-radio label="高中"></f-radio>
            <f-radio label="大专"></f-radio>
            <f-radio label="本科"></f-radio>
            <f-radio label="硕士"></f-radio>
          </f-radio-group>
          <span v-else>{{ formObj.edu }}</span>
        </f-form-item>
        <f-form-item label="爱好">
          <f-checkbox-group v-if="!onlyText" v-model="formObj.hobby">
            <f-checkbox label="打游戏" name="hobby"></f-checkbox>
            <f-checkbox label="看电影" name="hobby"></f-checkbox>
            <f-checkbox label="打篮球/运动" name="hobby"></f-checkbox>
            <f-checkbox label="看书" name="hobby"></f-checkbox>
          </f-checkbox-group>
          <span v-else>{{ formObj.hobby }}</span>
        </f-form-item>
        <f-form-item label="住址">
          <f-input
            v-if="!onlyText"
            v-model="formObj.address"
            type="textarea"
            placeholder="请输入住址..."
          ></f-input>
          <span v-else>{{ formObj.address }}</span>
        </f-form-item>
        <f-form-item v-if="!onlyText">
          <f-button type="primary">提交</f-button>
          <f-button>取消</f-button>
        </f-form-item>
      </f-form>
    </div>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const labelPosition = ref('right')
  const size = ref('default')
  const onlyText = ref(false)

  const formObj = ref({
    name: '张三',
    age: 18,
    city: 'xuzhou',
    edu: '高中',
    hobby: ['打游戏', '看电影'],
    address: '徐州市鼓楼区'
  })
</script>
```

</template>

</card>

<card>

## 没有label显示

<template #example>

  <NoLabel/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 500px">
    <f-form :model="formObj">
      <f-form-item>
        <f-input v-model="formObj.username" placeholder="输入用户名"></f-input>
      </f-form-item>
      <f-form-item>
        <f-input v-model="formObj.password" placeholder="输入用户名" type="password"></f-input>
      </f-form-item>
      <f-form-item>
        <f-button type="primary" style="width: 100%">登录</f-button>
      </f-form-item>
    </f-form>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const formObj = ref({
    username: '',
    password: ''
  })
</script>
```

</template>

</card>

<card>

## 表单校验

提供基础的校验规则，校验规则参考 [async-validator](https://github.com/yiminghe/async-validator)

<template #example>

  <Validator/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 500px">
    <f-form ref="ruleForm" :model="formObj" status-icon label-width="100px" :rules="ruleValidate">
      <f-form-item prop="name" label="名称">
        <f-input v-model="formObj.name" placeholder="用户名"></f-input>
      </f-form-item>
      <f-form-item prop="mail" label="邮箱">
        <f-input v-model="formObj.mail" placeholder="邮箱" clearable></f-input>
      </f-form-item>
      <f-row>
        <f-col :span="12">
          <f-form-item prop="age" label="年龄">
            <f-input-number v-model="formObj.age" style="width: 100%"></f-input-number>
          </f-form-item>
        </f-col>
        <f-col :span="12">
          <f-form-item label="户籍地" prop="region">
            <f-select v-model="formObj.region" placeholder="请选择户籍地" clearable>
              <f-option label="上海" value="shanghai"></f-option>
              <f-option label="北京" value="beijing"></f-option>
              <f-option label="南京" value="nanjing"></f-option>
              <f-option label="徐州" value="xuzhou"></f-option>
            </f-select>
          </f-form-item>
        </f-col>
      </f-row>
      <f-form-item label="出生日期" prop="birthday">
        <f-date-picker
          v-model="formObj.birthday"
          type="date"
          placeholder="出生日期"
        ></f-date-picker>
      </f-form-item>
      <f-form-item label="爱好" prop="hobby">
        <f-checkbox-group v-model="formObj.hobby">
          <f-checkbox label="打游戏" name="hobby"></f-checkbox>
          <f-checkbox label="看电影" name="hobby"></f-checkbox>
          <f-checkbox label="打篮球/运动" name="hobby"></f-checkbox>
          <f-checkbox label="看书" name="hobby"></f-checkbox>
        </f-checkbox-group>
      </f-form-item>
      <f-form-item label="性别" prop="sex">
        <f-radio-group v-model="formObj.sex">
          <f-radio label="男" value="male"></f-radio>
          <f-radio label="女" value="female"></f-radio>
        </f-radio-group>
      </f-form-item>
      <f-form-item label="状态" prop="status">
        <f-switch v-model="formObj.status" true-value="enable" false-value="disable" size="large">
          <template #open><span>启用</span></template>
          <template #close><span>禁用</span></template>
        </f-switch>
      </f-form-item>
      <f-form-item>
        <f-button type="primary" @click="submitForm">提交</f-button>
        <f-button @click="resetForm">重置</f-button>
      </f-form-item>
    </f-form>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const ruleValidate = {
    name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    region: [{ required: true, message: '户籍地不能为空', trigger: 'change' }],
    age: [
      { required: true, type: 'number', message: '年龄不为空', trigger: 'change' },
      { type: 'number', min: 18, trigger: 'change', message: '年龄必须在18以上' }
    ],
    hobby: [{ type: 'array', required: true, message: '请至少选择一个爱好', trigger: 'change' }],
    sex: [{ required: true, message: '性别必选', trigger: 'change' }],
    birthday: [{ required: true, type: 'date', message: '出生日期必选', trigger: 'blur' }],
    mail: [
      { required: true, message: '邮箱不能为空', trigger: 'blur' },
      { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ]
  }

  const ruleForm = ref(null)

  const formObj = ref({
    name: '',
    age: null,
    mail: '',
    region: '',
    hobby: [],
    sex: '',
    status: 'disable',
    birthday: ''
  })

  function submitForm() {
    ruleForm.value?.validate(valid => {
      if (valid) {
        alert('submit!')
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
  function resetForm() {
    ruleForm.value?.resetFields()
  }
</script>
```

</template>

</card>

<card>

## 自定义校验规则

可以自定义校验函数来实现更多的校验判定

<template #example>

  <CustomValidator/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 500px">
    <f-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <f-form-item label="密码" prop="pass">
        <f-input v-model="ruleForm.pass" type="password" autocomplete="off"></f-input>
      </f-form-item>
      <f-form-item label="确认密码" prop="checkPass">
        <f-input v-model="ruleForm.checkPass" type="password" autocomplete="off"></f-input>
      </f-form-item>
      <f-form-item label="年龄" prop="age">
        <f-input v-model.number="ruleForm.age" type="number"></f-input>
      </f-form-item>
      <f-form-item>
        <f-button type="primary" @click="submitForm">提交</f-button>
        <f-button @click="resetForm">重置</f-button>
      </f-form-item>
    </f-form>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const checkAge = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('年龄不能为空'))
    }
    setTimeout(() => {
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'))
      } else {
        if (value < 18) {
          callback(new Error('必须年满18岁'))
        } else {
          callback()
        }
      }
    }, 1000)
  }
  const validatePass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'))
    } else {
      if (ruleForm.value.checkPass !== '') {
        ruleFormRef.value?.validateField('checkPass')
      }
      callback()
    }
  }
  const validatePass2 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请再次输入密码'))
    } else if (value !== ruleForm.value.pass) {
      callback(new Error('两次输入密码不一致!'))
    } else {
      callback()
    }
  }

  const ruleFormRef = ref(null)

  const rules = ref({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    age: [{ validator: checkAge, trigger: 'blur' }]
  })

  const ruleForm = ref({
    pass: '',
    checkPass: '',
    age: ''
  })

  function submitForm() {
    ruleFormRef.value?.validate(valid => {
      if (valid) {
        alert('submit!')
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
  function resetForm() {
    ruleFormRef.value?.resetFields()
  }
</script>
```

</template>

</card>

<card>

## 动态增加校验

可以动态的配置校验规则

<template #example>

  <Add/>
  
</template>

<template #template>

```html
<template>
  <div style="width: 500px">
    <f-form ref="formRef" :model="dynamicValidateForm" label-width="100px" class="demo-dynamic">
      <f-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="domain.key"
        :label="'域名' + index"
        :prop="'domains.' + index + '.value'"
        :rules="{
          required: true,
          message: '域名不能为空',
          trigger: 'blur'
        }"
      >
        <div flex="box:last">
          <f-input v-model="domain.value"></f-input>
          <f-button @click="removeDomain(domain)">删除</f-button>
        </div>
      </f-form-item>
      <f-form-item>
        <f-button type="primary" @click="submitForm">提交</f-button>
        <f-button @click="addDomain">新增域名</f-button>
        <f-button @click="resetForm">重置</f-button>
      </f-form-item>
    </f-form>
  </div>
</template>
```

</template>

<template #script>

```html
<script setup lang="ts">
  import { ref } from 'vue'

  const dynamicValidateForm = ref({
    domains: [
      {
        value: ''
      }
    ]
  })
  const formRef = ref(null)

  function submitForm() {
    formRef.value?.validate(valid => {
      if (valid) {
        alert('submit!')
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
  function resetForm() {
    formRef.value?.resetFields()
  }
  function removeDomain(item) {
    const index = dynamicValidateForm.value.domains.indexOf(item)
    if (index !== -1) {
      dynamicValidateForm.value.domains.splice(index, 1)
    }
  }
  function addDomain() {
    dynamicValidateForm.value.domains.push({
      value: '',
      key: Date.now()
    })
  }
</script>
```

</template>

</card>

## Form Props

| 参数                    | 说明                                                                                    | 类型           | 可选值                   | 默认值 |
| ----------------------- | --------------------------------------------------------------------------------------- | -------------- | ------------------------ | ------ |
| model                   | 表单数据对象                                                                            | object         | —                        | —      |
| rules                   | 表单验证规则                                                                            | object         | —                        | —      |
| inline                  | 行内表单模式                                                                            | boolean        | —                        | false  |
| label-position          | 标签的位置，如果值为 left 或者 right 时，则需要设置 label-width                         | right/left/top | —                        | right  |
| label-width             | 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。 | —              | —                        | —      |
| label-suffix            | 表单域标签的后缀                                                                        | string         | —                        | —      |
| hide-required-asterisk  | 是否隐藏必填字段的标签旁边的红色\*                                                      | boolean        | —                        | false  |
| show-message            | 是否显示校验错误信息                                                                    | boolean        | —                        | true   |
| inline-message          | 是否以行内形式展示校验信息,此时右侧需要留出校验信息的显示宽度才可以正常使用             | boolean        | —                        | false  |
| status-icon             | 是否在输入框中显示校验结果反馈图标                                                      | boolean        | —                        | false  |
| validate-on-rule-change | 是否在 rules 属性改变后立即触发一次验证                                                 | boolean        | —                        | true   |
| size                    | 用于控制该表单内组件的尺寸                                                              | string         | large,default,small,mini | —      |
| disabled                | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效       | —              | false                    |

## Form Methods

| 方法名        | 说明                                                                                                                                                                 | 返回值                                                                   |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| validate      | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object))                            |
| validateField | 对部分表单字段进行校验的方法                                                                                                                                         | Function(props: array、string, callback: Function(errorMessage: string)) |
| resetFields   | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果                                                                                                           | —                                                                        |
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果                                                             | Function(props: array 、 string)                                         |

## Form Events

| 方法名   | 说明                   | 返回值                                                     |
| -------- | ---------------------- | ---------------------------------------------------------- |
| validate | 任一表单项被校验后触发 | 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在） |

## FormItem Props

| 参数           | 说明                                                                         | 类型    | 可选值                          | 默认值 |
| -------------- | ---------------------------------------------------------------------------- | ------- | ------------------------------- | ------ |
| prop           | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string  | 传入 Form 组件的 model 中的字段 | —      |
| label          | 标签文本                                                                     | string  | —                               | —      |
| label-width    | 表单域标签的的宽度，例如 '80px'。支持 auto。                                 | string  | —                               | —      |
| required       | 是否必填，如不设置，则会根据校验规则自动生成                                 | boolean | —                               | false  |
| rules          | 表单验证规则                                                                 | object  | —                               | —      |
| error          | 表单域验证错误信息, 设置该值会使表单验证状态变为error，并显示该错误信息      | string  | —                               | —      |
| show-message   | 是否显示校验错误信息                                                         | boolean | —                               | true   |
| inline-message | 以行内形式展示校验信息                                                       | boolean | —                               | false  |
| size           | 用于控制该表单域下组件的尺寸                                                 | string  | large,default,small,mini        | —      |

## FormItem Slot

| 名称    | 说明           |
| ------- | -------------- |
| default | 默认内容       |
| label   | 标签文本的内容 |

## FormItem Scoped Slot

| 名称  | 说明                                           |
| ----- | ---------------------------------------------- |
| error | 自定义表单校验信息的显示方式，参数为 { error } |

## FormItem Methods

| 名称          | 说明                                                 |
| ------------- | ---------------------------------------------------- |
| resetField    | 对该表单项进行重置，将其值重置为初始值并移除校验结果 |
| clearValidate | 移除该表单项的校验结果                               |
