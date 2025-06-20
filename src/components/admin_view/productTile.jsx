 
import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";


function AdminProductTile({ data, setOpensidebar, setId, setIsedit,DeleteProduct }) {
  const EditProduct = (id) => {
    setOpensidebar(true);
    setIsedit(true);
    setId(id);
  };
  return (
    <>
      {data && data.length ? (
        data.map((product) => (
          <>
            <Card className="w-full max-w-sm mx-auto">
              <div>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-auto mx-auto h-[200px] object-cover "
                  />
                </div>
              </div>
              <CardContent>
                <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                <div className="flex justify-between items-center mb-2">
                  {" "}
                  {/* add line-through */}
                  <span
                    className={`${
                      product.saleprice ? "line-through text-muted" : ""
                    } text-lg font-semibold text-primary`}
                  >
                    ₹ {product.price}
                  </span>
                  {product?.saleprice ? (
                    <span className="text-lg font-bold">
                      ₹ {product.saleprice}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Button onClick={() => EditProduct(product._id)}>Edit</Button>
                <Button onClick={() => DeleteProduct(product._id)}>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          </>
        ))
      ) : (
        <></>
      )}
    </>
  );
}

export default AdminProductTile;
