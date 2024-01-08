<template>
  <div style="width: 350px">
    <div class="mb-16">
      <f-progress :percent="0"></f-progress>
    </div>
    <div class="mb-16">
      <f-progress :percent="70" status="text" active><span>进度70</span></f-progress>
    </div>
    <div class="mb-16">
      <f-progress :percent="100" status="success"></f-progress>
    </div>
    <div class="mb-16">
      <f-progress :percent="50" status="exception"></f-progress>
    </div>
  </div>
</template>
