import * as components from './components'

import * as directives from './_directives'

import LoadingBar from './loading-bar'
import Message from './message'
import MessageBox from './message-box'
import Notice from './notice'

import create from './create'

const plugins = [LoadingBar, Message, MessageBox, Notice]

const FeiUI = create({
  components: Object.keys(components).map(key => components[key as keyof typeof components]),
  directives: Object.keys(directives).map(key => ({
    name: key,
    directive: directives[key as keyof typeof directives]
  })),
  plugins
})

export default FeiUI

export const install = FeiUI.install

export { LoadingBar, Message, MessageBox, Notice }
