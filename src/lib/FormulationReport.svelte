<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let formElement;
    export let report;
    export let readOnly;
    // JSON Schema for the form
    const schema = {
        components: [
            {
              type: "datetime",
              key: "date",
              label: "Date",
              format: "yyyy-MM-dd",
              enableTime: false,
              defaultValue: new Date().toISOString().split('T')[0],
              validate: { 
               required: true
              }
            },
            {
                type: "select",
                key: "adhesiveType",
                label: "Adhesive Type",
                data: { values: [
                    { label: "200", value: "200" },
                    { label: "300", value: "300" },
                    { label: "500", value: "500" },
                    { label: "600", value: "600" },
                    { label: "800", value: "800" },
                    { label: "SCC", value: "SCC" },
                    { label: "HV SCC", value: "HV SCC" }
                ]},
                validate: { required: true }
            },
            {
                type: "number",
                key: "tank",
                label: "Tank",
                validate: { required: true }
            },
            {
                type: "datagrid",
                key: "rubberEntries",
                label: "Rubber Entries",
                components: [
                   {
                        type: "select",
                        key: "rubberType",
                        label: "Type",
                        data: { values: [
                          { label: "B320", value: "B320" },
                          { label: "CR2442", value: "CR2442" },
                          { label: "M42", value: "M42" },
                        ]},

                        validate: { required: false }
                    },
    
                    {
                        type: "number",
                        key: "qtyUsed",
                        label: "Qty Used (kg)",
                        validate: { required: false }
                    },
                    {
                        type: "textfield",
                        key: "batchNo",
                        label: "Batch No",
                        validate: { required: false }
                    },
                    {
                        type: "textfield",
                        key: "bagNo",
                        label: "Bag No",
                        validate: { required: false }
                    }
                ]
            },
            {
                type: "datagrid",
                key: "powderEntries",
                label: "Powder Entries",
                components: [
                   {
                        type: "select",
                        key: "powderType",
                        label: "Type",
                        data: { values: [
                          { label: "MD", value: "MD" },
                          { label: "ZO", value: "ZO" },
                          { label: "TZO", value: "TZO" },
                        ]},
                        validate: { required: false }
                    },
    
                    {
                        type: "number",
                        key: "qtyUsed",
                        label: "Qty Used (kg)",
                        validate: { required: false }
                    },
                    {
                        type: "textfield",
                        key: "batchNo",
                        label: "Batch No",
                        validate: { required: false }
                    },
                    {
                        type: "textfield",
                        key: "bagNo",
                        label: "Bag No",
                        validate: { required: false }
                    }
                ]
            },
            {
                type: "datagrid",
                key: "resinEntries",
                label: "Resin Entries",
                components: [
                   {
                        type: "select",
                        key: "resinType",
                        label: "Type",
                        data: { values: [
                          { label: "551", value: "551" },
                          { label: "Tol", value: "Tol" },
                        ]},
                        validate: { required: false }
                    },
    
                    {
                        type: "number",
                        key: "qtyUsed",
                        label: "Qty Used (kg)",
                        validate: { required: false }
                    },
                    {
                        type: "textfield",
                        key: "batchNo",
                        label: "Batch No",
                        validate: { required: false }
                    },
                ]
            },
            {
                type: "datagrid",
                key: "solventEntries",
                label: "Solvent",
                components: [
                   {
                        type: "select",
                        key: "solventType",
                        label: "Type",
                        data: { values: [
                          { label: "Tol", value: "Tol" },
                          { label: "EA", value: "EA" },
                          { label: "MEK", value: "MEK" },
                          { label: "TCE", value: "TCE" },
                          { label: "MC", value: "MC" },
                          { label: "PCE", value: "PCE" },
                          { label: "MAC", value: "MAC" },
                          { label: "DSP", value: "DSP" },
                          { label: "Hex", value: "Hex" },
                          { label: "DBP", value: "DBP" },
                          { label: "CHX", value: "CHX" },
                        ]},
                        validate: { required: false }
                    },
    
                    {
                        type: "number",
                        key: "qtyUsed",
                        label: "Qty Used (kg)",
                        validate: { required: false }
                    },
                    {
                        type: "textfield",
                        key: "batchNo",
                        label: "Batch No",
                        validate: { required: false }
                    },
                ]
            },
            {
              type: "checkbox",
              key: "tankWash",
              label: "Tank Wash?",
              defaultValue: false,
              inputType: "checkbox"
            },
            readOnly ? null : {
                type: "button",
                action: "submit",
                label: "Submit",
                theme: "primary"
            }
        ]
    };
    onMount(async () => {
        if (formElement) {
            const { Formio } = await import('formiojs');
            // Check if report is set
                Formio.createForm(formElement, schema, { readOnly }).then((form) => {
                    if (report) {
                      form.submission = {
                        data: report
                      }
                    }
                    form.on('submit', (report) => {
                        dispatch('submit', report);
                    });
                });
        }
    });
</script>

<main class="container mt-4">
    <h2 class="mb-4">Formulation Report</h2>
    <div bind:this={formElement}></div>
</main>

