<script>
  import FormulationReport from '$lib/FormulationReport.svelte'
  import TestReport from '$lib/TestReport.svelte'
  import QuantityReport from '$lib/QuantityReport.svelte'
  import Remarks from '$lib/Remarks.svelte'
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let report;
  let readOnly = true;

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
</script>

{#if report}
  <FormulationReport {report} {readOnly} />
  <TestReport {report} {readOnly} />
  <QuantityReport {report} {readOnly} />
  <Remarks {report} {readOnly} />
{/if}

