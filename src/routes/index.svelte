<script>
	import { myName } from '@src/utils/store';
	import { onMount } from 'svelte';
	onMount(async function () {
		$myName = 'Eve';
	});
</script>

<span>My name is {$myName}.</span>

<h1>{import.meta.env.VITE_MESSAGE}</h1>
s
