const net = require('net');

const tcpConnectionServer = net.createServer();

tcpConnectionServer.on("connection", (tcpSocketConnection) => {
    console.log(tcpSocketConnection.address());
    console.log("I have a friend :D");
    tcpSocketConnection.write("Hi friend.");
    setTimeout(() => {
        tcpSocketConnection.write("I'm like ... super happy you're here. hehe");
    }, 2000);
    setTimeout(() => {
        tcpSocketConnection.write("I've been kind of lonely. :/");
    }, 4000);
});

tcpConnectionServer.listen(23);