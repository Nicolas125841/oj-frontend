<script lang="ts">
    import axios, { type AxiosProgressEvent } from 'axios';
    import { Button, Fileupload, Helper, Input, Label, NumberInput } from 'flowbite-svelte';
    import type { PageData } from './$types';
	import { goto } from '$app/navigation';

    let title: string = "A tough problem";
    let author: string = "Nicolas Rist";
    let tl: number = 1000;
    let ml: number = 256;
    let statement: FileList;
    let tests: FileList;

    $: ready = !(author &&
               tl && 
               ml &&
               statement &&
               tests &&
               tl > 0 &&
               tl <= 60000 &&
               ml > 0 &&
               ml <= 4096 &&
               statement.length == 1 &&
               tests.length == 1);

    const onUploadProgress = (event: AxiosProgressEvent) => {
        const percentage = Math.round((100 * event.loaded) / event.total!);
        console.log(percentage);
    };

    const upload = () => {
        if(!ready){
            axios.post('http://localhost:8080/problems/create', {                
                title: title,
                author: author,
                tl: tl,
                ml: ml,                
                statement: statement[0],
                tests: tests[0]
            }, {
                auth: {
                    username: data.username!, //TODO: Fix bad assertion
                    password: data.password!
                },
                headers: {
                'Content-Type': 'multipart/form-data'
                },
                onUploadProgress
            })
            .then((response) => {
                console.log(response);

                goto('/admin/problems/');
            })
            .catch((error) => {
                console.error(error);
            });
        }
    };

    export let data: PageData;
</script>

<svelte:head>
	<title>Create Problem</title>
	<meta name="description" content="Admin console to create problems." />
</svelte:head>

<h1>
    Create Problem
</h1>
<section class="space-y-5 text-center">
    <form id="upload-form">
        <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
                <Label for="title" class="mb-2">Problem Title</Label>
                <Input type="text" id="title" placeholder="Title" bind:value={title} required  />
            </div>
            <div>
                <Label for="author" class="mb-2">Author</Label>
                <Input type="text" id="author" placeholder="Author" bind:value={author} required />
            </div>
            <div>
                <Label for="tl" class="mb-2">Time Limit (ms)</Label>
                <NumberInput id="tl" placeholder="1000" bind:value={tl} required />
                {#if tl !== undefined && tl !== null && (tl <= 0 || tl > 60000)}
                    <Helper class="mt-2" color="red"><span class="font-medium">Error:</span> Keep time limit within (0, 60,000].</Helper>
                {/if}
            </div>
            <div>
                <Label for="ml" class="mb-2">Memory Limit (mb)</Label>
                <NumberInput id="ml" placeholder="256" bind:value={ml} required />
                {#if ml !== undefined && ml !== null && (ml <= 0 || ml > 4096)}
                    <Helper class="mt-2" color="red"><span class="font-medium">Error:</span> Keep memory limit within (0, 4,096]</Helper>
                {/if}
            </div>
        </div>
        <div>
            <Label for="statement" class="pb-2">Upload Problem Statement (.pdf)</Label>
            <Fileupload id="statement" class="mb-2" accept=".pdf" bind:files={statement} required />
        </div>
        <div>
            <Label for="tc" class="pb-2">Test Cases (.zip)</Label>
            <Fileupload id="tc" class="mb-2" accept=".zip" bind:files={tests} required />
        </div>
        <Button type="submit" on:click={upload} bind:disabled={ready}>Create</Button>
    </form>
</section>