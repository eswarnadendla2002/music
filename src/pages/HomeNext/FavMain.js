import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context";
import "./Favourites.css";
import { Alert } from "react-st-modal";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { BeatLoader } from "react-spinners";

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <BeatLoader color="#d1793b" size={30} className="BeatLoader" />
  </div>
);
const FavMain = () => {
  const [users, setUsers] = useState([]);
  const accessToken = useContext(Context);
  const [favSongs, setFavSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;

  useEffect(() => {
    axios
      .get(`https://music-backend-kinl.onrender.com/Fav?username=${username}`)
      .then((result) => setUsers(result.data))
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const fetchDataForUser = async (user) => {
    try {
      let response;

      if (user.type === "album") {
        response = await fetch(
          `https://api.spotify.com/v1/albums?ids=${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          }
        );
      } else {
        response = await fetch(
          `https://api.spotify.com/v1/tracks?ids=${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          }
        );
      }

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchDataForAllUsers = async () => {
      try {
        const dataPromises = users.map((user) => fetchDataForUser(user));
        const data = await Promise.all(dataPromises);
        const validData = data.filter((item) => item !== null);
        setFavSongs(validData);
      } catch (error) {
        console.error("Error fetching data for all users:", error);
      }
    };

    if (users.length > 0) {
      fetchDataForAllUsers();
    }
  }, [users, accessToken]);

  const handleDelete = async (id) => {
    try {
      setLoading(true);

      const obj = { username, id };
      const url = "https://music-backend-kinl.onrender.com/Fav/delete";
      await axios.delete(url, {
        data: {
          username: username,
          id: id,
        },
      });

      // If the deletion is successful, update the state to reflect the changes
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setFavSongs((prevFavSongs) =>
        prevFavSongs.filter((song) => song.id !== id)
      );
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert("User not found", "");
      } else {
        Alert("Failed to delete user", "");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="big-container">
      {loading && <LoadingSpinner />}
      <div className="next-container">
        <table className="table">
          <tbody>
            <ListGroup.Item
              style={{
                background: "linear-gradient(to left, #ca6c2a, #f6a461)",
                position: "relative",
                display: "flex", // Add flex display for better alignment
                alignItems: "center", // Align items vertically in the center
              }}
            >
              <h3
                style={{
                  marginLeft: "10px",
                  paddingRight: "10px",
                  background: "transparent",
                }}
              >
                Track No.
              </h3>
              <h3
                style={{
                  background: "transparent",
                  marginLeft: "200px",
                  marginRight: "40px",
                }}
              >
                Song name
              </h3>
              <h3
                style={{
                  background: "transparent",
                  marginLeft: "350px",
                }}
              >
                Play
              </h3>
              <h3
                style={{
                  background: "transparent",
                  marginRight: "40px",
                }}
              >
                Remove
              </h3>
            </ListGroup.Item>
            {favSongs.map((data, index) => {
              const user = users[index];
              return (
                <>
                  {user &&
                  user.type === "album" &&
                  favSongs[index]?.albums &&
                  favSongs[index]?.albums[0]?.tracks?.items ? (
                    // Rendering logic for album type
                    <ListGroup.Item
                      key={index}
                      style={{
                        background:
                          "linear-gradient(to right, #ca6c2a, #f6a461)",
                        position: "relative",
                        display: "flex", // Add flex display for better alignment
                        alignItems: "center", // Align items vertically in the center
                      }}
                    >
                      <h3
                        style={{
                          marginLeft: "30px",
                          marginRight: "200px",
                          background: "transparent",
                        }}
                      >
                        {index + 1}
                      </h3>
                      <img
                        src={favSongs[index].albums[0].images[2].url}
                        alt=""
                        style={{
                          background: "transparent",
                          marginLeft: "40px",
                          marginRight: "40px",
                          borderRadius: "20px",
                          width: "64px",
                          height: "64px",
                        }} // Adjust margin for the image
                      />
                      <h3
                        className="h3"
                        style={{
                          paddingRight: "20px",
                          background: "transparent",
                        }}
                      >
                        {favSongs[index]?.albums[0]?.tracks?.items[0]?.name ||
                          "No Favourites"}
                      </h3>
                      <div
                        style={{
                          marginLeft: "auto",
                          display: "flex",
                          overflow: "hidden",
                          marginRight: "15px",
                          background: "transparent",
                        }}
                      >
                        {/* Move buttons to the right with margin */}
                        <Button
                          className="btn play ms-5 me-5"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(
                              `/artist/new/${favSongs[index].albums[0].id}`,
                              {
                                state: { username },
                              }
                            );
                          }}
                        >
                          Play
                        </Button>
                        <Button
                          className="btn delete ms me-5"
                          onClick={() => handleDelete(user.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ) : user && user.type === "track" && data.tracks ? (
                    <ListGroup.Item
                      key={index}
                      style={{
                        background:
                          "linear-gradient(to right, #ca6c2a, #f6a461)",
                        position: "relative",
                        display: "flex", // Add flex display for better alignment
                        alignItems: "center", // Align items vertically in the center
                      }}
                    >
                      <h3
                        style={{
                          marginLeft: "30px",
                          marginRight: "200px",
                          background: "transparent",
                        }}
                      >
                        {index + 1}
                      </h3>
                      <img
                        src={favSongs[index]?.tracks[0].album.images[2].url}
                        alt=""
                        style={{
                          marginLeft: "40px",
                          marginRight: "40px",
                          borderRadius: "30%",
                          width: "64px",
                          height: "64px",
                          background: "transparent",
                        }} // Adjust margin for the image
                      />
                      <h3
                        className="h3"
                        style={{
                          paddingRight: "20px",
                          background: "transparent",
                        }}
                      >
                        {data.tracks[0]?.name || "No Favourites"}
                      </h3>
                      <div
                        style={{
                          marginLeft: "auto",
                          display: "flex",
                          marginRight: "15px",
                          background: "transparent",
                        }}
                      >
                        {/* Move buttons to the right with margin */}
                        <Button
                          className="btn play ms-5 me-5"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(
                              `/track/${favSongs[index]?.tracks[0].id}`,
                              {
                                state: { username },
                              }
                            );
                          }}
                          style={{ marginRight: "10px" }}
                        >
                          Play
                        </Button>
                        <Button
                          className="btn delete ms me-5"
                          onClick={() => handleDelete(user.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ) : (
                    // Rendering logic for track type
                    //
                    // Default case when data is not available
                    <tr key={index}>
                      <td colSpan="4">
                        <h3 className="h3">No Favourites</h3>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FavMain;
