/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { createData } from "../ui/axios";
import { Skeleton } from "../ui/skeleton";

function Productimageupload({
  file,
  setfile,
  uploadedimageurl,
  setuploadurl,
  setImageLoader,
  formik,
  imageloader,
  IsEdit
}) {
  const inputref = useRef();

  const handaleImage = (event) => {
    const selectedfile = event.target.files?.[0];
    if (selectedfile) setfile(selectedfile);
  };

  const handledragover = (event) => {
    event.preventDefault();
  };

  const handledrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (!droppedFile) setfile(droppedFile);
  };
  const handleremoveimg = () => {
    setfile(null);
    if (inputref.current) {
      inputref.current.value = "";
    }
  };
  const uploadedimage = async () => {
    setImageLoader(true);
    const data = new FormData();
    data.append("my_file", file);
    const res = await createData(
      "",
      "/admin/products/uploadproductimage",
      data,
      ""
    );
    if (res.data.success) {
      setuploadurl(res.data.result.url);
      const imageUrl = res.data.result.url;
      formik.setFieldValue("image", imageUrl);
      setImageLoader(false);
    } else {
      setImageLoader(false);
    }
  };

  useEffect(() => {
    if(!IsEdit){
      if (file !== null ) uploadedimage();
    }
  }, [file]);
  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-sm mb-3 font-semibold block">Upload Image</Label>
      <div
        onDragOver={handledragover}
        onDrop={handledrop}
        className={`${
          IsEdit ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
       
      >
        <Input
          id="image_upload"
          type="file"
          className="hidden"
          ref={inputref}
          onChange={handaleImage}
           disabled = {IsEdit}
          
        />
        {!file ? (
          <Label
            htmlFor="image_upload"
            className={`${
              IsEdit ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drage & drop or click to uplaod image</span>
          </Label>
        ) : imageloader ? (
          <Skeleton className="h-4 w-full rounded-full bg-muted-foreground" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium"> {file.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleremoveimg}
              disabled={IsEdit}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Productimageupload;
