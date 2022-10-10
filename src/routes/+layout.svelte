<script>
	import '@src/app.css'
	import NavBar from '@src/routes/generic/navbar.svelte'
	import Footer from '@src/routes/generic/footer.svelte'
</script>

<NavBar />
<slot />
<Footer />
