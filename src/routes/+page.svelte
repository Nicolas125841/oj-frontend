<script>
	import welcome from '$lib/images/osu-welcome.svg';
</script>

<svelte:head>
	<title>BeavesOJ</title>
	<meta name="description" content="OJ for ACM chapter at Oregon State University" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<img src={welcome} alt="Welcome" />
			</picture>
		</span>

		A contest platform and problem repository for ICPC preparation.
	</h1>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: -25%;
		display: block;
	}
</style>
