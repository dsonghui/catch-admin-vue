import Vue from 'vue'
import { mixins } from 'vue-class-component'
import { Component, Watch } from 'vue-property-decorator'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'
import './app.less'

@Component({
  name: 'App',
  components: {}
})
export default class App extends mixins(AppDeviceEnquire) {
  locale: any = zhCN

  render() {
    return <a-locale-provider locale={this.locale}>
      <div id="app">
        <router-view/>
      </div>
    </a-locale-provider>
  }
}
