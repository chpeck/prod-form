<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let formElement;
    export let report;

    const schema = {
      components: [
        {
          type: "datagrid", // change from editgrid to datagrid
          key: "remarksList",
          label: "Remarks",
          components: [
            {
              type: "textarea",
              key: "remark",
              label: "Remark",
              placeholder: "Enter your remark here",
              validate: { required: false },
            },
            {
              type: "textfield",
              key: "timestamp",
              label: "Timestamp",
              disabled: true,
              defaultValue: new Date().toISOString()
            }
          ]
        },
        {
          type: "button",
          action: "submit",
          label: "Submit",
          theme: "primary",
        }
      ]
    };

    onMount(async () => {
        if (formElement) {
            const { Formio } = await import('formiojs');
            Formio.createForm(formElement, schema).then(form => {
                form.on('submit', (submission) => {
                    console.log('submit')
                    dispatch('submit', submission);
                });
                // Prepopulate remarks with timestamps
                form.submission = {
                  data: {
                    remarksList: report.remarksList.map(r => ({ 
                      remark: r.remark,
                      timestamp: r.timestamp || new Date().toISOString()
                    }))
                  }
                };
            });
        }
    });
</script>
<main class="container mt-4">
    <h2 class="mb-4">Remarks</h2>
    <div bind:this={formElement}></div>
</main>

