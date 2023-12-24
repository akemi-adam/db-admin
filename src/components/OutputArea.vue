<script lang="ts">
import { ref, watch } from 'vue'
import useClipboard from 'vue-clipboard3'

export default {
    props: ['result'],
    setup(props) {
        const result = ref(props.result ?? [])
        const showResult = ref(false)
        const { toClipboard }= useClipboard()
        const copied = ref(false)
        const message = ref('')

        watch(() => props.result, (newValue) => {
            result.value = newValue[0]
            showResult.value = true
        })

        async function copyColumn(column: string, columnName: string) {
            await toClipboard(column)
            message.value = `Coluna ${columnName} copiada`
            copied.value = true
            setTimeout(() => copied.value = false, 2000)
        }

        return {
            result, showResult, copyColumn,
            copied, message
        }
    }
}
</script>

<template>
<div class="overflow-x-auto overflow-y-auto max-w-full max-h-48 bg-green-100 rounded" :class="{'h-auto': showResult, 'h-24': !showResult}">
    <table class="min-w-full" v-if="showResult">
        <thead>
            <tr>
                <th class="px-5 border-b border-green-300" v-for="column in Object.keys(result[0])">
                    {{ column }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="border-b border-green-300" v-for="item in result">
                <td class="px-5" v-for="key in Object.keys(result[0])">
                    <span class="line-clamp-5" v-if="item[key]" @click="copyColumn(item[key], key)">{{ item[key] }}</span>
                    <span class="italic text-gray-500 line-clamp-5" v-else>NULL</span>
                </td>
            </tr>
        </tbody>
    </table>
    <Transition name="message">
        <div v-if="copied" class="fixed bottom-4 right-4 bg-green-500 text-white p-2 rounded">
            {{ message }}
        </div>
    </Transition>
</div>
</template>

<style scoped>

::webkit-scrollbar {
    width: 12px;
}

::webkit-scrollbar-track {
    background-color: #f1f1f1;
}

::webkit-scrollbar-thumb {
    background-color: #888;
}

::webkit-scrollbar-thumb:hover {
    background: #555;
}
.message-enter-active, .message-leave-active {
    transition: all 0.25s ease;
}

.message-enter-from, .message-leave-to {
    opacity: 0;
    transform: scale(1.1);
}
</style>