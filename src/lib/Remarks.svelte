<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let formElement;
    export let report;
    export let readOnly;

    const schema = {
      components: [
        {
          type: "datagrid", 
          key: "remarksList",
          label: "Remarks",
          reorder: false,
          removeRow: false, // Added to hide the remove row button
          disableRemove: true,
          components: [
            {
              type: "textarea",
              key: "remark",
              label: "Remark",
              placeholder: "Enter your remark here",
              validate: { required: true },
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
        readOnly ? null : {
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
            Formio.createForm(formElement, schema, { readOnly } ).then(form => {
                form.on('submit', (submission) => {
                    dispatch('submit', submission);
                });
                if (report) {
                  form.submission = {
                    data: {
                      remarksList: report.remarksList
                    }
                  };
                }
            });
        }
    });
</script>
<main class="container mt-4">
    <h2 class="mb-4">Remarks</h2>
    <div bind:this={formElement}></div>
</main>

