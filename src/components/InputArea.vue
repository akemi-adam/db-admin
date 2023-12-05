<script lang="ts">
    import { ref } from 'vue'
    
    export default {
        setup(props, { emit }) {
            const localStatements = ref('')

            const updateStatements = () => {
                emit('updateStatements', localStatements)
            }

            return {
                localStatements, updateStatements
            }
        },
    } 
</script>

<template>
    <textarea
        name="statements" id="statements"
        class="px-2 bg-green-100 h-128 w-full resize-none"
        placeholder="SELECT * FROM users WHERE..."
        v-model="localStatements" 
        @input="updateStatements"
    ></textarea>
</template>
