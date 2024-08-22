<template>
    <div @click.prevent="addProduct">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ name }}</h5>
            <small>${{ price }}</small>
        </div>
        <p class="mb-1">{{ description }}</p>
    </div>
</template>

<script setup>
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        name: String,
        description: String,
        price: Number,
    });

    const emits = defineEmits(['add_Cart']);
    const addProduct = () => {
        emits('add_Cart', props);
    };

</script>

