// FormComponent(props: {
//     type: "string",
//     formInstance:
//         data: [
//             {
//                 type: "input" || "number" || "select" || ....,
//                 rules?: [{}],
//                 name: "string",
//                 label:
//             ...
//         },
//             {
//                 type: "input" || "number" || "select" || ....,
//                 rules?: [{}],
//                 name: "string",
//                 label
//             ...
//         }
//         ]
// }) {
//     omit(props, ["data"]) //lodash

//     data.forEach(item => {
//         renderInput(item)
//     });
// }

// const renderInput = (item, formProps) => {
//     switch (item.type) {
//         case value:
//             return <Form.Item

//             >
//                 <InputCompoent />
//             </Form.Item>
//             break;

//         default:
//             break;
//     }
// }