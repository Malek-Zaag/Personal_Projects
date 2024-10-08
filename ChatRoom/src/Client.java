import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.Socket;
import java.util.Scanner;

public class Client implements Runnable {
    private Socket client;
    private PrintWriter out;
    private BufferedReader in;
    @Override
    public void run() {
        try {
            client = new Socket(InetAddress.getLocalHost(), 999);
            out = new PrintWriter(client.getOutputStream(), true);
            in = new BufferedReader(new InputStreamReader(client.getInputStream()));
            this.sendMessage();

            out.println("hello server from client");
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public void sendMessage(){
        Scanner in=new Scanner(System.in);
        while (!client.isClosed()) {
            String msg=in.nextLine();
            System.out.println(msg);
            out.write(msg);
            out.flush();
        }
    }

    public static void main(String[] args) {
        Client client=new Client();
        client.run();
    }
}
