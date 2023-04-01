<script>
	import '@src/all/style.css'
	import NavBar from '@src/all/navbar.svelte'
	import Footer from '@src/all/footer.svelte'
	import { signedOutCart } from '@src/all/store.js'
	import cookie from 'js-cookie'

	if (!cookie.get('signedOutCart')) {
		cookie.set('signedOutCart', JSON.stringify($signedOutCart), {
			// 7 days
			expires: 7,
			secure: true,
			sameSite: 'strict',
		})
	} else {
		$signedOutCart = JSON.parse(cookie.get('signedOutCart'))
	}
</script>

<NavBar />
<main class="px-4 md:px-10 min-w-[400px]">
	<slot />
</main>
<Footer />
