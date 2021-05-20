A websocket example with an Angular client and Java Spring service.

Various production orders can be sent from the frontend to the service. 
The service then reports the completion of the order to the frontend via websocket after a random time.

# Build service
mvn clean install from /server/restserver/

# Start service
java -jar /target/restserver-0.0.1-SNAPSHOT.jar from /server/restserver/

# Install frontend
npm install from /client/production-order-app/

# Start frontend
npm start from /client/production-order-app
