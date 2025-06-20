 
import React, { Fragment } from "react";
import { filterOptions } from "../Commonlabels/label";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({filter, handleFilter}) {
  return (
    <>
      <div className="bg-background rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-lg font-extrabold">Filters</h2>
        </div>
        <div className="p-4 space-y-4">
          {Object.keys(filterOptions).map((keyItem) => (
            <Fragment>
              <div>
                <h3 className="text-base font-semibold">{keyItem}</h3>
              </div>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((options) => (
                  <Label className="flex items-center gap-3 font-normal">
                    <Checkbox className="cursor-pointer" checked={filter && Object.keys(filter).length > 0 && filter[keyItem] && filter[keyItem].indexOf(options.id) > -1} onCheckedChange={()=>handleFilter(keyItem, options.id)} />
                    {options.label}
                  </Label>
                ))}
              </div>
              <Separator />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductFilter;
