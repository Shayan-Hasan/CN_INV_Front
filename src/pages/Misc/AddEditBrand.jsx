import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetAllBrands, DeleteBrandById, AddBrandApi } from "../../api/Api";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import Select from "react-select";
import { customersData } from "../../data/dummy";
import { Header, Button } from "../../components";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/product.css";

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
      navigate("/product/addproduct");
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
      if (window.confirm("Do you want to add brand?")) {
        AddBrandApi(brand_name.value)
          .then((res) => {
            if (res.status === 200) {
              navigate("/product/addeditbrand");
              alert("Added successfully.");
              window.location.reload();
            } else {
              alert("Fail to add brand.");
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
              navigate("/product/addeditbrand");
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
    <div className="m-2 md:m-4 p-1 md:p-2 bg-white rounded-2xl">
      <div style={{ paddingLeft: "140px" }}>
        <Header title="AED BRAND" />
      </div>
      <div className="user-body">
        <div className="offset-lg-3 col-lg-6">
          <form className="container-trans">
            <div
              // className="card"
              style={{
                width: "700px",
                height: "400px",
                textAlign: "left",
                paddingLeft: "20px",
                backgroundColor: "Transparent",
                color: "black",
              }}
            >
              <div class="article-container">
                <div>
                  <div style={{ flex: "0 0 90%" }}>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label htmlFor="ProductSelect">Brand: </label>
                        <Select
                          className="css-13cymwt-control1"
                          value={brand}
                          onChange={handleChangeBrand}
                          options={brandOptions}
                          isSearchable
                          placeholder="Choose brand to delete"
                          isClearable
                          styles={{ width: "400px" }}
                        />
                      </div>
                    </div>
                    <br />
                    <br />

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Add: </label>
                        <br />
                        <input
                          type="text"
                          name="brand_name"
                          className="input"
                          placeholder="Add new brand"
                          style={{ width: "400px", height: "30px" }}
                        />
                      </div>
                    </div>
                    <br />
                    <br />

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
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* <button >Submit</button> */}
        </div>
      </div>
    </div>
  );
};

export default AddBrandUnit;
