<template>
  <f-space :size="24">
    <f-badge :value="12">
      <f-button>普通按钮</f-button>
    </f-badge>
    <f-badge :value="3">
      <f-button>回复</f-button>
    </f-badge>
    <f-badge :value="1" type="primary">
      <f-button>primary徽标</f-button>
    </f-badge>
    <f-badge :value="2" type="warning">
      <f-button>warning徽标</f-button>
    </f-badge>
    <f-badge value="ok" type="success">
      <f-button>success徽标</f-button>
    </f-badge>
    <f-badge :value="200" :max="99">
      <f-button>最大数值</f-button>
    </f-badge>
  </f-space>
</template>
