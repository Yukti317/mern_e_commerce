import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

import { Button } from "../ui/button";

function CommonForm({ formcontrols, buttonText, formik, loader,disabled }) {
  const renderInput = (controlitem) => {
    let element = null;
    let types = {
      Input: "input",
      Select: "select",
      Textarea: "textarea",
    };

    switch (controlitem.componentType) {      
      case types.Input:
        element = (
          <Input
            name={controlitem.name}
            type={controlitem.type}
            value={formik?.values[controlitem.name] || ""}
            onChange={formik?.handleChange}
            placeholder={controlitem.placeholder}
            id={controlitem.name}
          />
        );
        break;
      case types.Select:
        element = (
          <Select
            name={controlitem.name}
            value={formik?.values[controlitem.name]} // optional; useful for controlled component
            onValueChange={(value) => {
              formik?.setFieldValue(controlitem.name, value);
            }}
            disabled={disabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={controlitem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {controlitem.options && controlitem.options.length > 0
                ? controlitem.options.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case types.Textarea:
        element = (
          <Textarea
            name={controlitem.name}
            type={controlitem.type}
            value={formik?.values[controlitem.name] || ""}
            onChange={formik?.handleChange}
            placeholder={controlitem.placeholder}
            id={controlitem.name}
          />
        );
        break;

      default:
        element = (
          <Input
            name={controlitem.name}
            type={controlitem.type}
            value={formik?.values[controlitem.name] || ""}
            onChange={formik?.handleChange}
            placeholder={controlitem.placeholder}
            id={controlitem.name}
          />
        );
        break;
    }
    return element;
  };
  return (
    <>
      <form onSubmit={formik?.handleSubmit}>
        <div className="flex flex-col gap-3">
          {formcontrols?.map((controlitem) => {
            return (
              <>
                <div
                
                  key={controlitem.name}
                  className="grid w-full gap-1.5 mb-2 "
                >
                  <Label>{controlitem.label}</Label>
                  {renderInput(controlitem)}
                </div>
              </>
            );
          })}
        </div>
        <Button className="mt-2 w-full cursor-pointer" type="submit" disabled={!formik?.dirty}>
          {loader ? "processing.." : buttonText || "Submit"}
        </Button>
      </form>
    </>
  );
}

export default CommonForm;
