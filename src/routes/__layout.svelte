<script>
	import '@src/app.css';
	import NavBar from '@src/components/navbar.svelte';
	import Footer from '@src/components/footer.svelte';
</script>

<div>
	<NavBar />
	<slot />
	<Footer />
</div>
