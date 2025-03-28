<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let formElement;
    export let report;
    // JSON Schema for the form
    const schema = {
        components: [
            {
              type: "datetime",
              key: "date",
              label: "Date",
              format: "yyyy-MM-dd",
              enableTime: false,
              datepicker: {
                disableWeekends: false
              },
              validate: { required: true }
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

                        validate: { required: true }
                    },
    
                    {
                        type: "number",
                        key: "qtyUsed",
                        label: "Qty Used (kg)",
                        validate: { required: true }
                    },
                    {
                        type: "textfield",
                        key: "batchNo",
                        label: "Batch No",
                        validate: { required: true }
                    },
                    {
                        type: "textfield",
                        key: "bagNo",
                        label: "Bag No",
                        validate: { required: true }
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
                        validate: { required: true }
                    },
    
                    {
                        type: "number",
                        key: "qtyUsed",
                        label: "Qty Used (kg)",
                        validate: { required: true }
                    },
                    {
                        type: "textfield",
                        key: "batchNo",
                        label: "Batch No",
                        validate: { required: true }
                    },
                    {
                        type: "textfield",
                        key: "bagNo",
                        label: "Bag No",
                        validate: { required: true }
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
                        validate: { required: true }
                    },
    
                    {
                        type: "number",
                        key: "qtyUsed",
                        label: "Qty Used (kg)",
                        validate: { required: true }
                    },
                    {
                        type: "textfield",
                        key: "batchNo",
                        label: "Batch No",
                        validate: { required: true }
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
                          { label: "SBP", value: "SBP" },
                          { label: "Hex", value: "Hex" },
                          { label: "EA", value: "EA" },
                        ]},
                        validate: { required: true }
                    },
    
                    {
                        type: "number",
                        key: "qtyUsed",
                        label: "Qty Used (kg)",
                        validate: { required: true }
                    },
                    {
                        type: "textfield",
                        key: "batchNo",
                        label: "Batch No",
                        validate: { required: true }
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
            {
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
            if (report) {
                // Render the form in view-mode
                Formio.createForm(formElement, schema, { readOnly: true }).then((form) => {
                    // If the report is an object that contains the form data, set the data
                    form.submission = {
                       data: report
                    }
                });
            } else {
                // Render the form in edit-mode
                Formio.createForm(formElement, schema).then((form) => {
                    form.on('submit', (report) => {
                        dispatch('submit', report);
                    });
                });
            }
        }
    });
</script>

<main class="container mt-4">
    <h2 class="mb-4">Production Formulation Report</h2>
    <div bind:this={formElement}></div>
</main>

