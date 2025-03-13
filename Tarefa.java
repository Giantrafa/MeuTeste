import java.util.Scanner;
// 2 e 3 basico do java, O nome apos a class deve ser o mesmo do arquivo .java
public class Tarefa {
    public static void main(String[] args) {
 //permite receber o input do usuario
        Scanner input = new Scanner(System.in);
        
// recebe o peso do usuário
        System.out.print("Digite o Peso : ");
        double peso = input.nextInt();

// recebe a altura do usuário
        System.out.print("Digite sua Altura : ");
        double altura = input.nextDouble();

// verifica se a entrada é valida, essa parte foi o chatGPT
        if (peso <= 0 || altura <= 0) {
            System.out.println("Valores inválidos. Peso e altura devem ser maiores que zero.");
            input.close();
            return;
        }

// calcula o IMC
        double imc = peso / (altura * altura);

// exibe o IMC com 2 numeros
        System.out.printf("Seu IMC é: %.2f\f", imc);

// Classifica o tipo de IMC
        if (imc < 18.5) {
            System.out.println("Você está abaixo do peso.");
        }
         else if (imc >= 18.5 && imc < 24.9) {
            System.out.println("Você está com o peso normal.");
         }
         else if (imc >= 25 && imc < 29.9) {
            System.out.println("Você está com sobrepeso.");
         }
         else {
            System.out.println("Você está com obesidade.");
        }

// Fecha o scanner
        input.close();
    }
}
