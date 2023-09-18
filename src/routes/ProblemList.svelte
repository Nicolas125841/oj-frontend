<script lang="ts">
    import axios from "axios";
	import { onMount } from 'svelte';
    import { Button, Pagination, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	import type { LinkType } from "flowbite-svelte/dist/types";
    
    export let isAdmin = false;
    export let username: string = '';
    export let password: string = '';

    let pages: LinkType[] = [];

    $: {
        pages.forEach(item => {
            if(item.name === (page + 1).toString()){
                item.active = true;
            }else{
                item.active = false;
            }
        });

        pages = pages;

        axios.get(`http://localhost:8080/problems/page/${page}`)
        .then((value) => {
            problems = value.data;
        }).catch(() => {
            problems = [];
        });
    }

    const loadProblems = () => {
        axios.get(`http://localhost:8080/problems/meta`)
        .then((value) => {
            let pageCount = Math.ceil(value.data["total"] / value.data["size"]);
            pages = [];

            for(let i = 1; i <= pageCount; ++i){
                pages.push({name: i.toString()});
            }
        }).catch(() => {
            pages = [];
        });
    };

    onMount(() => {
        loadProblems();
    });

    const onPageAdvance = () => {
        if(page + 1 < pages.length){
            page += 1;
        }
    }

    const onPageReturn = () => {
        if(page - 1 >= 0){
            page -= 1;
        }
    }

    const onPageClick = (event: MouseEvent) => {
        if(event.target && (event.target as HTMLButtonElement).textContent){
            page = parseInt((event.target as HTMLButtonElement).textContent!) - 1;
        }
    };

    const onDeleteClick = async (id: number) => {
        axios.delete(`http://localhost:8080/problems/delete/${id}`, { 
            auth: { username: username, password: password } 
        })
        .then((response) => {
            console.log(response);

            loadProblems();
        })
        .catch((error) => {
            console.error(error);
        });
    }

    $: page = 0;
    $: pages = [];
    $: problems = [];
</script>

<Table>
    <TableHead>
        <TableHeadCell>Problem</TableHeadCell>
        {#if isAdmin}
            <TableHeadCell>Delete?</TableHeadCell>
        {/if}
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each problems as problem}
            <TableBodyRow>
                <TableBodyCell>                    
                    <a href={"problems/".concat(problem["id"])}>{problem["title"]}</a>
                </TableBodyCell>
                {#if isAdmin}
                    <TableBodyCell>
                        <Button on:click={() => { onDeleteClick(problem["id"]) }}>Delete</Button>
                    </TableBodyCell>
                {/if}
            </TableBodyRow>
        {/each}
    </TableBody>
</Table>
<Pagination {pages} on:click={onPageClick} on:next={onPageAdvance} on:previous={onPageReturn} />