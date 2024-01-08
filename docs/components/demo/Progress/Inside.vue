<template>
  <div style="width: 350px">
    <div class="mb-16">
      <f-progress text-inside :stroke-width="20" :percent="0"></f-progress>
    </div>
    <div class="mb-16">
      <f-progress text-inside :stroke-width="20" :percent="70"></f-progress>
    </div>
    <div class="mb-16">
      <f-progress
        text-inside
        :stroke-width="20"
        :percent="80"
        color="rgba(142, 113, 199, 0.7)"
      ></f-progress>
    </div>
    <div class="mb-16">
      <f-progress text-inside :stroke-width="20" :percent="100" status="success"></f-progress>
    </div>
    <div class="mb-16">
      <f-progress text-inside :stroke-width="20" :percent="50" status="exception"></f-progress>
    </div>
  </div>
</template>
