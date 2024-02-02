import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import {
  GetAllCategories,
  DeleteCategoryById,
  AddCategoryApi,
} from "../../api/Api";
import Select from "react-select";
import { customersData } from "../../data/dummy";
import { Header, Button } from "../../components";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/product.css";

const AddEditCategory = () => {
  const { currentColor } = useStateContext();
  const [category, setCategory] = useState("");
  const [getcategorys, setCategorys] = useState([]);
  const [categoryOptions, setcategoryOptions] = useState([]);
  const [category_id, setcategory_id] = useState("");
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
      const { category_name } = document.forms[0];
      if (category_name.value === "") {
        alert("Please add category unit.");
        return;
      }
      console.log("Add Category");
      if (window.confirm("Do you want to add category?")) {
        AddCategoryApi(category_name.value)
          .then((res) => {
            if (res.status === 200) {
              navigate("/product/addeditcategory");
              alert("Added successfully.");
              window.location.reload();
            } else {
              alert("Fail to add category.");
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
      if (category.label === undefined) {
        alert("Select category to delete.");
        return;
      }
      console.log("Delete Category");
      if (window.confirm(`Do you want to remove ${category.label} Category?`)) {
        console.log(category_id);
        DeleteCategoryById(category_id)
          .then((res) => {
            if (res.status === 200) {
              navigate("/product/addeditcategory");
              alert("Removed successfully.");
              window.location.reload();
            } else {
              alert("Fail to remove category.");
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

  const handleChangeCategory = (selectedOption) => {
    try {
      if (selectedOption && selectedOption.value) {
        setCategory(selectedOption);
        const selected_id = selectedOption.value;
        setcategory_id(selected_id);
      } else {
        setCategory(selectedOption.label);
        const selected_id = selectedOption.value;
        setcategory_id(selected_id);
      }
    } catch (err) {}
  };

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    async function fetchData() {
      GetAllCategories()
        .then((resp) => {
          setCategorys(resp.data || []);
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
      const fetchedStoreOptions = getcategorys.map((item) => ({
        label: `${item.name}`,
        value: item.category_id,
      }));
      setcategoryOptions(fetchedStoreOptions);
    };

    fetchStoreOptions();
  }, [getcategorys]);

  return (
    <div className="m-2 md:m-4 p-1 md:p-2 bg-white rounded-2xl">
      <div style={{ paddingLeft: "140px" }}>
        <Header title="AED CATEGORY" />
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
                        <label htmlFor="ProductSelect">Category: </label>
                        <Select
                          className="css-13cymwt-control1"
                          value={category}
                          onChange={handleChangeCategory}
                          options={categoryOptions}
                          isSearchable
                          placeholder="Choose category to delete"
                          isClearable
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
                          className="input"
                          type="text"
                          name="category_name"
                          placeholder="Add new category"
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

export default AddEditCategory;
