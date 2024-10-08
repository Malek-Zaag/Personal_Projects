import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;

public class Server {
    private static ArrayList<ConnectionHandler> connectionHandlers = new ArrayList<>();
    ServerSocket serverSocket;

    public Server() throws IOException {
        this.serverSocket = new ServerSocket(999);
    }

    public static void main(String[] args) throws IOException {
        Server server = new Server();
        server.run();
    }

    public void run() {
        while (!serverSocket.isClosed()) {
            try {
                Socket client = serverSocket.accept();
                ConnectionHandler handler = new ConnectionHandler(client);
                Thread t = new Thread(handler);
                t.start();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    static class ConnectionHandler implements Runnable {
        private Socket client;
        private String clientUsername;
        private PrintWriter out;
        private BufferedReader in;

        public ConnectionHandler(Socket client) {
            this.client = client;
            try {
                out = new PrintWriter(this.client.getOutputStream(), true);
                in = new BufferedReader(new InputStreamReader(this.client.getInputStream()));
                String clientUsername = in.readLine();
                this.clientUsername = clientUsername;
                System.out.println(clientUsername + " is connected");
                connectionHandlers.add(this);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        @Override
        public void run() {
            String msg;
            while (this.client.isConnected()) {
                try {
                    msg = in.readLine();
                    System.out.println(clientUsername + " : " + msg);
                    broadcastMsg(clientUsername, msg);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }

        public void broadcastMsg(String clientUsername, String msg) {
            for (ConnectionHandler connectionHandler : connectionHandlers) {
                if (connectionHandler.clientUsername != clientUsername) {
                    try {
                        connectionHandler.out.write(clientUsername + " : " + msg);
                        connectionHandler.out.write("\n");
                        connectionHandler.out.flush();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }

            }
        }
    }
}
