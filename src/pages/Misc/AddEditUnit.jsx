import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllUnits, DeleteUnitById, AddUnitApi } from "../../api/Api";
import Select from "react-select";
import { Header, Button } from "../../components";
import TimeoutUtility from "../../contexts/TimeoutUtility";
import { useStateContext } from "../../contexts/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";
import "../../styles/AddProduct.css";

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
      navigate("/Product/AddProduct", {
        state: { fromPage: "Unit" },
      });
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
      // if (window.confirm("Do you want to add unit?")) {
      AddUnitApi(unit_name.value)
        .then((res) => {
          if (res.status === 200) {
            navigate("/Product/AddEditUnit", {
              state: { fromPage: "Unit" },
            });
            alert("Added successfully.");
            window.location.reload();
          } else {
            alert("Fail to add unit.");
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
              navigate("/Product/AddEditUnit", {
                state: { fromPage: "Unit" },
              });
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
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header title="ADD UNIT" />
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
                  {/* <div className="article-container-select"> */}
                  <Select
                    className="myreact-select container-select"
                    value={unit}
                    onChange={handleChangeUnit}
                    options={unitOptions}
                    isSearchable
                    placeholder="Choose unit to delete"
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
                    type="text"
                    className="input"
                    name="unit_name"
                    placeholder="Add new unit"
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
      </Row>
    </div>
  );
};

export default AddEditUnit;
