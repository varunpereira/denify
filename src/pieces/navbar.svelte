<script>
	import { ShoppingBagIcon, ShoppingCartIcon, MenuIcon, UserIcon } from 'svelte-feather-icons';
	import { auth } from '@src/provs/store.js';
	import cookie from 'js-cookie';
	import { goto } from '$app/navigation';
	import SearchBar from '@src/pieces/searchbar.svelte';

	var dropdownSelected = false;
	var menuStatus = false;
	var width = null;
	var accountList = [];

	$: if ($auth.user) {
		accountList = [
			{ href: '/account/profile?email=' + $auth.user.email, title: 'Profile' },
			{ href: '/account/chats', title: 'Contacts' },
			{ href: '/account/info', title: 'Info' },
			{ href: '/account/payments', title: 'Payments' },
			{ href: '/account/sales', title: 'Sales' },
			{ href: '/account/reviews', title: 'Reviews' }
		];
	}

	function signOut() {
		cookie.remove('auth');
		$auth = {};
		goto('/');
	}
</script>

<svelte:window bind:innerWidth={width} />

<div class="relative min-w-min bg-black py-2 text-xs md:flex md:items-center md:justify-between">
	<div class="md:mr-5 mb-1 px-0 flex items-center justify-between ">
		<p class="text-xl">
			<button
				on:click={function () {
					goto('/');
				}}
				class="flex font-bold no-underline hover:text-gray-400 pt-1"
			>
				<ShoppingBagIcon class="w-6 h-6 mr-1 pt-1" />
				<span class="justify-end pb-1">Denify</span>
			</button>
		</p>
		<button
			on:click|preventDefault={function () {
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
					<button
						on:click={function () {
							goto('/product/sell');
						}}
						class="block py-2  no-underline hover:text-gray-400 "
					>
						Sell
					</button>
				</li>
				<li class="nav-item mr-3">
					<button
						on:click={function () {
							goto('/cart');
						}}
						class="block flex py-2  no-underline hover:text-gray-400 md:border-none md:p-0"
					>
						<ShoppingCartIcon class="h-5 w-5" />
						<sup class="justify-end font-bold">
							{$auth.cartQuantity}
						</sup>
					</button>
				</li>
				<div class="nav-item flow-root md:pb-3">
					<div class="rounded-sm hover:text-gray-400 md:mx-2 relative">
						<button
							on:click|preventDefault={function () {
								dropdownSelected = !dropdownSelected;
							}}
							class="h-8 rounded-full pt-2 md:pt-0 md:flex md:flex-wrap md:justify-center"
						>
							<UserIcon class="h-5 w-5 border border-1 rounded-full" />
							{$auth.user.email}
						</button>
						{#if dropdownSelected}
							<div
								class="absolute md:w-[16rem] w-full md:right-0 md:mt-2 md:pl-4 bg-black text-white rounded-b-md"
							>
								{#each accountList as account}
									<button
										on:click={function () {
											goto(account.href);
											dropdownSelected = !dropdownSelected;
										}}
										class=" block py-2 rounded hover:text-gray-400">{account.title}</button
									>
								{/each}
								<button
									on:click|preventDefault={function () {
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
				<button
					on:click={function () {
						goto('/signin');
					}}
					class="nav-item pb-1 pt-1 rounded-b hover:text-gray-400 flex-none"
				>
					Sign in
				</button>
			{/if}
		</ul>
	{/if}
</div>
