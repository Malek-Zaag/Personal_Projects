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

    public static void main(String[] args) {
        Client client = new Client();
        client.run();
    }

    @Override
    public void run() {
        try {
            client = new Socket(InetAddress.getLocalHost(), 999);
            out = new PrintWriter(client.getOutputStream(), true);
            in = new BufferedReader(new InputStreamReader(client.getInputStream()));
            Scanner scanner = new Scanner(System.in);
            String username = scanner.nextLine();
            sendMessage(username);
            chat();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void sendMessage(String msg) {
        out.write(msg);
        out.write("\n");
        out.flush();
    }

    public void chat() {
        Scanner in = new Scanner(System.in);
        while (!client.isClosed()) {
            String msg = in.nextLine();
            out.write(msg);
            out.write("\n");
            out.flush();
        }
    }
}
