<template>
  <div class="con-components">
    <div class="con-logo fei-logo">
      <img src="/logos/fei-logo.png" alt="" />
      <div class="github-logo__1"></div>
      <div class="github-logo__2"></div>
      <div class="github-logo__3"></div>
    </div>
    <div class="con-logo gitee-logo">
      <!-- <i class="bx bxl-discord"></i> -->
      <img class="not-darken" src="/home/gitee-fill.png" alt="" />
      <img class="has-darken" src="/home/gitee.png" alt="" />
      <div class="github-logo__1"></div>
      <div class="github-logo__2"></div>
      <div class="github-logo__3"></div>
    </div>
    <div class="con-logo github-logo">
      <i class="bx bxl-github"></i>
      <!--      <f-icon name="github-fill"></f-icon>-->
      <div class="github-logo__1"></div>
      <div class="github-logo__2"></div>
      <div class="github-logo__3"></div>
    </div>
    <div class="content-components">
      <div class="component1">
        <div class="avatar">
          <img class="not-darken" src="/home/foto1.png" alt="" />
          <img class="back not-darken" src="/home/foto1.png" alt="" />
          <img class="has-darken" src="/home/foto12.png" alt="" />
          <img class="back has-darken" src="/home/foto12.png" alt="" />
          <span class="badge">8</span>
        </div>

        <div class="con-text">
          <h4>Segoe cute</h4>
          <p>Do you want to participate in our initiative? We are open.</p>

          <footer>
            <f-button type="danger">Open</f-button>
            <f-button>cancel</f-button>
          </footer>
        </div>
      </div>

      <div class="component2">
        <img src="/logos/fei-logo.png" alt="" />
      </div>

      <div class="component3">
        <div :class="{ active: switch1 }" @click="switch1 = !switch1" class="con-switch">
          <span class="circle" />
          <p>
            {{ switch1 ? 'on' : 'off' }}
          </p>
        </div>
        <div :class="{ active: switch2 }" @click="switch2 = !switch2" class="con-switch">
          <span class="circle" />
          <p>
            {{ switch2 ? 'on' : 'off' }}
          </p>
        </div>
      </div>

      <div class="component4">
        <img class="not-darken" src="/home/foto3.png" alt="" />
        <img class="has-darken" src="/home/foto10.png" alt="" />
        <h4>
          <span class="not-darken">Potted cactus</span>
          <span class="has-darken">Red Shoes</span>
        </h4>
        <f-button type="primary" class="home-button--block">Button</f-button>
      </div>

      <div class="component5">
        <i class="bx bxs-star"></i>
        <div class="con-img">
          <img src="/home/vue-logo.png" alt="" />
        </div>
        <h4>Vuejs Components</h4>

        <p>Framework components for VueJS. Create instances quickly with a few lines of code.</p>
      </div>

      <div class="component6">
        <f-button circle transparent>
          <i class="bx bx-dots-vertical-rounded"></i>
        </f-button>
        <div class="con-load"></div>
      </div>

      <div class="component7">
        <div class="con-img">
          <i class="bx bx-video"></i>
          <img class="not-darken" src="/home/foto4.png" alt="" />
          <img class="has-darken" src="/home/foto11.png" alt="" />
        </div>

        <header>
          <button icon dark shadow>
            <i class="bx bxs-heart"></i>
          </button>
          <button dark shadow>
            <i class="bx bxs-chat"></i>
            12
          </button>
        </header>

        <div class="content-text">
          <h4>Get Started</h4>
          <p>FEI-UI-DESIGN is an open source framework and you can help even in simple details</p>
        </div>

        <footer>
          <f-input v-model="input1" placeholder="Comment" class="home-input" />
          <f-button type="primary" circle plain>
            <i class="bx bx-send"></i>
          </f-button>
        </footer>
      </div>

      <div class="component8">
        <div class="con-icon">
          <i class="bx bxs-heart"></i>
        </div>

        <div class="con-img">
          <img class="not-darken" src="/home/foto2.jpg" alt="" />
          <img class="has-darken" src="/home/foto13.png" alt="" />

          <div class="play">
            <!-- <i class='bx bx-play' ></i> -->
            <i class="bx bxs-right-arrow"></i>
          </div>
        </div>

        <footer>
          <div>
            <h4>FEI-UI-DESIGN 4.0</h4>
            <p>Framework</p>
          </div>

          <div class="con-avatars">
            <img src="/home/foto9.png" alt="" />
            <img src="/home/foto8.png" alt="" />
            <img src="/home/foto7.png" alt="" />
          </div>
        </footer>
      </div>

      <div :class="{ active: focusSelect }" class="component9">
        <header>
          <input
            v-model="selectValue"
            placeholder="Select"
            @blur="handleBur"
            @click="handleClick"
            readonly
            type="text"
            name=""
            id="select"
          />
          <i class="bx bx-chevron-down"></i>
        </header>

        <ul :class="{ active: focusSelect }">
          <li @click="handleClickOption('Bruno Hoffman')">Bruno Hoffman</li>
          <li @click="handleClickOption('Chad kerley')">Chad kerley</li>
          <li @click="handleClickOption('Summer rose')">Summer rose</li>
        </ul>
      </div>

      <div class="component10">
        <f-button type="danger" circle>
          <i class="bx bx-play"></i>
        </f-button>
        <f-button type="warning" circle>
          <i class="bx bx-git-pull-request"></i>
        </f-button>
        <f-button type="primary" circle>
          <i class="bx bxl-github"></i>
        </f-button>
      </div>

      <div :class="{ active: focusDrop }" class="component11">
        <header>
          <input
            placeholder="Dropdown"
            @blur="handleBurDrop"
            @click="handleClickDrop"
            readonly
            type="text"
            name=""
            id=""
          />
          <i class="bx bx-chevron-down"></i>
        </header>

        <div class="liquid"></div>

        <ul :class="{ active: focusDrop }">
          <li>😉</li>
          <li>😺</li>
          <li>😽</li>
          <li>😎</li>
          <li>😂</li>
        </ul>
      </div>

      <div class="component12">
        <f-input v-model="input2" placeholder="Search" class="home-input" />
        <f-button type="primary" circle>
          <i class="bx bx-search"></i>
        </f-button>
      </div>

      <div class="component13">
        <header>
          <input placeholder="location" type="text" name="" id="location" />
          <button>
            <i class="bx bx-chevron-right"></i>
          </button>
        </header>
        <ul>
          <li>
            <f-checkbox v-model="check1" label="Spain" />
          </li>
          <li>
            <f-checkbox v-model="check2" label="Germany" />
          </li>
          <li>
            <f-checkbox v-model="check3" label="Italy" />
          </li>
          <li>
            <f-checkbox v-model="check4" label="Japan" />
          </li>
        </ul>

        <f-button type="primary" class="home-button--block">Lets Go!</f-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const switch1 = ref(false)
const switch2 = ref(true)
const focusSelect = ref(true)
const focusDrop = ref(true)
const selectValue = ref('')
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const check1 = ref(false)
const check2 = ref(false)
const check3 = ref(false)
const check4 = ref(false)

function handleClickOption(val) {
  selectValue.value = val
}

function handleClick() {
  focusSelect.value = !focusSelect.value
}

function handleBur() {
  setTimeout(() => {
    focusSelect.value = false
  }, 100)
}

function handleClickDrop() {
  focusDrop.value = !focusDrop.value
}

function handleBurDrop() {
  setTimeout(() => {
    focusDrop.value = false
  }, 100)
}
</script>
<style scoped lang="stylus">
getColor(colorx, alpha = 1)
  unquote("rgba(var(--fei-"+colorx+"), "+alpha+")")
getVar(var)
  unquote("var(--fei-"+var+")")

// 首页卡片改用真实组件后补齐的修饰类。
// 通栏按钮在原有样式体系里由 `--block` 修饰承担，组件库 FButton 没有对应 prop，
// 用这一条宽度规则代替；component4 / component13 两个通栏按钮共用。
.home-button--block
  width 100%

@keyframes rotate-load
  0%
    transform: rotate(45deg)
  10%
    transform: rotate(405deg)
  100%
    transform: rotate(405deg)

@keyframes waveslogo
  0%
    width: 100px
    height: 100px
  100%
    height: 500px
    width: 500px
    opacity: 0

@keyframes componentAnimate
  0%
    transform translate(0px)
  30%
    transform translate(0,-10px)
  50%
    transform translate(0,4px)
  70%
    transform translate(0,-15px)
  100%
    transform translate(0px)

.con-components
  .has-darken
    display none

.darken
  .component13
    header
      input
        background getVar(theme-bg) !important

  .con-logo
    .github-logo__1, .github-logo__2, .github-logo__3
      box-shadow: 0px 0px 10px 0px rgba(255,255,255,.25)
  .not-darken
    display none
  .has-darken
    display block
  .circle
    background getVar(theme-bg2) !important
  .bxs-star
    fill #fff !important
    opacity 1 !important
  .component13
    header
      button
        border 2px solid rgba(255,255,255,.1) !important
        color #fff !important
        opacity 1 !important
  .component7
    footer
      button
        background getColor('primary')
        color #fff !important
  *::placeholder
    color getVar(theme-color)

.con-logo
  position absolute
  transform scale(.3)
  opacity 0
  font-size 9rem
  z-index 20
  width 200px
  height 200px
  display flex
  align-items center
  justify-content center
  border-radius 50%
  box-shadow 0px 8px 20px 0px rgba(0,0,0,.04)
  transition all .25s ease
  &.fei-logo
    border-radius 50px
    img
      width 70%
      z-index 100
  &.gitee-logo
    border-radius 50px
    img
      width 70%
      z-index 100
  i
    z-index 30
  &:after
    content ''
    position absolute
    width 100%
    height 100%
    border-radius inherit
    background getVar(theme-layout)
    z-index 20
  .github-logo__1
    width: 0px
    background: transparent
    height: 0px
    position: absolute
    animation: waveslogo .7s ease infinite
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,.1)
    border-radius: inherit
    z-index 10
  .github-logo__2
    z-index 10
    width: 0px
    background: transparent
    height: 0px
    position: absolute
    animation: waveslogo 1.4s linear infinite
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,.1)
    border-radius: inherit
  .github-logo__3
    z-index 10
    width: 0px
    background: transparent
    height: 0px
    position: absolute
    animation: waveslogo 1.75s ease infinite
    box-shadow: 0px 0px 30px 0px rgba(0,0,0,.1)
    border-radius: inherit

.con-components
  width 60%
  position absolute
  right 0px
  height 80vh
  // background getVar(theme-bg)
  // background-color: #FFFFFF;
  // background-image: linear-gradient(180deg, getVar(theme-layout) 0%, getVar(theme-bg2) 30%, getVar(theme-bg2) 80%, getVar(theme-layout) 100%);

  display flex
  align-items center
  justify-content center
  transform scale(.8)
  z-index 100
  // overflow hidden
  .content-components
    position relative
    width 1100px
    height 100%

    .component13
      width 300px
      padding 15px
      background getVar(theme-layout)
      border-radius 20px
      top 180px
      left 0px
      position absolute
      box-shadow 0px 8px 20px 0px rgba(0,0,0,.04)
      transition all .25s ease
      animation componentAnimate 18s infinite ease
      &:hover
        box-shadow 0px 0px 0px 0px rgba(0,0,0,.1)
        transform translate(0, 5px)
      :deep(.home-input)
        width calc(100% - 50px)
      ul
        margin 0px
        padding 10px 0px
        list-style none
        li
          position relative
          display flex
          align-items center
          justify-content flex-start
          padding 3px 3px
          cursor pointer
          transition all .25s ease
          &:hover
            label
              opacity .6
          label
            transition all .25s ease
          .check
            width 22px
            height 22px
            display block
            background  getVar(theme-bg2)
            border-radius 5px
            display flex
            align-items center
            justify-content center
            transition all .25s ease
            margin-right 10px
            i
              transition all .3s ease
              font-size 1.1rem
              transform scale(.5)
              opacity 0
          input
            position absolute
            width 100%
            height 100%
            opacity 0
            z-index 100
            cursor pointer

            &:checked
              ~ .check
                background getColor('primary')
                i
                  opacity 1
                  color #fff
                  transform scale(1)
      header
        display flex
        align-items center
        justify-content center
        width 100%
        button
          border 2px solid rgba(0,0,0,.15)
          width 40px
          height 40px
          opacity .5
          background transparent
          padding 0px
          margin-left 10px
          display flex
          align-items center
          transition all .25s ease
          justify-content center
          &:hover
            background getColor('primary')
            border 2px solid getColor('primary')
            color #fff
            opacity 1
          i
            font-size 1.5rem
        input
          padding 8px 20px
          border 0px
          background getVar(theme-bg2)
          width calc(100% - 50px)
          border-radius 14px
          transition all .25s ease
          &:focus
            padding-left 25px
      button
        margin 0px
        padding 2px 0px
        border-radius 16px

    .component12
      display flex
      align-items center
      justify-content center
      position absolute
      top 540px
      left 0px
      transition all .25s ease
      animation componentAnimate 20s infinite ease alternate
      :deep(input)
        background getVar(theme-layout)
        padding 10px 15px
        box-shadow 0px 8px 20px 0px rgba(0,0,0,.04)
        width 275px
        &:focus
          padding-left 20px
          ~ button
            transform translate(-5px,-9px)
            box-shadow 0px 10px 20px -10px getColor('primary', .8)
      button
        position absolute
        right 0px
        top -3px
        border-radius 17px
        width 40px
        height 40px
        margin 0px
        box-shadow 0px 0px 0px 0px getColor('primary', .8)
        i
          font-size 1rem

    .component11
      position absolute
      top 640px
      left 100px
      transition all .25s ease
      border-radius 15px
      user-select none
      animation componentAnimate 16s infinite ease reverse
      .liquid
        width 20px
        background getVar(theme-layout)
        height 15px
        right 30px
        position absolute
        bottom 0px
        transform translate(0,80%) scaleX(.4)
        z-index 200
        opacity 0
        transition all .25s ease
        &:after
          content: ''
          position absolute
          top -5px
          left -20px
          width 20px
          height 20px
          background transparent
          border-radius 0px 50% 50% 0px
          border-right 5px solid getVar(theme-layout)
          border-bottom 5px solid getVar(theme-layout)
          border-top 5px solid getVar(theme-layout)
        &:before
          content: ''
          position absolute
          top -5px
          right -20px
          width 20px
          height 20px
          background transparent
          border-radius 0px 50% 50% 0px
          border-right 5px solid getVar(theme-layout)
          border-bottom 5px solid getVar(theme-layout)
          border-top 5px solid getVar(theme-layout)
          transform rotate(180deg)
      &.active
        .liquid
          opacity 1
          transform translate(0, 100%)
        input
          border-radius 15px
          user-select none
        i
          transform rotate(-180deg)
      ul
        width 100%
        position absolute
        top 0px
        background getVar(theme-layout)
        list-style none
        border-radius 15px
        padding-bottom 5px
        opacity 0
        visibility hidden
        transition all .25s ease
        z-index 100
        transform translate(0, 10px)
        padding-top 7px
        display flex
        align-items center
        justify-content center
        padding-left 0px
        box-shadow 0px 8px 20px 0px rgba(0,0,0,.04)
        &.active
          opacity 1
          visibility visible
          transform translate(0, 40px)
          margin 16px 0
        li
          padding 7px 4px
          font-size .8rem
          transition all .25s ease
          cursor pointer
          &:hover
            transform scale(1.3)
      header
        z-index 200
        display flex
        align-items center
        justify-content center
        position relative
        input
          background getVar(theme-layout)
          padding 12px 15px
          width 100%
          border 0px
          border-radius 15px
          cursor pointer
          transition all .25s ease
          box-shadow 0px 0px 0px 0px rgba(0,0,0,.05)
          font-size .8rem
          box-shadow 0px 8px 20px 0px rgba(0,0,0,.04)
          max-width 170px
          &::selection
            background transparent
        i
          position absolute
          right 12px
          pointer-events none
          font-size 1.4rem
          transition all .25s ease

    .component10
      top 600px
      position absolute
      left 360px
      background getVar(theme-layout)
      border-radius 18px
      box-shadow 0px 8px 20px 0px rgba(0,0,0,.04)
      transition all .25s ease
      animation componentAnimate 14s infinite ease
      &:hover
        box-shadow 0px 0px 0px 0px rgba(0,0,0,.1)
        transform translate(0, 5px)
      button
        margin 15px
        &:first-child
          i
            transform translate(1px)

    .component9
      position absolute
      top 580px
      left 490px
      box-shadow 0px 8px 20px 0px rgba(0,0,0,.04)
      transition all .25s ease
      border-radius 15px
      user-select none
      animation componentAnimate 19s infinite ease-out alternate
      min-width 200px
      &:hover
        box-shadow 0px 0px 0px 0px rgba(0,0,0,.1)
        transform translate(0, 5px)
      &.active
        input
          border-radius 15px 15px 0px 0px
          box-shadow 0px 10px 25px -10px rgba(0,0,0,.08)
          user-select none

        i
          transform rotate(-180deg)
      ul
        width 100%
        position absolute
        top 0px
        background getVar(theme-layout)
        list-style none
        border-radius 0px 0px 15px 15px
        padding-bottom 5px
        opacity 0
        visibility hidden
        transition all .25s ease
        z-index 100
        transform translate(0, 10px)
        padding-top 7px
        &.active
          opacity 1
          visibility visible
          transform translate(0, 28px)
          margin 1.2rem 0
        li
          padding 7px
          font-size .8rem
          transition all .25s ease
          cursor pointer
          &:hover
            padding-left 12px
            color getColor('primary')
      header
        z-index 200
        display flex
        align-items center
        justify-content center
        position relative
        input
          background getVar(theme-layout)
          padding 14px 15px
          width 100%
          border 0px
          border-radius 15px
          cursor pointer
          transition all .25s ease
          box-shadow 0px 0px 0px 0px rgba(0,0,0,.05)
          font-size .8rem
          color getVar(theme-color)
          &::selection
            background transparent
        i
          position absolute
          right 12px
          pointer-events none
          font-size 1.4rem
          transition all .25s ease

    .component8
      width 260px
      background getVar(theme-layout)
      border-radius 30px
      padding 15px
      position absolute
      left 365px
      top 180px
      z-index 100
      box-shadow 0px 15px 30px -8px rgba(0,0,0,.08)
      transition all .25s ease
      animation componentAnimate 22s infinite ease reverse
      &:hover
        box-shadow 0px 0px 0px 0px rgba(0,0,0,.1)
        transform translate(0, 7px)
      footer
        display flex
        align-items center
        justify-content space-between
        padding 10px 0px
        h4
          margin 0px
        p
          font-size .8rem
          margin 0px
        .con-avatars
          display flex
          align-items center
          justify-content center
          img
            border 2px solid getVar(theme-layout)
            width 45px
            border-radius 50%
            margin-left -23px
            transition all .25s ease
            z-index 5
            &:hover
              box-shadow 0px 10px 15px 0px rgba(0,0,0,.1)
              transform scale(1.1)
            ~ img
              z-index 10
      .con-icon
        position absolute
        top -20px
        left -20px
        width 60px
        height 60px
        border-radius 22px
        background getVar(theme-layout)
        box-shadow 10px 12px 50px -6px rgba(0,0,0,.3)
        z-index 300
        display flex
        align-items center
        justify-content center
        i
          color getColor('danger')
          font-size 1.4rem
          text-shadow 0px 4px 15px getColor('danger', .4)
      .con-img
        width 230px
        height 250px
        position relative
        overflow hidden
        border-radius 30px 30px 30px 8px
        z-index 100
        display flex
        align-items center
        justify-content center
        cursor pointer
        &:hover
          .play
            width 80px
            height 80px
            border-radius 25px
        .play
          width 60px
          height 60px
          background rgba(255,255,255,.3)
          position absolute
          border-radius 50%
          backdrop-filter blur(6px)
          display flex
          align-items center
          justify-content center
          transition all .25s ease
          i
            font-size 1.5rem
            color #fff
            transition all .25s ease
            transform rotate(0deg) translate(0px)
        img
          height 100%

    .component7
      width 260px
      background getVar(theme-layout)
      border-radius 30px
      padding 15px
      position absolute
      left 760px
      top 410px
      z-index 100
      box-shadow 0px 15px 30px -8px rgba(0,0,0,.08)
      transition all .25s ease
      animation componentAnimate 15s infinite ease
      &:hover
        box-shadow 0px 0px 0px 0px rgba(0,0,0,.1)
        transform translate(0, 7px)
      footer
        display flex
        align-items center
        justify-content center
        margin-top 15px
        button
          width 42px
          height 42px
          margin-left 10px
        :deep(.home-input)
          width calc(100% - 60px)

      .content-text
        h4
          margin 0px
          margin-top 15px
        p
          margin 5px 0px
          font-size .7rem
          opacity .6
      header
        display flex
        align-items center
        justify-content flex-start
        padding-left 10px
        margin-top -20px
        z-index 200
        position relative
        button
          padding 5px 12px
          display flex
          align-items center
          justify-content center
          min-height 40px
          border-radius 16px
          border 0px
          margin 0px 5px
          background getVar(theme-layout)
          color getVar(theme-color)
          box-shadow 0px 5px 15px 0px rgba(0,0,0,.08)
          font-weight bold
          font-size .75rem
          transition all .25s ease
          &:hover
            background getColor('danger')
            i
              color #fff
          i
            font-size 1.1rem
            color getColor('danger')
            text-shadow 0px 4px 15px getColor('danger', .4)
          &:last-child
            &:hover
              background getColor('primary')
              color #fff
              i
                color #fff
            i
              color getColor('primary')
              text-shadow 0px 4px 15px getColor('primary', .4)
              margin-right 5px


      .con-img
        width 230px
        height 200px
        position relative
        overflow hidden
        border-radius 30px 30px 30px 8px
        z-index 100
        i
          position absolute
          top 20px
          left 20px
          color #fff
          font-size 1.2rem
        img
          width 100%

    .component6
      display flex
      align-items center
      justify-content center
      flex-direction column
      position absolute
      width 160px
      height 160px
      background getVar(theme-layout)
      padding 20px
      border-radius 30px
      left 920px
      top 350px
      user-select none
      box-shadow 0px 15px 30px -8px rgba(0,0,0,.08)
      transition all .25s ease
      z-index 200
      animation componentAnimate 18s infinite ease alternate
      &:hover
        box-shadow 0px 0px 0px 0px rgba(0,0,0,.1)
        transform translate(0, 7px)
      .con-load
        width 85px
        height 85px
        border-radius 50%
        border 8px solid getColor('primary', 1)
        box-shadow 0px 0px 20px 0px getColor('primary', .1), inset 0px 0px 20px 0px getColor('primary', .1)
        border-left 8px solid getColor('primary', .1)
        transform rotate(45deg)
        animation rotate-load infinite 8s ease

      button
        position absolute
        top 5px
        right 5px
        padding 0px
        i
          font-size 1.1rem
          color getVar(theme-color) !important

    .component5
      display flex
      align-items center
      justify-content center
      flex-direction column
      position absolute
      width 220px
      background getVar(theme-layout)
      padding 20px
      border-radius 30px
      left 860px
      top 85px
      user-select none
      box-shadow 0px 15px 30px -8px rgba(0,0,0,.08)
      transition all .25s ease
      animation componentAnimate 13s infinite ease reverse
      &:hover
        box-shadow 0px 0px 0px 0px rgba(0,0,0,.1)
        transform translate(0, 7px)
        .con-img
          transform scale(1.2) translate(0px, -10px)
      i
        position absolute
        top 15px
        right 15px
        fill getVar(theme-color)
        opacity .2
      p
        font-size .7rem
        opacity .6
        text-align center
        margin 0px
      h4
        margin 0px
        margin-top 8px
        margin-bottom 6px
        font-size .8rem
        margin 10px 0px
      .con-img
        width 90px
        height 90px
        border-radius 25px
        overflow hidden
        background alpha(#41b883, .08)
        transition all .25s ease
      img
        padding 20px
        width 100%

    .component4
      display flex
      align-items center
      justify-content center
      flex-direction column
      position absolute
      width 140px
      background getVar(theme-layout)
      padding 10px
      border-radius 30px
      user-select none
      box-shadow 0px 15px 30px -8px rgba(0,0,0,.08)
      transition all .25s ease
      animation componentAnimate 16s infinite ease
      left 668px
      top 120px
      &:hover
        box-shadow 0px 0px 0px 0px rgba(0,0,0,.1)
        transform translate(0, 7px)
        img
          transform scale(1.2) translate(0px, -10px)
      h4
        margin 0px
        margin-top 8px
        margin-bottom 6px
        font-size .8rem
      img
        width 120px
        height 120px
        border-radius 30px
        transition all .25s ease
      button
        border-radius 20px

    .component3
      position absolute
      left 650px
      top 25px
      display flex
      align-items center
      justify-content center
      transition all .25s ease
      animation componentAnimate 21s infinite ease alternate
      .con-switch
        width 65px
        height 35px
        background getVar(theme-layout)
        box-shadow 0px 5px 15px 0px rgba(0,0,0,.04)
        border-radius 25px
        display flex
        align-items center
        justify-content space-between
        padding 5px
        margin 10px 12px
        cursor pointer
        transition all .25s ease
        &:active
          &.active
            .circle
              transform translate(25px) !important
          .circle
            width 35px !important
            border-radius 20px
        &:hover
          transform translate(0,-5px)
          box-shadow 0px 10px 15px 0px rgba(0,0,0,.08)
        &.active
          background getColor('primary')
          .circle
            transform translate(30px)
            background getVar(theme-layout) !important
            box-shadow -3px 3px 20px 0px rgba(255,255,255,.35)
          p
            color rgba(255,255,255,1)
            opacity 1
            transform translate(-30px)
        .circle
          width 25px
          height 25px
          background getVar(theme-layout)
          box-shadow 5px 5px 15px 0px rgba(0,0,0,.08)
          border-radius 50%
          position relative
          display block
          transition all .25s ease
          z-index 10
        p
          z-index 5
          transition all .25s ease
          font-size .7rem
          font-weight bold
          margin 0px
          width calc(100% - 35px)
          text-align center
          margin 0px 5px
          opacity .5
          user-select none

    .component2
      width 140px
      height 140px
      position absolute
      left 460px
      top 0px
      box-shadow 0px 15px 30px -8px rgba(0,0,0,.08)
      border-radius 30%
      background getVar(theme-layout)
      padding 35px
      transition all .25s ease
      animation componentAnimate 19s infinite ease reverse
      &:hover
        box-shadow 0px 0px 0px 0px rgba(0,0,0,.1)
        transform translate(0, 7px)
      img
        width 100%
        height 100%


    .component1
      border-radius 35px
      width 400px
      box-shadow 0px 15px 30px -8px rgba(0,0,0,.08)
      display flex
      align-items center
      justify-content center
      padding 8px 10px
      background getVar(theme-layout)
      transition all .25s ease
      animation componentAnimate 15s infinite ease
      position absolute
      top 0px
      left 0px
      .con-text
        padding 0px 20px
        position relative
        background transparent
        width calc(100% - 100px)
        padding-left 23px
        footer
          display flex
          align-items center
          justify-content center
          position absolute
          bottom -30px
          button
            min-width 100px
        p
          font-size .8rem
          padding-bottom 20px
          margin 0px
          opacity .6
        h4
          margin 0px
          padding 0px
          padding-bottom 5px
      .avatar
        border-radius 30%
        position relative
        width 100px
        height 100px
        z-index 200
        img
          border-radius inherit
          z-index 100
          position relative
          width 100%
          &.back
            opacity .25
            position absolute
            bottom -20px
            left 0px
            filter blur(15px)
            z-index 10
        .badge
          position absolute
          bottom 4px
          right -6px
          background getColor('danger')
          box-shadow 0px 4px 10px 0px getColor('danger', .6)
          width 20px
          height 20px
          color #fff
          font-weight bold
          display flex
          align-items center
          justify-content center
          font-size .6rem
          border-radius 50%
          z-index 120
          user-select none

@media (min-width: 1150px)
  .con-components
    width 60%
    position absolute
    right 0px
    height 80vh
    // background getVar(theme-bg)
    // background-color: #FFFFFF;
    // background-image: linear-gradient(180deg, getVar(theme-layout) 0%, getVar(theme-bg2) 30%, getVar(theme-bg2) 80%, getVar(theme-layout) 100%);

    display flex
    align-items center
    justify-content center
    transform scale(.8)
    z-index 100
    // overflow hidden
    &.btn-hover
      &.fuidesign-hover
        .fei-logo
          transform scale(1)
          opacity 1
      &.gitee-hover
        .gitee-logo
          transform scale(1)
          opacity 1
      &.github-hover
        .github-logo
          transform scale(1)
          opacity 1
      .component13
        top 160px !important
        left -150px !important
        // transform translate(-150px, -20px) !important
        z-index 20
      // animation: none !important
      .component12
        top 560px !important
        left -90px !important
      // transform translate(-90px, 20px) !important
      .component11
        top 710px !important
        left 10px !important
      // transform translate(-90px, 70px) !important
      .component10
        top 650px !important
        left 320px !important
      // transform translate(-40px, 50px) !important
      .component9
        top 660px !important
        left 490px !important
      // transform translate(0px, 80px) !important
      .component8
        top 20px !important
        left 120px !important
        // transform translate(-270px, -160px) !important
        z-index 10
      .component7
        top 450px !important
        left 810px !important
      // transform translate(50px, 40px) !important
      .component6
        top 330px !important
        left 960px !important
      // transform translate(40px, -20px) !important
      .component5
        top 15px !important
        left 920px !important
      // transform translate(60px, -70px) !important
      .component4
        top 60px !important
        left 748px !important
      // transform translate(80px, -60px) !important
      .component3
        top -75px !important
        left 680px !important
      // transform translate(30px, -100px) !important
      .component2
        top -70px !important
        left 430px !important
      // transform translate(-30px, -70px) !important
      .component1
        top -100px !important
        left -100px !important
        transform translate(-100px, -100px) !important

@media (max-width: 1150px)
  .content-components
    transform scale(.7)
@media (max-width: 960px)
  .con-components
    width 100%
    .content-components
      transform scale(.7)
      left -7%
      right auto
      bottom 0px
      width 100% !important
      margin-top 250px
@media (max-width: 960px)
  .con-components
    .content-components
      left -12%
@media (max-width: 760px)
  .con-components
    display none
    .content-components
      left -18%
@media (max-width: 470px)
  .con-components
    .content-components
      margin-top 280px
      transform scale(.6)
      left -25%

// ============================================================================
// 首页演示区盒型回填：对齐「改动前」基线（6c51741）
// ----------------------------------------------------------------------------
// 起因：2a74f25 把首页那批与组件库**撞名**的 vuesax 静态块改成了组件库真实组件
//   （用户决策，解 vs-→fei- 重命名后的同名冲突）。真实组件的盒型比旧静态块紧凑：
//     旧 .vs-button     不设宽高，靠内层 .vs-button__content 的 padding 撑开
//                       （文字/通栏按钮 `padding: 8px 12px`；图标按钮 .vs-button--icon 为 `8px`），
//                       按钮本身 `padding: 0 / border: 0 / margin: var(--vs-button-margin)`，
//                       行高继承 body 的 24px。
//     新 .fei-button    固定 `height: var(--fei-default-height)`(32px)、`padding: 0 16px`、
//                       `line-height: 1`、`font-size: 14px`、`border: 1px`，并给相邻按钮加了
//                       `margin-left: 8px`；内层 .fei-button__content 只是裸 span。
//   ⇒ 演示盒比改动前矮/窄（component1/4/6/7/10/12/13），component10 还由竖排变横排。
// 处置：用户要求「与改动前完全一致」⇒ 这里把盒型压回基线实测值。
//   ⚠️ 只作用于首页演示区，**不改组件库本体**：.fei-button / .fei-input / .fei-checkbox
//      是全站公共样式，直接改会影响所有文档页与组件的真实用法。
// 数值来源：基线产物 CDP 实测 —— `.workbuddy/scripts/probe-demo-boxes.mjs`
//   （基线 http://127.0.0.1:4177 起 stale/site-fix/site；当前 http://127.0.0.1:4176 起 site/）。
// 回归口径：`.workbuddy/scripts/diff-dom-structural.mjs`（对类名改名免疫的结构化比对）
//   基线 ↔ 当前应无几何差异；仅允许 .config 齿轮相关项（那是用户要求隐藏的）。
// ============================================================================
.con-components .content-components
  // ---- ① 按钮：还原旧 .vs-button 的基础盒型 ----
  :deep(.fei-button)
    display flex            // 旧 .vs-button 是块级 flex（新的是 inline-flex）
    height auto             // 覆盖固定 32px —— 旧按钮高度由内层 content 撑出
    padding 0               // 旧 .vs-button padding: 0
    border 0                // 旧 .vs-button border: 0
    font-size .8rem         // 旧 .vs-button font-size: 0.8rem
    line-height 24px        // 旧按钮继承 body 的 24px 行高（新的是 line-height: 1）
    letter-spacing normal   // 旧 .vs-button 无字距（新的是 0.02857em，会把图标按钮撑宽）
    border-radius 12px      // 旧 --vs-button-border-radius: 12px（新的是 6px；is-circle 还会变正圆）
    overflow hidden
    z-index 1
    box-shadow none
  // 旧 .vs-button__content：width 100% + 居中 + padding 8px 12px
  :deep(.fei-button__content)
    display flex
    align-items center
    justify-content center
    width 100%
    padding 8px 12px
  // 图标按钮的图标尺寸来自旧 .vs-button--icon i { font-size: 1.15rem }；
  // 组件库现在不设，图标会缩到 14px。boxicons 的 `.bx{display:inline-block;line-height:1}`
  // 让图标盒高 = 字号，所以字号一改，内容盒与按钮盒就同步回到基线。
  .component7
    footer
      :deep(.fei-button i)
        font-size 1.15rem
  .component10
    :deep(.fei-button i)
      font-size 1.15rem

  // ---- ② 图标按钮（component6 的「…」、component10 的 3 个）：旧 content 内边距是 8px ----
  .component6
    :deep(.fei-button__content)
      padding 8px
  .component10
    :deep(.fei-button__content)
      padding 8px
    :deep(.fei-button)
      margin 15px           // 旧 scoped `.component10 button { margin: 15px }`，显式复述以免被 ① 的规则盖住

  // ---- ③ 各组件旧有的按钮外边距 / 圆角 / 显示方式 ----
  .component1
    .con-text
      footer
        :deep(.fei-button)
          margin 5px        // 旧 .vs-button 默认 --vs-button-margin: 5px；同时压掉组件库的 `.fei-button + .fei-button{margin-left:8px}`
        // 旧 `.vs-button--shadow`（cancel）：青色主题字 + 面板底。
        // 2a74f25 删掉了这条 scoped 规则（.vs-button--shadow 不再存在），
        // 新 `<f-button>` 走 .fei-button 的 --f-btn-text-color（#4e5969），与基线 #2c3e50 不同。
        :deep(.fei-button--default)
          color getVar(theme-color) !important
          background getVar(theme-layout) !important
  .component4
    :deep(.fei-button)
      display block         // 旧 .vs-button--block 是 display:block（新的是 inline-flex）
      margin 5px
  .component6
    :deep(.fei-button)
      margin 5px            // 旧 .vs-button 默认 margin 5px；该按钮绝对定位，外边距同时决定 top/right 的实际偏移
      // 旧 `.vs-button--transparent { background: transparent; color: rgba(var(--vs-color), 1) }`
      // + `.vs-button--dark`（--vs-dark = 30,30,30）⇒ 基线是「透明底 + #1e1e1e 字」。
      // 新的 `.is-transparent` 只把 --f-btn-bg-color 置为 transparent、字色仍走
      // --f-btn-text-color(#4e5969)，且实测底色并未变透明 —— 两条都按基线压回。
      background transparent
      color getColor('dark')
  .component7
    footer
      :deep(.fei-button)
        margin 5px          // 旧 .vs-button 默认 5px；footer 高 52 = 42 + 5 + 5
        margin-left 10px    // 旧 scoped `.component7 footer button { margin-left: 10px }`
        // 旧 `.vs-button--flat { background: rgba(var(--vs-color), .15) }`（--vs-color = primary）
        // ⇒ 基线底色 rgba(26,92,255,.15)。新的 is-plain 走 --f-btn-bg-color，给的是
        // rgb(232,239,255)（primary-light5），透明度层级对不上，故按基线写死。
        background getColor('primary', .15)
  .component12
    :deep(.fei-button)
      border-radius 17px    // 旧 scoped 值，需在 ① 之后复述
  .component13
    :deep(.fei-button)
      display block         // 旧 .vs-button--block
      padding 2px 0         // 旧 scoped `.component13 button { padding: 2px 0 }`
      border-radius 16px    // 旧 scoped 值，需在 ① 之后复述

  // ---- ④ 输入框：旧 .vs-input 没有固定高，高度 = 上下 padding + 边框 + 24px 行盒 ----
  .component7
    footer
      :deep(.fei-input)     // 旧 scoped 覆盖：padding 10px 14px / border 0 / font-size .7rem ⇒ 44px
        height auto
        padding 10px 14px
        border 0
        border-radius 10px
        background getVar(theme-bg)
        font-size .7rem
        line-height 24px
      // 基线里 `.vs-input` **没有**任何作者级 ::placeholder 规则 ⇒ 占位文字走浏览器默认色
      // （实测 rgba(60,60,67,.56) 叠在 #f4f7f8 上 = rgb(141,143,147)，与截图逐通道吻合）。
      // 组件库把占位色统一成了 --fei-color-text-placeholder(#c9cdd4) ⇒ 这里按基线写回。
      :deep(.fei-input)::placeholder
        color rgba(60, 60, 67, .56)
  .component12
    // 旧 scoped padding 是 `10px 15px`、加基础样式 border 2px solid transparent ⇒ 48px。
    // 这里改成 `9px 15px 11px 11px`：上下各让 1px（内容盒上移 1px、padding 总和不变 ⇒ 总高仍 38.4px），
    // 左右把左内边距收 4px。原因见下方长注释——基线的可见文字与 input 内容盒本就不同位。
    :deep(.fei-input)
      height auto
      padding 9px 15px 11px 11px
      border 2px solid transparent
      line-height 24px
    // ⚠️ 基线这个输入框的可见文字**不是**原生 placeholder（input 的 placeholder 属性是空串），
    //   而是 `.vs-input__label`：font-size 12.8px / color rgb(44,62,80) / opacity .4，
    //   绝对定位在 (664.53, 584.55) —— 与 input 自己的内容盒（左 671.13）错开。
    //   新版 f-input 只有原生 placeholder，只能用伪元素写回字号与颜色，并用 padding 把**位置**补齐：
    //     水平：原生 placeholder 的起点 = 内容盒左边，比基线 label 偏右 4px ⇒ padding-left 15→11；
    //     垂直：偏下 1px ⇒ 上下 padding 各让 1px。
    //   ⚠️ 垂直**不能**靠 line-height 修：input 内文字是垂直居中的，行高加减只会让行盒对称缩放、
    //      字形一动不动（本轮实测加 22px 完全无效，已删除该声明，避免留下无效 CSS）。
    //   取舍：输入态字号仍是 14px（基线输入态也是 14px）—— 一个 font-size 无法同时满足
    //   占位态(12.8px) 与输入态(14px)，此处以**默认可见的占位态**为准。
    // ⚠️ 颜色必须跟着主题走：基线 label 的 color 就是主题前景色 —— 浅色 #2c3e50、暗色 #fff
    //   （实测暗色下写成固定 rgba(44,62,80,.4) 会渲染成 (36,44,53)，在 30,32,35 的输入框里几乎看不见）。
    //   透明度同样是基线的写法（.vs-input__label 有 opacity: .4）。已实测：Chrome 下
    //   ::placeholder 的 opacity 真会参与渲染（注入试色 → 白 40% 叠底色得 (118,119,121)，基线 (120,121,123)）。
    :deep(.fei-input)::placeholder
      font-size 12.8px
      color getVar(theme-color)
      opacity .4
  // wrapper 自身：组件库 .fei-input-wrapper 比基线的 .vs-input-parent 多两条声明 ——
  //   `position: relative` 与 `line-height: var(--fei-base-line-height)`（= 1.5715 × 14px = 22.001px）；
  //   基线 .vs-input-parent 两者皆无（`static`，line-height 继承 body 的 24px）。
  // 实测二者都**不可见**（几何 diff 判为"同几何"、像素 diff 该处 0 差异）：
  //   ① lh：wrapper 是 inline-block 容器、里面只装一个 input，行盒高由更高的 inline-block
  //      input(35.2px) 决定 ⇒ 行高 24 还是 22 都不改变 wrapper 高度；
  //   ② position：wrapper 内没有绝对定位后代（无 prefix/suffix 图标）⇒ 不产生包含块作用。
  // 仍按基线值补回，好让结构化 diff 只剩「齿轮 / logo 换图」这两项**用户决策**差异。
  .component7 footer,
  .component12
    :deep(.fei-input-wrapper)
      position static
      line-height 24px

  // ---- ⑤ 复选框（component13）：旧 .vs-checkbox-content / -con / -mask / -label 的盒型 ----
  .component13
    ul
      li
        :deep(.fei-checkbox)        // 旧 .vs-checkbox-content：flex 行 + 左对齐
          display flex
          align-items center
          justify-content flex-start
          height auto
          margin-right 0            // 组件库自带的 8px 右边距旧版没有
          font-size .9rem
        :deep(.fei-checkbox__input) // 旧 .vs-checkbox-con：23×23
          width 23px
          height 23px
          line-height 1
        :deep(.fei-checkbox__inner) // 旧 .vs-checkbox-mask：撑满 + 32% 圆角 + 2px 灰边
          width 100%
          height 100%
          border-radius 32%
          // 旧 .vs-checkbox-mask 自身**没有底色**（实测：填充色恒等于卡片底色 —— 浅色 (255,255,255)、
          // 暗色 (30,32,35)）。组件库给的是白底：浅色下与白卡片同色、看不出来，暗色下就是一个白方块。
          background transparent
          // ⚠️ 必须走 getColor() 拼串：Stylus 内置 rgba() 遇到 var() 会抛
          //   `expected rgba or hsla, but got call:var(...)` 直接中断构建
          border 2px solid getColor('gray-4')
        // 勾（对号）：基线画法见 `styles/icons.styl` 的 `.vs-icon-check` ——
        //   一个 8×13 的 `span`（`rotate(45deg)` + `margin-top -2px`，由 flex 居中在 23×23 的 mask 里）
        //   装两条白线：`.line1` 横笔 8×2（`border-radius 5px 0 0 5px`：外端圆头、拐角方头）、
        //   `.line2` 竖笔 2×13（`5px 5px 0 0`）；且**只在选中态**出现
        //   （`.vs-checkbox-mask` 的可见性由 `input:checked ~ .vs-checkbox-mask` 控制）。
        // 组件库的 `.fei-checkbox__inner:after` 正相反：`content:''` **无条件绘制**、尺寸更小
        //   （4.714×9.142，腿长比 1:1.94 而非基线的 1:1.625）、无圆角、位置偏左上
        //   ⇒ 未选中时也画一道白勾：浅色下白勾叠白卡片看不见（这正是浅色 diff 一直干净的原因），
        //     暗色下就是 4 道白痕。而选中时又会叠出「主色描边 + 白勾」两个额外形状。
        // 处置：两根笔**自己画**，中心点取自基线实测（CDP 逐元素反算，见 §10.22）——
        //   横笔中心 (7.611, 13.389)、竖笔中心 (13.621, 11.621)，均以 23×23 inner 的**边框盒**为原点。
        //   ⚠️ 两笔中心是**斜对角**关系（Δ = +6.01, −1.768），别凭"L 形"直觉顺手写成镜像位置：
        //     写成镜像（竖笔中心偏左上）会画出一个「<」而不是「✓」——本轮踩过这个坑。
        // ⚠️ 绝对定位的包含块是 inner 的 **padding box**，而 inner 带 2px 边框
        //   ⇒ left/top 需各自再 −2（基线那条 2px 灰边画在 mask 的 `:before` 上、mask 自身无边框，
        //     所以基线坐标**没有**这个偏移，照搬会整体偏右下 2px）。
        // ⚠️ 组件库那条 `:after` 的 `border-right/bottom` 必须显式清 0：本处只设 `background`，
        //   不清边框就会与自画的两笔叠成第二个 L。
        // ⚠️ 同理要抹掉 `.fei-checkbox__input.is-checked:after` —— 组件库给选中态加了一个 1px
        //   主色方框 + `checkEffect`（scale 1→1.4 / opacity .5→0）动画；`animation-fill-mode:
        //   backwards` **不保留终态** ⇒ 动画放完后那个 1px 主色方框会**实实留在地上**，
        //   表现为「选中后只有一个蓝圈、没有填充也没有勾」（基线没有这个元素）。
        :deep(.fei-checkbox__inner)
          position relative        // 自画两笔的包含块（组件库本就有，此处显式声明以免被上游改动带崩）
          &::before
            content none           // 未选中：竖笔不画
          &:after
            content none           // 未选中：横笔不画（同时压掉组件库那条无条件白勾）
        :deep(.fei-checkbox__input.is-checked:after)
          content none
        // 选中态：基线 `input:checked ~ .vs-checkbox-mask` 做两件事 ——
        //   ① `:after` 用主色铺满（`border-radius: inherit` = 32%）；
        //   ② `:before`（那条 2px 灰边）淡出（opacity 0）。
        // 于是选中态 = 一整块主色 + 白勾。这里让 `__inner` 自己成为那个实心块：
        //   底色与描边同为主色（`box-sizing: border-box` ⇒ 底色本来就铺到边框下，视觉是一整块）。
        :deep(.fei-checkbox__input.is-checked .fei-checkbox__inner)
          background getColor('primary')
          border-color getColor('primary')
          &::before                // 竖笔 2×13：中心 (13.621, 11.621)
            content ''
            position absolute
            width 2px
            height 13px
            left 10.621px
            top 3.121px
            background #fff
            border-radius 5px 5px 0 0
            transform rotate(45deg)
          &:after                  // 横笔 8×2：中心 (7.611, 13.389)
            content ''
            position absolute
            width 8px
            height 2px
            left 1.611px
            top 10.389px
            border 0
            background #fff
            border-radius 5px 0 0 5px
            transform rotate(45deg)
        :deep(.fei-checkbox__label) // 旧 .vs-checkbox-label：padding 7px + font-size 0.9rem
          display flex
          align-items center
          justify-content center
          padding 7px
          font-size .9rem

  // ---- ⑥ 暗色分支：发送按钮在暗色下是**实心主色**，不是淡底 ----
  // 旧主题本来就有 `.darken .component7 footer button { background: getColor('primary') }`
  // （正文第 353 行的老规则，还在），但它的特异性低于本覆盖层 ③ 里那条淡底
  // ⇒ 会被压掉。故在此用 `.darken` 前缀（特异性更高）把暗色值补回来。
  .darken &
    .component7
      footer
        :deep(.fei-button)
          background getColor('primary')
</style>
