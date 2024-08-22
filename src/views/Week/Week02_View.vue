<template>
    <div class="container-fluid">
        <div class="d-flex justify-content-center">
            <div v-if="!isLogin && !isLoginForm" class="form_page mt-3 p-3">
                <div class="text-header">
                    <span class="h2 fw-bold mb-5">註冊</span>
                </div>
                <div class="my-1">
                    <div class="my-3">
                        <label for="emailSignUp" class="form-label fw-bold m-0 px-1 fs-5">Email</label>
                        <input v-model="emailSignUp" id="emailSignUp" type="email" class="form-control mx-0" placeholder="Email" />
                    </div>
                    <div class="my-3">
                        <label for="nicknameSignUp" class="form-label fw-bold m-0 px-1 fs-5">暱稱</label>
                        <input v-model="nicknameSignUp" id="nicknameSignUp" type="text" class="form-control mx-0" placeholder="NickName" />
                    </div>
                    <div class="my-3">
                        <label for="passwordSignUp" class="form-label fw-bold m-0 px-1 fs-5">密碼</label>
                        <input @keydown.enter="signUp" v-model="passwordSignUp" id="passwordSignUp" type="password" class="form-control mx-0" placeholder="Password" />
                    </div>
                    <div class="my-3 text-center">
                        <button @click="signUp" class="btn btn-dark fs-5" type="button">註冊</button>
                        <p class="form-text text-break">{{ messageSignUp }}</p>
                    </div>
                </div>
                <div class="text-footer">
                    <a @click="changLoginFrom('signIn')" class="text-black fs-5">登入</a>
                </div>
            </div>

            <div v-if="!isLogin && isLoginForm" class="form_page mt-3 p-3">
                <div class="text-header">
                    <span class="h2 fw-bold mb-5">登入</span>
                </div>
                <div class="my-1">
                    <div class="my-3">
                        <label for="emailSignIn" class="form-label fw-bold m-0 px-1 fs-5">Email</label>
                        <input v-model="emailSignIn" id="emailSignIn" type="email" class="form-control mx-0" placeholder="Email" />
                    </div>
                    <div class="my-3">
                        <label for="passwordSignIn" class="form-label fw-bold m-0 px-1 fs-5">密碼</label>
                        <input @keydown.enter="signIn" v-model="passwordSignIn" id="passwordSignIn" type="password" class="form-control mx-0" placeholder="Password" />
                    </div>
                    <div class="my-3 text-center">
                        <button @click="signIn" class="btn btn-success fs-5" type="button">登入</button>
                        <!-- <p>Token: {{ token }}</p> -->
                        <p class="form-text text-break">{{ messageSignIn }}</p>
                    </div>
                </div>
                <div class="text-footer">
                    <a @click="changLoginFrom('signUp')" class="text-dark fs-5">註冊</a>
                </div>
            </div>
        </div>

        <div v-if="isLogin" class="d-flex justify-content-center">
            <div class="check_page p-1">
                <div class="text-start fs-5 fw-bold mx-2">
                    <span class="text-break">用戶: {{ user.name }}</span>
                    <br/>
                    <span class="text-break">{{ user.uid }}</span>
                </div>
                <div class="check_btn mx-2">
                    <button @click="signOut" class="btn btn-sm  btn-danger fs-5 m-2" type="button">登出</button>
                </div>
                <!-- <div class="my-0 text-center"> -->
                    <!-- <button @click="checkOut" class="btn btn-sm btn-primary fs-5 m-2" type="button">驗證</button> -->
                <!-- </div> -->
            </div>
        </div>

        <div v-if="isLogin">
            <hr />
            <div class="d-flex flex-column">
                <div class="text-center">
                    <span class="h2 fw-bold mb-5">待辦事項</span>
                </div>
                <div class="row g-3 align-items-center border-bottom my-3">
                    <div class="col text-end">
                        <label for="newTodo" class="form-label fw-bold m-0 px-1 fs-4">新增待辦事項:</label>
                    </div>
                    <div class="col text-center">
                        <input v-model="newTodo" id="newTodo" type="text" class="form-control mx-0" placeholder="新增事項" />
                    </div>
                    <div class="col text-start">
                        <button @click="addTodo" class="btn btn-sm btn-primary fs-5 m-2" type="button">新增</button>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <table class="todoList_div">
                    <thead v-if="todos.length > 0">
                        <tr>
                            <th scope="col" class="fw-bold" v-for="(item, index) in title" :key="index">{{ item.name }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(todo, index) in todos" :key="index">
                            <td class="p-1">{{ todo.status ? '完成' : '未完成' }}</td>
                            <td scope="row" class="text-start py-0">
                                <span v-if="!isUpdateTodo(index)">{{ todo.content }}</span>
                                <input v-if="isUpdateTodo(index)"
                                    class="form-control m-0"
                                    type="text"
                                    :value="todo.content"
                                    placeholder="更新值"
                                    @change="updateTodoEdit($event, todo.id)"
                                />
                            </td>
                            <td class="p-1">
                                <button v-if="isUpdateTodo(index)" class="btn btn-outline-secondary mx-1 py-1 px-2" @click="changUpdateTodo('show', index)">取消</button>
                                <button v-if="isUpdateTodo(index)" class="btn btn-primary mx-1 py-1 px-2" @click="updateTodo(todo.id)">更新</button>
                                <button v-if="!isUpdateTodo(index)" class="btn btn-primary mx-1 py-1 px-2" @click="changUpdateTodo('edit', index)">編輯</button>
                                <button v-if="!isUpdateTodo(index)" class="btn btn-success mx-1 py-1 px-2" @click="toggleStatus(todo.id)">變更狀態</button>
                                <button v-if="!isUpdateTodo(index)" class="btn btn-danger mx-1 py-1 px-2" @click="deleteTodo(todo.id)">刪除</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style>
    .form_page {
        position: relative;
        height: 28rem;
        width: 650px;
        background-color: #FFFFFF;
        border: 2px solid #6C757D;
        border-radius: 20px;
        box-shadow: 5px 5px 5px #000000;
    }

    .form_page .text-header {
        top: 0;
        text-align: center;
    }

    .form_page .text-footer {
        position: absolute;
        bottom: 12px;
        right: 12px;
    }

    .check_page {
        position: relative;
        height: 8rem;
        width: 550px;
        max-width: 800px;
        display: flex;
        align-items: center;
        justify-content: center; 
        background-color: #FFFFFF;
        border: 2px solid #6C757D;
        border-radius: 20px;
    }

    .check_page .check_btn {
        position: absolute;
        top: 8px;
        right: 8px;
    }

    a:hover {
        background-color: inherit;
    }
    
    .todoList_div {
        width: 750px;
        font-size: 1.4rem;
        border: 1px solid #000000;
    }

    .todoList_div th, 
    .todoList_div td {
        text-align: center;
        border: 1px solid #000000;
        padding: 0.3rem;
    }

    .todoList_div thead tr:nth-child(odd) {
        background-color: #C8C8C8;
    }

    /* 偶数行 */
    .todoList_div tbody tr:nth-child(even) {
        background-color: #C8C8C8;
    }

    /* 基数行 */
    .todoList_div tbody tr:nth-child(odd) {
        background-color: #FFFFFF;
    }

    .todoList_div td:nth-child(1) {
        width: 50px;
    }

    .todoList_div td:nth-child(2) {
        width: 180px;
    }

    .todoList_div td:nth-child(3) {
        width: 150px;
    }
</style>

<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    
    const site = 'https://todolist-api.hexschool.io';
    const isLoginForm = ref(true);
    const isLogin = ref(false);
    const isUpdateTodoList = ref(null);

    const user = ref({
        uid: null,
        name: null,
    });

    const title = ref([
        {
            "name": "狀態",
        },
        {
            "name": "事項",
        },
        {
            "name": "操作",
        },
    ]);

    // 清除註冊變數
    const cleanSignUpVar = async() => {
        emailSignUp.value = null;
        passwordSignUp.value = null;
        nicknameSignUp.value = null;
        messageSignUp.value = null;
    };

    // 清除登入變數
    const cleanSignInVar = async() => {
        emailSignIn.value = null;
        passwordSignIn.value = null;
        token.value = null;
        messageSignIn.value = null;
    };

    // 切換 註冊&登入
    const changLoginFrom = async(status) => {
        if (status == 'signUp') {
            isLoginForm.value = false;
            await cleanSignInVar();
        } else {
            isLoginForm.value = true;
            await cleanSignUpVar();
        }
    };

    // 判斷畫面if else，為該index則顯示編輯
    const isUpdateTodo = (index) => {
        return isUpdateTodoList.value === index;
    };

    // 切換顯示編輯事項輸入框
    const changUpdateTodo = (status, index) => {
        if (status == 'edit') {
            isUpdateTodoList.value = index;
        } else {
            isUpdateTodoList.value = null;
        }
    };

    // 註冊
    const emailSignUp = ref('');
    const passwordSignUp = ref('');
    const nicknameSignUp = ref('');
    const messageSignUp = ref('');
    
    const signUp = async () => {
        try {
            const response = await axios.post(`${site}/users/sign_up`, {
                email: emailSignUp.value,
                password: passwordSignUp.value,
                nickname: nicknameSignUp.value,
            });
            messageSignUp.value = '註冊成功. UID: ' + response.data.uid;
            isLoginForm.value = true;
            alert(messageSignUp.value);
        } catch (error) {
            messageSignUp.value = '註冊失敗:' + error.message;
        }
    };
    
    // 登入
    const emailSignIn = ref('');
    const passwordSignIn = ref('');
    const token = ref('');
    const messageSignIn = ref('');
    
    const signIn = async () => {
        try {
            if (!emailSignIn.value || !passwordSignIn.value) {
                messageSignIn.value = "請正確輸入信箱密碼";
                return;
            }
            const response = await axios.post(`${site}/users/sign_in`, {
                email: emailSignIn.value,
                password: passwordSignIn.value,
            });

            isLogin.value = true;
            messageSignIn.value = '';
            token.value = response.data.token;
            await setToken(token.value);
            await checkOut();
            await cleanSignUpVar();
        } catch (error) {
            // token.value = '登入失敗: ' + error.message;
            messageSignIn.value = '登入失敗: ' + error.message;
        }
    };
    
    // 驗證
    // const tokenCheck = ref('');
    // const messageCheckOut = ref('');
    const checkOut = async () => {
        try {
            token.value = getToken();
            if (token.value == '' || token.value == 'undefinde') {
                return;
            }
            const response = await axios.get(`${site}/users/checkout`, {
                headers: {
                    Authorization: token.value,
                },
            });
            user.value.name = response.data.nickname;
            user.value.uid = `UID:  ${response.data.uid}`;
            isLogin.value = true;
        } catch (error) {
            // messageCheckOut.value = '驗證失敗: ' + error.message;
            isLogin.value = false;
            isLoginForm.value = true;
            user.value.uid = `登入失效:  ${error.message}`;
            alert('登入失效');
            await deleteCookie();
        }
    };
    
    // 登出
    // const tokenSignOut = ref('');
    
    const signOut = async () => {
        try {
            if (token.value == '' || token.value == 'undefinde') {
                return;
            }
            const response = await axios.post(`${site}/users/sign_out`, {}, {
                headers: {
                    Authorization: token.value,
                },
            });
            isLogin.value = false;
            await cleanSignUpVar();
            await cleanSignInVar();
            await deleteCookie();
            alert(response.data.message);
        } catch (error) {
            // tokenSignOut.value = '登出錯誤: ' + error.message;
            alert('登出錯誤: ' + error.message);
        }
    };
    
    // Todo list
    const todos = ref([]);
    const newTodo = ref('');
    const todoEdit = ref({});
    const getTodos = async () => {
        if (token.value == '' || token.value == 'undefinde') {
            return;
        }
        const response = await axios.get(`${site}/todos`, {
            headers: {
                Authorization: token.value,
            },
        });
        todos.value = response.data.data;
    };

    // 新增事項
    const addTodo = async () => {
        if (!newTodo.value || token.value == '' || token.value == 'undefinde') {
            return;
        }
        const todo = {
            content: newTodo.value,
        };
        await axios.post(`${site}/todos`, todo, {
            headers: {
                Authorization: token.value,
            },
        });
        newTodo.value = '';
        getTodos();
    };

    // 刪除事項
    const deleteTodo = async (id) => {
        if (token.value == '' || token.value == 'undefinde') {
            return;
        }
        await axios.delete(`${site}/todos/${id}`, {
            headers: {
                Authorization: token.value,
            },
        });
        getTodos();
    };

    // 更新事項
    const updateTodo = async (id) => {
        if (token.value == '' || token.value == 'undefinde') {
            return;
        }
        const todo = todos.value.find((todo) => todo.id === id);
        todo.content = todoEdit.value[id];
        await axios.put(`${site}/todos/${id}`, todo, {
            headers: {
                Authorization: token.value,
            },
        });
        getTodos();
        todoEdit.value = {
            ...todoEdit.value,
            [id]: '',
        };
        alert('更新成功');
        isUpdateTodoList.value = null;
    };

    // 切換事項 完成or未完成
    const toggleStatus = async (id) => {
        if (token.value == '' || token.value == 'undefinde') {
            return;
        }
        await axios.patch(`${site}/todos/${id}/toggle`, {}, {
            headers: {
                Authorization: token.value,
            },
        });
        getTodos();
    };

    // 更新時變換原輸入值
    const updateTodoEdit = (event, id) => {
        todoEdit.value = {
            ...todoEdit.value,
            [id]: event.target.value,
        };
    };

    // 清除cookie
    const deleteCookie = async () => {
        document.cookie = `hexschoolTodo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };

    // 取登入token
    // const TodoToken = document.cookie
    //     .split('; ')
    //     .find((row) => row.startsWith('hexschoolTodo='))
    //     ?.split('=')[1];
    const getToken = () => {
        return document.cookie.replace(/(?:(?:^|.*;\s*)hexschoolTodo\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    };

    const setToken = (token) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.cookie = `hexschoolTodo=${token}; expires=${tomorrow.toUTCString()}`;
    }

    onMounted(() => {
        checkOut();
        getTodos();
    });
</script>