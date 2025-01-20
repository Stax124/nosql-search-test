<script setup>
const { search } = useMeiliSearch("products");

const limit = 40;
const results = ref([]);
const offset = ref(0);
const searchQuery = ref("");
const filter = ref("");

function inputHandler(e) {
	searchQuery.value = e.target.value;
	searchProducts();
}

async function searchProducts(append = false) {
	if (!append) {
		offset.value = 0;
	}

	const baseParams = { limit, offset: offset.value * limit };

	const data = await search(
		searchQuery.value,
		filter.value !== "" ? { filter: filter.value, ...baseParams } : baseParams
	);
	console.log(data);

	if (append) {
		results.value = results.value.concat(data.hits);
	} else {
		results.value = data.hits;
	}
}

async function searchNext() {
	offset.value += 1;
	await searchProducts(true);
}

function kbdHandler(e) {
	if (e.key === "Enter") {
		searchProducts();
	}
}

onMounted(() => {
	searchProducts();
});
</script>

<template>
	<main>
		<div class="flex flex-col items-center gap-1 w-full sticky p-4">
			<div class="w-full bg-white flex gap-4 flex-row items-center">
				<input
					:value="searchQuery"
					class="w-full p-2 border-gray-500/35 border rounded-md"
					type="text"
					placeholder="Search for products"
					@keydown="kbdHandler"
					@input="inputHandler"
				/>

				<p class="ml-1 mr-3 aspect-square text-center">{{ offset }}</p>
			</div>

			<div class="w-full flex justify-center items-center gap-4">
				<input
					v-model="filter"
					class="w-full p-2 border-gray-500/35 border rounded-md"
					type="text"
					placeholder="Filter"
					@keydown="kbdHandler"
				/>
			</div>
		</div>

		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4"
		>
			<div
				v-for="result in results"
				:key="result.id"
				class="flex flex-col items-center p-2 rounded-lg hover:shadow-lg"
			>
				<img :src="result.image_url" alt="product" />
				<p>{{ result.product_name }}</p>
			</div>
		</div>

		<UButton size="lg" @click="searchNext" class="m-4" block>Load more</UButton>
	</main>
</template>

<style scoped>
main {
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	margin: 8px;
	box-sizing: border-box;
}
</style>
