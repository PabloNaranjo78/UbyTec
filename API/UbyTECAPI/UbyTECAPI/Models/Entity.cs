using Npgsql;
namespace UbyTECAPI.Models
{
    public abstract class Entity<T>
    {
        private NpgsqlConnection con = new(Connection.Connection.ConnectionString);
        virtual protected string? atributes { get; set; }
        virtual protected string? entity { get; set; }
        virtual protected string? searchAtribute { get; set; }

        public List<T> get()
        {

            con.Open();
            NpgsqlCommand command = new($"SELECT {atributes} FROM get{entity}()", con);
            NpgsqlDataReader rd = command.ExecuteReader();
            List<T> entityList = createEntityList(rd);
            con.Close();
            return entityList;

        }

        public List<T> get(string id)
        {
            con.Open();
            NpgsqlCommand command = new($"SELECT {atributes} FROM get{entity}byid({id})", con);
            NpgsqlDataReader rd = command.ExecuteReader();
            List<T> entityList = createEntityList(rd);
            con.Close();
            return entityList;
        }

        public bool post(Entity<T> newEntity)
        {
            NpgsqlCommand command = new($"CALL add{entity}({newEntity.paramsToString()})", con);

            try
            {
                con.Open();
                command.ExecuteNonQuery();
                return true;
            }
            catch (Exception)
            {

                return false;
            }

        }

        public bool put(Entity<T> newEntity)
        {

            NpgsqlCommand command = new($"CALL update{entity}({newEntity.paramsToString()})", con);

            try
            {
                con.Open();
                command.ExecuteNonQuery();
                return true;
            }
            catch (Exception)
            {

                return false;
            }

        }

        public bool delete(string id)
        {
            NpgsqlCommand command = new($"CALL delete{entity}({id})", con);

            try
            {
                con.Open();
                command.ExecuteNonQuery();
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }


        protected List<T> createEntityList(NpgsqlDataReader rd)
        {
            List<T> entityList = new();
            while (rd.Read())
            {
                entityList.Add(createEntity(rd));
            }

            return entityList;

        }

        protected virtual T createEntity(NpgsqlDataReader rd)
        {
            return createEntity(rd);
        }

        protected virtual string paramsToString()
        {
            return paramsToString();
        }

        protected virtual string putParams()
        {
            return putParams();
        }

        protected virtual string getID()
        {
            return getID();
        }

    }
}