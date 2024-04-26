import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import {
  validateEmail,
  validateName,
  ValidPhone,
  ValidText,
} from "../../contexts/Utils";
import {
  AddProductApi,
  GetAllBrands,
  GetAllCategories,
  GetAllUnits,
  AddProductImage,
  CheckProdNameCodeExist,
} from "../../api/Api";
import { customersData } from "../../data/dummy";
import { Header, Button } from "../../components";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import hello from "../../data/default_prod2.png";
import "../../styles/AddProduct.css";
import { Container, Col, Row } from "react-bootstrap";

const AddProduct = () => {
  const location = useLocation();

  const { currentColor } = useStateContext();
  const [Unit, setUnit] = useState("select");
  const [Category, setCategory] = useState("select");
  const [Brand, setBrand] = useState("select");
  const [DisplayProduct, setDisplayProduct] = useState(0);
  const [ActiveProduct, setActiveProduct] = useState(0);
  const [loading, setLoading] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [pname, setpname] = useState("");
  const [pcode, setpcode] = useState("");
  const [pexist, setpexist] = useState("");

  const fileInputRef = useRef(null);
  const fileInputImgRef1 = useRef(null);
  const fileInputImgRef2 = useRef(null);
  const fileInputImgRef3 = useRef(null);
  const fileInputImgRef4 = useRef(null);

  const [getunits, setUnits] = useState([]);
  const [getbrands, setbrands] = useState([]);
  const [getcategories, setCategories] = useState([]);
  const [visibleCard, setVisibleCard] = useState(1);
  const [ValError, setValError] = useState([]);

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleVideoFileChange = (event) => {
    const file = event.target.files[0];
    if (file.size > 31457280) {
      alert("Video File max size is 30MB");
      return;
    }
    if (file) {
      setLoading(true);
      const reader = new FileReader();

      reader.onloadend = () => {
        // Convert the result to a Blob
        const blob = new Blob([reader.result], { type: file.type });
        setVideoBlob(blob);
        setLoading(false);
      };

      // Read the file as a binary string
      reader.readAsArrayBuffer(file);
    }
  };

  const validName1 = (name, ii) => {
    const updatedErrors = [...ValError];
    if (name.trim().length === 0) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return false;
    }
    if (validateName(name)) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return true;
    }
    updatedErrors[ii] = "Invalid field.";
    setValError(updatedErrors);
    return false;
  };

  const validPhone1 = (phone, ii) => {
    const updatedErrors = [...ValError];
    if (phone.trim().length === 0) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return false;
    }
    if (ValidPhone(phone)) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return true;
    }
    updatedErrors[ii] = "Invalid field.";
    setValError(updatedErrors);
    return false;
  };

  const ValidText1 = (txt, ii) => {
    const updatedErrors = [...ValError];
    if (txt.trim().length === 0) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return false;
    }
    if (ValidText(txt)) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return true;
    }
    updatedErrors[ii] = "Invalid field.";
    setValError(updatedErrors);
    return false;
  };

  const validateEmail1 = (mail, ii) => {
    const updatedErrors = [...ValError];

    if (mail.trim().length === 0) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return false;
    }
    if (validateEmail(mail)) {
      updatedErrors[ii] = "";
      setValError(updatedErrors);
      return true;
    }
    updatedErrors[ii] = "Invalid field.";
    setValError(updatedErrors);
    return false;
  };

  const [images, setImages] = useState([
    { id: 1, file: null, preview: null },
    { id: 2, file: null, preview: null },
    { id: 3, file: null, preview: null },
    { id: 4, file: null, preview: null },
  ]);

  const [ProductImage, setProductImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const navigate = useNavigate();
  const handleChangeUnit = (e) => {
    setUnit(e.target.value);
    if (e.target.value !== "select") {
      const updatedErrors = [...ValError];
      updatedErrors[4] = "";
      setValError(updatedErrors);
    }
  };
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
    if (e.target.value !== "select") {
      const updatedErrors = [...ValError];
      updatedErrors[5] = "";
      setValError(updatedErrors);
    }
  };
  const handleChangeBrand = (e) => {
    setBrand(e.target.value);
    if (e.target.value !== "select") {
      const updatedErrors = [...ValError];
      updatedErrors[6] = "";
      setValError(updatedErrors);
    }
  };
  const handleChangeDisplay = (e) => {
    setDisplayProduct((prev) => (prev === 0 ? 1 : 0));
  };
  const handleChangeName = (e) => {
    setpname(e.target.value);
  };
  const handleChangeCode = (e) => {
    setpcode(e.target.value);
  };
  const handleChangeActive = (e) => {
    setActiveProduct((prev) => (prev === 0 ? 1 : 0));
  };
  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/Product");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageChange = (e, imageID) => {
    const file = e.target.files[0];

    // if(file === undefined){
    //     const imgs = [...images];
    //     imgs[imageID].file = null;
    //     imgs[imageID].preview = null;
    //     setImages(imgs);
    //     console.log(imgs);
    //  }
    // else{
    const updatedImg = images.map((image) =>
      image.id === imageID
        ? {
            ...image,
            file,
            preview: file ? URL.createObjectURL(file) : null,
          }
        : image
    );
    console.log(updatedImg);
    setImages(updatedImg);
    // }

    if (imageID === visibleCard) {
      const nextVisibleCard = Math.min(visibleCard + 1, images.length);
      setVisibleCard(nextVisibleCard);
    }
    // else {
    //   // If user removed the image, update the visible card
    //   const nextVisibleCard = Math.min(imageID, images.length);
    //   setVisibleCard(nextVisibleCard);

    //   // If the removed card is the first one, update ProductImage and uploadedImage
    //   if (nextVisibleCard === 1) {
    //     setProductImage(images[1].file || dataURLtoFile(hello, 'hello.jpg'));
    //     setUploadedImage(images[1].file ? URL.createObjectURL(images[1].file) : hello);
    //   }
    // }

    // setProductImage(file);
    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   setUploadedImage(reader.result);
    // };
    // reader.readAsDataURL(file);
  };

  const handleClickRemoveVideo = () => {
    setVideoBlob(null);
    // console.log(fileInputRef);
    fileInputRef.current.value = "";
  };

  const handleClickRemoveImage = (id) => {
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.id === id ? { ...image, file: null, preview: null } : image
      )
    );
    if (id === 1) {
      fileInputImgRef1.current.value = "";
    }
    if (id === 2) {
      fileInputImgRef2.current.value = "";
    }
    if (id === 3) {
      fileInputImgRef3.current.value = "";
    }
    if (id === 4) {
      fileInputImgRef4.current.value = "";
    }
  };

  const handleAddUnitClick = async (event) => {
    event.preventDefault();
    try {
      console.log("AddUnit");
      const { InitialCost, Details, Discount, UnitPrice } = document.forms[0];
      const formd = {
        pname: pname,
        pcode: pcode,
        InitialCost: InitialCost.value,
        UnitPrice: UnitPrice.value,
        Discount: Discount.value,
        Details: Details.value,
        Unit: Unit,
        Category: Category,
        Brand: Brand,
        DisplayProduct: DisplayProduct,
        ActiveProduct: ActiveProduct,
      };
      localStorage.setItem("ProductData", JSON.stringify(formd));
      navigate("/Product/AddEditUnit");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddBrandClick = async (event) => {
    event.preventDefault();
    try {
      console.log("AddBrand");
      const { InitialCost, Details, Discount, UnitPrice } = document.forms[0];
      const formd = {
        pname: pname,
        pcode: pcode,
        InitialCost: InitialCost.value,
        UnitPrice: UnitPrice.value,
        Discount: Discount.value,
        Details: Details.value,
        Unit: Unit,
        Category: Category,
        Brand: Brand,
        DisplayProduct: DisplayProduct,
        ActiveProduct: ActiveProduct,
      };
      localStorage.setItem("ProductData", JSON.stringify(formd));
      navigate("/Product/AddEditBrand");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddCategoryClick = async (event) => {
    event.preventDefault();
    try {
      console.log("AddCategory");
      const { InitialCost, Details, Discount, UnitPrice } = document.forms[0];
      const formd = {
        pname: pname,
        pcode: pcode,
        InitialCost: InitialCost.value,
        UnitPrice: UnitPrice.value,
        Discount: Discount.value,
        Details: Details.value,
        Unit: Unit,
        Category: Category,
        Brand: Brand,
        DisplayProduct: DisplayProduct,
        ActiveProduct: ActiveProduct,
      };
      localStorage.setItem("ProductData", JSON.stringify(formd));
      navigate("/Product/AddEditCategory");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const insertImage = async (imgg, product_idss) => {
    // imgg.preventDefault();
    const response = await AddProductImage(product_idss, imgg);
    if (response.status === 200) {
    } else {
      alert("Product image failed to add");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { InitialCost, Details, Discount, UnitPrice } = document.forms[0];

    setValError([]);
    const updatedErrors = [...ValError];

    if (pname === "") {
      updatedErrors[0] = "Please enter product name.";
      setValError(updatedErrors);
      return;
    }
    if (pname !== "") {
      if (validName1(pname, 0) === false) {
        return;
      }
    }

    updatedErrors[0] = "";

    if (pcode === "") {
      updatedErrors[1] = "Please enter product code.";
      setValError(updatedErrors);
      return;
    }
    if (pcode !== "") {
      if (ValidText1(pcode, 1) === false) {
        return;
      }
    }
    updatedErrors[1] = "";
    if (pexist[0].name === 1) {
      updatedErrors[0] = "Product name must be unique.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[0] = "";

    if (pexist[0].code === 1) {
      updatedErrors[1] = "Product code must be unique.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[1] = "";

    if (InitialCost.value === "") {
      updatedErrors[8] = "Please enter Initial Cost.";
      setValError(updatedErrors);
      return;
    }
    if (InitialCost.value < 0) {
      updatedErrors[8] = "Initial Cost must be 0 or greater.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[8] = "";

    if (UnitPrice.value === "") {
      updatedErrors[2] = "Please enter unit price.";
      setValError(updatedErrors);
      return;
    }
    if (UnitPrice.value <= 0) {
      updatedErrors[2] = "Price must be greater than 0.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[2] = "";

    if (Discount.value === "") {
      updatedErrors[3] = "Please enter discount.";
      setValError(updatedErrors);
      return;
    }
    if (Discount.value < 0) {
      updatedErrors[3] = "Discount must be 0 or greater.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[3] = "";

    if (Details.value !== "") {
      if (ValidText1(Details.value, 7) === false) {
        return;
      }
    }
    updatedErrors[7] = "";

    if (Unit === "select") {
      updatedErrors[4] = "Please select unit.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[4] = "";

    if (Brand === "select") {
      updatedErrors[5] = "Please select brand.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[5] = "";

    if (Category === "select") {
      updatedErrors[6] = "Please select category.";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[6] = "";

    const unit_id = getunits.find((item) => item.name === Unit);
    const brand_id = getbrands.find((item) => item.name === Brand);
    const category_id = getcategories.find((item) => item.name === Category);

    var vid = null;
    if (videoBlob) {
      vid = videoBlob;
    }

    const response = await AddProductApi(
      pname,
      pcode,
      Details.value,
      Discount.value,
      UnitPrice.value,
      unit_id.unit_id,
      brand_id.brand_id,
      category_id.category_id,
      DisplayProduct,
      ActiveProduct,
      vid,
      InitialCost.value
    );
    console.log(response, "Response");
    if (response.status === 200) {
      console.log(response.data[0][0].product_id);
      if (response.data[0][0].product_id) {
        images.forEach((element) => {
          if (element.preview === null) {
          } else {
            insertImage(element.file, response.data[0][0].product_id);
          }
        });
        // if(videoBlob){
        //   insertVideo(videoBlob, response.data[0][0].product_id)
        // }
      }

      navigate("/Product");
      alert("Product added successfully.");
    } else {
      alert("Product failed to add.");
    }
    const formd = {
      pname: "",
      pcode: "",
      InitialCost: "",
      UnitPrice: "",
      Discount: "",
      Details: "",
      Unit: "",
      Category: "",
      Brand: "",
      DisplayProduct: "",
      ActiveProduct: "",
    };
    localStorage.setItem("ProductData", JSON.stringify(formd));
  };

  useEffect(() => {
    async function fetchData() {
      await CheckProdNameCodeExist(pname, pcode)
        .then((resp) => {
          console.log(resp.data);
          setpexist(resp.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, [pcode, pname]);
  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      var u = null,
        c = null,
        b = null;
      if (isMounted) {
        await GetAllUnits()
          .then((resp) => {
            setUnits(resp.data || []);
            u = resp.data;
            console.log(resp.data);
          })
          .catch((err) => {
            console.log(err.message);
          });

        await GetAllBrands()
          .then((resp) => {
            setbrands(resp.data || []);
            b = resp.data;
          })
          .catch((err) => {
            console.log(err.message);
          });

        await GetAllCategories()
          .then((resp) => {
            setCategories(resp.data || []);
            c = resp.data;
          })
          .catch((err) => {
            console.log(err.message);
          });

        if (!JSON.parse(localStorage.getItem("ProductData"))) {
          const formd = {
            pname: "",
            pcode: "",
            InitialCost: "",
            UnitPrice: "",
            Discount: "",
            Details: "",
            Unit: "",
            Category: "",
            Brand: "",
            DisplayProduct: "",
            ActiveProduct: "",
          };
          localStorage.setItem("ProductData", JSON.stringify(formd));
        }

        const currentPath = location.pathname;
        const { fromPage } = location.state || {};
        console.log(fromPage);
        // if (
        //   fromPage !== "Brand" ||
        //   fromPage !== "Category" ||
        //   fromPage !== "Unit"
        // ) {
        //   const formd = {
        //     pname: "",
        //     pcode: "",
        //     InitialCost: "",
        //     UnitPrice: "",
        //     Discount: "",
        //     Details: "",
        //     Unit: "",
        //     Category: "",
        //     Brand: "",
        //     DisplayProduct: "",
        //     ActiveProduct: "",
        //   };
        //   localStorage.setItem("ProductData", JSON.stringify(formd));
        // }
        if (
          fromPage === "Brand" ||
          fromPage === "Category" ||
          fromPage === "Unit"
        ) {
          const formd = JSON.parse(localStorage.getItem("ProductData"));
          setpname(formd["pname"]);
          setpcode(formd["pcode"]);
          setActiveProduct(parseInt(formd["ActiveProduct"]));
          setDisplayProduct(parseInt(formd["DisplayProduct"]));
          setUnit(formd["Unit"]);
          setBrand(formd["Brand"]);
          setCategory(formd["Category"]);
          document.forms[0]["InitialCost"].value = formd["InitialCost"];
          document.forms[0]["UnitPrice"].value = formd["UnitPrice"];
          document.forms[0]["Discount"].value = formd["Discount"];
          document.forms[0]["Details"].value = formd["Details"];
          console.log(formd);
        }
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      {/* <div className="user-body"> */}
      <Header title="ADD PRODUCT" />
      {/* <div className="offset-lg-3 col-md-6"> */}
      {/* <form className="container-product"> */}
      <form>
        {/* <div className="article-container-product">
              <div className="flex justify-left"> */}
        <Container
          className="g-0 justify-center"
          fluid="true"
          style={{ paddingLeft: "8%", paddingRight: "8%", paddingTop: "18px" }}
        >
          {/* <div className="article-product"> */}
          <Row xs={1} sm={1} style={{ padding: "0" }}>
            <Col md={4} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Name:</label>
                  <input
                    required
                    type="text"
                    name="ProductNames"
                    placeholder="Name"
                    value={pname}
                    onChange={handleChangeName}
                    className="input"
                    autoFocus
                    onBlur={(e) => validName1(e.target.value, 0)}
                  />
                  <span style={{ color: "red", fontSize: "16px" }}>{` `}*</span>
                  {ValError[0] && <p style={{ color: "red" }}>{ValError[0]}</p>}
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Code: </label>
                  <input
                    required
                    type="text"
                    value={pcode}
                    onChange={handleChangeCode}
                    name="ProductCode"
                    placeholder="Code"
                    className="input"
                    onBlur={(e) => ValidText1(e.target.value, 1)}
                  />
                  <span style={{ color: "red", fontSize: "16px" }}>{` `}*</span>
                  {ValError[1] && <p style={{ color: "red" }}>{ValError[1]}</p>}
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Initial Cost: </label>
                  <input
                    type="number"
                    step="1.00"
                    min="0"
                    defaultValue={0}
                    name="InitialCost"
                    placeholder="Initial Cost"
                    className="input"
                  />
                  <span style={{ color: "red", fontSize: "16px" }}>{` `}*</span>
                  {ValError[8] && <p style={{ color: "red" }}>{ValError[8]}</p>}
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Unit Price: </label>
                  <input
                    type="number"
                    step="1.00"
                    min="0"
                    defaultValue={0}
                    name="UnitPrice"
                    placeholder="Price"
                    className="input"
                  />
                  <span style={{ color: "red", fontSize: "16px" }}>{` `}*</span>
                  {ValError[2] && <p style={{ color: "red" }}>{ValError[2]}</p>}
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Discount:</label>
                  <input
                    type="number"
                    step="1.00"
                    min="0"
                    name="Discount"
                    defaultValue={0}
                    placeholder="Discount"
                    className="input"
                  />
                  <span style={{ color: "red", fontSize: "16px" }}>{` `}*</span>
                  {ValError[3] && <p style={{ color: "red" }}>{ValError[3]}</p>}
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Description:</label>
                  <textarea
                    placeholder="Description"
                    name="Details"
                    id="noteTextarea"
                    // value={Details}
                    //onChange={handleChangeNote}
                    rows="4"
                    className="textarea"
                    onBlur={(e) => ValidText1(e.target.value, 7)}
                  />
                  {ValError[7] && <p style={{ color: "red" }}>{ValError[7]}</p>}
                </div>
              </div>

              <br />
              <br />
              {/* </div> */}
            </Col>
            {/* <div className="article-product"> */}
            <Col md={4} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label" htmlFor="UnitSelect">
                    Unit:
                  </label>
                  <select
                    id="UnitSelect"
                    className="select container-select"
                    value={Unit}
                    onChange={handleChangeUnit}
                  >
                    <option defaultValue="select">Select Unit</option>
                    {getunits.map((item) => (
                      <option key={item.unit_id}>{item.name}</option>
                    ))}
                  </select>
                  <span style={{ color: "red", fontSize: "16px" }}>{` `}*</span>
                  <button className="plus-btn" onClick={handleAddUnitClick}>
                    ➕
                  </button>
                  {ValError[4] && <p style={{ color: "red" }}>{ValError[4]}</p>}
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label" htmlFor="BrandSelect">
                    Brand:
                  </label>
                  <select
                    id="BrandSelect"
                    className="select container-select"
                    value={Brand}
                    onChange={handleChangeBrand}
                  >
                    <option defaultValue="select">Select Brand</option>
                    {getbrands.map((item) => (
                      <option key={item.brand_id}>{item.name}</option>
                    ))}
                  </select>
                  <span style={{ color: "red", fontSize: "16px" }}>{` `}*</span>
                  <button className="plus-btn" onClick={handleAddBrandClick}>
                    ➕
                  </button>
                  {ValError[5] && <p style={{ color: "red" }}>{ValError[5]}</p>}
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label" htmlFor="CategorySelect">
                    Category:
                  </label>
                  <select
                    id="CategorySelect"
                    className="select container-select"
                    value={Category}
                    onChange={handleChangeCategory}
                  >
                    <option defaultValue="select">Select Category</option>
                    {getcategories.map((item) => (
                      <option key={item.category_id}>{item.name}</option>
                    ))}
                  </select>
                  <span style={{ color: "red", fontSize: "16px" }}>{` `}*</span>
                  <button className="plus-btn" onClick={handleAddCategoryClick}>
                    ➕
                  </button>
                  {ValError[6] && <p style={{ color: "red" }}>{ValError[6]}</p>}
                </div>
              </div>
              <br />
              <label className="mt-0 label-checkbox">
                <input
                  type="checkbox"
                  value="ActiveProduct"
                  checked={ActiveProduct === 1}
                  onChange={handleChangeActive}
                />
                {` `}Active Product
              </label>
              <label className="label-checkbox">
                <input
                  type="checkbox"
                  value="DisplayProduct"
                  checked={DisplayProduct === 1}
                  onChange={handleChangeDisplay}
                />
                {` `}Display Product
              </label>

              <br />
              <div className="mt-3 col-lg-12">
                <div className="form-group">
                  <label className="label">Video:</label>
                  <div>
                    {loading && <p>Loading...</p>}
                    {videoBlob && (
                      <div className="container-video-div">
                        <video
                          controls
                          src={URL.createObjectURL(videoBlob)}
                          type="video/mp4"
                          className="container-video"
                          alt={`Product Video`}
                        />
                        <button
                          className="crs-btn"
                          type="button"
                          onClick={handleClickRemoveVideo}
                        >
                          ❌
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="mt-1 product-image-input">
                    <input
                      title=" "
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleVideoFileChange}
                    />
                  </div>
                </div>
              </div>
              <br />
              <br />
              {/* <div>
                <div
                // className="card-product"
                // style={{
                //   display: "flex",
                //   marginTop: "30px",
                // }}
                >
                  <div>
                    <div
                      className="card-product01"
                      style={{
                        width: "100%",
                        height: "182px",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div className="article-product-card">
                        <div>
                          {loading && <p>Loading...</p>}
                          {videoBlob && (
                            <div className="wrapper-product">
                              <video
                                title=""
                                controls
                                src={URL.createObjectURL(videoBlob)}
                                type="video/mp4"
                                className="box-product"
                                alt={`Product Video`}
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="article-product-card">
                        <div>
                          <div className="product-image-label">
                            <label
                              className="container-label"
                              htmlFor={`videoInput`}
                            >{`Video:`}</label>
                          </div>
                          <div className="product-image-input">
                            <input
                              ref={fileInputRef}
                              className="flex justify-left"
                              type="file"
                              accept="video/*"
                              onChange={handleVideoFileChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="article-product-btn">
                        <button
                          style={{}}
                          type="button"
                          onClick={handleClickRemoveVideo}
                        >
                          ❌
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* </div> */}
            </Col>
            {/* <div className="article-container-product">
            <div className="article-product1">
              <div
                className="card-product"
                style={{
                  display: "flex",
                  marginTop: "30px",
                }}
              > */}
            <Col md={4} className="container-col">
              <div className="mt-0 col-lg-12">
                {/* <div className="form-group"> */}
                {images.map((image, index) => (
                  // <div
                  //   key={image.id}
                  //   className="card-product"
                  //   style={{
                  //     width: "100%",
                  //     height: "152px",
                  //     display: visibleCard >= image.id ? "flex" : "none",
                  //     flexDirection: "row",
                  //   }}
                  // >
                  <div
                    key={index}
                    style={{
                      display: visibleCard >= image.id ? "flex" : "none",
                    }}
                    // className="card-product"
                    // style={{
                    //   width: "100%",
                    //   height: "152px",
                    //   display: visibleCard >= image.id ? "flex" : "none",
                    //   flexDirection: "row",
                    // }}
                  >
                    {/* <div className="article-product-card">
                        <div> */}
                    <div className="container-video-div">
                      {/* <div className="wrapper-product"> */}
                      {image.preview && (
                        <img
                          src={image.preview}
                          // className="box-product"
                          className="container-image"
                          alt={`Product ${image.id}`}
                          // style={{
                          //   maxWidth: "100%",
                          //   maxHeight: "100%",
                          //   objectFit: "contain",
                          // }}
                        />
                      )}
                      <div className="crs-btn-image">
                        {image.preview && (
                          <button
                            type="button"
                            onClick={(e) => handleClickRemoveImage(image.id)}
                          >
                            ❌
                          </button>
                        )}
                        {/* </div> */}
                        <div className="product-image-label">
                          <label
                            className="container-label"
                            htmlFor={`imageInput${image.id}`}
                          >{`Image ${image.id}:`}</label>
                        </div>

                        <div className="product-image-input">
                          {image.id === 1 && (
                            <input
                              ref={fileInputImgRef1}
                              className="flex justify-left"
                              type="file"
                              id={`imageInput${image.id}`}
                              accept="image/*"
                              onChange={(e) => handleImageChange(e, image.id)}
                            />
                          )}
                          {image.id === 2 && (
                            <input
                              ref={fileInputImgRef2}
                              className="flex justify-left"
                              type="file"
                              id={`imageInput${image.id}`}
                              accept="image/*"
                              onChange={(e) => handleImageChange(e, image.id)}
                            />
                          )}
                          {image.id === 3 && (
                            <input
                              ref={fileInputImgRef3}
                              className="flex justify-left"
                              type="file"
                              id={`imageInput${image.id}`}
                              accept="image/*"
                              onChange={(e) => handleImageChange(e, image.id)}
                            />
                          )}
                          {image.id === 4 && (
                            <input
                              ref={fileInputImgRef4}
                              className="flex justify-left"
                              type="file"
                              id={`imageInput${image.id}`}
                              accept="image/*"
                              onChange={(e) => handleImageChange(e, image.id)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    {/* </div>
                      </div> */}
                    {/* <div className="article-product-card"> */}
                    {/* <button
                          type="button"
                          onClick={(e) => handleClickRemoveImage(image.id)}
                        >
                          ❌
                        </button> */}
                    {/* <div> */}
                    {/* <div className="product-image-label">
                            <label
                              className="container-label"
                              htmlFor={`imageInput${image.id}`}
                            >{`Image ${image.id}:`}</label>
                          </div> */}

                    {/* </div> */}
                    {/* </div> */}
                  </div>
                ))}
                {/* </div> */}
              </div>
              <br />
              <br />
            </Col>
          </Row>
          {/* </div>
            </div>
          </div> */}
        </Container>
        {/* </div>
            </div> */}
      </form>
      {/* </div> */}
      {/* </div> */}
      {/* <div className="article-container-product">
        <div style={{ paddingLeft: "800px" }}> */}
      <Row md={"auto"} className="justify-content-center">
        <Button
          margin="10px"
          padding="20px"
          color="white"
          className="custom-button"
          bgColor={currentColor}
          text="Add"
          borderRadius="10px"
          onClick={handleSubmit}
        />

        <Button
          margin="10px"
          padding="20px"
          color="white"
          className="custom-button"
          bgColor={currentColor}
          text="Back"
          borderRadius="10px"
          onClick={handleBackClick}
        />
      </Row>
      {/* </div>
      </div> */}
    </div>
  );
};

export default AddProduct;
