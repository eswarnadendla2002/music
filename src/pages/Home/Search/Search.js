import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Search.css";

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;
  console.log(username);
  const handleLogout = () => {
    username = "";
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile", { state: { username } });
  };

  const handleHome = () => {
    navigate("/home", { state: { username } });
  };

  const handleSearch = () => {
    navigate("/search", { state: { username } });
  };

  return (
    <div>
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 color">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a
                href="/"
                class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none anchor"
              >
                <span class="fs-5 d-none d-sm-inline">
                  <h1>VibeVerse</h1>
                </span>
              </a>
              <ul
                class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li class="nav-item">
                  <a
                    class="nav-link align-middle px-0 anchor"
                    onClick={() => handleHome()}
                  >
                    <i class="fs-4 bi-house text-white"></i>{" "}
                    <span class="ms-1 d-none d-sm-inline items-nav1">Home</span>
                  </a>
                </li>
                <div class="box1"></div>
                <li>
                  <a
                    onClick={() => handleSearch()}
                    data-bs-toggle="collapse"
                    class="nav-link px-0 align-middle anchor"
                  >
                    <i class="fs-4 bi-search text-white"></i>{" "}
                    <span class="ms-1 d-none d-sm-inline items-nav1">
                      Search
                    </span>{" "}
                  </a>
                </li>
                <div class="box1"></div>
                <li>
                  <a
                    onClick={() => {
                      navigate("/favourites", { state: { username } });
                    }}
                    class="nav-link px-0 align-middle anchor"
                  >
                    <i class="fs-4 bi-heart text-white"></i>{" "}
                    <span class="ms-1 d-none d-sm-inline items-nav1">
                      Favourites
                    </span>
                  </a>
                </li>
                <div class="box"></div>
                <li>
                  <a
                    onClick={() => {
                      handleProfile();
                    }}
                    data-bs-toggle="collapse"
                    class="nav-link px-0 align-middle anchor"
                  >
                    <i class="fs-4 bi-person text-white"></i>{" "}
                    <span class="ms-1 d-none d-sm-inline items-nav1">
                      Profile
                    </span>
                  </a>
                </li>
              </ul>
              <hr />
              <div class="dropdown pb-4">
                <div class="box" style={{ marginBottom: "10px" }}></div>
                <a
                  href="#"
                  class="d-flex align-items-center text-white text-decoration-none anchor"
                  aria-expanded="false"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  {/* <img
                src="https://github.com/mdo.png"
                alt="hugenerd"
                width="30"
                height="30"
                class="rounded-circle"
              /> */}
                  <i class="fs-4 bi bi-box-arrow-left"></i>
                  <span class="d-none d-sm-inline mx-1 items-nav1">
                    &nbsp;Log Out
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div
            class="margin1"
            style={{ display: "flex", height: "100vh", width: "1275px" }}
          >
            <div
              class="col py-3 "
              style={{
                position: "relative !important",
                overflowY: "auto",
                height: "100%",
              }}
            >
              <span>
                <h1 style={{ textAlign: "center", fontSize: "100px" }}>
                  Search
                </h1>
              </span>
              <br />
              <br />
              <br />
              <div style={{ textAlign: "center" }}>
                <Button
                  variant="success"
                  className="me-5"
                  onClick={() => {
                    navigate("/artsearch", { state: { username } });
                  }}
                >
                  <span>
                    <h1>For Artists</h1>
                  </span>
                </Button>{" "}
                <Button
                  variant="danger"
                  className="ms-5"
                  onClick={() => {
                    navigate("/allsearch", { state: { username } });
                  }}
                >
                  <span>
                    <h1>For Albums</h1>
                  </span>
                </Button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
