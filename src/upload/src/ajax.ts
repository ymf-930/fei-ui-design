// https://github.com/ElemeFE/element/blob/dev/packages/upload/src/ajax.js

/** 请求错误对象：附带状态码、方法与地址，便于调用方展示 */
interface UploadError extends Error {
  status?: number
  method?: string
  url?: string
}

/** 进度事件：额外挂载百分比字段 */
interface UploadProgressEvent extends ProgressEvent {
  percent?: number
}

function getError(action: string, option: any, xhr: XMLHttpRequest): UploadError {
  const msg = `fail to post ${action} ${xhr.status}`
  const err = new Error(msg) as UploadError
  err.status = xhr.status
  err.method = 'post'
  err.url = action
  return err
}

function getBody(xhr: XMLHttpRequest) {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

export default function upload(option) {
  if (typeof XMLHttpRequest === 'undefined') {
    return
  }

  const xhr = new XMLHttpRequest()
  const action = option.action

  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e: ProgressEvent) {
      if (e.total > 0) {
        ;(e as UploadProgressEvent).percent = (e.loaded / e.total) * 100
      }
      option.onProgress(e)
    }
  }

  const formData = new FormData()

  if (option.data) {
    Object.keys(option.data).map(key => {
      formData.append(key, option.data[key])
    })
  }

  formData.append(option.filename, option.file)

  xhr.onerror = function error(e) {
    option.onError(e)
  }

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr), getBody(xhr))
    }

    option.onSuccess(getBody(xhr))
  }

  xhr.open('post', action, true)

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true
  }

  const headers = option.headers || {}

  for (const item in headers) {
    // eslint-disable-next-line no-prototype-builtins
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item])
    }
  }
  xhr.send(formData)
}
