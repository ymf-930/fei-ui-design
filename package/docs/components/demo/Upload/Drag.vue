<template>
  <div style="width: 400px">
    <f-upload action="//jsonplaceholder.typicode.com/posts/" multiple type="drag">
      <div
        style="padding: 20px 0; border: 1px dashed #eee; cursor: pointer"
        flex="dir:top main:center cross:center"
      >
        <p>
          <f-icon name="cloud-upload" size="52" style="color: #3399ff"></f-icon>
        </p>
        <p>Click or drag files here to upload</p>
      </div>
    </f-upload>
  </div>
</template>

<script setup lang="ts"></script>
