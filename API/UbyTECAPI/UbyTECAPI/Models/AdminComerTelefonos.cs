using Npgsql;

namespace UbyTECAPI.Models
{
    public class AdminComerTelefonos : Entity<AdminComerTelefonos>
    {
        protected override string? atributes
        {
            get => "idAdmin,telefono";
        }

        protected override string? entity
        {
            get => "admin_comer_telefonos";
        }
        protected override string? searchAtribute
        {
            get => "idAdmin";
        }
        public int idAdmin { get; set; }
        public int telefono { get; set; }

        protected override AdminComerTelefonos createEntity(NpgsqlDataReader rd)
        {
            return new AdminComerTelefonos
            {
                idAdmin = Convert.ToInt32(rd["idAdmin"]),
                telefono = Convert.ToInt32(rd["telefono"])
            };
        }

        protected override string paramsToString()
        {
            return $"{idAdmin},{telefono}";
        }

        protected override string getID()
        {
            return idAdmin.ToString();
        }
    }
}
