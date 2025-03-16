import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import styled from "styled-components";

const SplashContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom,rgba(245, 250, 255, 0.9), rgba(225, 240, 255, 0.9));
`;

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 20px;
  animation: fadeIn 1.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SpinnerContainer = styled.div`
  margin-top: 20px;
  position: relative;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #e0e0e0;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const SplashScreen = () => {
  return (
    <SplashContainer>
      <Logo>TinWork</Logo>
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
      <Typography variant="h6" mt={2} style={{ color: "#007bff" }}>
        Cargando, por favor espera...
      </Typography>
    </SplashContainer>
  );
};

export default SplashScreen;
