<script lang="ts">
	import { setContext } from "svelte";

	import ProblemList from "../ProblemList.svelte";

    $: problems = "Waiting...";

    setContext('isAdmin', false);
</script>

<svelte:head>
	<title>Problems</title>
	<meta name="description" content="Problem list" />
</svelte:head>

<h1>
    {problems}
</h1>
<ProblemList />
