import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ValidText } from "../../contexts/Utils";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import {
  GetProductsByStoreId,
  GetAllStores,
  GetinvStock,
  Verifyopeningbalexist,
  AddOutStock,
} from "../../api/Api";
import Select from "react-select";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/AddProduct.css";
import { Container, Col, Row } from "react-bootstrap";

const Out_stock = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const [GetProduct, setGetProduct] = useState([]);
  const [GetStore, setGetStore] = useState([]);
  const [product, setProducts] = useState("");
  const [p_code, setp_code] = useState("");
  const [store_ids, setstore_ids] = useState("");
  const [store, setStores] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [storeOptions, setStoreOptions] = useState([]);
  const [OldBal, setOldBal] = useState("");
  const [invExist, setinvExist] = useState(0);
  const [note, setNote] = useState("");
  const [ValError, setValError] = useState([]);

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
    updatedErrors[ii] = "Invalid Field!";
    setValError(updatedErrors);
    return false;
  };

  const handleChangeProduct = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      const updatedErrors = [...ValError];
      updatedErrors[1] = "";
      setValError(updatedErrors);
      //setOldBal('');
      setProducts(selectedOption);
      const selectedProduct = selectedOption.value;
      setp_code(selectedProduct);

      checkBalExist(selectedOption.value, store_ids);
    }
    // setp_code(selectedProduct.split(' ')[0]);
  };
  const checkBalExist = async (pro_id, so_id) => {
    try {
      const resp = await Verifyopeningbalexist(pro_id, so_id);
      setinvExist(resp.data[0].status);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getpreviousbal = async (pro_id, so_id) => {
    try {
      const resp = await GetinvStock(pro_id, so_id);
      setOldBal(resp.data[0].unit_instock);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };
  const handleChangeStore = (selectedOption) => {
    //const selectedStore = e.target.value;

    if (selectedOption && selectedOption.value) {
      const updatedErrors = [...ValError];
      updatedErrors[0] = "";
      setValError(updatedErrors);
      console.log(selectedOption.value);
      setStores(selectedOption);
      setstore_ids(selectedOption.value);
      if (selectedOption.value) {
        setGetProduct([]);
        getProductfromstore(selectedOption.value);
      } else {
        setGetProduct([]);
      }
    }
  };
  const getProductfromstore = async (selectedStore) => {
    //const storeid = GetStore.find((item) => item.name === selectedStore);

    if (selectedStore) {
      try {
        const resp = await GetProductsByStoreId(selectedStore);
        setGetProduct(resp.data || []);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleBackClick = async (event) => {
    event.preventDefault();
    try {
      console.log("Back");
      navigate("/Inventory");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { unit_instock } = document.forms[0];
    //const product_id = GetProduct.find(item => item.code === p_code);
    //const store_id = GetStore.find(item => item.name === store);
    setValError([]);
    const updatedErrors = [...ValError];
    if (store === "") {
      updatedErrors[0] = "Please! Select Store";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[0] = "";
    if (product === "") {
      updatedErrors[1] = "Please! Select Product";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[1] = "";

    if (note !== "") {
      if (ValidText1(note, 2) === false) {
        return;
      }
    }
    updatedErrors[2] = "";

    if (unit_instock.value === "") {
      updatedErrors[3] = "Please! Enter Out-Stock";
      setValError(updatedErrors);
      return;
    }
    if (unit_instock.value < 1) {
      updatedErrors[3] = "Out-Stock must be greater than 0";
      setValError(updatedErrors);
      return;
    }
    updatedErrors[3] = "";

    const response = await AddOutStock(
      store_ids,
      p_code,
      unit_instock.value,
      704,
      note
    );

    console.log(response, "Response");
    if (response.status === 200) {
      navigate("/Inventory/OutStock");
      alert("Out Stock Added Successfully");
    } else {
      alert("Out Stock Failed to Add");
    }
    window.location.reload();
  };
  useEffect(() => {
    async function fetchData() {
      GetAllStores()
        .then((resp) => {
          setGetStore(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (store_ids) {
      //const storeid = GetStore.find((item) => item.name === store);
      console.log("getProductfromstore");
      console.log(store);
      GetProductsByStoreId(store_ids)
        .then((resp) => {
          console.log(resp.data);
          setGetProduct(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [store]);

  useEffect(() => {
    if (invExist === 1) {
      getpreviousbal(p_code, store_ids);
    } else {
      setOldBal("-");
    }
  }, [invExist]);

  useEffect(() => {
    const fetchProductOptions = async () => {
      const fetchedProductOptions = GetProduct.map((item) => ({
        label: `${item.code} ${item.name}`,
        value: item.product_id,
      }));
      setProductOptions(fetchedProductOptions);
      checkBalExist(p_code, store_ids);
    };

    fetchProductOptions();
  }, [GetProduct, store_ids]);

  useEffect(() => {
    const fetchStoreOptions = async () => {
      const fetchedStoreOptions = GetStore.map((item) => ({
        label: `${item.name}`,
        value: item.store_id,
      }));
      setStoreOptions(fetchedStoreOptions);
    };

    fetchStoreOptions();
  }, [GetStore]);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="INVENTORY OUT-STOCK" />
      <form>
        <Container
          className="g-0 justify-center"
          fluid="true"
          style={{ paddingLeft: "8%", paddingRight: "8%", paddingTop: "18px" }}
        >
          <Row
            xs={1}
            sm={1}
            className="justify-content-center"
            style={{
              padding: "0",
            }}
          >
            <Col md={6} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label" htmlFor="StoreSelect">
                    Store:
                  </label>
                  <div className="flex mb-2">
                    <Select
                      className="myreact-select container-select"
                      value={store}
                      onChange={handleChangeStore}
                      options={storeOptions}
                      isSearchable
                      placeholder="Search Store"
                      isClearable
                      autoFocus
                    />
                    <span
                      className="myreact-span"
                      style={{
                        color: "red",
                        fontSize: "16px",
                      }}
                    >
                      {` `}*
                    </span>
                  </div>
                  {ValError[0] && <p style={{ color: "red" }}>{ValError[0]}</p>}
                </div>
              </div>
              <br />
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label" htmlFor="ProductSelect">
                    Product:
                  </label>
                  <div className="flex mb-2">
                    <Select
                      className="myreact-select container-select"
                      value={product}
                      onChange={handleChangeProduct}
                      options={productOptions}
                      isSearchable
                      placeholder="Search Product"
                      isClearable
                    />
                    <span
                      className="myreact-span"
                      style={{
                        color: "red",
                        fontSize: "16px",
                      }}
                    >
                      {`  `}*
                    </span>
                  </div>
                  {ValError[1] && <p style={{ color: "red" }}>{ValError[1]}</p>}
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Note: </label>
                  <textarea
                    placeholder="Note"
                    id="noteTextarea"
                    value={note}
                    onChange={handleChangeNote}
                    onBlur={(e) => ValidText1(e.target.value, 2)}
                    className="textarea"
                  />
                  {ValError[2] && <p style={{ color: "red" }}>{ValError[2]}</p>}
                </div>
              </div>
              <br />
              <br />
            </Col>
            <Col md={6} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Previous Inventory: </label>
                  <input
                    type="text"
                    step="1.00"
                    value={OldBal}
                    min="0"
                    placeholder="Previous Balance"
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Stock: </label>
                  <input
                    type="number"
                    min="0"
                    defaultValue={0}
                    step="1.00"
                    name="unit_instock"
                    placeholder="Balance"
                    className="input"
                  />
                  <span style={{ color: "red", fontSize: "16px" }}>
                    {`  `}*
                  </span>
                  {ValError[3] && <p style={{ color: "red" }}>{ValError[3]}</p>}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </form>
      <Row md={"auto"} className="justify-content-center">
        <Button
          margin="10px"
          padding="20px"
          color="white"
          className="custom-button mr-2"
          bgColor={currentColor}
          text="Add"
          borderRadius="10px"
          onClick={handleSubmit}
        />
        <Button
          margin="10px"
          padding="20px"
          color="white"
          className="custom-button mr-2"
          bgColor={currentColor}
          text="Back"
          borderRadius="10px"
          onClick={handleBackClick}
        />
      </Row>
    </div>
  );
};

export default Out_stock;
