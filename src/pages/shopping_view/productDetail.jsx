import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { StarIcon } from "lucide-react";
import React from "react";

function ProductDetailDialog({ open, setOpen, product,AddProducts }) {
  const DialogClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={DialogClose}>
        <DialogContent className="gap-8 grid-cols-2 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
          <div className="relative overflow-hidden rounded-lg">
            <div className="relative">
              <img
                src={product?.image}
                alt={product?.title}
                width={600}
                height={600}
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>
          <div className="">
            <div>
              <h1 className="text-3xl font-extrabold">{product?.title}</h1>
              <p className="text-muted-foreground text-2xl mb-5 mt-4">
                {product?.description}
              </p>
            </div>
            <div className="flex item-center justify-between mt-3">
              <p
                className={`${
                  product?.saleprice > 0
                    ? "line-through text-gray-500"
                    : "text-primary"
                } text-xl font-bold `}
              >
                ₹{product?.price}
              </p>
              {product?.saleprice > 0 ? (
                <span className="text-lg font-bold text-muted-foreground">
                  ₹{product?.saleprice}
                </span>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
              </div>
              <span className="text-muted-foreground">(4.5)</span>
            </div>
            <div className="mt-5 mb-5">
              <Button className="w-full" onClick={()=>AddProducts(product._id)}>Add to cart</Button>
            </div>
            <Separator />
            <div className="max-h-[300px] overflow-auto">
              <h2 className="text-xl font-bold mb-4 ">Reviews</h2>
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>J</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">Johnnn</h3>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="h-5 w-5 fill-primary" />
                      <StarIcon className="h-5 w-5 fill-primary" />
                      <StarIcon className="h-5 w-5 fill-primary" />
                      <StarIcon className="h-5 w-5 fill-primary" />
                      <StarIcon className="h-5 w-5 fill-primary" />
                    </div>
                    <p className="text-muted-foreground">Very Good</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProductDetailDialog;
