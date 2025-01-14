<script setup>
const { search } = useMeiliSearch("products");

const limit = 48;
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
		<div class="search-container">
			<div class="searchbox">
				<input
					type="text"
					placeholder="Search for products"
					:value="searchQuery"
					@input="inputHandler"
					@keydown="kbdHandler"
				/>

				<p class="offset">{{ offset }}</p>
			</div>

			<div class="searchbox">
				<input
					type="text"
					placeholder="Filter"
					v-model="filter"
					@keydown="kbdHandler"
				/>
			</div>
		</div>

		<div class="results">
			<div v-for="result in results" :key="result.id" class="result">
				<img :src="result.image_url" alt="product" />
				<p>{{ result.product_name }}</p>
			</div>
		</div>

		<button @click="searchNext" class="search-more">Load more</button>
	</main>
</template>

<style scoped>
main {
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	box-sizing: border-box;
}

.search-container {
	width: 100%;
	position: sticky;
	top: 8px;
	background-color: white;
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.searchbox {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
}

input {
	flex: 1;
	width: 100%;
	padding: 10px;
	font-size: 1.2rem;
}

.offset {
	margin: 4px 12px;
}

.results {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 12px;
	padding: 12px;
}

.result {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 8px;
}

.search-more {
	width: 100%;
	margin: 12px auto;
	padding: 8px 16px;
	font-size: 1.2rem;
}
</style>
