using System.Linq;
using System.Security.Cryptography;

namespace UbyTECAPI.Tools
{
    public class PassGenerator
    {
        public static string generatePass()
        {

            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var Charsarr = new char[18];
            var random = new Random();

            for (int i = 0; i < Charsarr.Length; i++)
            {
                Charsarr[i] = characters[random.Next(characters.Length)];
            }

            return new String(Charsarr);
           
        }
    }
}
