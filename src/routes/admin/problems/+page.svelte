<script lang="ts">
	import { GradientButton } from 'flowbite-svelte';
	import ProblemList from "../../ProblemList.svelte";
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Admin/Problems</title>
	<meta name="description" content="Admin console to manage problems." />
</svelte:head>

<h1>
    Problem Manager
</h1>
<section class="space-y-5 text-center">
	<GradientButton href="/admin/problems/create" size="md" color="pinkToOrange">Add Problem</GradientButton>
	<ProblemList isAdmin={true} username={data.username} password={data.password} />
</section>