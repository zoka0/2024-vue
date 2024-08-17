<template>
    <div class="container my-5">
        <div class="row d-flex justify-content-center">
            <table class="divborder">
                <thead>
                    <tr>
                        <th scope="col" class="fw-bold" v-for="(item, index) in title" :key="index">{{ item.name }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in menu" v-bind:key="item.id">
                        <td scope="row">{{ item.name }}</td>
                        <td>{{ item.description }}</td>
                        <td>NT$ {{ item.price }}</td>
                        <td class="text-center">
                            <button :disabled="item.stock == 0" class="btn btn-sm btn-secondary py-1 px-2" @click="updateStock(item.id, -1)">-</button>
                            <span class="mx-2">{{ item.stock }}</span>
                            <button class="btn btn-sm btn-primary py-1 px-2" @click="updateStock(item.id, 1)">+</button>
                        </td>
                        <td>
                            <button class="btn btn-sm py-1 px-2" data-bs-toggle="modal" :data-bs-target="'#modal-' + item.id" @click="editItem(item.id)">&#x1F4DD;</button>

                            <div class="modal fade" :id="'modal-' + item.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">修改資料</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="mb-3">
                                            <label :for="'name' + item.id" class="form-label">品項名稱</label>
                                            <input type="text" class="form-control" :id="'name' + item.id" placeholder="品項名稱" v-model="itemEdit.name">
                                        </div>
                                        <div class="mb-3">
                                            <label :for="'description' + item.id" class="form-label">描述</label>
                                            <textarea class="form-control" :id="'description' + item.id" rows="3" v-model="itemEdit.description"></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <label :for="'price' + item.id" class="form-label">價格</label>
                                            <input type="number" class="form-control" :id="'price' + item.id" placeholder="價格" v-model="itemEdit.price">
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                                        <button type="button" class="btn btn-primary" @click="saveChanges(item.id)">更新</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style>

    .divborder, 
    .divborder th, 
    .divborder td {
        border: 1px solid #000000;
        padding: 1px 5px;
    }
</style>

<script setup>
    import { ref } from "vue";

    const title = ref([
        {
            "name": "品項",
        },
        {
            "name": "描述",
        },
        {
            "name": "價格",
        },
        {
            "name": "庫存",
        },
        {
            "name": "操作",
        },
    ]);

    const menu = ref([
        {
            "id": 1,
            "name": "珍珠奶茶",
            "description": "香濃奶茶搭配QQ珍珠",
            "price": 50,
            "stock": 20
        },
        {
            "id": 2,
            "name": "冬瓜檸檬",
            "description": "清新冬瓜配上新鮮檸檬",
            "price": 45,
            "stock": 15
        },
        {
            "id": 3,
            "name": "翡翠檸檬",
            "description": "綠茶與檸檬的完美結合",
            "price": 55,
            "stock": 30
        },
        {
            "id": 4,
            "name": "四季春茶",
            "description": "香醇四季春茶，回甘無比",
            "price": 45,
            "stock": 10
        },
        {
            "id": 5,
            "name": "阿薩姆奶茶",
            "description": "阿薩姆紅茶搭配香醇鮮奶",
            "price": 50,
            "stock": 25
        },
        {
            "id": 6,
            "name": "檸檬冰茶",
            "description": "檸檬與冰茶的清新組合",
            "price": 45,
            "stock": 20
        },
        {
            "id": 7,
            "name": "芒果綠茶",
            "description": "芒果與綠茶的獨特風味",
            "price": 55,
            "stock": 18
        },
        {
            "id": 8,
            "name": "抹茶拿鐵",
            "description": "抹茶與鮮奶的絕配",
            "price": 60,
            "stock": 20
        }
    ]);

    // 編輯時輸入資料
    const itemEdit = ref({
            name: '',
            description: '',
            price: '',
        });

    // 加減數量
    function updateStock(id, num) {
        menu.value.map((item) => {
            if (item.id == id) {
                item.stock += num;
            }
            return item;
        });
    }

    // 彈出編輯框 將該數值帶入
    function editItem(itemId) {
        const item = menu.value.find(item => item.id == itemId);
        if (item) {
            itemEdit.value = {
                name: item.name,
                description: item.description,
                price: item.price,
            };
        }
    }

    // 更新編輯資料
    function saveChanges(itemId) {
        const item = menu.value.findIndex(item => item.id == itemId);
        if (menu.value[item] != -1) {
            menu.value[item] = {
                ...menu.value[item],
                name: itemEdit.value.name,
                description: itemEdit.value.description,
                price: itemEdit.value.price,
            };
            alert('更新成功!');
            bootstrap.Modal.getInstance(document.getElementById(`modal-${itemId}`)).hide();
        }else {
            alert('更新失敗!');
            bootstrap.Modal.getInstance(document.getElementById(`modal-${itemId}`)).hide();
        }
    }

</script>