
import React, { useEffect, useState } from "react";
import bannerOne from "../../assets/banner_1.webp";
import bannerTwo from "../../assets/banner_2.webp";
import bannerThree from "../../assets/banner_3.webp";
import { Button } from "@/components/ui/button";
import {
  BabyIcon,
  ChevronLeft,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightningIcon,
  FootprintsIcon,
  PersonStanding,
  Ribbon,
  RibbonIcon,
  ShirtIcon,
  ToyBrickIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createData, readData } from "@/components/ui/axios";
import ShopProducts from "./product";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [Allproducts, setAllproducts] = useState([]);
  const slides = [bannerOne, bannerTwo, bannerThree];
  const [cartData, setCartdata] = useState();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const CategoryWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightningIcon },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: FootprintsIcon },
  ];

  const BrandWithIcon = [
    { id: "nike", label: "Nike", icon: ShirtIcon },
    { id: "adidas", label: "Adidas", icon: CloudLightningIcon },
    { id: "puma", label: "Puma", icon: FootprintsIcon },
    { id: "levi", label: "Levi's", icon: WatchIcon },
    { id: "zara", label: "Zara", icon: RibbonIcon },
    { id: "h&m", label: "H&M", icon: PersonStanding },
  ];

  const GetAllProduct = async (searchfilter, sort) => {
    const query = new URLSearchParams({
      ...searchfilter,
      sortBy: sort,
    });
    const res = await readData(`/shop/products/getFilterProducts?${query}`, {
      header: {
        "Content-Type": "application/json",
      },
    });
    setAllproducts(res.data);
  };

  useEffect(() => {
    GetAllProduct({ searchfilter: {}, sort: "title-atoz" });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNavigate = (curItem, sectionname) => {
    sessionStorage.removeItem("filters");

    const currentFilter = {
      [sectionname]: [curItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/productslisting");
  };

  const GetCartProducts = async () => {
    const res = await await readData(`/shop/cartItems/fetchCart/${user.id}`, {
      header: {
        "Content-Type": "application/json",
      },
    });

    setCartdata(res.data.items)
  };
  const AddProducts = async (productId, totalstock) => {
    const data = {
      userId: user.id,
      productId: productId,
      quantity: 1,
    };

    if (cartData?.length) {
      const indexofItem = cartData.findIndex(item => item.productId === productId)
      if (indexofItem > -1) {
        const quantity = cartData[indexofItem].quantity
        console.log("quantity", quantity + 1, totalstock)
        if (quantity + 1 > totalstock) {
          toast.info(`Only ${totalstock} can be added to this product`)
          return;
        }

      }
    }
    const res = await createData("", "/shop/cartItems/addtocart", data, {
      header: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      GetCartProducts();
      toast("Product added successfully");

    }
  };
  const handleGetproduct = (id) => {
    console.log("idd", id);
    navigate("/shop/productslisting", { state: { message: "home", productid: id } });
  };

  useEffect(() => {
    GetCartProducts()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, i) => (
          <img
            src={slide}
            key={i}
            className={`${i === currentSlide ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          size="icon"
          className="absolute top-1/2 left-4 transform cursor-pointer -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4 " />
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          size="icon"
          className="absolute top-1/2 right-4 cursor-pointer transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4 " />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto p-5">
          <h2 className="text-3xl fomt-bold text-center mb-8">
            Shop by category{" "}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CategoryWithIcon.map((item) => (
              <Card
                onClick={() => handleNavigate(item, "category")}
                className="cursor-pointer hover:shadow-lg transition-shadow "
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto p-5">
          <h2 className="text-3xl fomt-bold text-center mb-8">
            Shop by brand{" "}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {BrandWithIcon.map((item) => (
              <Card
                onClick={() => handleNavigate(item, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow "
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
        <div className="container mx-auto p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Allproducts && Allproducts.length > 0 ? (
              <ShopProducts
                handleGetproduct={handleGetproduct}
                productItem={Allproducts}
                AddProducts={AddProducts}
              />
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
