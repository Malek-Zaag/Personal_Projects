import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Server implements Runnable {
    private ArrayList<ConnectionHandler> connectionHandlers ;
    private  ExecutorService pool;

    public Server(){
        connectionHandlers= new ArrayList<>();
        pool= Executors.newCachedThreadPool();
    }
private BufferedReader in;
    @Override
    public void run() {

        try{
            ServerSocket serverSocket=new ServerSocket(999);
            Socket client= serverSocket.accept();
            ConnectionHandler handler=new ConnectionHandler(client);
            this.connectionHandlers.add(handler);
            pool.execute(handler);

        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    static class ConnectionHandler implements Runnable{
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
                if (client.isConnected()){
                    System.out.println("connected");
                    in = new BufferedReader(new InputStreamReader(client.getInputStream()));
                    String bf=in.readLine();
                    System.out.println(bf);
                    out.close();
                    in.close();
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public static void main(String[] args) {
        Server server=new Server();
        server.run();
    }
}
