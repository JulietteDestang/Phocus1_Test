import React, { useState} from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Stack,
  Box,
} from "@mui/material";
import { AccountBalanceWallet, TrendingUp } from "@mui/icons-material";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);



const InterestCalculator = () => {
  const [capital, setCapital] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [resultat, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState({
    labels: ['Année 1', 'Année 2', 'Année 3'],
    datasets: [{
      label: 'Valeur de l\'investissement',
      data: [0, 0, 0],
      borderColor: '#3e95cd',
      fill: false,
    }]
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/simulate-interest", {
        capital,
        rate,
        years,
      });
      setResult(response.data.result);

      const labels = [];
      const data = [];
      for (let i = 1; i <= years; i++) {
        labels.push(`Année ${i}`);

        const value = capital * Math.pow(1 + rate / 100, i);
        data.push(value);
      }
      setChartData({
        labels,
        datasets: [{
          label: 'Valeur de l\'investissement',
          data,
          borderColor: '#3e95cd',
          fill: false,
        }]
      });

    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  
  return (

          <Stack spacing={4} sx={{ marginTop: 4 }} direction="column">
            <Box flex={1}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <AccountBalanceWallet fontSize="small" sx={{ marginRight: 1 }} />
                    Calcul d'Investissement
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Capital"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={capital}
                      onChange={(e) => setCapital(e.target.value)}
                      required
                      type="number"
                    />
                    <TextField
                      label="Taux d'intérêt (%)"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      required
                      type="number"
                    />
                    <TextField
                      label="Années"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={years}
                      onChange={(e) => setYears(e.target.value)}
                      required
                      type="number"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                      sx={{ marginTop: 2 }}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : "Calculer"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Box>

            <Box flex={1}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <TrendingUp fontSize="small" sx={{ marginRight: 1 }} />
                    Résultat de l'Investissement
                  </Typography>
                  {error && (
                    <Typography color="error" sx={{ marginBottom: 2 }}>
                      {error}
                    </Typography>
                  )}
                  {resultat !== null && !loading && (
                    <Typography variant="h5" sx={{ marginTop: 2 }}>
                      Résultat : {resultat} €
                    </Typography>
                  )}
                  {!resultat && !loading && (
                    <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2 }}>
                      Entrez les informations pour obtenir le calcul.
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <IconButton disabled={loading} onClick={handleSubmit}>
                    <TrendingUp />
                  </IconButton>
                </CardActions>
              </Card>
            </Box>

            <Box flex={1}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <TrendingUp fontSize="small" sx={{ marginRight: 1 }} />
                    Évolution de l'Investissement
                  </Typography>
                  <Line data={chartData} options={{ responsive: true }} />
                </CardContent>
              </Card>
            </Box>
          </Stack>
  );
};

export default InterestCalculator;