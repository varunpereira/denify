<script>
	import { ShoppingBagIcon, ShoppingCartIcon, MenuIcon, UserIcon } from 'svelte-feather-icons';
	import { auth } from '@src/utils/store';
	import cookie from 'js-cookie';
	import { goto } from '$app/navigation';
	import SearchBar from '@src/components/searchbar.svelte';

	var dropdownSelected = false;
	var menuStatus = false;
	var width;

	function signOut() {
		cookie.remove('auth');
		$auth = {};
		goto('/');
	}
</script>

<svelte:window bind:innerWidth={width} />

<header class="relative mb-10 min-w-min bg-black py-4  md:flex md:items-center md:justify-between">
	<div class="md:mr-5 mb-1 px-0 flex items-center justify-between ">
		<h1 class="text-xl">
			<a href="/" class="flex font-bold no-underline hover:text-gray-400">
				<ShoppingBagIcon class="w-6 h-6 mr-1 pt-1" />
				<span class="justify-end pb-1">Denify</span>
			</a>
		</h1>
		<button
			on:click={() => {
				menuStatus = !menuStatus;
			}}
		>
			<MenuIcon class="mb-1 h-7 w-7 hover:text-gray-400 md:hidden" />
		</button>
	</div>

	{#if menuStatus === true || width >= 768}
		<ul
			class="absolute bg-black w-full md:static list-reset md:flex md:items-center md:justify-end"
		>
			<SearchBar />

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
				<div class="nav-item flow-root md:pb-3">
					<div class="rounded hover:text-gray-400 md:mx-2 relative">
						<button
							on:click={() => (dropdownSelected = !dropdownSelected)}
							class="h-8 rounded-full pt-2 md:pt-0 md:flex md:flex-wrap md:justify-center"
						>
							<UserIcon class="h-5 w-5 border border-1 rounded-full" />
							{$auth.user.email}
						</button>
						{#if dropdownSelected}
							<div
								class="absolute md:w-40 md:pl-2 w-full md:right-0 bg-black text-white rounded-b-md md:mt-2"
							>
								<a
									on:click={() => (dropdownSelected = !dropdownSelected)}
									href={'/account/profile?email=' + $auth.user.email}
									class=" block py-2 rounded hover:text-gray-400">Profile</a
								>
								<a
									on:click={() => (dropdownSelected = !dropdownSelected)}
									href="/account/chats/contacts"
									class=" block py-2 rounded hover:text-gray-400"
								>
									Contacts
								</a>
								<a
									on:click={() => (dropdownSelected = !dropdownSelected)}
									href="/account/info"
									class=" block py-2 rounded hover:text-gray-400"
								>
									Info
								</a>
								<a
									on:click={() => (dropdownSelected = !dropdownSelected)}
									href="/account/payments"
									class=" block py-2 rounded hover:text-gray-400"
								>
									Payments
								</a>
								<a
									on:click={() => (dropdownSelected = !dropdownSelected)}
									href="/account/sales"
									class=" block py-2 rounded hover:text-gray-400"
								>
									Sales
								</a>
								<a
									on:click={() => (dropdownSelected = !dropdownSelected)}
									href="/account/reviews"
									class=" block py-2 rounded hover:text-gray-400"
								>
									Reviews
								</a>
								<button
									on:click={signOut}
									class="w-full text-left  block py-2 rounded hover:text-gray-400"
								>
									Sign out
								</button>
							</div>
						{/if}
					</div>
				</div>
			{:else}
				<li class="nav-item pb-1 rounded-b">
					<a href="/signin" class="hover:text-gray-400">
						<span class="pr-1">Sign</span>in
					</a>
				</li>
			{/if}
		</ul>
	{/if}
</header>
