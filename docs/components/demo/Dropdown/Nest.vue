<template>
  <div>
    <f-dropdown placement="right-start">
      <a href="javascript:void(0)">
        徐州小吃
        <f-icon name="down"></f-icon>
      </a>
      <template #dropdown>
        <f-dropdown-menu>
          <f-dropdown-item>驴肉火烧</f-dropdown-item>
          <f-dropdown-item>牛肉板面</f-dropdown-item>
          <f-dropdown placement="right-start">
            <f-dropdown-item>
              特色菜系
              <i class='bx bx-chevron-right'></i>
            </f-dropdown-item>
            <template #dropdown>
              <f-dropdown-menu>
                <f-dropdown-item>地锅鸡</f-dropdown-item>
                <f-dropdown-item>狗肉</f-dropdown-item>
                <f-dropdown-item>把子肉</f-dropdown-item>
              </f-dropdown-menu>
            </template>
          </f-dropdown>
          <f-dropdown-item>过桥米线</f-dropdown-item>
        </f-dropdown-menu>
      </template>
    </f-dropdown>
  </div>
</template>
