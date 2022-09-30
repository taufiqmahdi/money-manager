import { Flex, Input, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";

const AddActivity = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Flex direction='row' align='center' justify='center'>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Detail Pemasukan</label>
        <Input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="email">Jumlah Pemasukan</label>
        <Input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="email">Tipe Pemasukan</label>
        <Input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="email">Tipe Pemasukan Khusus</label>
        <Input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Flex>
  );
};

export default AddActivity;
