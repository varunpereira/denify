<script>
	import axios from 'axios'
	import cookie from 'js-cookie'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import { auth } from '@src/all/store.js'
	import { page } from '$app/stores'

	var formValues = null
	var product = null
	var error = ''
	var productId = $page.url.searchParams.get('productId')
	var formOptions = [1, 2, 3, 4, 5]
	var selected = null

	onMount(async () => {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'))
		}
		var res = await axios.post($page.url.pathname, {
			productId,
		})
		if (res.data.error) {
			error = res.data.error
		}
		product = res.data.product
		formValues = {
			rating: '',
			description: '',
			email: JSON.parse(cookie.get('auth')).user.email,
			productId: productId,
		}
	})

	function formChange() {
		formValues = { ...formValues, rating: selected }
	}

	async function formSubmit() {
		if (formValues.rating == '') {
			error = 'Must select rating.'
			return
		}

		try {
			var res = await axios.post($page.url.pathname + '/putReview', {formValues})
			if (res.data.err) {
				error = res.data.err
				return
			}
			goto('/product?productId=' + product._id)
		} catch (resError) {
			console.log(resError)
		}
	}
</script>

<svelte:head><title>Add Review - Denify</title></svelte:head>

{#if product}
	<div class="bg-grey-lighter flex flex-col">
		<div class="container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
			<div class="w-full rounded bg-white  px-20 py-8 text-black shadow-md">
				<p class="mb-8 text-center text-xl">
					Add a Review for {product.title}
				</p>
				<p>Rating (out of 5)</p>
				<select bind:value={selected} on:change={formChange}>
					{#each formOptions as formOption}
						<option>{formOption}</option>
					{/each}
				</select>
				<p>Description</p>
				<input
					bind:value={formValues.description}
					type="text"
					required
					class="border-grey-light mb-4 w-full rounded border p-3"
				/>
				<button
					on:click|preventDefault={() => {
						formSubmit()
					}}
					type="submit"
					class="hover:bg-green-dark my-1 w-full rounded bg-black py-3 text-center text-white outline-none"
				>
					Add Review
				</button>
				<div class="mt-10 text-red-500">{error}</div>
			</div>
		</div>
	</div>
{:else}
	<p>Loading...</p>
{/if}
