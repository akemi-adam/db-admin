<script lang="ts">
import InputArea from './InputArea.vue'
import OutputArea from './OutputArea.vue'

export default {
    components: {
        InputArea, OutputArea
    },
    setup(props, { emit }) {
        const setStatements = (newValue: String) => emit('updateStatements', newValue)

        return {
            setStatements
        }
    }
}
</script>

<template>
    <div class="flex flex-col gap-y-2 rounded">
        <input-area @updateStatements="setStatements"/>
        <output-area/>
    </div>
</template>
