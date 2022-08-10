<script>
	import { ShoppingBagIcon, ShoppingCartIcon, MenuIcon, UserIcon } from 'svelte-feather-icons';
	import { auth } from '@src/utils/store';
	import cookie from 'js-cookie';
	import { goto } from '$app/navigation';
	import SearchBar from '@src/pieces/searchbar.svelte';

	var dropdownSelected = false;
	var menuStatus = false;
	var width = null;
	var accountList = [
		{ href: '/account/profile?email=' + '$auth.user.email', title: 'Profile' },
		{ href: '/account/contacts', title: 'Contacts' },
		{ href: '/account/info', title: 'Info' },
		{ href: '/account/payments', title: 'Payments' },
		{ href: '/account/sales', title: 'Sales' },
		{ href: '/account/reviews', title: 'Reviews' }
	];

	function signOut() {
		cookie.remove('auth');
		$auth = {};
		goto('/');
	}
</script>

<svelte:window bind:innerWidth={width} />

<div class="relative min-w-min bg-black py-2  md:flex md:items-center md:justify-between">
	<div class="md:mr-5 mb-1 px-0 flex items-center justify-between ">
		<p class="text-xl">
			<a href="/" class="flex font-bold no-underline hover:text-gray-400 pt-1">
				<ShoppingBagIcon class="w-6 h-6 mr-1 pt-1" />
				<span class="justify-end pb-1">Denify</span>
			</a>
		</p>
		<button
			on:click={function () {
				menuStatus = !menuStatus;
			}}
		>
			<MenuIcon class="mb-1 h-7 w-7 hover:text-gray-400 md:hidden" />
		</button>
	</div>

	{#if menuStatus == true || width >= 768}
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
							on:click={function () {
								dropdownSelected = !dropdownSelected;
							}}
							class="h-8 rounded-full pt-2 md:pt-0 md:flex md:flex-wrap md:justify-center"
						>
							<UserIcon class="h-5 w-5 border border-1 rounded-full" />
							{$auth.user.email}
						</button>
						{#if dropdownSelected}
							<div
								class="absolute md:w-40 md:pl-2 w-full md:right-0 bg-black text-white rounded-b-md md:mt-2"
							>
								{#each accountList as account}
									<a
										on:click={function () {
											dropdownSelected = !dropdownSelected;
										}}
										href={account.href}
										class=" block py-2 rounded hover:text-gray-400">{account.title}</a
									>
								{/each}
								<button
									on:click={function () {
										signOut();
									}}
									class="w-full text-left block py-2 rounded hover:text-gray-400"
								>
									Sign out
								</button>
							</div>
						{/if}
					</div>
				</div>
			{:else}
				<a href="/signin" class="nav-item pb-1 pt-1 rounded-b hover:text-gray-400 flex-none">
					Sign in
				</a>
			{/if}
		</ul>
	{/if}
</div>
