# Traffic Statistics Dashboard

This is a full-stack web application that displays traffic and sales statistics using a clean and interactive dashboard.

## Overview

The application provides a visual summary of traffic and sales data that passed through our system over the last 30 days. It is built with **React** on the frontend and **Express.js** on the backend. Currently, all data is mocked and does not reflect live traffic.

## Features

- 📈 **Completed Transactions**  
  Displays the number of completed transactions in the past 30 days.

- 👥 **Visitors**  
  Shows the number of visitors in the past 30 days.

- 💰 **Average Order Value Chart**  
  A line chart that visualizes the average order value per day over the last 30 days.

- 🌍 **Sales by Country**  
  A table summarizing total sales, aggregated by country, in the last 30 days.

## Tech Stack

- **Frontend:** React
- **Backend:** Express.js (Node.js)
- **Data:** Mock data (no live connection)

## Getting Started

### Prerequisites

- Node.js (v22)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-org/traffic-dashboard.git
   cd traffic-dashboard
   ```

2. Install dependencies for both backend and frontend:
    ```bash
       npm install
    ```

3. Runs Server
    ```bash
    npm run server
    ```
4. In a separate terminal, run frontend
    ```bash
    npm run client
    ```
