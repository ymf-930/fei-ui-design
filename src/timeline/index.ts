import FTimeline from './src/TimeLine.vue'
import FTimelineItem from './src/TimeLineItem.vue'

/**
 * 导出名必须与组件内部 `defineOptions({ name })` 一致（FTimeline / FTimelineItem）。
 *
 * 曾用名 `FTimeLine` / `FTimeLineItem` 与组件名不一致，造成两条使用路径分裂：
 * - 全局注册（app.use）：注册名取自 `component.name`，即 FTimeline → `<f-timeline>` 可用；
 * - 按需自动引入（unplugin-vue-components，见 docs/guide/import-on-demand.md）：
 *   解析器由标签反推导入名，`<f-timeline>` → `FTimeline` → 从本包导入，
 *   而本包当时只导出 FTimeLine，于是拿到 undefined，组件静默不渲染。
 */
export { FTimeline, FTimelineItem }

/** @deprecated 旧命名与组件 `name` 不一致，会导致按需自动引入失败。请使用 `FTimeline` */
export { FTimeline as FTimeLine }

/** @deprecated 旧命名与组件 `name` 不一致，会导致按需自动引入失败。请使用 `FTimelineItem` */
export { FTimelineItem as FTimeLineItem }

export type { FTimelineItemProps, FTimelineProps } from './src/types.ts'

/** @deprecated 旧命名，请使用 FTimelineProps */
export type { BTimelineProps } from './src/types.ts'

/** @deprecated 旧命名，请使用 FTimelineItemProps */
export type { BTimelineItemProps } from './src/types.ts'
