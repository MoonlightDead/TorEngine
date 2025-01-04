# Lightweight Torrent Search Website

**A lightweight torrent search website using Jackett's API, deployed with Docker for simplicity and parallel deployment.**

---

## Overview

This project is a minimalistic web application designed to provide a clean and efficient interface for searching torrents through the Jackett API. It leverages Docker for quick setup and ensures modularity for easy management.

---

## Features

- **Simple and lightweight**: Focused solely on torrent search functionality.
- **Jackett API integration**: Seamlessly connects to multiple torrent indexers.
- **Dockerized deployment**: Fast and parallel deployment using Docker.
- **User-friendly UI**: A minimalistic web interface for searching torrents.

---

## Technologies Used

- **Jackett API**: Handles torrent indexer aggregation and search requests.
- **Docker**: Ensures a portable and isolated application environment.
- **HTML/CSS/JS**: Frontend for the search interface.

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) installed on your machine.

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
   ```

2. Build and start the Docker container:
   ```bash
   docker-compose up -d
   ```

3. Access the web interface at `http://localhost:8080` (or your configured port).

---

## Configuration

1. Set up your Jackett server and note the API key.
2. Update the environment variables in the `docker-compose.yml` file:
   ```yaml
   environment:
     - JACKETT_API_KEY=your_api_key
     - JACKETT_SERVER_URL=http://your-jackett-url
   ```

3. Restart the container to apply changes:
   ```bash
   docker-compose down && docker-compose up -d
   ```

---

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Disclaimer

This project is for personal use only. The authors are not responsible for any misuse of this software.

---

## Contact

For inquiries or support, please contact [your email/contact info].

