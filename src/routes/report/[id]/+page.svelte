<script>
  import ProductionReport from '$lib/ProductionReport.svelte'
  import TestReport from '$lib/TestReport.svelte'
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let report;

  onMount(async () => {
    const { id } = $page.params;
    const res = await fetch(`/api/reports/${id}`);

    if (res.ok) {
      report = await res.json();
      console.log('report fetch', report)
    } else {
      alert('Failed to fetch report.');
      goto('/');
    }
  });
</script>

{#if report}
  <ProductionReport {report} />
  <TestReport {report} />
{/if}

