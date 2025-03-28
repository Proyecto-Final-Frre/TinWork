import { Box, Grid } from "@mui/material"
import styled from "styled-components"

// Contenedor principal centrado - ajustado para funcionar dentro de un contenedor flex
const CenteredContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`

const FilterSection = styled(Box)`
  margin-bottom: 24px;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`

const FilterItem = styled(Box)`
  margin-bottom: 16px;
`

const FilterLabel = styled(Box)`
  width: 120px;
  height: 16px;
  background: rgb(160, 194, 245);
  border-radius: 4px;
  margin-bottom: 8px;
  animation: pulse 1.5s infinite;
`

const FilterInput = styled(Box)`
  width: 100%;
  height: 40px;
  background: rgb(160, 194, 245);
  border-radius: 4px;
  animation: pulse 1.5s infinite;
`

const FilterButton = styled(Box)`
  width: 120px;
  height: 40px;
  background: rgb(160, 194, 245);
  border-radius: 4px;
  margin-left: auto;
  animation: pulse 1.5s infinite;
`

const JobCard = styled(Box)`
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`

const JobHeader = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`

const JobIcon = styled(Box)`
  width: 40px;
  height: 40px;
  background: rgb(160, 194, 245);
  border-radius: 4px;
  margin-right: 12px;
  animation: pulse 1.5s infinite;
`

const JobTitle = styled(Box)`
  width: 70%;
  height: 20px;
  background: rgb(160, 194, 245);
  border-radius: 4px;
  animation: pulse 1.5s infinite;
`

const JobDetail = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`

const JobDetailIcon = styled(Box)`
  width: 16px;
  height: 16px;
  background: rgb(160, 194, 245);
  border-radius: 50%;
  margin-right: 8px;
  animation: pulse 1.5s infinite;
`

const JobDetailText = styled(Box)`
  width: ${(props) => props.width || "60%"};
  height: 14px;
  background: rgb(160, 194, 245);
  border-radius: 4px;
  animation: pulse 1.5s infinite;
`

const JobDescription = styled(Box)`
  margin-top: 16px;
  margin-bottom: 16px;
`

const DescriptionLine = styled(Box)`
  width: ${(props) => props.width || "100%"};
  height: 12px;
  background: rgb(160, 194, 245);
  border-radius: 4px;
  margin-bottom: 8px;
  animation: pulse 1.5s infinite;
`

const JobFooter = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #e6e6e6;
`

const SeeMoreButton = styled(Box)`
  width: 80px;
  height: 16px;
  background: rgb(160, 194, 245);
  border-radius: 4px;
  margin-left: auto;
  animation: pulse 1.5s infinite;
`



// Estilos globales para la animación
const GlobalStyle = styled.div`
  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`

const SkeletonOfferScreen = () => {
  return (
    <GlobalStyle>
      <CenteredContainer>
        {/* Filtros */}
        <FilterSection>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FilterItem>
                <FilterLabel />
                <FilterInput />
              </FilterItem>
            </Grid>
            <Grid item xs={12} md={4}>
              <FilterItem>
                <FilterLabel />
                <FilterInput />
              </FilterItem>
            </Grid>
            <Grid item xs={12} md={4}>
              <FilterItem>
                <FilterLabel />
                <FilterInput />
              </FilterItem>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <FilterButton />
          </Box>
        </FilterSection>

        {/* Ofertas de trabajo */}
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <JobCard>
                <JobHeader>
                  <JobIcon />
                  <JobTitle />
                </JobHeader>

                <JobDetail>
                  <JobDetailIcon />
                  <JobDetailText width="50%" />
                </JobDetail>

                <JobDetail>
                  <JobDetailIcon />
                  <JobDetailText width="40%" />
                </JobDetail>

                <JobDetail>
                  <JobDetailIcon />
                  <JobDetailText width="30%" />
                </JobDetail>

                <JobDescription>
                  <DescriptionLine />
                  <DescriptionLine />
                  <DescriptionLine width="75%" />
                </JobDescription>

                <Box display="flex" justifyContent="flex-end" mb={2}>
                  <SeeMoreButton />
                </Box>
                
              </JobCard>
            </Grid>
          ))}
        </Grid>
      </CenteredContainer>
    </GlobalStyle>
  )
}

export default SkeletonOfferScreen

