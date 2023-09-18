<script lang='ts'>
    import type { ActionData } from './$types';

    import { Button, Helper, Label, Input } from 'flowbite-svelte';

    export let form: ActionData;

    let username = '';
    let password = '';
    
    $: ready = !(username.length > 0 && password.length > 0);
</script>

<svelte:head>
	<title>Admin Login</title>
	<meta name="description" content="Admin login." />
</svelte:head>

<h1>
    Admin Login
</h1>
<section class="space-y-5 text-center">
    <form id="upload-form" method="POST" action="?/login">
        <div class="mb-5">
            <Label for="username" class="mb-2">Username</Label>
            <Input type="text" name="username" placeholder="Username" bind:value={username} required  />
        </div>
        <div class="mb-5">
            <Label for="password" class="mb-2">Password</Label>
            <Input type="password" name="password" placeholder="Password" bind:value={password} required />
            {#if form && !form?.success}
                <Helper class="mt-2" color="red"><span class="font-medium">Error:</span> Username or Password is incorrect.</Helper>
            {/if}
        </div>
        <Button type="submit" bind:disabled={ready}>Login</Button>
    </form>
</section>