<template>
  <div class="center">
    <vs-button @click="active=!active">{{ active ? 'Close Alert' : 'Open Alert' }}</vs-button>

    <vs-alert closable v-model="active">
      <template #title>
        FEI-UI-DESIGN Framework
      </template>
      FEI-UI-DESIGN (pronunciado / vjusacksː /, como view sacks) es un <b>framework de componentes UI</b> creado con <a href="https://vuejs.org/">Vuejs</a> para hacer proyectos fácilmente y con un estilo único y agradable, vuesax esta creado desde cero y pensado para todo tipo de desarrollador desde el amante del frontend hasta el backend que quiere crear fácilmente su enfoque visual al usuario final
    </vs-alert>
  </div>
</template>
<script>
export default {
  data:() => ({
    active: true,
  })
}
</script>
