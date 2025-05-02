<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let formElement;
    export let report;
    export let batchId;
    export let readOnly;

    // JSON Schema for the form
    const schema = {
        components: [
             {
                type: "select",
                key: "finalTesting",
                label: "Final Testing",
                data: { values: [
                    { label: "OK", value: "OK" },
                    { label: "NO", value: "NO" }
                ]},
                validate: { required: true }
            },
            {
                type: "number",
                key: "viscosity",
                label: "Viscosity",
                validate: { required: true }
            },
            {
                type: "textfield",
                key: "color",
                label: "Color"
            },
            {
                type: "editgrid",
                key: "solventEntries",
                label: "Additional Solvent",
                components: [
                   {
                        type: "select",
                        key: "solventType",
                        label: "Type",
                        data: { values: [
                          { label: "Tol", value: "Tol" },
                          { label: "SBP", value: "SBP" },
                          { label: "Hex", value: "Hex" },
                        ]},
                        validate: { required: true }
                    },
    
                    {
                        type: "number",
                        key: "qtyUsed",
                        label: "Qty Used (kg)",
                        validate: { required: true }
                    },
                ]
            },
            {
                type: "select",
                key: "retesting",
                label: "Retesting",
                data: { values: [
                    { label: "OK", value: "OK" },
                    { label: "NO", value: "NO" }
                ]},
                validate: { required: true }
            },
            {
                type: "number",
                key: "viscosity",
                label: "Viscosity",
                validate: { required: true }
            },
            {
                type: "number",
                key: "additionalTime",
                label: "Additional Time (hr)"
            },
            {
                type: "textfield",
                key: "color",
                label: "Color"
            },
            {
                type: "textfield",
                key: "scrapQty",
                label: "Scrap Qty"
            },
            readOnly ? null : {
                type: "button",
                action: "submit",
                label: "Submit",
                theme: "primary"
            }
        ]
    };
    // Render the Form.io form (only in browser)
    onMount(async () => {
        if (formElement) {
            const { Formio } = await import('formiojs');
            Formio.createForm(formElement, schema, { readOnly }).then(form => {
              if (report) {
                form.submission = {
                  data: report
                }
              }
              form.on('submit', (submission) => {
                dispatch('submit', submission);
              });
            });
        }
    });
</script>

<main class="container mt-4">
    <h2 class="mb-4">Test Report {batchId}</h2>
    <div bind:this={formElement}></div>
</main>


