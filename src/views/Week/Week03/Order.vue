<template>
    <tr>
        <td>{{ name }}</td>
        <td>{{ quantity }}</td>
        <td>{{ subTotal }}</td>
    </tr>
</template>

<script setup>
    import { defineProps, defineEmits, ref, watch  } from 'vue';

    const props = defineProps({
        name: String,
        quantity: Number,
        subTotal: Number,
    });

    const cartQuantity = ref(props.name);

</script>

