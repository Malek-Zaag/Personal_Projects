import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;

public class Server implements Runnable {
    private ArrayList<ConnectionHandler> connectionHandlers;
    @Override
    public void run() {
        try{
            ServerSocket serverSocket=new ServerSocket(999);
            Socket clientSocket= serverSocket.accept();
            ConnectionHandler connectionHandler=new ConnectionHandler(clientSocket);
            connectionHandlers.add(connectionHandler);
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    class ConnectionHandler implements Runnable{
        private Socket client;
        private PrintWriter out;
        private BufferedReader in;

        public ConnectionHandler(Socket client) {
            this.client=client;
        }
        @Override
        public void run(){
            try {
                out = new PrintWriter(this.client.getOutputStream(), true);
                in = new BufferedReader(new InputStreamReader(this.client.getInputStream()));
                out.println("please enter a name");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public static void main(String[] args) {
        Server server=new Server();
        Thread t1=new Thread(server);
        t1.start();
    }
}
