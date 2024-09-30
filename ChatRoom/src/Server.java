import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {
    private ServerSocket serverSocket;
    private Socket clientSocket;
    private PrintWriter out;
    private BufferedReader in;

    public void start() {
        try{
            this.serverSocket=new ServerSocket(999);
            this.clientSocket= serverSocket.accept();
            if (this.clientSocket.isBound()) {
                System.out.println("hello client");
            }
            this.out= new PrintWriter(clientSocket.getOutputStream(),true);
            this.in=new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
        }catch (Exception e) {
            e.printStackTrace();
        }
    }


    public static void main(String[] args)  {
        Server server = new Server();
        Client client=new Client();
        server.start();
        client.startConnection();
    }
}
