export interface FTimelineProps {
  pending?: boolean
}

export interface FTimelineItemProps {
  color?: string
  dotTop?: boolean
}

/** @deprecated 旧命名，请使用 FTimelineProps */
export type BTimelineProps = FTimelineProps

/** @deprecated 旧命名，请使用 FTimelineItemProps */
export type BTimelineItemProps = FTimelineItemProps
