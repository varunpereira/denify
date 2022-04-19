<script>
	// import { onMount } from 'svelte';
	import '@src/app.css';
	// import { auth } from '@src/utils/store';
	import NavBar from '@src/components/navbar.svelte';
	import Footer from '@src/components/footer.svelte';
	// import cookie from 'js-cookie';

	// onMount(async function () {
	// 	if (cookie.get('auth')) {
	// 		$auth = JSON.parse(cookie.get('auth'));
	// 	}
	// });
</script>

<div>
	<NavBar />
	<slot />
	<Footer />
</div>
