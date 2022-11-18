using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using UbyTECAPI.Connection;

namespace UbyTECAPI.Tools
{
    public class MongoConnection
    {
        private static MongoClient client = new MongoClient(Connection.Connection.mongoString);
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
