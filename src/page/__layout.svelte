<script>
	import '@src/prog.css'
	import NavBar from '@src/piece/navbar.svelte'
	import Footer from '@src/piece/footer.svelte'
</script>

<div>
	<NavBar />
	<slot />
	<Footer />
</div>
