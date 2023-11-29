import React from "react";

// Components
import { Header } from "../components/common";
import { ImageList } from "../components/homepage";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Header />
      <main>
        <Container maxWidth="xl" className='home-page-container'>
          <Box className="home-page-title">
            <Typography>
              Generate image based <br /> on your query.
              <Link to="/chat">
                Try it yourself!
                <LaunchIcon className="launch-icon" fontSize="small" />
              </Link>
            </Typography>
          </Box>
          <section>
            <ImageList />
          </section>
        </Container>
      </main>
    </div>
  );
};
