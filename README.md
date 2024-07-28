# LRU Cache with Rest API and Websocket
This project implements and LRU (Least Recently Used) Cache in Go with a REST API for "GET", "SET" and "DELETE" operations, and a Websocket endpoint to dynamically reflect the current state of the cache.
The front end is built using React and Redux Toolkit (RTK) for state management

## Features
- LRU cache with capacity as 5, and configurable expiration time for items
- Concurrent-safe operations on the cache
- Added mutex locks to handle concurrent operations
- REST API endpoints to interact with the cache
- Websocket endpoint to reflect real-time state of the cache
- React front end to consume the API and display the cache state
- Redux Toolkit (RTK) for state management
- Unit test cases to check edge cases

## Getting Started
### Prerequisites
- Go 1.19 or higher
- Node.js and npm or yarn

### Backend Setup
1. Clone the Repository
    ```sh
    git clone https://github.com/Atharv7901/LRU-Cache
2. Open the cloned Repository
    ```sh
    cd LRU-Cache
3. Navigate to backend directory
    ```sh
    cd backend
4. Install dependencies
    ```sh
    go mod tidy
5. Navigate to cmd
    ```sh
    cd cmd
6. Run the backend server
    ```sh
    go run main.go
### Frontend Setup
Open a New terminal window
1. Navigate to front end directory
    ```sh
    cd frontend
2. Install dependencies
    ```sh
    npm install
3. Start the front end development server:
    ```sh
    npm run dev
### API Endpoints
- `GET /get?key={key}`: Get the CacheItem for the key
- `POST /set`: Set a key-value pair with expiration. The request body should be a JSON object like 
`{"key": "A", "value": "valueA", "expiration": 10}`
- `DELETE /delete?key={key}`: Delete a CacheItem
- `GET /cache/state`: Get the current state of the cache
- `ws://localhost:8000/ws`: Websocket endpoint to get real-time updates of the cache state.

### Running Tests
1. Navigate to backend directory and type the command
    ```sh
    go test ./pkg/cache
### Acknowledgments
- [Gin](https://github.com/gin-gonic/gin) for the HTTP web framework
- [Gorilla Websocket](https://github.com/gorilla/websocket) for Websocket support
- [React](https://reactjs.org) and [Redux Toolkit](https://redux-toolkit.js.org) for the front end
