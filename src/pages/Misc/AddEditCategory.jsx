import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GetAllCategories,
  DeleteCategoryById,
  AddCategoryApi,
} from "../../api/Api";
import Select from "react-select";
import { Header, Button } from "../../components";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import { useStateContext } from "../../contexts/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";
import "../../styles/AddProduct.css";

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
      navigate("/Product/AddProduct", {
        state: { fromPage: "Category" },
      });
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
        alert("Please add new category.");
        return;
      }
      console.log("Add Category");
      // if (window.confirm("Do you want to add category?")) {
      AddCategoryApi(category_name.value)
        .then((res) => {
          if (res.status === 200) {
            navigate("/Product/AddEditCategory", {
              state: { fromPage: "Category" },
            });
            alert("Added successfully.");
            window.location.reload();
          } else {
            alert("Fail to add category.");
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
              navigate("/Product/AddEditCategory", {
                state: { fromPage: "Category" },
              });
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
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="ADD CATEGORY" />
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
                    Delete:{" "}
                  </label>
                  <Select
                    className="myreact-select container-select"
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
                  <label className="label">Add: </label>
                  <br />
                  <input
                    className="input"
                    type="text"
                    name="category_name"
                    placeholder="Add new category"
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

export default AddEditCategory;
