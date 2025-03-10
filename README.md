# Bedrock Web UI

A modern web interface for interacting with AWS Bedrock through the Bedrock Access Gateway. This application provides a user-friendly interface for chatting with Bedrock models and managing your settings.

## Features

- Modern, responsive UI built with Material-UI
- Real-time chat interface with Bedrock models
- Settings management for API configuration
- Dashboard with usage statistics
- Dark mode support
- Mobile-friendly design

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Access to AWS Bedrock and Bedrock Access Gateway

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bedrock-webui
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with your configuration:
```env
REACT_APP_API_ENDPOINT=your-bedrock-access-gateway-endpoint
REACT_APP_API_KEY=your-api-key
```

## Development

To start the development server:

```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build output will be in the `build` directory.

## Configuration

The application can be configured through the Settings page, where you can set:

- API Endpoint
- API Key
- Model ID
- Temperature
- Max Tokens
- Streaming preferences

## Security Considerations

- Never commit your API keys or sensitive credentials
- Use environment variables for sensitive configuration
- Implement proper authentication and authorization
- Follow AWS security best practices

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 