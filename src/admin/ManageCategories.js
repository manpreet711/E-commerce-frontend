import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getCategories, removeCategory } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setcategories] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setcategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteMyCategory = (categoryId) => {
    removeCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base
      className="bg-info text-white p-4"
      title="Welcome admin"
      description="Manage your Categories here."
    >
      <Link className="btn btm-md btn-secondary mb-3" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12 bg-dark">
          <h1
            className="text-center text-white my-4 text-block bg-secondary p-2"
            style={{ color: (230, 230, 250) }}
          >
            All Categories
          </h1>
          {categories.map((category, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h2 className="text-white text-left">{category.name}</h2>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-lg btn-outline-success"
                    to={`/admin/categories/update/${category._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteMyCategory(category._id);
                    }}
                    className="btn btn-lg btn-outline-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
