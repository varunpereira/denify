<script context="module">
	// import db from '@src/utils/db';
	// import productModel from '@src/models/productModel';

	export async function load({ url }) {
        const searchTerm = url.searchParams.get('searchTerm').trim()
		// db();
		// var products = await productModel.find({
		// 	title: { $regex: searchTerm, $options: 'i' }
		// });
		return {
			props: {
				// searchResults: products
				searchResults:searchTerm
			}
		};
	}
</script>

<script>
	export var searchResults;
</script>

<svelte:head><title>Search Results</title></svelte:head>

<div class="bg-white text-black">
{JSON.stringify(searchResults)}

</div>
