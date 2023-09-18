<script lang="ts">
    import { Heading, Span } from "flowbite-svelte";

    export let metadata = {
        title: "Title",
        author: "Author",
        tl: 1000,
        ml: 65
    };
    export let url = "";
</script>

<Heading tag="h1" class="mb-4" customSize="text-3xl font-extrabold  md:text-5xl lg:text-6xl">
    <Span gradient>{metadata.title}</Span>
</Heading>
<section>
    <Heading tag="h6" align="center">Author: {metadata.author}</Heading>
    <Heading tag="h6" align="center">Time Limit (ms): {metadata.tl}</Heading>
    <Heading tag="h6" align="center">Memory Limit (mb): {metadata.ml}</Heading>
</section>
<section>
    <object data={url} type="application/pdf" width="100%" height="500px">
        <p>Unable to display PDF file. <a href={url}>Download</a> instead.</p>
    </object>
</section>

<style>
    section {
        display: flex;
        flex: content;
        justify-content: space-around;
        padding-bottom: 0.5em;
    }
</style>