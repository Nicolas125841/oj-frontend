<script lang="ts">
	import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import type { LanguageSupport } from '@codemirror/language';
    import ProblemStatement from '../../ProblemStatement.svelte';
    import { GradientButton, Select, P, Textarea, Label } from 'flowbite-svelte';
    import CodeMirror from "svelte-codemirror-editor";
    import { java } from "@codemirror/lang-java";
    import { cpp } from "@codemirror/lang-cpp";
    import { python } from "@codemirror/lang-python";
    import {clouds} from 'thememirror';
    import axios from 'axios';
    
    export let data: PageData;

    const Langs = {
        Java: '.java',
        C: '.c',
        Cpp: '.cpp',
        Py: '.py'
    };
    
    let selected = 'Java 17';
    let languages = [
        { value: 'Java 17', name: 'Java 17', selected: true },
        { value: 'C 98', name: 'C 98' },
        { value: 'C++ 17', name: 'C++ 17' },
        { value: 'Python 3', name: 'Python 3'}
    ];

    let langSelect: LanguageSupport;

    $: {
        switch(selected){
            case Langs.Java: 
                langSelect = java();
                break;
            case Langs.Py:
                langSelect = python();
                break;
            default:
                langSelect = cpp();
                break;
        }
    }
        
    $: metadata = {
        title: "Title",
        author: "Author",
        tl: 1000,
        ml: 65,
        id: 0
    };

    $: url = "";

    let value = '';
    let input = '';
    let output = '';

    onMount(async () => {
        metadata = {
                ...(await data.metadata).data,
                id: data.id
        };
        url = data.url;
    });

    const customTest = (event: MouseEvent) => {
        output = 'Running...';

        axios.postForm(
            `http://127.0.0.1:8080/submit/customtest`, 
            {
                type: selected,
                code: new Blob([value], { type: 'text/plain' }),
                input: new Blob([input], { type: 'text/plain' })
            }
        ).then(result => {
            output = result.data;
        }).catch(error => {
            console.error(error);
        });
    };

    const submit = (event: MouseEvent) => {
        output = 'Testing...';

        axios.postForm(
            `http://127.0.0.1:8080/submit/${metadata.id}`, 
            {
                type: selected,
                code: new Blob([value], { type: 'text/plain' }),
                input: new Blob([''], { type: 'text/plain' })
            }
        ).then(result => {
            output = result.data;
        }).catch(error => {
            console.error(error);
        });
    }
</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content="Problem statement" />
</svelte:head>
<ProblemStatement bind:metadata bind:url></ProblemStatement>
<section id="input-section">
    <div class="flex justify-between items-center">
        <P>Enter solution here:</P>
        <Select class="m-2 w-1/4" items={languages} bind:value={selected} />
    </div>
    <CodeMirror 
        bind:value 
        lang={langSelect} 
        theme={clouds}
        styles={{
            "&": {
                width: "100%",
                height: "10rem"
            }
        }} 
        class="rounded-md border-4"
    />
    <section id="custom-test" class="mt-5 flex justify-between items-center">
        <div id="custom-input" class="flex-auto mr-5">
            <Label for="user-input" class="mb-2">Custom Input</Label>
            <Textarea bind:value={input} id="user-input" placeholder="Input..." rows="4" name="message" />
        </div>
        <div id="custom-output" class="flex-auto ml-5">
            <Label for="test-output" class="mb-2">Result</Label>
            <Textarea bind:value={output} id="test-output" placeholder="Result..." rows="4" name="message" />
        </div>
    </section>
</section>
<section id="submit" class="flex justify-around">
    <GradientButton color="tealToLime" on:click={customTest}>Run Custom Tests</GradientButton>
    <GradientButton color="pinkToOrange" on:click={submit}>Submit</GradientButton>
</section>