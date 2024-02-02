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
import { GetAllUnits, DeleteUnitById, AddUnitApi } from "../../api/Api";
import Select from "react-select";
import { customersData } from "../../data/dummy";
import { Header, Button } from "../../components";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import "../../styles/product.css";

const AddEditUnit = () => {
  const { currentColor } = useStateContext();
  const [unit, setUnit] = useState("");
  const [getunits, setUnits] = useState([]);
  const [unitOptions, setunitOptions] = useState([]);
  const [unit_id, setunit_id] = useState("");
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
      const { unit_name } = document.forms[0];
      if (unit_name.value === "") {
        alert("Please add new unit.");
        return;
      }
      console.log("Add Unit");
      if (window.confirm("Do you want to add unit?")) {
        AddUnitApi(unit_name.value)
          .then((res) => {
            if (res.status === 200) {
              navigate("/product/addeditunit");
              alert("Added successfully.");
              window.location.reload();
            } else {
              alert("Fail to add unit.");
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
      if (unit.label === undefined) {
        alert("Select unit to delete.");
        return;
      }
      console.log("Delete Unit");
      if (window.confirm(`Do you want to remove ${unit.label} Unit?`)) {
        console.log(unit_id);
        DeleteUnitById(unit_id)
          .then((res) => {
            if (res.status === 200) {
              navigate("/product/addeditunit");
              alert("Removed successfully.");
              window.location.reload();
            } else {
              alert("Fail to remove unit.");
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

  const handleChangeUnit = (selectedOption) => {
    try {
      if (selectedOption && selectedOption.value) {
        setUnit(selectedOption);
        const selected_id = selectedOption.value;
        setunit_id(selected_id);
      } else {
        setUnit(selectedOption.label);
      }
    } catch (err) {}
  };

  useEffect(() => {
    TimeoutUtility.resetTimeout();
    async function fetchData() {
      GetAllUnits()
        .then((resp) => {
          setUnits(resp.data || []);
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
      const fetchedStoreOptions = getunits.map((item) => ({
        label: `${item.name}`,
        value: item.unit_id,
      }));
      setunitOptions(fetchedStoreOptions);
    };

    fetchStoreOptions();
  }, [getunits]);

  return (
    <div className="m-2 md:m-4 p-1 md:p-2 bg-white rounded-2xl">
      <div style={{ paddingLeft: "140px" }}>
        <Header title="AED UNIT" />
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
                        <label htmlFor="ProductSelect">Unit: </label>
                        {/* <div class="article-container-select"> */}
                        <Select
                          className="css-13cymwt-control1"
                          value={unit}
                          onChange={handleChangeUnit}
                          options={unitOptions}
                          isSearchable
                          placeholder="Choose unit to delete"
                          isClearable
                          styles={{ width: "400px" }}
                        />
                        {/* </div> */}
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
                          className="input"
                          name="unit_name"
                          placeholder="Add new unit"
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
                      className="custom-button ml-2"
                      onClick={handleAddSubmit}
                    />
                    <Button
                      color="white"
                      margin="10px"
                      padding="20px"
                      bgColor={currentColor}
                      text="Delete"
                      borderRadius="10px"
                      className="custom-button ml-2"
                      onClick={handleDeleteSubmit}
                    />
                    <Button
                      color="white"
                      margin="10px"
                      padding="20px"
                      bgColor={currentColor}
                      text="Back"
                      borderRadius="10px"
                      className="custom-button ml-2"
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

export default AddEditUnit;
