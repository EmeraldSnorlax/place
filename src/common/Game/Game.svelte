<script lang="ts">
	import Guess from './Guess.svelte';
import Level from './Level.svelte';
</script>

<div class="w-full xl:flex xl:items-center h-full">
  <div style="height: calc(100vh - 128px);" class="xl:w-1/2">
    <Guess />
  </div>
  <div>
    <Level />
  </div>
</div>

