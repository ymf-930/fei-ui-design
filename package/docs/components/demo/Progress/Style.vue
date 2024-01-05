<template>
  <div style="width: 350px">
    <div class="mb-16">
      <f-progress :percent="70" :show-text="false"></f-progress>
    </div>
    <div class="mb-16">
      <f-progress :percent="40" color="#76eeff"></f-progress>
    </div>
    <div class="mb-16">
      <f-progress text-inside :stroke-width="20" :percent="60" color="#df52ff"></f-progress>
    </div>
    <div class="mb-16">
      <f-progress :stroke-width="20" :percent="30" color="#ffcf2f"></f-progress>
    </div>
    <div class="mb-16">
      <f-progress :percent="60" status="text" active><span>进度60</span></f-progress>
    </div>
  </div>
</template>
