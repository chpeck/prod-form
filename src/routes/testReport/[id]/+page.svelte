<script>
  import ProductionReport from '$lib/ProductionReport.svelte'
  import TestReport from '$lib/TestReport.svelte'
	import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let batchId;

  onMount(async () => {
    const { id } = $page.params;
    const res = await fetch(`/api/reports/${id}`);

    if (res.ok) {
      let report = await res.json();
		  batchId = `${new Date(report.date).toLocaleDateString()}-${report.tank}`
    } else {
      alert('Failed to fetch report.');
      goto('/');
    }
  });

	async function handleSubmit(event) {
    const { id } = $page.params;
    const { data, metadata } = event.detail
    console.log('id', id, data)
		const res = await fetch(`/api/reports/${id}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});

		if (res.ok) {
			// Navigate back to the main page after a successful add
			goto('/');
		} else {
			alert('Failed to add report.');
		}
	}
</script>
<TestReport {batchId} on:submit={handleSubmit} />
