<template>
    <tr>
        <td>
            <button
                type="button"
                class="btn btn-sm btn-danger"
                @click="removeCart(item.id)"
            >移除
            </button>
        </td>
        <td>{{ item.name }}</td>
        <td><small>{{ item.description }}</small></td>
        <td>
            <button :disabled="cartQuantity <= 1" class="btn btn-sm btn-secondary py-1 px-2" @click="updateNum(item, -1)">-</button>
            <span class="mx-2">{{ cartQuantity }}</span>
            <button :disabled="cartQuantity >= 10" class="btn btn-sm btn-primary py-1 px-2" @click="updateNum(item, 1)">+</button>
        </td>
        <td>{{ item.price }}</td>
        <td>{{ subTotal }}</td>
    </tr>
</template>

<script setup>
    import { defineProps, defineEmits, ref, watch  } from 'vue';

    const props = defineProps({
        item: Object,
        subTotal: Number,
    });

    const cartQuantity = ref(props.item.quantity);
    const emits = defineEmits(['update-Cart', 'remove-FromCart']);

    // 更新數量
    const updateNum = (item, num) => {
        emits('update-Cart', {...item, num: num});
    };

    // 移除購物車
    const removeCart = (id) => {
        emits('remove-FromCart', id);
    };

    // 監聽變換後的數量
    watch(() => props.item.quantity, (newVal) => {
        cartQuantity.value = newVal;
    });

</script>

