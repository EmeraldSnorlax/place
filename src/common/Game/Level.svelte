<script lang="ts">
	import { onMount } from 'svelte';
	import { mdiLoading } from '@mdi/js';
	import { level } from '../../stores';
	import Level from './Level';
	let fetched = false;
	let imgLoaded = false;
	onMount(async () => {
		$level = new Level();
		await $level.Ready;
		fetched = true;
	});
</script>

<div class="w-full h-full max-h-full flex items-center justify-center bg-gray-300 animate-pulse transition-all" id="image-container">
	{#if fetched}
		<img
			id="image"
			src={$level.image}
			alt=""
      style="max-height: calc(90vh - 48px);"
			on:load={() => {
				document.getElementById('image').classList.remove('opacity-0');
        document.getElementById('image-container').classList.remove('bg-gray-300', 'animate-pulse');
			}}
			class="opacity-0 filter transition-all"
		/>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="32px"
			height="32px"
			class="text-black fill-current mr-2 animate-spin"
		>
			<path d={mdiLoading} />
		</svg>
		<span>Querying API...</span>
	{/if}
</div>
