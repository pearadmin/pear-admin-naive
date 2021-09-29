<script lang="tsx">
  import { defineComponent } from 'vue'
  import Interaction from '@/components/Application/Interaction/Interaction.vue'

  export default defineComponent({
    components: {
      Interaction
    },
    setup () {
      return () => {
        return (
          <div>
            <h2>this is test page</h2>
            <Interaction/>
          </div>
        )
      }
    }
  })
</script>
