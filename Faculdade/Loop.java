import java.io.*;

public class Loop {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));

        //seila oq isso faz essa linha 16
        int N = Integer.parseInt(bufferedReader.readLine().trim());

// Para I declaro ele  digo q ele dev se somar at chegar em 10, E depois q Result ee N*i e a saida do loop e (2 X 1 = 2), que se repete ate i chegar em 10
for (int i = 1; i <= 10; i++) {
            int result = N * i;
            System.out.println(N + " x " + i + " = " + result);
        }



        bufferedReader.close();
    }
}
