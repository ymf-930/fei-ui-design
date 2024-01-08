<template>
  <div class="demo-popover">
    <div class="top">
      <f-popover title="Title" content="Top Left text" placement="top-start">
        <f-button>上左</f-button>
        &nbsp;&nbsp;
      </f-popover>
      <f-popover title="Title" content="Top Center text" placement="top">
        <f-button>上边</f-button>
        &nbsp;&nbsp;
      </f-popover>
      <f-popover title="Title" content="Top Right text" placement="top-end">
        <f-button>上右</f-button>
      </f-popover>
    </div>
    <div class="center">
      <div class="center-left">
        <f-popover title="Title" content="Left Top text" placement="left-start">
          <f-button>左上</f-button>
        </f-popover>
        <br />
        <br />
        <f-popover title="Title" content="Left Center text" placement="left">
          <f-button>左边</f-button>
        </f-popover>
        <br />
        <br />
        <f-popover title="Title" content="Left Bottom text" placement="left-end">
          <f-button>左下</f-button>
        </f-popover>
      </div>
      <div class="center-right">
        <f-popover title="Title" content="Right Top text" placement="right-start">
          <f-button>右上</f-button>
        </f-popover>
        <br />
        <br />
        <f-popover title="Title" content="Right Center text" placement="right">
          <f-button>右边</f-button>
        </f-popover>
        <br />
        <br />
        <f-popover title="Title" content="Right Bottom text" placement="right-end">
          <f-button>右下</f-button>
        </f-popover>
      </div>
    </div>
    <div class="bottom">
      <f-popover title="Title" content="Bottom Left text" placement="bottom-start">
        <f-button>下左</f-button>
        &nbsp;&nbsp;
      </f-popover>
      <f-popover title="Title" content="Bottom Center text" placement="bottom">
        <f-button>下边</f-button>
        &nbsp;&nbsp;
      </f-popover>
      <f-popover title="Title" content="Bottom Right text" placement="bottom-end">
        <f-button>下右</f-button>
      </f-popover>
    </div>
  </div>
</template>

<style scoped>
.demo-popover {
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
