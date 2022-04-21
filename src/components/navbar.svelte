<script>
	import { ShoppingBagIcon, ShoppingCartIcon, MenuIcon } from 'svelte-feather-icons';
	import { auth } from '@src/utils/store';
	import cookie from 'js-cookie';
	import { goto } from '$app/navigation';
	import SearchBar from '@src/components/searchbar.svelte';

	var dropdownSelected = false;

	function signOut() {
		cookie.remove('auth');
		$auth = {};
		goto('/');
	}
</script>

<header class="relative mb-10 min-w-min bg-black py-4  md:flex md:items-center md:justify-between">
	<div class="md:mr-5 mb-1 px-0 flex items-center justify-between ">
		<h1 class="text-xl">
			<a href="/" class="flex font-bold no-underline hover:text-gray-400">
				<ShoppingBagIcon class="w-6 h-6 mr-1 pt-1" />
				<span class="justify-end pb-1">Denify</span>
			</a>
		</h1>
		<button>
			<MenuIcon class="mb-1 h-7 w-7 hover:text-gray-400 md:hidden" />
		</button>
	</div>

	<SearchBar />

	<ul class=" list-reset md:flex md:items-center">
		{#if $auth.user}
			<li class="nav-item mr-5">
				<a href="/product/sell" class="block py-2  no-underline hover:text-gray-400 "> Sell </a>
			</li>
			<li class="nav-item mr-3">
				<a
					href="/cart"
					class="block flex py-2  no-underline hover:text-gray-400 md:border-none md:p-0"
				>
					<ShoppingCartIcon class="h-5 w-5" />
					<sup class="justify-end font-bold">
						{$auth.cartQuantity}
					</sup>
				</a>
			</li>
			<div class="nav-item flow-root">
				<div class="rounded hover:text-gray-400 md:mx-2 relative">
					<button
						on:click={() => (dropdownSelected = !dropdownSelected)}
						class="h-12 w-12 rounded-full "
					>
						{$auth.user.email}
					</button>
					{#if dropdownSelected}
						<div class="absolute md:w-40 w-full md:right-0 bg-black text-white rounded ">
							<a
								on:click={() => (dropdownSelected = !dropdownSelected)}
								href={'/account/profile?email=' + $auth.user.email}
								class=" block px-2 py-2   rounded hover:bg-gray-700 hover:text-white">Profile</a
							>
							<a
								on:click={() => (dropdownSelected = !dropdownSelected)}
								href="/account/chats/contacts"
								class=" block px-2 py-2   rounded hover:bg-gray-700 hover:text-white"
							>
								Contacts
							</a>
							<a
								on:click={() => (dropdownSelected = !dropdownSelected)}
								href="/account/info"
								class=" block px-2 py-2   rounded hover:bg-gray-700 hover:text-white"
							>
								Info
							</a>
							<a
								on:click={() => (dropdownSelected = !dropdownSelected)}
								href="/account/payments"
								class=" block px-2 py-2   rounded hover:bg-gray-700 hover:text-white"
							>
								Payments
							</a>
							<a
								on:click={() => (dropdownSelected = !dropdownSelected)}
								href="/account/sales"
								class=" block px-2 py-2   rounded hover:bg-gray-700 hover:text-white"
							>
								Sales
							</a>
							<a
								on:click={() => (dropdownSelected = !dropdownSelected)}
								href="/account/reviews"
								class=" block px-2 py-2   rounded hover:bg-gray-700 hover:text-white"
							>
								Reviews
							</a>
							<button
								on:click={signOut}
								class="w-full text-left  block px-2 py-2   rounded hover:bg-gray-700 hover:text-white"
							>
								Sign out
							</button>
						</div>
					{/if}
				</div>
			</div>
		{:else}
			<li class="nav-item">
				<a href="/signin" class="hover:text-gray-400">
					<span class="pr-1">Sign</span>in
				</a>
			</li>
		{/if}
	</ul>
</header>
