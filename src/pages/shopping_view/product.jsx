/* eslint-disable no-unused-vars */
import { createData } from "@/components/ui/axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import { useSelector } from "react-redux";

function ShopProducts({ productItem, handleGetproduct, AddProducts }) {

  return (
    <>
      {productItem &&
        productItem?.map((product) => (
          <Card className="w-full max-w-sm mx-auto p-0">
           
            <div
              onClick={() => handleGetproduct(product._id)}
              className="cursor-pointer"
            >
              <div className="relative">
                <img
                  src={product?.image}
                  alt={product.title}
                  className="w-full h-[200px] object-cover rounded-t-lg"
                />
                {product?.totalStock === 0 ? (
                  <Badge className="absolute ms-3 me-3  top-2 bg-red-500 hove:bg-red-600">
                    {" "}
                    Out Of Stock
                  </Badge>
                ) : 
                product?.totalStock <= 5 ? (
                  <Badge className="absolute ms-3 me-3  top-2 bg-red-500 hove:bg-red-600">
                    {" "}
                   {`Only ${product?.totalStock} items left`}
                  </Badge>
                ) : 
                product?.saleprice > 0 ? (
                  <Badge className="absolute ms-3  top-2 bg-red-500 hove:bg-red-600">
                    {" "}
                    Sale
                  </Badge>
                ) : null}
              </div>
              <CardContent className="p-4 ">
                <h2 className="font-bold mb-2 text-xl">{product?.title}</h2>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {product?.category.substring(0, 1).toUpperCase() +
                      product?.category.substring(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {product?.brand.substring(0, 1).toUpperCase() +
                      product?.brand.substring(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`${product?.saleprice > 0
                        ? "line-through text-gray-500"
                        : "text-primary"
                      } text-lg font-semibold `}
                  >
                    ₹{product?.price}
                  </span>
                  {product?.saleprice > 0 ? (
                    <span className="text-lg font-semibold text-primary">
                      ₹{product?.saleprice}
                    </span>
                  ) : null}
                </div>
              </CardContent>

            </div>
            <CardFooter>
              <Button
                className="w-full mb-5 cursor-pointer" 
                onClick={() => AddProducts(product._id, product.totalStock)}
                disabled={product.totalStock === 0}
              >
                {product.totalStock === 0 ? "Out pf Stock" : "Add to cart"}
              </Button>
            </CardFooter>
          </Card>
        ))}
    </>
  );
}

export default ShopProducts;
