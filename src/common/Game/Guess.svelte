<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import Level from './Level';

	let map;
	if (browser)
		onMount(async () => {
			const L = await import('leaflet');
			map = L.map('map').setView([0, 0], 2);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 19,
				attribution:
					'&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
			}).addTo(map);
			L.control.scale().addTo(map);
		});
</script>

<svelte:head>
	<link rel="stylesheet" type="text/css" href="../node_modules/leaflet/dist/leaflet.css" />
</svelte:head>

<div class="h-full w-auto m-4">
	<div id="map" class="h-5/6 w-full" />
	<button
		class="p-4 bg-blue-500 w-full rounded-b-lg text-white hover:bg-blue-600 hover:shadow-md transition-all"
		on:click={() => {
			map.setView([0, 0], 2);
		}}
	>
		Recenter
	</button>
</div>
