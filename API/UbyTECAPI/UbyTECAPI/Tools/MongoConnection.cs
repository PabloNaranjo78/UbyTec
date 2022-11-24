using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using UbyTECAPI.Connection;

namespace UbyTECAPI.Tools
{
    public class MongoConnection
    {
        private static MongoClient client = new MongoClient(Connection.Connection.mongoString);
        private static string defaultImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAZABkAAD/7AARRHVja3kAAQAEAAAAPAAA/9sAQwAEAwMEAwMEBAQEBQUEBQcLBwcGBgcOCgoICxAOEREQDhAPEhQaFhITGBMPEBYfFxgbGx0dHREWICIfHCIaHB0c/8AACwgAyADIAQERAP/EABsAAQADAQEBAQAAAAAAAAAAAAADBAUGAgEI/8QANRABAAECAgYIBQQCAwAAAAAAAAECAwRTBREUFXKSITE0UXGRscESEyIyQSNCYdGBoTNiov/aAAgBAQAAPwD9tAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+VV00RrqqimO+Z1I9ps51vmg2mznW+aDabOdb5oNps51vmg2mznW+aDabOdb5oNps51vmg2mznW+aDabOdb5oNps51vmg2mznW+aHuium5GuiqmqI7p1vQAAAixN+MNYruz0/DHRHfLm5+fjr09dy5P47v6SbrxeTPnBuvF5M+cG68Xkz5wbrxeTPnBuvF5M+cG68Xkz5wbrxeTPnBuvF5M+cG68Xkz5wbrxeTPnBuvF5M+cI/hv4K7rmKrdcdPj/bosHiIxWHouatUz0THdKcAABR0x2Cvip9VPQUfqX5/Pwx6toAAAY+nY6LH+fZPoXsc8c+zRAAAUdMdhr4qfVT0D99/hj1bQPNy5Taoqrrqimmnrl5s37eIt/Hbq+KlIADI071WPGr2TaF7HPHPs0QAAFHTHYa+Kn1U9A/ff4Y9W0DE0zivirixTPRT01eP4hBovGbNf+Gqf06+if4nvdEADI071WPGr2TaF7HPHPs0QAAFHTHYa+Kn1U9A/ff4Y9W0IsTfpw1iu7V+2OiO+XLV1TXVVVVOuqqdcy8t/ROM+fa+VVP6luPOGiAMjTvVY8avZNoXsc8c+zRAAAUdMdhr4qfVT0D99/hj1bQwtMYr5t6LNM/Tb6/5lmCSxeqw92m5RPTT/t1Nm7TftU3KJ+mqNbP0tjflUfJt1aq6umqY/EItDYyZqnD3KpnX00TM/wCmwMjTvVY8avZNoXsc8c+zRAAAUdMdhr4qfVT0D99/hj1bSvjMTGFw9dz93VTHfLmJmZmZmdcz063wIjXOqOueh0n0aLwXfNP/AKqc7cuVXa6q6p11VTrmXyiqbdUVUzqqidcS6nCYiMVYpuR1z1x3SmZGneqx41eybQvY5459miAAAo6Y7DXxU+qnoH77/DHq2nPaVxXz8RNFM/Rb6PGfyoAPdd65dimK66qop6omep4GhonF/IvTbqn9O50eE/h0DI071WPGr2TaF7HPHPs0QAAFHTHYa+Kn1U9A/ff4Y9Wjj8ROGwtdcfdP00+MuYAAB0ujcTOKw0VVffT9NX8qeneqx41eybQvY5459miAAAo6X7DXxU+qnoL/AJL/AAx6ti5bou0TRXTFVM/iUG7sLkUeRu7C5FHkbuwuRR5G7sLkUeRu7C5FHkbuwuRR5G7sLkUeRu7C5FHkbvwuRR5JrVqizT8NuiKae6GVp3qsf59k+hexzxz7NEAABDirG04e5a16vijon+XOU1XsDenVrt3I6PH+029sXmRywb2xeZHLBvbF5kcsG9sXmRywb2xeZHLBvbF5kcsG9sXmRywb2xeZHLBvbF5kcsG9sXmRywb2xeZHLCGu5ext2NczXXPRER+HRYLD7LhqLczrmOmZ/lOAAAPNdqi7GquimqP+0a0WxYbIt8psWGyLfKbFhsi3ymxYbIt8psWGyLfKbFhsi3ymxYbIt8psWGyLfKbFhsi3ymxYbIt8psWGyLfKkt2rdmNVuimnhjU9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9k=";
        public static bool addImage(MongoImage imageData, MongoThumbnails mongoThumbnails)
        {
            try
            {
                var database = client.GetDatabase("UbyTEC");

                var imagesDB = database.GetCollection<MongoImage>("images");

                imagesDB.InsertOne(imageData);

                var thumbnailsDB = database.GetCollection<MongoThumbnails>("thumbnails");

                thumbnailsDB.InsertOne(mongoThumbnails);

                return true;
            }
            catch (Exception)
            {
                return false;
                throw;
            }
            
        }

        public static MongoImage getImage(string nombreImagen_, string producto_)
        {
            var database = client.GetDatabase("UbyTEC");

            var imagesDB = database.GetCollection<MongoImage>("images");

            var listResult = imagesDB.Find(d => d.nombreImagen == nombreImagen_ && d.producto == producto_).ToList().First();

            return listResult;
        }


        public static MongoThumbnails getThumbnails(string nombreImagen_, string producto_)
        {
            var database = client.GetDatabase("UbyTEC");

            var imagesDB = database.GetCollection<MongoThumbnails>("thumbnails");

            var listResult = imagesDB.Find(d => d.nombreImagen == nombreImagen_ && d.producto == producto_).ToList().First();

            return listResult;
        }

        public static MongoThumbnails getThumbnails(string nombreproducto_)
        {
            var database = client.GetDatabase("UbyTEC");

            var imagesDB = database.GetCollection<MongoThumbnails>("thumbnails");
            try
            {
                var listResult = imagesDB.Find(d => d.producto == nombreproducto_).ToList().First();
                return listResult;
            }
            catch (Exception)
            {
                return new MongoThumbnails() {thumbnails = defaultImage };
                
            }
        }

        public static bool deleteImage(string nombreImagen_, string producto_)
        {
            try
            {
                var database = client.GetDatabase("UbyTEC");

                var imagesDB = database.GetCollection<MongoImage>("images");
                var thumbnailsDB = database.GetCollection<MongoThumbnails>("thumbnails");

                imagesDB.DeleteOne(d => d.nombreImagen == nombreImagen_ && d.producto == producto_);
                thumbnailsDB.DeleteOne(d => d.nombreImagen == nombreImagen_ && d.producto == producto_);

                return true;
            }
            catch (Exception)
            {
                return false;
            }

        }


    }

    public class MongoImage
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? nombreImagen { get; set; }
        public string? producto { get; set; }
        public string? imagenData { get; set; }
    }
    public class MongoThumbnails
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? nombreImagen { get; set; }
        public string? producto { get; set; }
        public string? thumbnails { get; set; }
    }
}
