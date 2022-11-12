using Npgsql;

namespace UbyTECAPI.Models
{
    public class Pedido : Entity<Pedido>
    {
        protected override string? atributes
        {
            get => "idPedido,direccion,finalizado,repartidor,idCliente";
        }
        protected override string? entity
        {
            get => "pedido";
        }
        protected override string? searchAtribute
        {
            get => "idPedido";
        }
        public int idPedido { get; set; }
        public string? direccion { get; set; }
        public bool finalizado { get; set; }
        public string? repartidor { get; set; }
        public int idCliente { get; set; }

        protected override Pedido createEntity(NpgsqlDataReader rd)
        {
            return new Pedido
            {
                idPedido = Convert.ToInt32(rd["idPedido"]),
                direccion = rd["direccion"].ToString(),
                finalizado = Boolean.Parse(rd["finalizado"].ToString()),
                repartidor = rd["repartidor"].ToString(),
                idCliente = Convert.ToInt32(rd["idCliente"])
            };
        }

        protected override string paramsToString()
        {
            return $"{idPedido},'{direccion}','{finalizado}','{repartidor}',{idCliente}";
        }

        protected override string putParams()
        {
            return $"direccion='{direccion}',finalizado='{finalizado}',repartidor='{repartidor}',idCliente={idCliente}";
        }

        protected override string getID()
        {
            return idPedido.ToString();
        }
    }
}
