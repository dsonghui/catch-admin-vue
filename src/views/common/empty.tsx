import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

@Component({
  name: 'IsEmptyPage',
  components: {}
})
export default class IsEmptyPage extends Vue {

  render() {
    return <div class='isEmpty'>
      isEmpty
    </div>
  }
}
