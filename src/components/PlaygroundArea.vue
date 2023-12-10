<script lang="ts">
import InputArea from './InputArea.vue'
import OutputArea from './OutputArea.vue'
import { ref, watch } from 'vue'

export default {
    components: {
        InputArea, OutputArea
    },
    props: ['result'],
    setup(props, { emit }) {
        const setStatements = (newValue: String) => emit('updateStatements', newValue)

        const result = ref(props.result)

        watch(() => props.result, (newValue) => result.value = newValue)

        return {
            setStatements, result
        }
    }
}
</script>

<template>
    <div class="flex flex-col gap-y-2 rounded">
        <input-area @updateStatements="setStatements"/>
        <output-area :result="result"/>
    </div>
</template>
