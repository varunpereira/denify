<script>
	import { ShoppingBagIcon, ShoppingCartIcon, MenuIcon } from 'svelte-feather-icons';
</script>

<header
	class="relative mb-10 min-w-min bg-black py-4  shadow-lg md:flex md:items-center md:justify-between"
>
	<div class=" mb-3 flex items-center justify-between ">
		<h1 class="mr-5 text-xl">
			<a href="/" class="flex font-bold no-underline hover:text-gray-400">
				<ShoppingBagIcon class="w-6 h-6 mr-1"/>
				<span class="justify-end pb-1">Denify</span>
			</a>
		</h1>
		<button>
			<MenuIcon class="mt-2 h-7 w-7 hover:text-gray-400 md:hidden" />
		</button>
	</div>

	<ul class=" list-reset md:flex md:items-center" />
</header>
