<script>
  import FormulationReport from '$lib/FormulationReport.svelte'
	import { goto } from '$app/navigation';

	async function handleSubmit(event) {
    const { data, metadata } = event.detail
		const res = await fetch('/api/reports', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
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

<FormulationReport on:submit={handleSubmit} />
