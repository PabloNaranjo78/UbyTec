using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using UbyTECAPI.Connection;

namespace UbyTECAPI.Tools
{
    public class MongoConnection
    {
        private static MongoClient client = new MongoClient(Connection.Connection.mongoString);
        public static bool addImage(MongoImage imageData)
        {
            var database = client.GetDatabase("UbyTEC");

            var imagesDB = database.GetCollection<MongoImage>("images");

            imagesDB.InsertOne(imageData);

            return true;
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
}
