<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let reports = [];

	onMount(async () => {
		await loadReports();
	});

	async function loadReports() {
		const res = await fetch('/api/reports');
		reports = await res.json();
	}

	async function deleteReport(id) {
		if (!confirm('Are you sure you want to delete this report?')) return;
		await fetch(`/api/reports/${id}`, {
			method: 'DELETE'
		});
		await loadReports();
	}

	function navigateToReport(id) {
		goto(`/report/${id}`);
	}

  function addTestReport(id) {
		goto(`/testReport/${id}`);
  }

  function addQuantityReport(id) {
		goto(`/quantityReport/${id}`);
  }
</script>

<main class="container mt-5">
	<h1 class="mb-4">Reports</h1>
	<div class="mb-4">
		<!-- Navigate to the Report page -->
		<button class="btn btn-primary" on:click={() => goto('/report')}>
			Add Report
		</button>
	</div>

	{#if reports.length > 0}
		<ul class="list-group">
			{#each reports as report}
				<li class="list-group-item mb-3" on:click={() => navigateToReport(report._id)}>
					<h5>Batch: {new Date(report.date).toLocaleDateString()}-{report.tank}</h5>
					<pre>Product {report.adhesiveType}</pre>
					<pre>{new Date(report.createdAt)}</pre>
					<div class="d-flex gap-2">
						<!-- You can add an edit button here if needed -->
						<button on:click={(e) => { e.stopPropagation(); deleteReport(report._id); }} class="btn btn-danger">
							Delete
						</button>
          {#if report.finalTesting == null }
						<button on:click={(e) => { e.stopPropagation(); addTestReport(report._id); }} class="btn btn-primary">
              Add Test Report
						</button>
          {/if}
					     {#if report.finalTesting && !report.quantity}
						<button on:click={(e) => { e.stopPropagation(); addQuantityReport(report._id); }} class="btn btn-primary">
					         Add Quantity Produced
						</button>
					     {/if}
					
					</div>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No reports found.</p>
	{/if}
</main>

<style>
	/* Ensure preformatted text wraps nicely */
	pre {
		white-space: pre-wrap;
	}
</style>

