// import { useState } from "react";
// import { Input } from "@chakra-ui/react";
// import { Textarea } from "@chakra-ui/react";
// import { Button } from "@chakra-ui/react";

// export default function TestAddProductForm() {
//   const [inputs, setInputs] = useState({
//     name: "",
//     price: 0,
//     category: "",
//     info: "",
//   });
//   const changeHandler = (e) => {
//     setInputs((prev) => {
//       const cloneState = { ...prev };
//       cloneState[e.target.name] = e.target.value;
//       return cloneState;
//     });
//   };
//   const form = (
//     <form onSubmit={submitHandler}>
//       <table>
//         <tr>
//           <td>Product Name:</td>
//           <td>
//             <Input
//               placeholder="Product Name"
//               size="md"
//               name="name"
//               onChange={changeHandler}
//             />
//           </td>
//         </tr>
//         <td>Stock:</td>
//         <td>
//           <Input
//             placeholder="Stock"
//             size="md"
//             name="stock"
//             onChange={changeHandler}
//           />
//         </td>
//         <tr>
//           <td>Price:</td>
//           <td>
//             <Input
//               placeholder="Price"
//               size="md"
//               name="price"
//               onChange={changeHandler}
//             />
//           </td>
//         </tr>
//         <tr>
//           <td>Category:</td>
//           <td>
//             <Input
//               placeholder="Category"
//               size="md"
//               name="category"
//               onChange={changeHandler}
//             />
//           </td>
//         </tr>
//         <tr>
//           <td>Product Info:</td>
//           <td>
//             <Textarea
//               placeholder="Product Info"
//               size="lg"
//               name="info"
//               onChange={changeHandler}
//             />
//           </td>
//         </tr>
//       </table>
//       <Button type="submit" colorScheme="blue">
//         Submit
//       </Button>
//     </form>
//   );
//   const formData = new FormData();
//   for (let property in inputs) {
//     formData.append(property, inputs[property]);
//   }
//   function submitHandler(e) {
//     e.preventDefault();
//     fetch("http://localhost:8090/product/add", {
//       method: "POST",
//       body: formData,
//     }).then((response) => response.json());
//   }

//   return <div>{form}</div>;
// }
