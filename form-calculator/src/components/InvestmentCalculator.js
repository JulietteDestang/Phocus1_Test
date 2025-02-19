import React, { useState} from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Stack,
  Box,
} from "@mui/material";
import { AccountBalanceWallet, TrendingUp } from "@mui/icons-material";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const InvestmentCalculator = () => {
  const [objectif, setobjectif] = useState("");
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
      tension: 0.4,
      pointRadius: 5,
      pointBackgroundColor: '#3e95cd',
    }]
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/calculate-investment", {
        objectif,
        rate,
        years,
      });
      setResult(response.data.result);

      const labels = [];
      const data = [];
      let currentValue = response.data.result;
  
      for (let i = 1; i <= years; i++) {
        labels.push(`Année ${i}`);
  

        currentValue = currentValue + (objectif - currentValue) / (years - i + 1);
        data.push(currentValue);
      }
      setChartData({
        labels,
        datasets: [{
          label: 'Valeur de l\'investissement',
          data,
          borderColor: '#3e95cd',
          fill: false,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#3e95cd',
        }]
      });

    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Évolution de l\'investissement',
        font: {
          size: 18,
        },
        color: '#FFFFFF',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `€ ${context.raw.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Années',
        }
      },
      y: {
        title: {
          display: true,
          text: 'Montant en €',
        },
        ticks: {
          callback: function(value) {
            return `€ ${value.toFixed(2)}`;
          }
        }
      }
    }
  };

  return (
    <Stack spacing={4} sx={{ marginTop: 4 }} direction="column">
      <Box flex={1}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <AccountBalanceWallet fontSize="small" sx={{ marginRight: 1 }} />
              Objectif d'investissement
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Objectif"
                variant="outlined"
                fullWidth
                margin="normal"
                value={objectif}
                onChange={(e) => setobjectif(e.target.value)}
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
              Investissement nécessaire pour atteindre votre objectif
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
        </Card>
      </Box>

      <Box flex={1}>
        <Card>
          <CardContent>
            <Line data={chartData} options={chartOptions} />
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
};

export default InvestmentCalculator;
