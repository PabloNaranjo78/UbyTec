namespace UbyTECAPI.Models
{
    public class Pedido
    {
        public int idPedido { get; set; }
        public string? direccion { get; set; }
        public bool finalizado { get; set; }
        public int repartidor { get; set; }
        public int idCliente { get; set; }
    }
}
