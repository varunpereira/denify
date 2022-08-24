<script>
	import '@program/program.css';
	import NavBar from '@program/pieces/navbar.svelte';
	import Footer from '@program/pieces/footer.svelte';
</script>

<div>
	<NavBar />
	<slot />
	<Footer />
</div>
