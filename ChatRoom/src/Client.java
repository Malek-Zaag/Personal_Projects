import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.Socket;
import java.util.Scanner;

public class Client {
    private Socket socket;
    private PrintWriter out;
    private BufferedReader in;
    private String username;

    public Client(String username) {
        try {
            this.socket = new Socket(InetAddress.getLocalHost(), 999);
            this.out = new PrintWriter(socket.getOutputStream(), true);
            this.in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            this.username = username;
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("please enter your username");
        String username = scanner.nextLine();
        Client client = new Client(username);
        client.listen();
        client.sendMessage();
    }


    public void sendMessage() {
        try {
            out.write(username);
            out.write("\n");
            out.flush();
            Scanner input = new Scanner(System.in);
            while (socket.isConnected()) {
                String msg = input.nextLine();
                out.write(msg);
                out.write("\n");
                out.flush();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void listen() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                String msg;
                while (socket.isConnected()) {
                    try {
                        msg = in.readLine();
                        System.out.println(msg);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }).start();
    }
}
