import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../Components/Navbar";

function Dashboard2() {
  const [user, setUser] = useState(null);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    // Get token from local storage
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    // Fetch user information using the token
    const fetchUserInformation = async () => {
      try {
        const response = await axios.get("http://localhost:8000/Users/getUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Find the user that matches the email from localStorage
        const currentUser = response.data.find((user) => user.email === email);

        // Set the user information
        setUser(currentUser);
      } catch (error) {
        window.alert("Failed to fetch user information:", error);
      }
    };

    fetchUserInformation();
  }, []);

  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/Users/updateUser?id=${user.id}`,
        {
          firstName: user.firstName,
          email: user.email,
          role: user.role,
        }
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUser({ ...user, isEditing: false });
    } catch (error) {
      window.alert("Failed to update user:", error);
    }
  };

  const handleToggleTable = () => {
    setShowTable(!showTable);
  };

  return (
    <div>
      <NavBar />
      <div className="row align-items-center">
        <div className="col-9 col-md-8">
          <img src="2.jpg" className="img-fluid" />
        </div>
        <div className="col-6 col-md-4">
          <img src="1.jpg" className="img-fluid" />
        </div>
        <div className="col-6 col-md-3">
          <img src="3.jpg" className="img-fluid" />
        </div>
        <div className="col-6 col-md-3">
          <img src="4.jpg" className="img-fluid" />
        </div>
        <div className="col-6 col-md-3">
          <img src="5.jpg" className="img-fluid" />
        </div>
        <div className="col-6 col-md-3">
          <img src="6.jpg" className="img-fluid" />
        </div>
      </div>
      <button onClick={handleToggleTable} className="btn-edit-profile m-auto mt-3 mb-3">
        {showTable ? "Close" : "Edit Your Profile"}
      </button>

      {showTable && user && (
        <table className="table mt-5">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {user.isEditing ? (
                  <input
                    type="text"
                    value={user.firstName}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
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
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>{user.role}</td>
              <td>
                {user.isEditing ? (
                  <button className="btn-submit" onClick={handleEdit}>
                    Submit
                  </button>
                ) : (
                  <button
                    className="btn-edit"
                    onClick={() => setUser({ ...user, isEditing: true })}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}
          

    </div>
  );
}

export default Dashboard2;
