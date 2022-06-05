<script>
	import '@src/app.css';
	import NavBar from '@src/pieces/navbar.svelte';
	import Footer from '@src/pieces/footer.svelte';
</script>

<div>
	<NavBar />
	<slot />
	<Footer />
</div>
