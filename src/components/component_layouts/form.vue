<template>
    <form @submit.prevent="submit">
        <slot></slot>
    </form>
</template>

<script setup>

const emit = defineEmits([
    'formSubmit'
])

const submit = () => {
    emit('formSubmit');
}

</script>