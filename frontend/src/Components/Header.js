import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import React from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const username = localStorage.getItem("name");
  const customerInfo =
    username !== null ? (
      <MenuItem key="logout" onClick={handleCloseUserMenu}>
        <Link to="/logout" className="header-link">
          <Typography textAlign="center" sx={{ color: "red" }}>
            Logout ({username})
          </Typography>
        </Link>
      </MenuItem>
    ) : (
      <></>
    );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StorefrontIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}>
            BookStore
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}>
              <MenuItem key="newbook" onClick={handleCloseNavMenu}>
                <Link to="/browse-products/0" className="header-link">
                  <Typography textAlign="center" sx={{ color: "black" }}>
                    New Book
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem key="cart" onClick={handleCloseNavMenu}>
                <Link to="/cart" className="header-link">
                  <Typography textAlign="center" sx={{ color: "black" }}>
                    Cart
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem key="order" onClick={handleCloseNavMenu}>
                <Link to="/order" className="header-link">
                  <Typography textAlign="center" sx={{ color: "black" }}>
                    Order
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <StorefrontIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            BookStore
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="newbook"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}>
              <Link to="/browse-products/0" className="header-link">
                <Typography textAlign="center">New Book</Typography>
              </Link>
            </Button>
            <Button
              key="cart"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}>
              <Link to="/cart" className="header-link">
                <Typography textAlign="center">Cart</Typography>
              </Link>
            </Button>
            <Button
              key="order"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}>
              <Link to="/order" className="header-link">
                <Typography textAlign="center">Order</Typography>
              </Link>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon
                  sx={{
                    fontSize: {
                      xs: 30,
                      sm: 40,
                      md: 50,
                    },
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              <MenuItem key="login" onClick={handleCloseUserMenu}>
                <Link to="/login" className="header-link">
                  <Typography textAlign="center" sx={{ color: "black" }}>
                    Login
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem key="signup" onClick={handleCloseUserMenu}>
                <Link to="/sign-up" className="header-link">
                  <Typography textAlign="center" sx={{ color: "black" }}>
                    Sign Up
                  </Typography>
                </Link>
              </MenuItem>
              {customerInfo}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
