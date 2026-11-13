<template>
  <ul :class="[prefixCls + '-list']">
    <li
      v-for="(file, index) in files"
      :key="index"
      :class="fileCls(file)"
      @click="handleClick(file)"
    >
      <span @click="handlePreview(file)">
        <i :class="`f-iconfont f-icon-${format(file)}`"></i>
        {{ file.name }}
      </span>
      <i
        v-show="file.status === 'finished'"
        class="f-iconfont f-icon-close"
        :class="[prefixCls + '-list-remove']"
        @click="handleRemove(file)"
      ></i>
      <transition name="fade">
        <f-progress
          v-if="file.showProgress"
          :stroke-width="2"
          :percent="parsePercentage(file.percentage)"
          :status="file.status === 'finished' && file.showProgress ? 'success' : undefined"
        ></f-progress>
      </transition>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { FProgress } from '../../progress'

const prefixCls = 'fei-upload'

/** 上传列表项，由 FUpload 构造并维护 */
interface UploadFile {
  name: string
  status?: string
  percentage?: number
  showProgress?: boolean
  uid?: number
  response?: unknown
}

export default defineComponent({
  name: 'FUploadList',
  components: { FProgress },
  props: {
    files: {
      type: Array as PropType<UploadFile[]>,
      default() {
        return []
      }
    }
  },
  emits: ['file-click', 'file-preview', 'file-remove'],
  data() {
    return {
      prefixCls: prefixCls
    }
  },
  methods: {
    fileCls(file: UploadFile) {
      return [
        `${prefixCls}-list-file`,
        {
          [`${prefixCls}-list-file-finish`]: file.status === 'finished'
        }
      ]
    },
    handleClick(file: UploadFile) {
      this.$emit('file-click', file)
    },
    handlePreview(file: UploadFile) {
      this.$emit('file-preview', file)
    },
    handleRemove(file: UploadFile) {
      this.$emit('file-remove', file)
    },
    format(file: UploadFile) {
      const format = file.name.split('.').pop()?.toLocaleLowerCase() || ''
      let type = 'file-text'

      if (['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'].indexOf(format) > -1) {
        type = 'image'
      }
      if (['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'].indexOf(format) > -1) {
        type = 'video'
      }
      if (['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'].indexOf(format) > -1) {
        type = 'Youtube'
      }
      if (['pages', 'epub', 'pdf'].indexOf(format) > -1) {
        type = 'file-pdf'
      }
      if (['numbers', 'csv', 'xls', 'xlsx'].indexOf(format) > -1) {
        type = 'file-excel'
      }
      if (['keynote', 'ppt', 'pptx'].indexOf(format) > -1) {
        type = 'file-ppt'
      }

      return type
    },
    parsePercentage(val: any) {
      return parseInt(val, 10)
    }
  }
})
</script>
