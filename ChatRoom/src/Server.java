import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;

public class Server {

    private BufferedReader in;


    public static void main(String[] args) {
        Server server = new Server();
        server.run();
    }

    public void run() {
        try {
            ServerSocket serverSocket = new ServerSocket(999);
            Socket client = serverSocket.accept();
            ConnectionHandler handler = new ConnectionHandler(client);
            Thread t = new Thread(handler);
            t.start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    static class ConnectionHandler implements Runnable {
        private ArrayList<ConnectionHandler> connectionHandlers = new ArrayList<>();
        private Socket client;
        private PrintWriter out;
        private BufferedReader in;

        public ConnectionHandler(Socket client) {
            this.client = client;
            System.out.println("A new Client is connected");
            try {
                out = new PrintWriter(this.client.getOutputStream(), true);
                in = new BufferedReader(new InputStreamReader(this.client.getInputStream()));
                this.connectionHandlers.add(this);
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
                    System.out.println(msg);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }

        public void broadcastMsg(String msg) {
            for (ConnectionHandler connectionHandler : connectionHandlers) {
                try {
                    connectionHandler.out.write(msg);
                    connectionHandler.out.write("\n");
                    connectionHandler.out.flush();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
