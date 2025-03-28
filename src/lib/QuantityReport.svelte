<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let formElement;
    export let report;
    export let batchId;

    // JSON Schema for the form
    const schema = {
        components: [
           {
                type: "datagrid",
                key: "quantity",
                label: "Quantity Produced",
                components: [
                   {
                        type: "select",
                        key: "quantityType",
                        label: "Type",
                        data: { values: [
                          { label: "320 gm", value: "0.32" },
                          { label: "700 gm", value: "0.7" },
                          { label: "3 kg", value: "3" },
                          { label: "13 kg", value: "13" },
                          { label: "14 kg", value: "14" },
                          { label: "15 kg", value: "15" },
                          { label: "20 kg", value: "20" },
                          { label: "160 kg", value: "160" },
                          { label: "180 kg", value: "180" },
                          { label: "200 kg", value: "200" },
                        ]},
                        validate: { required: true }
                    },
    
                    {
                        type: "number",
                        key: "unitsProduced",
                        label: "Units Produced",
                        validate: { required: true }
                    },
                ]
            },
            {
                type: "textarea",
                key: "remarks",
                label: "General Remarks",
                placeholder: "Enter your remarks here",
                validate: { required: false }
            },
            {
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
            if (report) {
                // Render the form in view-mode
                Formio.createForm(formElement, schema, { readOnly: true }).then((form) => {
                    // If the report is an object that contains the form data, set the data
                    form.submission = {
                       data: report
                    }
                });
            } else {
              Formio.createForm(formElement, schema).then(form => {
                  form.on('submit', (submission) => {
                      dispatch('submit', submission);
                  });
              });
            }
        }
    });
</script>

<main class="container mt-4">
    <h2 class="mb-4">Quantity Produced {batchId}</h2>
    <div bind:this={formElement}></div>
</main>

