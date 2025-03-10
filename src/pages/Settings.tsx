import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  SelectChangeEvent,
} from '@mui/material';
import axios from 'axios';

interface Settings {
  apiEndpoint: string;
  apiKey: string;
  modelId: string;
  temperature: number;
  maxTokens: number;
  enableStreaming: boolean;
}

interface Model {
  id: string;
  name: string;
  description?: string;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    apiEndpoint: '',
    apiKey: '',
    modelId: '',
    temperature: 0.7,
    maxTokens: 1000,
    enableStreaming: true,
  });
  const [saved, setSaved] = useState(false);
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('bedrockSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const fetchModels = async () => {
    if (!settings.apiEndpoint || !settings.apiKey) {
      setError('Please set API Endpoint and API Key first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${settings.apiEndpoint}/models`, {
        headers: {
          'Authorization': `Bearer ${settings.apiKey}`,
        },
      });

      const availableModels = response.data.data.map((model: any) => ({
        id: model.id,
        name: model.id.split('.')[1], // Extract model name from ID
        description: model.description || '',
      }));

      setModels(availableModels);
    } catch (err) {
      setError('Failed to fetch models. Please check your API credentials and endpoint.');
      console.error('Error fetching models:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof Settings) => (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    const value = event.target.type === 'checkbox'
      ? (event.target as HTMLInputElement).checked
      : event.target.type === 'number'
      ? Number(event.target.value)
      : event.target.value;

    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      localStorage.setItem('bedrockSettings', JSON.stringify(settings));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Paper sx={{ p: 3 }}>
        {saved && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Settings saved successfully!
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="API Endpoint"
            value={settings.apiEndpoint}
            onChange={handleChange('apiEndpoint')}
            fullWidth
            helperText="The URL of your Bedrock Access Gateway API endpoint"
          />
          <TextField
            label="API Key"
            type="password"
            value={settings.apiKey}
            onChange={handleChange('apiKey')}
            fullWidth
            helperText="Your API key for authentication"
          />
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
            <FormControl fullWidth>
              <InputLabel>Model</InputLabel>
              <Select
                value={settings.modelId}
                onChange={handleChange('modelId')}
                label="Model"
                disabled={loading}
              >
                {models.map((model) => (
                  <MenuItem key={model.id} value={model.id}>
                    {model.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              onClick={fetchModels}
              disabled={loading || !settings.apiEndpoint || !settings.apiKey}
            >
              {loading ? <CircularProgress size={24} /> : 'Fetch Models'}
            </Button>
          </Box>
          <TextField
            label="Temperature"
            type="number"
            value={settings.temperature}
            onChange={handleChange('temperature')}
            fullWidth
            inputProps={{ min: 0, max: 1, step: 0.1 }}
            helperText="Controls randomness in the model's output (0.0 to 1.0)"
          />
          <TextField
            label="Max Tokens"
            type="number"
            value={settings.maxTokens}
            onChange={handleChange('maxTokens')}
            fullWidth
            inputProps={{ min: 1, max: 4000 }}
            helperText="Maximum number of tokens to generate"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.enableStreaming}
                onChange={handleChange('enableStreaming')}
              />
            }
            label="Enable Streaming"
          />
          <Divider />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ alignSelf: 'flex-start' }}
          >
            Save Settings
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings; 