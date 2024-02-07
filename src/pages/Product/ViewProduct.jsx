import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import { GetProductById, GetProductImagesById } from "../../api/Api";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/AddProduct.css";
import { Container, Col, Row } from "react-bootstrap";

const ViewProduct = () => {
  const { currentColor } = useStateContext();
  let param = useParams();
  const [Unit, setUnit] = useState("");
  const [Category, setCategory] = useState("");
  const [Brand, setBrand] = useState("");
  const [DisplayProduct, setDisplayProduct] = useState(0);
  const [ActiveProduct, setActiveProduct] = useState(0);
  const [Image, setImage] = useState("");
  const [videoBlob1, setVideoBlob1] = useState(null);
  const [Details, setDetails] = useState("");
  const [UnitPrice, setUnitPrice] = useState("");
  const [Code, setCode] = useState("");
  const [Name, setName] = useState("");
  const [Discount, setDiscount] = useState("");
  const [flag, setflag] = useState(false);
  const [flag1, setflag1] = useState(true);
  const [images, setImages] = useState([
    //  { id: 1, file: null, preview: null },
    // { id: 2, file: null, preview: null },
    // { id: 3, file: null, preview: null },
    // { id: 4, file: null, preview: null },
  ]);

  const navigate = useNavigate();

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/Product");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log(param.p_id);
    const resp1 = GetProductById(param.p_id);
    resp1
      .then(function (result) {
        console.log(result.data);
        setName(result.data[0].name);
        setCode(result.data[0].code);
        setDetails(result.data[0].details);
        setDiscount(result.data[0].discount);
        setUnitPrice(result.data[0].unit_price);
        setDiscount(result.data[0].discount);
        setDisplayProduct(result.data[0].display_product);
        setActiveProduct(result.data[0].active_product);
        setUnit(result.data[0].unit);
        setBrand(result.data[0].brand);
        setCategory(result.data[0].category);
        if (result.data[0].video !== null) {
          setflag(true);
        }
        setVideoBlob1("data:video/mp4;base64," + result.data[0].video);
        //     setStoreDetail(result.data);
        //   console.log("hehhe" + result.data[0].name);
      })
      .catch((err) => {
        console.log(err.message);
      });

    GetProductImagesById(param.p_id).then(function (result) {
      console.log(result.data);
      if (result.data) {
        setflag1(false);
        const productimg = result.data.map((item) => ({
          id: item.image_ids,
          file: null,
          preview: "data:image/jpeg;base64," + item.image,
          image_id: item.image_id,
          image: item.image,
        }));
        // const emptyImageCards = Array.from(
        //   { length: Math.max(0, 4 - productimg.length) },
        //   (_, index) => ({
        //     id: productimg.length + index + 1,
        //     file: null,
        //     preview: null,
        //     image_id: null,
        //     image: null,
        //   })
        // );
        console.log(productimg);
        setImages([...productimg]);
        // setVisibleCard(productimg.length + 1);
      }
    });
  }, []);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="VIEW PRODUCT" />
      <form>
        <Container
          className="g-0 justify-center"
          fluid="true"
          style={{ paddingLeft: "8%", paddingRight: "8%", paddingTop: "18px" }}
        >
          <Row xs={1} sm={1} style={{ padding: "0" }}>
            <Col md={4} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Name: </label>
                  <input
                    required
                    type="text"
                    name="Name"
                    placeholder="name"
                    className="input"
                    value={Name}
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Code: </label>
                  <input
                    required
                    type="text"
                    name="Code"
                    placeholder="Code"
                    value={Code}
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Unit Price: </label>
                  <input
                    type="number"
                    step="1.00"
                    name="UnitPrice"
                    value={UnitPrice}
                    placeholder="Price"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Discount: </label>
                  <input
                    type="number"
                    step="0.01"
                    name="Discount"
                    value={Discount}
                    placeholder="Discount"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Description: </label>
                  <textarea
                    placeholder="Description"
                    id="noteTextarea"
                    value={Details}
                    //onChange={handleChangeNote}
                    rows="4"
                    className="textarea"
                  />
                </div>
              </div>
              <br />
              <br />
            </Col>
            <Col md={4} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label" htmlFor="UnitSelect">
                    Unit:{" "}
                  </label>
                  <input
                    type="text"
                    name="Unit"
                    value={Unit}
                    placeholder="Unit"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label" htmlFor="BrandSelect">
                    Brand:{" "}
                  </label>
                  <input
                    type="text"
                    name="Brand"
                    value={Brand}
                    placeholder="Brand"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label" htmlFor="CategorySelect">
                    Category:{" "}
                  </label>
                  <input
                    type="text"
                    name="Category"
                    value={Category}
                    placeholder="Category"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />
              <label className="label-checkbox">
                <input
                  type="checkbox"
                  value="ActiveProduct"
                  checked={ActiveProduct}
                />
                {`  `}Active Product
              </label>
              <label className="label-checkbox">
                <input
                  type="checkbox"
                  value="DisplayProduct"
                  checked={DisplayProduct}
                />
                {`  `}Display Product
              </label>
              <br />

              <div className="mt-3 col-lg-12">
                <div className="form-group">
                  <label className="label">Video:</label>
                  <div>
                    {flag ? (
                      <div>
                        {videoBlob1 && (
                          <div
                            className="container-video-div"
                            style={{ width: "80%" }}
                          >
                            <video
                              controls
                              src={videoBlob1}
                              type="video/mp4"
                              className="container-video"
                              alt={`Product Video`}
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <span className="nf-h">No Video Found</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <br />
              <br />
            </Col>
            <Col md={4} className="container-col">
              <div className="mt-0 col-lg-12">
                {images.length !== 0 ? (
                  <div>
                    {images.map((image) => (
                      <div key={image.id}>
                        <div className="container-video-div">
                          {image.preview && (
                            <img
                              src={image.preview}
                              className="container-image"
                              alt={`Product ${image.id}`}
                            />
                          )}
                          <div className="crs-btn-image">
                            <div className="product-image-label">
                              <label
                                className="container-label"
                                htmlFor={`imageInput${image.id}`}
                              >{`Image ${image.id}`}</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="container-video-div">
                    <span className="nf-h">No Image Preview</span>
                  </div>
                )}
              </div>
              <br />
              <br />
            </Col>
          </Row>
        </Container>
      </form>
      {/* <button >Submit</button> */}
      <Row md={"auto"} className="justify-content-center">
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
    </div>
  );
};

export default ViewProduct;
