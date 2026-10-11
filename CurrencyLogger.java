import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Scanner;
 
public class CurrencyLogger {
 
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
 
        System.out.print("Enter amount: ");
        double amount = scanner.nextDouble();
 
        System.out.print("From currency: ");
        String from = scanner.next();
 
        System.out.print("To currency: ");
        String to = scanner.next();
 
        System.out.print("Converted result: ");
        double result = scanner.nextDouble();
 
        String log =
            LocalDateTime.now() +
            " => " +
            amount + " " + from +
            " -> " +
            result + " " + to;
 
        try (FileWriter writer =
                 new FileWriter("conversion_log.txt", true)) {
            writer.write(log + System.lineSeparator());
            System.out.println("Transaction logged successfully.");
        } catch (IOException e) {
            System.out.println("Error writing log file.");
        }
 
        scanner.close();
    }
}
