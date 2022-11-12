using Npgsql;

namespace UbyTECAPI.Models
{
    public class ComercioTelefonos : Entity<ComercioTelefonos>
    {
        protected override string? atributes
        {
            get => "idComercio,telefono";
        }
        protected override string? entity
        {
            get => "comercio_telefonos";
        }
        protected override string? searchAtribute
        {
            get => "idComercio";
        }

        public int idComercio { get; set; }
        public int telefono { get; set; }

        protected override ComercioTelefonos createEntity(NpgsqlDataReader rd)
        {
            return new ComercioTelefonos
            {
                idComercio = Convert.ToInt32(rd["idComercio"]),
                telefono = Convert.ToInt32(rd["telefono"])
            };
        }

        protected override string paramsToString()
        {
            return $"{idComercio},{telefono}";
        }

        protected override string putParams()
        {
            return $"idComercio={idComercio},telefono={telefono}";
        }

        protected override string getID()
        {
            return idComercio.ToString();
        }

    }
}