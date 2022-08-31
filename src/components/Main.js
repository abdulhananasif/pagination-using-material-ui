import React, {useEffect, useState} from 'react';
import {Box, Pagination, Grid, Stack, Typography, Card} from '@mui/material';
import axios from 'axios';

const Main = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);
  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const result = await axios.get(
      'https://jsonplaceholder.typicode.com/todos/'
    );
    setData(result.data);
  };
  return (
    <div>
      <Stack>
        <Grid container>
          {currentData.map((data) => {
            return (
              <Grid item xs={12} md={6} lg={4}>
                <Card variant="outlined">
                  <Typography variant="h6">{data.title}</Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Pagination
          color="standard"
          variant="outlined"
          defaultPage={1}
          count={Math.ceil(data.length / dataPerPage)}
          page={currentPage}
          onChange={paginate}
        ></Pagination>
      </Stack>
    </div>
  );
};

export default Main;
