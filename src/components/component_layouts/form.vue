<template>
    <form @submit.prevent="submit">
        <slot></slot>
    </form>
</template>

<script setup>

const props = defineProps({

})

const emit = defineEmits([
    'formSubmit'
])

const submit = () => {
    emit('formSubmit');
}

</script>