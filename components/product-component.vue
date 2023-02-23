<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
      <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="user in users" :key="user.id" class="group relative">
          <div class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
            <img :src="user.image" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a :href="user.href">
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ user.firstName }}
                </a>
              </h3>
              <p class="mt-1 text-sm text-gray-500">{{ user.lastName }}</p>
            </div>
            <p class="text-sm font-medium text-gray-900">{{ user.eyeColor }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
   <InfiniteLoading @infinite="load" />
</template>

<script setup>
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css"; 
import { ref } from "vue";
import { useUsers } from "../api/user";

const { findAll } = useUsers()

const users = ref([])
const limit = ref(10)
const skip = ref(-10)


const load = async $state => {
  console.log("loading more...");
  let offset = skip.value+= 10;
    try {

    const newUser = await findAll(limit.value, offset)
    console.log(newUser)

    if (offset >= newUser.data?.total) {
        $state.complete();    
    }else {
        users.value.push(...newUser.data?.users)   
        $state.loaded();
    }
    // return
    // const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${offset}`);
    // const json = await response.json();
    // if (json.length < 5) $state.complete();
    // else {
    //   if (!top.value) users.value.push(...json);
    //   else users.value.unshift(...json);
    //   $state.loaded();
    // }
  } catch (error) {
    $state.error();
  }
};



const props = defineProps({
  users: { type: Array, required: true },
});

//  const { data } = await findAll(12, 0)

// if(data) {
//     users.value = data.users 
// }

// const fetchUsersOnScroll = async () => {
//     const newUsers = await findAll(limit.value, 12)
//     users.value.push(...newUsers.data?.users)
// }

// useInfiniteScroll(listEl,
//     async () => {
//         console.log('User')
//     await fetchUsersOnScroll();
// }, { distance: 10 })

// const props = defineProps({
//     image: String,
//     firstName: String,
//     lastName: String,

// })

</script>