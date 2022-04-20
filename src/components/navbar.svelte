<script>
	import { ShoppingBagIcon, ShoppingCartIcon, MenuIcon } from 'svelte-feather-icons';
	import { auth } from '@src/utils/store';
	import cookie from 'js-cookie';
	import { goto } from '$app/navigation';
	import SearchBar from '@src/components/searchbar.svelte'

	function accountOptions(event) {
		if (event.target.value === 'signOut') {
			cookie.remove('auth');
			$auth = {};
			goto('/');
		} else if (event.target.value === 'profile') {
			goto('/account/profile?email=' + $auth.user.email);
		} else if (event.target.value === 'contacts') {
			goto('/account/chats/contacts');
		} else if (event.target.value === 'info') {
			goto('/account/info');
		} else if (event.target.value === 'payments') {
			goto('/account/payments');
		} else if (event.target.value === 'sales') {
			goto('/account/sales');
		} else if (event.target.value === 'reviews') {
			goto('/account/reviews');
		}
	}
</script>

<header
	class="relative mb-10 min-w-min bg-black py-4  md:flex md:items-center md:justify-between"
>
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

	<SearchBar/>


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
				<div class="rounded hover:font-medium hover:text-gray-400 md:mx-2">
					<select
						class="custom-select text-capitalize bg-black text-white"
						on:change|preventDefault={accountOptions}
					>
						<option hidden>{$auth.user.email}</option>
						<option value="profile">Profile</option>
						<option value="contacts">Contacts</option>
						<option value="info">Account</option>
						<option value="payments">Payments</option>
						<option value="sales">Sales</option>
						<option value="reviews">Reviews</option>
						<option value="signOut">Sign Out</option>
					</select>
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
