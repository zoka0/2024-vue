<template>
    <div class="container mt-5 py-4 bg-warning bg-opacity-50 shadow">
        <div class="mb-4 text-center fs-4 fw-bold">QQ餐飲 線上點餐</div>
        <div class="row">

            <!-- 商品 -->
            <div class="col-md-4">
                <div class="list-group">
                    <div v-for="drink in drinks" :key="drink.id" class="list-group-item list-group-item-action">
                        <Product 
                            :name = "drink.name"
                            :price = "drink.price"
                            :description = "drink.description"
                            @add_Cart = "addToCart"
                        />
                    </div>
                </div>
            </div>

            <!-- toast -->
            <div class="toast-container border-0 rounded position-fixed top-0 end-0 py-1 my-1">
                <div v-for="(toast, index) in toasts" :key="index" class="toast show shadow fs-6 fw-bold" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header py-1">
                        <strong class="me-auto">加入購物車</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body rounded-bottom bg-secondary text-white">
                        {{ toast.message }}
                    </div>
                </div>
            </div>
            <div class="toast-container border-0 rounded position-fixed top-0 end-0 py-1 my-1">
                <div v-for="(toast, index) in errToast" :key="index" class="toast show shadow fs-6 fw-bold" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header py-1">
                        <strong class="me-auto">加入購物車</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body rounded-bottom bg-danger bg-gradient text-white">
                        {{ toast.message }}
                    </div>
                </div>
            </div>
            <!-- toast -->

            <!-- 購物車 -->
            <div class="col-md-8">
                <table class="table table-secondary border rounded-3 shadow">
                    <thead class="text-center fw-bold">
                    <tr>
                        <th scope="col" width="80">操作</th>
                        <th scope="col">品項</th>
                        <th scope="col">描述</th>
                        <th scope="col" width="120">數量</th>
                        <th scope="col">單價</th>
                        <th scope="col">小計</th>
                    </tr>
                    </thead>
                    <tbody class="text-center">
                        <Cart
                            v-for="(item, index) in cart" :key="item.id"
                            :class="{'table-info': index % 2 == 0, 'table-light': index % 2 !== 0}"
                            :item = "item"
                            :subTotal = "itemSubtotal(item)"
                            @update-Cart = "updateCart"
                            @remove-FromCart="removeFromCart"
                        />
                    </tbody>
                </table>
                <div v-if="cart.length === 0" class="alert alert-primary text-center" role="alert">
                    請選擇商品
                </div>
                <div v-else>
                    <div class="text-end mb-3">
                    <h5>總計: <span>${{ sum }}</span></h5>
                    </div>
                    <textarea
                        class="form-control mb-3"
                        rows="3"
                        placeholder="備註"
                        v-model="description"
                        ></textarea>
                    <div class="text-end">
                        <button class="btn btn-primary" @click.prevent="createOrder">
                            送出
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <hr />
        <!-- 訂單 -->
        <div class="row justify-content-center">
            <div class="col-8">
                <div v-if="!order.id" class="alert alert-secondary text-center" role="alert">
                    尚未建立訂單
                </div>
                <div v-else class="card">
                    <div class="card-body">
                        <div class="card-title">
                            <h5>訂單</h5>
                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">品項</th>
                                    <th scope="col">數量</th>
                                    <th scope="col">小計</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <Order 
                                        v-for="item in order.cart" :key="item.id"
                                        :name = "item.name"
                                        :quantity = "item.quantity"
                                        :subTotal = "itemSubtotal(item)"
                                    />
                                </tbody>
                            </table>
                            <div class="text-end">
                                備註: <span>{{ order.description }}</span>
                            </div>
                            <div class="text-end">
                                <h5>總計: <span>${{ order.sum }}</span></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
    import { ref, computed } from 'vue';
    import Product from './Week03/Product.vue';
    import Cart from './Week03/Cart.vue';
    import Order from './Week03/Order.vue';
    
    const toasts = ref([]);
    const errToast = ref([]);
    const data = [
        {
            id: 1,
            name: '珍珠奶茶',
            description: '香濃奶茶搭配QQ珍珠',
            price: 50,
        },
        {
            id: 2,
            name: '冬瓜檸檬',
            description: '清新冬瓜配上新鮮檸檬',
            price: 45,
        },
        {
            id: 3,
            name: '翡翠檸檬',
            description: '綠茶與檸檬的完美結合',
            price: 55,
        },
        {
            id: 4,
            name: '四季春茶',
            description: '香醇四季春茶，回甘無比',
            price: 45,
        },
        {
            id: 5,
            name: '阿薩姆奶茶',
            description: '阿薩姆紅茶搭配香醇鮮奶',
            price: 50,
        },
        {
            id: 6,
            name: '檸檬冰茶',
            description: '檸檬與冰茶的清新組合',
            price: 45,
        },
        {
            id: 7,
            name: '芒果綠茶',
            description: '芒果與綠茶的獨特風味',
            price: 55,
        },
        {
            id: 8,
            name: '抹茶拿鐵',
            description: '抹茶與鮮奶的絕配',
            price: 60,
        },
    ];
    
    const drinks = ref(data);
    const cart = ref([]);
    const description = ref('');
    const order = ref({});
    
    const sum = computed(() => {
        return cart.value.reduce((pre, next) => {
            return pre + next.price * next.quantity;
        }, 0);
    });

    // 加入購物車
    const addToCart = (drink) => {
        // find查詢陣列是否有值
        const cartItem = cart.value.find((item) => item.name === drink.name)
        if (cartItem) {
            cartItem.quantity += 1;
            errToast.value.push({ message: `${drink.name} 已存在購物車` });
            setTimeout(() => errToast.value.shift(), 3000);
            return;
        };

        cart.value.push({
            ...drink,
            id: new Date().getTime(),
            quantity: 1,
        });

        toasts.value.push({ message: `${drink.name} 已加入購物車` });
        setTimeout(() => toasts.value.shift(), 3000);
    };

    // 更新數量
    const updateCart = (item) => {
        cart.value = cart.value.map((cartItem) => {
            if (cartItem.id === item.id) {
                cartItem.quantity += item.num;
            }
            return cartItem;
        });
    };
    
    const removeFromCart = (id) => {
        cart.value = cart.value.filter((cartItem) => cartItem.id !== id);
    };
    
    const createOrder = () => {
        order.value = {
            id: new Date().getTime(),
            cart: cart.value,
            description: description.value,
            sum: sum.value,
        };
        cart.value = [];
        description.value = '';
    };
    
    const itemSubtotal = (item) => {
        return item.price * item.quantity;
    };
</script>