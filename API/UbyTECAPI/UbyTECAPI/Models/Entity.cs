using Npgsql;
namespace UbyTECAPI.Models
{
    public abstract class Entity<T>
    {
        private NpgsqlConnection con = new(Connection.Connection.ConnectionString);
        virtual protected string? atributes { get; set; }
        virtual protected string? entity { get; set; }

        public List<T> get() {

            con.Open();
            NpgsqlCommand command = new($"SELECT {atributes} FROM {entity}", con);
            NpgsqlDataReader rd = command.ExecuteReader();
            
            List<T> entityList = createEntityList(rd);
            con.Close();
            return entityList;

        }

        private List<T> createEntityList(NpgsqlDataReader rd) {
            List<T> entityList = new();
            while (rd.Read()) { 
                entityList.Add(createEntity(rd));
            }

            return entityList;

        }

        protected virtual T createEntity(NpgsqlDataReader rd) {
            return createEntity(rd);
        }


    }
}
