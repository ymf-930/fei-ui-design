<template>
  <div>
    <f-steps :current="2" status="error">
      <f-step title="已完成" content="这里是该步骤的描述信息"></f-step>
      <f-step title="进行中" content="这里是该步骤的描述信息"></f-step>
      <f-step title="待进行" content="这里是该步骤的描述信息"></f-step>
      <f-step title="待进行" content="这里是该步骤的描述信息"></f-step>
    </f-steps>
  </div>
</template>

<script setup lang="ts"></script>
