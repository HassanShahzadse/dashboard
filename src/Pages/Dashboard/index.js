import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../Components/Navbar";
import "./dashboard.css";
import "react-toastify/dist/ReactToastify.css";
import Signup from "../../Components/SignUp";
function Dashboard() {
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);


  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/Users/deleteUser?id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ).then(()=>{
        return window.alert("User Deleted Successfully")
         
       }
      );
      // Filter out the deleted user from the user list
      setUserList(userList.filter((user) => user.id !== userId));
    } catch (error) {
      window.alert("Failed to delete user:", error);
    }
  };
  useEffect(() => {
    // Get token from local storage
    const token = localStorage.getItem("token");

    // Fetch user list using the token
    const fetchUserList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/Users/getUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Set the user list
        setUserList(response.data);
      } catch (error) {
        window.alert("Failed to fetch user list:", error);
      }
    };
    if (searchTerm === "") {
      fetchUserList();
    }
  }, [searchTerm]);

  const handleEdit = async (user) => {
    try {
    await axios.put(
        `http://localhost:8000/Users/updateUser?id=${user.id}`,
        {
          firstName: user.firstName,
          email: user.email,
          role: user.role,
        }
        ).then(()=>{
          return window.alert("User Details Updated Successfully")
           
         }).catch((err)=>{
         return window.alert(err.response.data.message)
          
        })

      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedUser = { ...user, isEditing: false };

      const updatedIndex = userList.findIndex((u) => u.id === user.id);

      setUserList([
        ...userList.slice(0, updatedIndex),
        updatedUser,
        ...userList.slice(updatedIndex + 1),
      ]);
    } catch (error) {
      window.alert(error)
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filteredResults = userList.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });
    setUserList(filteredResults);
  };

  return (
    <div>
      <NavBar />
      <div className="row align-items-center loremimages">
        <div className="col-6 col-md-4">
          <img src="7.jpg" className="img-fluid" />
        </div>
        <div className="col-6 col-md-4">
          <img src="6.jpg" className="img-fluid" />
        </div>
        <div className="col-6 col-md-4">
          <img src="8.jpg" className="img-fluid" />
        </div>
      </div>

      <div className="search-container d-flex justify-content-center mt-5">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="input-search"
        />
        <button onClick={handleSearch} className="button-search">
          Search
        </button>
      </div>
      <div className="d-flex justify-content-end me-5">
        <button onClick={handleButtonClick} className="button-search">
          Create User
        </button>

        {showPopup && (
          <div className="popup">
              <Signup/>
            <button onClick={closePopup} className="button-search m-auto mt-2">
              Close
            </button>
          </div>
        )}
      </div>

      <table className="table mt-5 mb-5">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>
                {user.isEditing ? (
                  <input
                    type="text"
                    value={user.firstName}
                    onChange={(e) =>
                      setUserList(
                        userList.map((u) =>
                          u.id === user.id
                            ? { ...u, firstName: e.target.value }
                            : u
                        )
                      )
                    }
                  />
                ) : (
                  user.firstName
                )}
              </td>
              <td>
                {user.isEditing ? (
                  <input
                    type="text"
                    value={user.email}
                    onChange={(e) =>
                      setUserList(
                        userList.map((u) =>
                          u.id === user.id ? { ...u, email: e.target.value } : u
                        )
                      )
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>{user.role}</td>
              <td>
                {user.isEditing ? (
                  <button
                    className="btn-submit"
                    onClick={() => handleEdit(user)}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    className="btn-edit"
                    onClick={() =>
                      setUserList(
                        userList.map((u) =>
                          u.id === user.id ? { ...u, isEditing: true } : u
                        )
                      )
                    }
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                )}
              </td>
              <td>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(user.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
