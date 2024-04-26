import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TimeoutUtility from "../../contexts/TimeoutUtility";
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
  Resize,
} from "@syncfusion/ej2-react-grids";
import {
  GetAllStoreDetails,
  CheckStoreBeforeDel,
  DelStore,
} from "../../api/Api";
import "../../styles/viewCustomer.css";
import { Header, Button } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { Col, Container, Row } from "react-bootstrap";

const Stores = () => {
  const [AllStores, setAllStores] = useState("");
  const [Store_id, setStore_id] = useState("");
  //const [delstatus, setdelstatus] = useState("");
  const navigate = useNavigate();

  const customerGridImage = (props) => <div> {`${props.tax}%`}</div>;

  const customersGrid = [
    // { headerTemplate: ` `, type: "checkbox", width: "40" },
    {
      headerText: "Store",
      field: "name",
      minWidth: "120",
      width: "160",
      maxWidth: "320",
      textAlign: "left",
    },
    {
      field: "email",
      headerText: "Email",
      minWidth: "120",
      width: "140",
      maxWidth: "240",
      textAlign: "left",
    },

    {
      field: "contact",
      headerText: "phone",
      minWidth: "130",
      width: "140",
      maxWidth: "240",
      textAlign: "Center",
    },

    {
      field: "total_stock",
      headerText: "Total Stock",
      minWidth: "120",
      width: "120",
      maxWidth: "160",
      textAlign: "right",
    },

    {
      field: "tax",
      headerText: "Tax",
      // format: "P2",
      template: customerGridImage,
      minWidth: "120",
      width: "120",
      maxWidth: "160",
      textAlign: "right",
    },

    {
      field: "manager",
      headerText: "Manager",
      minWidth: "130",
      width: "140",
      maxWidth: "240",
      textAlign: "left",
    },

    {
      field: "city",
      headerText: "City",
      minWidth: "120",
      width: "140",
      maxWidth: "240",
      textAlign: "left",
    },
  ];

  const { currentColor } = useStateContext();

  const handleAddStoreClick = async (event) => {
    event.preventDefault();
    try {
      //console.log("Add new");
      navigate("/Stores/Add");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditStoreClick = async (event) => {
    event.preventDefault();
    try {
      //console.log("edit new");
      if (Store_id !== "") {
        navigate(`/Stores/Edit/${Store_id}`);
      } else {
        alert("Please select store to edit.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditStoreClick1 = async (event) => {
    event.preventDefault();
    var str = "";
    try {
      //console.log("delete store");
      if (Store_id !== "") {
        CheckStoreBeforeDel(Store_id)
          .then((resp) => {
            if (
              resp.data.inventory === 1 ||
              resp.data.sale === 1 ||
              resp.data.purchase === 1
            ) {
              if (resp.data.inventory === 1) {
                str = str + "Store contain inventory products.";
              }
              if (resp.data.sale === 1 || resp.data.purchase === 1) {
                str = str + "\n";
              }
              if (resp.data.sale === 1) {
                str = str + "Sale order created using this store.";
              }
              if (resp.data.sale === 1 && resp.data.purchase === 1) {
                str = str + "\n";
              }
              if (resp.data.purchase === 1) {
                str = str + "Purchase order created using this store.";
              }
              str = str + "\n\nStore is not deletable.";
              alert(str);
              return;
            } else {
              if (
                window.confirm(
                  `Are you sure you want to Delete Store ID: ${Store_id}?`
                )
              ) {
                DelStore(Store_id)
                  .then((resp) => {
                    if (resp.status === 200) {
                      window.location.reload();
                      alert(`Store ID: ${Store_id} deleted successfully.`);
                    } else {
                      alert(`Store ID: ${Store_id} fail to delete.`);
                    }
                  })
                  .catch((err) => {
                    console.log(err.message);
                  });
              }
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
        navigate(`/Stores`);
      } else {
        alert("Please select store to delete.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleViewStoreClick = async (event) => {
    // event.preventDefault();
    try {
      //console.log("view store");
      if (Store_id !== "") {
        navigate(`/Stores/ViewStore/${Store_id}`);
      } else {
        alert("Please select store to view.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRowSelected = (args) => {
    const selectedRowData = args.data;
    setStore_id(selectedRowData.store_id);
    //console.log(selectedRowData.store_id);
    // console.log('Selected Product Code:', productcode);
  };

  useEffect(() => {
    const resp = GetAllStoreDetails();
    resp
      .then(function (result) {
        if (result.data) {
          setAllStores(result.data);
        } else {
          setAllStores([]);
        }
        //console.log(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="m-0 md:m-4 p-4 md:p-8 bg-white rounded-3xl">
      <Header category="Stock" title="STORES" />
      <Container fluid className="g-0 p-0 justify-end">
        <Row xs={2} className="button-row justify-content-end font-normal">
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Add"
              borderRadius="10px"
              onClick={handleAddStoreClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Update"
              borderRadius="10px"
              onClick={handleEditStoreClick}
            />
          </Col>
          <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="Delete"
              borderRadius="10px"
              onClick={handleEditStoreClick1}
            />
          </Col>
          {/* <Col md="auto" style={{ padding: "0" }}>
            <Button
              margin="6px"
              color="white"
              bgColor={currentColor}
              text="View"
              borderRadius="10px"
              onClick={handleViewStoreClick}
            />
          </Col> */}
        </Row>
      </Container>
      {/* {AllStores.length > 0 && ( */}
      <GridComponent
        className="custom-grid"
        dataSource={AllStores}
        allowPaging={true}
        pageSettings={{ pageSize: 16 }}
        allowSorting
        allowResizing
        toolbar={["Search"]}
        rowSelected={handleRowSelected}
        rowHeight={36}
        recordDoubleClick={handleViewStoreClick}
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Resize, Page, Toolbar, Selection, Edit, Sort, Filter]}
        />
      </GridComponent>
      {/* )} */}
    </div>
  );
};

export default Stores;
