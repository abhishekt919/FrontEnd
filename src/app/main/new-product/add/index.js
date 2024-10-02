import FusePageCarded from "@fuse/core/FusePageCarded";
import { FormProvider, useForm } from "react-hook-form";
import withReducer from "app/store/withReducer";
import { yupResolver } from "@hookform/resolvers/yup";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import * as yup from "yup";
import reducer from "../store";
import AddHeader from "./formHeader";
import AddForm from "./form";
const schema = yup.object().shape({
  title: yup
    .string()
    .required("This field is required.")
    .max(50, "Not more than 50 characters."),
  price: yup.number().required("Please enter a price to your product"),
  description: yup.string().required("Enter your product description"),
  quantity: yup.number().required("Enter your product quentity")
});

function AddPage() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });


  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<AddHeader />}
        content={<AddForm />}
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}

export default withReducer('productModule', reducer)(AddPage);