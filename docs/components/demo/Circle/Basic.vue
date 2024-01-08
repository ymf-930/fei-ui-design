<template>
  <div flex="main:justify" style="width: 400px">
    <f-circle :percent="80">
      <span class="demo-circle-inner" style="font-size: 24px">80%</span>
    </f-circle>
    <f-circle :percent="100" stroke-color="#5cb85c">
      <f-icon name="check" size="30" style="color: #5cb85c"></f-icon>
    </f-circle>
    <f-circle :percent="35" stroke-color="#ff5500">
      <span class="demo-circle-inner">
        <f-icon name="close" size="30" style="color: #ff5500"></f-icon>
      </span>
    </f-circle>
  </div>
</template>
