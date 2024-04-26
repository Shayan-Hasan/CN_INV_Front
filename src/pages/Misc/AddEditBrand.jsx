import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllBrands, DeleteBrandById, AddBrandApi } from "../../api/Api";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import Select from "react-select";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";
import "../../styles/AddProduct.css";

const AddBrandUnit = () => {
  const { currentColor } = useStateContext();
  const [brand, setBrand] = useState("");
  const [getbrands, setBrands] = useState([]);
  const [brandOptions, setbrandOptions] = useState([]);
  const [brand_id, setbrand_id] = useState("");
  const navigate = useNavigate();

  const handleBackClick = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      console.log("Back");
      navigate("/Product/AddProduct", {
        state: { fromPage: "Brand" },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      const { brand_name } = document.forms[0];
      if (brand_name.value === "") {
        alert("Please add new brand.");
        return;
      }
      console.log("Add Brand");
      // if (window.confirm("Do you want to add brand?")) {
      AddBrandApi(brand_name.value)
        .then((res) => {
          if (res.status === 200) {
            navigate("/Product/AddEditBrand", {
              state: { fromPage: "Brand" },
            });
            alert("Added successfully.");
            window.location.reload();
          } else {
            alert("Fail to add brand.");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    TimeoutUtility.resetTimeout();
    try {
      if (brand.label === undefined) {
        alert("Select brand to delete.");
        return;
      }
      console.log("Delete Brand");
      if (window.confirm(`Do you want to remove ${brand.label} Brand?`)) {
        console.log(brand_id);
        DeleteBrandById(brand_id)
          .then((res) => {
            if (res.status === 200) {
              navigate("/Product/AddEditBrand", {
                state: { fromPage: "Brand" },
              });
              alert("Removed successfully.");
              window.location.reload();
            } else {
              alert("Fail to remove brand.");
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeBrand = (selectedOption) => {
    try {
      if (selectedOption && selectedOption.value) {
        setBrand(selectedOption);
        const selected_id = selectedOption.value;
        setbrand_id(selected_id);
      } else {
        setBrand(selectedOption.label);
      }
    } catch (err) {}
  };

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    async function fetchData() {
      GetAllBrands()
        .then((resp) => {
          setBrands(resp.data || []);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    const fetchStoreOptions = async () => {
      const fetchedStoreOptions = getbrands.map((item) => ({
        label: `${item.name}`,
        value: item.brand_id,
      }));
      setbrandOptions(fetchedStoreOptions);
    };

    fetchStoreOptions();
  }, [getbrands]);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="ADD BRAND" />
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
            style={{ padding: "0" }}
          >
            <Col md={4} className="container-col">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label" htmlFor="ProductSelect">
                    Delete:
                  </label>
                  <Select
                    className="myreact-select container-select"
                    value={brand}
                    onChange={handleChangeBrand}
                    options={brandOptions}
                    isSearchable
                    placeholder="Choose brand to delete"
                    isClearable
                  />
                </div>
              </div>
              <br />
              <br />

              <div className="col-lg-12">
                <div className="form-group">
                  <label className="label">Add: </label>
                  <input
                    type="text"
                    name="brand_name"
                    className="input"
                    placeholder="Add new brand"
                  />
                </div>
              </div>
              <br />
              <br />
            </Col>
          </Row>
        </Container>
      </form>
      <Row md={"auto"} className="justify-content-center">
        <Button
          color="white"
          margin="10px"
          padding="20px"
          bgColor={currentColor}
          text="Add"
          borderRadius="10px"
          onClick={handleAddSubmit}
        />
        <Button
          color="white"
          margin="10px"
          padding="20px"
          bgColor={currentColor}
          text="Delete"
          borderRadius="10px"
          onClick={handleDeleteSubmit}
        />
        <Button
          color="white"
          margin="10px"
          padding="20px"
          bgColor={currentColor}
          text="Back"
          borderRadius="10px"
          onClick={handleBackClick}
        />
      </Row>
    </div>
  );
};

export default AddBrandUnit;
