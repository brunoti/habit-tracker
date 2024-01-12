<script>
	export let data;
	console.log(data)
</script>

<div class="px-8 mt-8">
	<h1 class="text-3xl font-bold dark:text-white mb-4">navyk</h1>
	<div class="dark:text-white">
		<div class="text-xl font-light mb-2">
			Hi, <span class="font-medium">Bruno</span>
		</div>
		<div class="text-xs tracking-wider">
			You have <span class="text-violet-500">0</span> habits to complete today.
		</div>
	</div>
</div>
<div class="p-8 space-y-4">
	{#each data.habits.list as habit (habit.uid)}
		<div class="border border-gray-200 dark:border-neutral-800 rounded-md px-4 py-2 shadow-sm dark:bg-neutral-900
			bg-white dark:shadow-neutral-800">
			<h3 class="text-sm font-medium mb-2 dark:text-white">{habit.title}</h3>
			<div class="text-gray-400 text-xs">
				<span class="text-violet-500">streak: 0</span>
				<span class="text-black dark:text-white">&nbsp;/&nbsp;</span>
				<span class="text-blue-500">times completed: {habit.stats.completed}</span>
				<span class="text-black dark:text-white">&nbsp;/&nbsp;</span>
				<span class="text-red-500">times skipped: {habit.stats.skipped}</span>
			</div>
		</div>
	{/each}
</div>
