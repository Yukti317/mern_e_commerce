/* eslint-disable no-unused-vars */
import Productimageupload from "@/components/admin_view/image_upload";
import AdminProductTile from "@/components/admin_view/productTile";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/components/Commonlabels/label";
import {
  createData,
  deleteData,
  readData,
  updateData,
} from "@/components/ui/axios";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useFormik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "sonner";

function AdminProduct() {
  const [opensidebar, setOpensidebar] = useState(false);
  const [productid, setProductId] = useState();
  const [IsEdit, setIsedit] = useState(false);
  const [loader, setLoader] = useState(false);
  const [imageloader, setImageLoader] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [data, setData] = useState([]);
  const [initialValues, setinitialValues] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    saleprice: "",
    totalStock: "",
    image: "",
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (IsEdit) {
        try {
          const data = { ...values, imagename: imageFile?.name };
          const res = await updateData(
            `/admin/products/updateProduct/${productid}`,
            data,
            {
              header: {
                "Content-Type": "application/json",
              },
            }
          );
          if (res.success === true) {
            toast(res.message);
            GetAllProduct();
            setOpensidebar(false);
          } else {
            toast.error(res.data.message);
            setOpensidebar(false);
          }
        } catch (error) {
          console.log("errr", error);
        }
      } else {
        if (values.saleprice >= values.price) {
          toast.error("The sales price must be lower than the listed price.");
        } else {
          const data = { ...values, imagename: imageFile?.name };
          const res = await createData("", "/admin/products/addProduct", data, {
            header: {
              "Content-Type": "application/json",
            },
          });
          if (res.status === 201) {
            toast(res.data.message);
            GetAllProduct();
            setOpensidebar(false);
            formik.resetForm();
            formik.setFieldValue("image", "");
          } else {
            toast.error(res.data.message);
            setOpensidebar(false);
          }
        }
      }
    },
  });

  const GetAllProduct = async () => {
    const res = await readData("/admin/products/getProduct", {
      header: {
        "Content-Type": "application/json",
      },
    });
    setData(res.data);
  };

  const GetProductbyId = async (id) => {
    if (id) {
      const res = await readData(`/admin/products/getProductbyid/${id}`, {
        header: {
          "Content-Type": "application/json",
        },
      });
      const editdta = res.data;
      formik.setFieldValue("title", editdta.title);
      formik.setFieldValue("description", editdta.description);
      formik.setFieldValue("category", editdta.category);
      formik.setFieldValue("brand", editdta.brand);
      formik.setFieldValue("price", editdta.price);
      formik.setFieldValue("totalStock", editdta.totalStock);
      formik.setFieldValue("saleprice", editdta.saleprice);
      formik.setFieldValue("image", editdta.image);
      setImageFile({
        url: editdta.image,
        name: editdta.imagename,
      });
      // setinitialValues(data);
    }
  };

  const DeleteProduct = async (id) => {
    const res = await deleteData(`/admin/products/deleteProduct/${id}`);
    if (res.success) {
      toast(res.message);
      GetAllProduct();
    }
  };

  useEffect(() => {
    GetAllProduct();
    if (IsEdit === true && productid) GetProductbyId(productid);
    if (!IsEdit) {
      formik.setFieldValue("title", "");
      formik.setFieldValue("description", "");
      formik.setFieldValue("category", "");
      formik.setFieldValue("brand", "");
      formik.setFieldValue("price", "");
      formik.setFieldValue("totalStock", "");
      formik.setFieldValue("saleprice", "");
      formik.setFieldValue("image", "");
      setImageFile(null);
    }
  }, [IsEdit, productid]);

  const addProduct = () => {
    setIsedit(false), setOpensidebar(true);
  };

  return (
    <Fragment>
      <div className="mb-5 flex w-full justify-end">
        <Button onClick={() => addProduct()}>Add New Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        <AdminProductTile
          data={data}
          setOpensidebar={setOpensidebar}
          setId={setProductId}
          setIsedit={setIsedit}
          DeleteProduct={DeleteProduct}
        />
      </div>
      <Sheet
        open={opensidebar}
        onOpenChange={() => {
          setOpensidebar(false);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add new prouct</SheetTitle>
          </SheetHeader>
          <div className=" px-4">
            <Productimageupload
              setinitialValues={setinitialValues}
              formik={formik}
              file={imageFile}
              setfile={setImageFile}
              uploadedimageurl={uploadedUrl}
              setuploadurl={setUploadedUrl}
              setImageLoader={setImageLoader}
              imageloader={imageloader}
              IsEdit={IsEdit}
            />
          </div>
          <div className="py-6 px-4">
            <CommonForm
              formcontrols={addProductFormElements}
              formik={formik}
              buttonText="Add product"
              loader={loader}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProduct;
