---
title: JSX & TSX
---

<card>

FEI-UI-DESIGN 的全部组件都可以用 JSX / TSX 编写，在渲染函数中直接使用即可，无需额外的适配层。

## 启用 JSX & TSX

关于启用 JSX 和 TSX，请参考你使用的工具链的相关文档。

## 使用组件

在JSX中，推荐直接引入的形式使用组件

```ts
import { defineComponent } from 'vue'
import { FButton } from 'fei-ui-design'

export default defineComponent({
  render() {
    return <FButton>{{ default: () => 'Star Kirby' }}</FButton>
  }
})
```

</card>
