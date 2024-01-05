<template>
  <f-config-provider
    :theme="{
      binColorPrimary: '#722ed1',
      binColorSuccess: '#13c2c2',
      binColorWarning: '#e14c19',
      binColorDanger: '#d42a87'
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

<style scoped>
.demo-button {
  margin: 8px 0;
}
</style>
