using Npgsql;

namespace UbyTECAPI.Models
{
    public class RepartidorTelefonos : Entity<RepartidorTelefonos>
    {
        protected override string? atributes
        {
            get => "usuarioRep,telefono";
        }

        protected override string? entity
        {
            get => "repartidor_telefonos";
        }

        protected override string? searchAtribute
        {
            get => "usuarioRep";
        }
        public string? usuarioRep { get; set; }
        public int telefono { get; set; }

        protected override RepartidorTelefonos createEntity(NpgsqlDataReader rd)
        {
            return new RepartidorTelefonos
            {
                usuarioRep = rd["usuarioRep"].ToString(),
                telefono = Convert.ToInt32(rd["telefono"])
            };
        }
        protected override string paramsToString()
        {
            return $"'{usuarioRep}',{telefono}";
        }

        protected override string putParams()
        {
            return $"usuarioRep='{usuarioRep}',telefono={telefono}";
        }
        protected override string getID()
        {
            return $"'{usuarioRep}'";
        }
    }
}
