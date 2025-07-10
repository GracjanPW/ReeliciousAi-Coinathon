using ReeliciousAI.VideoProcessor;

static class Program
{
    static void Main(string[] args)
    {
        try
        {
            RabbitHandler rbt = new RabbitHandler();
            rbt.InitRabbit();
            Thread.Sleep(Timeout.Infinite);
        }

        catch (Exception ex)
        {
            //restart the service
            Console.BackgroundColor = ConsoleColor.Red;
            Console.WriteLine("Error connecting to RabbitMQ, restarting service...");
            Console.WriteLine(ex.Message);
            Console.ResetColor();
            System.Threading.Thread.Sleep(5000);
            Main(args);
        }
    }
}