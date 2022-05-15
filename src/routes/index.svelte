<script>
	import { onMount } from 'svelte';
	import { auth } from '@src/utils/store';
	import cookie from 'js-cookie';
	import { goto } from '$app/navigation';

	onMount(async function () {
		if (cookie.get('auth')) {
			$auth = JSON.parse(cookie.get('auth'));
		}
	});
</script>

<svelte:head><title>Home</title></svelte:head>

<img src="/homeBanner.png" alt="" class="w-full rounded-md"/>
