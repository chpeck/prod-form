<script>
  import Remarks from '$lib/Remarks.svelte'
	import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let report;

  onMount(async () => {
    const { id } = $page.params;
    const res = await fetch(`/api/reports/${id}`);

    if (res.ok) {
      report = await res.json();
    } else {
      alert('Failed to fetch report.');
      goto('/');
    }
  });

	async function handleSubmit(event) {
    const { id } = $page.params;
    const { data, metadata } = event.detail
    console.log('handleSubmit', id)
		const res = await fetch(`/api/reports/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
			body: JSON.stringify(data)
		});
    console.log('res', res)
		if (res.ok) {
			// Navigate back to the main page after a successful add
			goto('/');
		} else {
			alert('Failed to add report.');
		}
	}
</script>

<Remarks {report} on:submit={handleSubmit} />
