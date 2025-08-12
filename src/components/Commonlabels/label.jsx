

export const registerLabels = [
  {
    label: "Username",
    name: "username",  
    type: "text",
    placeholder: "Enter your user name",
    componenttype: "input",
    required: true,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    componenttype: "input",
    placeholder: "Enter your email address",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    componenttype: "input",
    placeholder: "Enter your password",
    required: true,
  },
];

export const loginLabels = [
 {
    label: "Email",
    name: "email",
    type: "email",
    componenttype: "input",
    placeholder: "Enter your email address",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    componenttype: "input",
    placeholder: "Enter your password",
    required: true,
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    placeholder:"Select Category",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "watch", label: "Watch" },
      { id: "toys", label: "Toys" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    placeholder:"Select brand",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "saleprice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const ShopingViewMenu = [
  {
    id:"home",
    label:"Home",
    to:'/shop/home'
  },
  {
    id:"products",
    label:"Products",
    to:'/shop/productslisting'
  },
  {
    id:"men",
    label:"Men",
    to:'/shop/productslisting'
  },
  {
    id:"women",
    label:"Women",
    to:'/shop/productslisting'
  },
  {
    id:"kids",
    label:"Kids",
    to:'/shop/productslisting'
  },
  {
    id:"watch",
    label:"Watch",
    to:'/shop/productslisting'
  },
  {
    id:"toys",
    label:"Toys",
    to:'/shop/productslisting'
  },
  {
    id:"accessories",
    label:"Accessories",
    to:'/shop/productslisting'
  },
  {
    id:"footwear",
    label:"Footwear",
    to:'/shop/productslisting'
  },
  {
    id:"search",
    label:"Search",
    to:'/shop/search'
  },
]

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
    { id: "watch", label: "Watch" },
      { id: "toys", label: "Toys" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];