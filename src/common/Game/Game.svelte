<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { browser } from '$app/env';
	import { mdiLoading, mdiMapMarkerRightOutline, mdiRuler } from '@mdi/js';
	import Level from './Level';
	import type { Marker } from 'leaflet';
	import { level } from '../../stores';

	let map;
	let selectedLocation: Marker;
	let score: number;
	let L;
	let actual;
	let fetched: boolean;

	async function newLevel() {
		fetched = false;
		score = 0;
		document.getElementById('image-container').classList.add('bg-gray-300', 'animate-pulse');
		$level = new Level();
		await $level.Ready;
		fetched = true;
		if (actual) actual.remove();
	}

	if (browser)
		onMount(async () => {
			newLevel();
			L = await import('leaflet');
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

			// Selection
			selectedLocation = L.marker([0, 0]).addTo(map);
			map.on('click', function (e) {
				selectedLocation.setLatLng(e.latlng);
			});
		});
</script>

<div class="w-auto xl:flex xl:items-center h-full m-4" style="height: calc(100vh - 128px);">
	<div class="h-full w-full">
		<div
			class="w-full h-full max-h-full flex items-center justify-center bg-gray-300 animate-pulse transition-all"
			id="image-container"
		>
			{#if fetched}
				<img
					src={$level.image}
					alt=""
					style="max-height: calc(90vh - 48px);"
					on:load={() => {
						document
							.getElementById('image-container')
							.classList.remove('bg-gray-300', 'animate-pulse');
					}}
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
	</div>

	<div class="xl:w-full h-full">
		<div class="h-full w-auto">
			<div id="map" class="h-5/6 w-full" />
			<div class="h-1/6">
				{#if !score}
					<button
						out:fly={{ duration: 200 }}
						in:fly={{ delay: 250 }}
						class="p-4 bg-green-500 w-full h-full rounded-b-lg text-white hover:bg-green-600 hover:shadow-md transition-all flex items-center justify-center"
						on:click={() => {
							score = $level.solution({
								lat: selectedLocation.getLatLng().lat,
								lon: selectedLocation.getLatLng().lng,
							});
							actual = L.marker($level.center).addTo(map).bindPopup('Actual location').openPopup();
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="48px"
							height="48px"
							class="text-white fill-current mr-2"
						>
							<path d={mdiMapMarkerRightOutline} />
						</svg>
						<span class="text-2xl font-bold">Guess</span>
					</button>
				{:else}
					<button
						in:fly={{ delay: 250 }}
						out:fly={{ duration: 200 }}
						on:click={() => {
							newLevel();
						}}
						class="p-4 bg-purple-500 w-full h-full rounded-b-lg text-white hover:bg-purple-600 hover:shadow-md transition-all flex items-center justify-between"
					>
						<p>Click for next map</p>
						<div class="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="48px"
								height="48px"
								class="text-white fill-current mr-4"
							>
								<path d={mdiRuler} />
							</svg>
							<div class="text-center">
								<p class="text-3xl font-bold font-mono">
									{score.toFixed(2)}<span class="text-purple-200 text-xl ml-2">km</span>
								</p>
								<p class="text-xl font-bold font-mono text-purple-200">
									{(score / 1.609344).toFixed(2)}<span class="text-purple-300 text-sm ml-2">mi</span
									>
								</p>
							</div>
						</div>
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>
