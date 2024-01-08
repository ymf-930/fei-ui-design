<template>
  <div class="demo-tooltip">
    <div class="top">
      <f-tooltip content="Top Left text" placement="top-start">
        <f-button>上左</f-button>
        &nbsp;&nbsp;
      </f-tooltip>
      <f-tooltip content="Top Center text" placement="top">
        <f-button>上边</f-button>
        &nbsp;&nbsp;
      </f-tooltip>
      <f-tooltip content="Top Right text" placement="top-end">
        <f-button>上右</f-button>
      </f-tooltip>
    </div>
    <div class="center">
      <div class="center-left">
        <f-tooltip content="Left Top text" placement="left-start">
          <f-button>左上</f-button>
        </f-tooltip>
        <br />
        <br />
        <f-tooltip content="Left Center text" placement="left">
          <f-button>左边</f-button>
        </f-tooltip>
        <br />
        <br />
        <f-tooltip content="Left Bottom text" placement="left-end">
          <f-button>左下</f-button>
        </f-tooltip>
      </div>
      <div class="center-right">
        <f-tooltip content="Right Top text" placement="right-start">
          <f-button>右上</f-button>
        </f-tooltip>
        <br />
        <br />
        <f-tooltip content="Right Center text" placement="right">
          <f-button>右边</f-button>
        </f-tooltip>
        <br />
        <br />
        <f-tooltip content="Right Bottom text" placement="right-end">
          <f-button>右下</f-button>
        </f-tooltip>
      </div>
    </div>
    <div class="bottom">
      <f-tooltip content="Bottom Left text" placement="bottom-start">
        <f-button>下左</f-button>
        &nbsp;&nbsp;
      </f-tooltip>
      <f-tooltip content="Bottom Center text" placement="bottom">
        <f-button>下边</f-button>
        &nbsp;&nbsp;
      </f-tooltip>
      <f-tooltip content="Bottom Right text" placement="bottom-end">
        <f-button>下右</f-button>
      </f-tooltip>
    </div>
  </div>
</template>

<style scoped>
.demo-tooltip {
  .top,
  .bottom {
    text-align: center;
  }
  .center {
    width: 300px;
    margin: 10px auto;
    overflow: hidden;
    .center-left {
      float: left;
    }
    .center-right {
      float: right;
    }
  }
}
</style>
