// parent route component
import { defineComponent } from 'vue'

export const getParentComponent = (name: string) => {
  return defineComponent({
    name,
    setup() {
      return () => {
        return <router-view></router-view>
      }
    }
  })
}
