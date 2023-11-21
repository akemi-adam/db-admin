<script setup lang="ts">
    import SideBar from './components/SideBar.vue'
    import PlaygroundArea from './components/PlaygroundArea.vue'
    import OptionBar from './components/OptionBar.vue'
</script>

<template>
    <div class="m-12 grid grid-cols-10 gap-x-2">
        <SideBar class="col-span-2"/>
        <div class="flex flex-col gap-y-2 col-span-8">
           <OptionBar/>
           <PlaygroundArea/>
        </div>
    </div>
</template>
