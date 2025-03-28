<script>
  import ProductionReport from '$lib/ProductionReport.svelte'
  import TestReport from '$lib/TestReport.svelte'
	import { goto } from '$app/navigation';
  import { page } from '$app/stores';

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

<TestReport on:submit={handleSubmit} />
