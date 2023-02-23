<template>
    <product-component :users="users" @infinite="load"/>
</template>
<script>
import { ref } from "vue";
import { useUsers } from "../api/user"

const { findAll } = useUsers()

const users = ref([])
const limit = ref(3)
const offset = ref(0)

const { data } = await findAll(4, 0)

if(data) {
    users.value = data.users 
}

</script>
<style>

</style>