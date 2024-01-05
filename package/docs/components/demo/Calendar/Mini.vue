<template>
  <div flex>
    <div style="width: 300px">
      <f-calendar mini></f-calendar>
    </div>
    <div style="width: 300px">
      <f-calendar
        mini
        :body-style="{ border: 'none' }"
        :day-style="{ border: 'none', borderRadius: '4px' }"
      ></f-calendar>
    </div>
  </div>
</template>
