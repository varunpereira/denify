<script>
	import axios from 'axios'
	import { onMount } from 'svelte'
	import { auth } from '@src/app.js'
	import cookie from 'js-cookie'
	import { goto } from '$app/navigation'

	var error = null

	onMount(async () => {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'))
		}
	})
</script>

<svelte:head><title>About - Denify</title></svelte:head>

<div class="flex justify-center">
	<p class="mb-5 text-xl font-semibold flex justify-center">Our Mission</p>
</div>

<div class="flex justify-center">
	<p class="mb-5 text-xl font-semibold flex justify-center">Our Story</p>
</div>

<div class="flex justify-center">
	<p class="mb-5 text-xl font-semibold flex justify-center">Our Office</p>
</div>
