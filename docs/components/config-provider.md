---
title: 全局配置  ConfigProvider
---

<script setup>
import Basic from './demo/ConfigProvider/Basic.vue'
import Abstract from './demo/ConfigProvider/Abstract.vue'
</script>


<card>

# 基础用法

可以借助全局配置组件，来进行样式覆盖

<template #example>

  <Basic/>
  
</template>

<template #template>

```html
<template>
  <f-config-provider
    :theme="{
      feiColorPrimary: '#722ed1',
      feiColorSuccess: '#13c2c2',
      feiColorWarning: '#e14c19',
      feiColorDanger: '#d42a87'
    }"
  >
    <div>
      <div>[default]默认按钮</div>
      <div class="demo-button">
        <f-button type="primary">Primary</f-button>
        <f-button type="success">Success</f-button>
        <f-button type="warning">Warning</f-button>
        <f-button type="danger">Danger</f-button>
      </div>
      <div>[plain]简约按钮</div>
      <div class="demo-button">
        <f-button type="primary" plain>Primary</f-button>
        <f-button type="success" plain>Success</f-button>
        <f-button type="warning" plain>Warning</f-button>
        <f-button type="danger" plain>Danger</f-button>
      </div>
      <div>[round]圆角按钮</div>
      <div class="demo-button">
        <f-button type="primary" round>Primary</f-button>
        <f-button type="success" round>Success</f-button>
        <f-button type="warning" round>Warning</f-button>
        <f-button type="danger" round>Danger</f-button>
      </div>
      <div>[dashed]虚线按钮</div>
      <div class="demo-button">
        <f-button type="primary" dashed>Primary</f-button>
        <f-button type="success" dashed>Success</f-button>
        <f-button type="warning" dashed>Warning</f-button>
        <f-button type="danger" dashed>Danger</f-button>
      </div>
    </div>
  </f-config-provider>
</template>
```

</template>

<template #style>

```html
<style scoped>
.demo-button {
  margin: 8px 0;
}
</style>
```

</template>

</card>

<card>

# 抽象容器

可以使用抽象标签来注入，这里会默认注入到html ，进行全局覆盖(谨慎使用，避免冲突和覆盖，一般用于全局配置主题使用)

<template #example>

  <Abstract/>
  
</template>

<template #template>

```html
<template>
  <f-config-provider abstract :theme="config">
    <f-button type="primary" @click="setGlobal">
      点击应用（应用后主颜色会变更，会影响全局）
    </f-button>
  </f-config-provider>
</template>
```

</template>

<template #script>

```html
<script setup>
  import { ref } from 'vue'

  const config = ref({})

  function setGlobal() {
    config.value = { feiColorPrimary: '#00c181' }
  }
</script>
```

</template>

</card>
