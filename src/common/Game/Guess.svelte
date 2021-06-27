<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import { mdiMapMarkerRightOutline } from '@mdi/js';
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

			// Constrain map
			const southWest = L.latLng(-89.98155760646617, -180);
			const northEast = L.latLng(89.99346179538875, 180);
			const bounds = L.latLngBounds(southWest, northEast);
			map.setMaxBounds(bounds);
			map.on('drag', function () {
				map.panInsideBounds(bounds, { animate: false });
			});
		});
</script>

<div class="h-full w-auto">
	<div id="map" class="h-5/6 w-full" />
	<button
		class="p-4 bg-green-500 w-full h-1/6 rounded-b-lg text-white hover:bg-green-600 hover:shadow-md transition-all flex items-center justify-center"
		on:click={() => {
			map.setView([0, 0], 2);
		}}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="32px"
			height="32px"
			class="text-white fill-current mr-2"
		>
			<path d={mdiMapMarkerRightOutline} />
		</svg>
		<span class="text-2xl font-bold">Guess</span>
	</button>
</div>
